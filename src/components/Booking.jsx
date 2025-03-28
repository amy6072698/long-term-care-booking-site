import axios from "axios";
import { useContext } from "react";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import ReactLoading from "react-loading";
import { UserContext }  from "../contexts/UserContext";
import showSuccessMessage from "../assets/js/showSuccessMessage";
import showErrorMessage from "../assets/js/showErrorMessage";



function Booking({ product, token, myUserId, isLoading, setIsLoading }) {
  const { isLogin } = useContext(UserContext); // 用來判斷是否登入
  const { setIsLoginModalOpen } = useContext(UserContext);
  const { setLoginModalMode } = useContext(UserContext);

  //加入預約留床
  const addCartItem = async (e, productId) => {
    e.preventDefault();
    //如果未登入則跳出登入modal
    if (!isLogin) {
      setLoginModalMode("login");
      setIsLoginModalOpen(true);
      return;
    }
    try {
      //使用路由600有可能會因carts中無使用者id而無法get
      //使用640只會辨識有無token
      const { data } = await axios.get(`${BASE_URL}/640/carts`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      //篩選user是否預定過此間機構的留床
      const hasDuplicateBooking = data.find((item) => {
        return item.userId === Number(myUserId) && item.productId === productId;
      });

      // 如果user有預訂留床過則跳出函式
      if (hasDuplicateBooking) {
        showErrorMessage("您已重複預約，請至立即預訂查看");
        return;
      }
      //將此筆資料加入預訂留床
      await axios.post(
        `${BASE_URL}/600/carts`,
        {
          productId: Number(productId),
          userId: Number(myUserId),
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      setIsLoading(true);
      showSuccessMessage(`加入預約成功\n請去立即預訂查看`);
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    } catch (error) {
      const { data } = error.response;
      console.log(error);
      showErrorMessage(data);
    }
  };

  return (
    <button
      disabled={isLoading}
      type="button"
      onClick={(e) => {
        // checkDuplicateBooking(e, product.id);
        addCartItem(e, product.id);
      }}
      className="btn btn-primary-40 py-4 w-100  d-flex justify-content-center align-items-center gap-2"
    >
      預定留床
      {isLoading && (
        <ReactLoading
          type={"spin"}
          color={"#000"}
          height={"1.5rem"}
          width={"1.5rem"}
        />
      )}
    </button>
  );
}
export default Booking;
