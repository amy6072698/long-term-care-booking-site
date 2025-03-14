import { useEffect, useState, useContext } from "react";
import { Modal } from "bootstrap";
import axios from "axios";
import BannerNoSearch from "../components/BannerNoSearch";
import { useNavigate } from "react-router";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import { UserContext } from "./FrontLayout";

let token;
let myUserId;

export default function Cart() {
  const [cartsData, setCartsData] = useState([]);
  const { setIsLoginModalOpen } = useContext(UserContext);
  const { setLoginModalMode } = useContext(UserContext);
  const { isLogin } = useContext(UserContext); // 判斷是否登入
  // const { setIsLogin } = useContext(UserContext);
  // const { setUserName } = useContext(UserContext);

  //取得cookie中的token和useId
  const getToken = () => {
    document.cookie = "myToken";
    token = document.cookie.replace(
      /(?:(?:^|.*;\s*)myToken\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    myUserId = document.cookie.replace(
      /(?:(?:^|.*;\s*)myUserId\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    if (!token) {
      handleLoginModal();
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  //跳出登入視窗
  const handleLoginModal = () => {
    setLoginModalMode("login");
    setIsLoginModalOpen(true);
  };

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const { data } = await axios.get(
          `${BASE_URL}/600/carts?userId=${myUserId}&_expand=product`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        setCartsData(data);
      } catch (error) {}
    };
    //如果登入成功則重新取得token，
    if (isLogin) {
      getToken();
      fetchCartData();
    }
  }, [isLogin]);

  //一次只選取一張卡片
  const [selectId, setSelectId] = useState(null);

  //點擊下一步跳轉到ProductPage
  const navigate = useNavigate();
  const goToProductPage = () => {
    const result = cartsData.find((item) => {
      return item.id === selectId;
    });
    if (!selectId) {
      alert("請選擇一間機構！");
      return;
    }
    // json-server-auth 預設 1 小時 token 失效，宣告失效時間變數 expired，並做時間處理
    const expired = new Date();
    expired.setTime(expired.getTime() + 60 * 60 * 1000);
    //存入cookie
    document.cookie = `selectProductId=${selectId}; expires=${expired.toUTCString()}; path=/;`;
    //將選中的ID帶入網址
    navigate(`/checkout/${result.productId}`);
  };

  //儲存預刪除的id
  const [deleteId, setDeleteId] = useState(null);

  //handleDeleteClick 方法
  const handleDeleteClick = (id) => {
    setDeleteId(id);
  };

  //confirmDelete 方法&重新渲染
  const confirmDelete = async () => {
    try {
      await axios.delete(`${BASE_URL}/carts/${deleteId}`);
      setCartsData(cartsData.filter((item) => item.id !== deleteId));
      setDeleteId(null); // 關閉 Modal
    } catch (error) {
      console.error("刪除失敗", error);
    }
  };

 // 清空購物車
 const handleDeleteAllClick = async () => {
  getToken(); // 取得 userId
  if (!myUserId) {
    alert("用戶未登入，無法清空購物車");
    return;
  }

  // 取得當前使用者的購物車資料
  const userCarts = cartsData.filter((item) => item.userId == myUserId);

  if (userCarts.length === 0) {
    alert("購物車已經是空的！");
    return;
  }

  try {
    // 產生 DELETE 請求清除當前使用者的購物車內容
    const deleteRequests = userCarts.map((item) =>
      axios.delete(`${BASE_URL}/carts/${item.id}`)
    );

    // 使用 Promise.all 讓請求並行發送，提高效率
    await Promise.all(deleteRequests);

    // 更新前端狀態，確保 UI 同步
    setCartsData(cartsData.filter((item) => item.userId != myUserId));
    alert("購物車已清空！");
  } catch (error) {
    console.error("清空購物車失敗", error);
    alert("清空購物車失敗，請稍後再試！");
  }
};



  return (
    <>
      <div className="main">
        {/* banner */}
        <BannerNoSearch></BannerNoSearch>

        <div className="order-content">
          <div className="container">
            {/* 頁籤按鈕 */}
            <div className="d-flex justify-content-center mb-9 mb-md-12">
              <ul
                className="nav nav-pills custom-nav-pills d-flex flex-nowrap"
                id="pills-tab"
                role="tablist"
              >
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    id="pills-order-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-order"
                    type="button"
                    role="tab"
                    aria-controls="pills-order"
                    aria-selected="true"
                  >
                    預定留床
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="pills-visit-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-visit"
                    type="button"
                    role="tab"
                    aria-controls="pills-visit"
                    aria-selected="false"
                  >
                    預約參訪
                  </button>
                </li>
              </ul>
            </div>

            {/* 頁籤內容 */}
            <div className="tab-content tab-style" id="pills-tabContent">
              {/* order內容 */}
              <div
                className="tab-pane fade show active"
                id="pills-order"
                role="tabpanel"
                aria-labelledby="pills-order-tab"
                tabIndex="0"
              >
                {/* 頁籤首頁 */}
                <div className="px-2 mb-11">
                  {/* 進度條 */}
                  <div className="line-container pt-7 pb-11">
                    <div className="circle left-circle"></div>
                    <div className="line left-line"></div>
                    <div className="circle middle-circle"></div>
                    <div className="line right-line"></div>
                    <div className="circle right-circle hollow-circle"></div>
                  </div>
                  {/* 全部刪除按鈕 */}
                  <div className="d-flex justify-content-end">
                    <button
                      type="button"
                      className="btn btn-outline-secondary-40 all-font"
                      onClick={handleDeleteAllClick}
                    >
                      全部刪除
                    </button>
                  </div>
                </div>
                {/* 渲染購物車資料 */}
                {cartsData.map((item, index) => (
                  <div
                    className="card overflow-hidden mb-11"
                    key={item.id}
                    style={{ maxWidth: "1296px" }}
                  >
                    <div className="row g-0">
                      <div className="col-lg-5">
                        <div className="checkbox-relative h-100">
                          <img
                            src={item.product.images[0]}
                            className="img-fluid card-img rounded-0"
                            alt="building"
                            style={{ height: "290px" }}
                          />
                          <div className="checkbox-mobile">
                            <input
                              className="form-check-input custom-checkbox checkbox-absolute"
                              type="checkbox"
                              id={`checkbox-${item.id}`}
                              checked={selectId === item.id}
                              onChange={() =>
                                setSelectId(
                                  selectId === item.id ? null : item.id
                                )
                              }
                              value=""
                              aria-label="勾選框"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-7">
                        <div className="card-body p-4">
                          {/* infor */}
                          <div className="infor mb-3">
                            <div className="checkbox d-flex justify-content-between mb-2">
                              <h5 className="card-title">
                                {item.product.name}
                              </h5>
                              <div className="checkbox-desk">
                                <input
                                  className="form-check-input custom-checkbox"
                                  type="checkbox"
                                  id={`checkbox-${item.id}`}
                                  checked={selectId === item.id}
                                  onChange={() =>
                                    setSelectId(
                                      selectId === item.id ? null : item.id
                                    )
                                  }
                                  value=""
                                  aria-label="勾選框"
                                />
                              </div>
                            </div>
                            <div className="address d-flex">
                              <svg
                                width="16"
                                height="20"
                                viewBox="0 0 16 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M1 7.92285C1 12.7747 5.24448 16.7869 7.12319 18.3252C7.39206 18.5454 7.52811 18.6568 7.72871 18.7132C7.88491 18.7572 8.1148 18.7572 8.271 18.7132C8.47197 18.6567 8.60707 18.5463 8.87695 18.3254C10.7557 16.7871 14.9999 12.7751 14.9999 7.9233C14.9999 6.08718 14.2625 4.32605 12.9497 3.02772C11.637 1.72939 9.8566 1 8.00008 1C6.14357 1 4.36301 1.7295 3.05025 3.02783C1.7375 4.32616 1 6.08674 1 7.92285Z"
                                  fill="#EA8C55"
                                />
                                <path
                                  d="M6 7C6 8.10457 6.89543 9 8 9C9.10457 9 10 8.10457 10 7C10 5.89543 9.10457 5 8 5C6.89543 5 6 5.89543 6 7Z"
                                  fill="#EA8C55"
                                />
                                <path
                                  d="M1 7.92285C1 12.7747 5.24448 16.7869 7.12319 18.3252C7.39206 18.5454 7.52811 18.6568 7.72871 18.7132C7.88491 18.7572 8.1148 18.7572 8.271 18.7132C8.47197 18.6567 8.60707 18.5463 8.87695 18.3254C10.7557 16.7871 14.9999 12.7751 14.9999 7.9233C14.9999 6.08718 14.2625 4.32605 12.9497 3.02772C11.637 1.72939 9.8566 1 8.00008 1C6.14357 1 4.36301 1.7295 3.05025 3.02783C1.7375 4.32616 1 6.08674 1 7.92285Z"
                                  stroke="black"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M6 7C6 8.10457 6.89543 9 8 9C9.10457 9 10 8.10457 10 7C10 5.89543 9.10457 5 8 5C6.89543 5 6 5.89543 6 7Z"
                                  stroke="black"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <p className="fs-7 ps-1 mb-5">
                                {item.product.address}
                              </p>
                            </div>
                          </div>
                          <ul className="d-flex ps-0 mb-4 flex-wrap align-items-center gap-2">
                            {item.product.services?.map((service, index) => (
                              <li
                                key={index}
                                className="border border-dark rounded-pill "
                              >
                                <p className="d-flex align-items-center py-1 px-2">
                                  <img
                                    className="me-1"
                                    src={`https://raw.githubusercontent.com/Jack-Xiao-2024/ReactC5/ed70683e88e44a1c0854ab9849a0f2dbc072916e/src/assets/images/Icon/tag/${service.name}.svg`}
                                  />
                                  {service.name || "載入中..."}
                                </p>
                              </li>
                            ))}
                          </ul>
                          {/* 床位房型 */}
                          <div className="card-text d-flex justify-content-between align-items-end mb-2">
                            <div className="beds fs-7">
                              剩餘床位：
                              <span className="last-bed">
                                {item.product.roomCards[0].availableBeds +
                                  item.product.roomCards[1].availableBeds +
                                  item.product.roomCards[2].availableBeds}
                              </span>
                            </div>
                            <div className="room-info text-end">
                              <p className="room-type fs-8">
                                {item.product.roomCards[0].roomType}
                              </p>
                              <p className="room-price fs-5">
                                NTD {item.product.roomCards[0].price}
                              </p>
                            </div>
                          </div>
                          {/* 單獨刪除按鈕 */}
                          <div className="d-flex justify-content-end">
                            <button
                              type="button"
                              className="btn btn-outline-secondary-40"
                              data-bs-toggle="modal"
                              data-bs-target="#deleteConfirmModal"
                              onClick={() => handleDeleteClick(item.id)}
                            >
                              <i className="bi bi-x-lg"></i>
                              <span className="fs-6">刪除</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {/* 頁籤尾頁 */}
                <div className="tab-footer d-flex justify-content-center justify-content-md-end mt-3">
                  <div className="flex-column">
                    <button
                      type="button"
                      className="btn next-btn next-btn-size fs-5 btn-primary-40"
                      onClick={goToProductPage}
                    >
                      下一步
                    </button>
                  </div>
                </div>
              </div>

              {/* ModalHeader提示框 */}
              <div
                className="modal fade"
                id="deleteConfirmModal"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    {/* ModalHeader */}
                    <div className="modal-header mx-auto none-border">
                      <div className="d-flex flex-column align-items-center">
                        <svg
                          className="d-black"
                          width="57"
                          height="57"
                          viewBox="0 0 57 57"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_1599_1465)">
                            <path
                              d="M48.4336 8.96671V53.3C48.4336 53.9189 48.1878 54.5124 47.7502 54.95C47.3126 55.3875 46.7191 55.6334 46.1003 55.6334H11.1003C10.4815 55.6334 9.88797 55.3875 9.45039 54.95C9.0128 54.5124 8.76697 53.9189 8.76697 53.3V8.96671H48.4336Z"
                              fill="#F7E2D9"
                            />
                            <path
                              d="M8.76697 8.96671H48.4336V15.9667H8.76697V8.96671Z"
                              fill="#EEC2B0"
                            />
                            <path
                              d="M48.4336 8.96671V53.3C48.4336 53.9189 48.1878 54.5124 47.7502 54.95C47.3126 55.3875 46.7191 55.6334 46.1003 55.6334H11.1003C10.4815 55.6334 9.88797 55.3875 9.45039 54.95C9.0128 54.5124 8.76697 53.9189 8.76697 53.3V8.96671H48.4336Z"
                              stroke="#B43900"
                              strokeWidth="2.304"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M18.1 8.96668V4.30001C18.1 3.68117 18.3458 3.08768 18.7834 2.65009C19.221 2.21251 19.8145 1.96667 20.4333 1.96667H36.7666C37.3855 1.96667 37.979 2.21251 38.4166 2.65009C38.8541 3.08768 39.1 3.68117 39.1 4.30001V8.96668"
                              stroke="#B43900"
                              strokeWidth="2.304"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M1.76685 8.96671H55.4335"
                              stroke="#B43900"
                              strokeWidth="2.304"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M18.1 17.1333V45.1333"
                              stroke="#B43900"
                              strokeWidth="2.304"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M28.6 17.1333V45.1333"
                              stroke="#B43900"
                              strokeWidth="2.304"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M39.1 17.1333V45.1333"
                              stroke="#B43900"
                              strokeWidth="2.304"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_1599_1465">
                              <rect
                                width="56"
                                height="56"
                                fill="white"
                                transform="translate(0.599976 0.799988)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                        <h5 className="modal-title text-secondary-70">
                          刪除機構
                        </h5>
                      </div>
                    </div>
                    {/* ModalBody */}
                    <div className="modal-body">
                      <p
                        className="text-center fs-6"
                        style={{ color: " #B0B0B0" }}
                      >
                        請問確認刪除勾選的機構嗎？
                      </p>
                    </div>
                    <div className="modal-footer d-flex justify-content-center none-border">
                      <button
                        type="button"
                        className="btn modal-btn btn-secondary-40 fs-6 modal-me"
                        data-bs-dismiss="modal"
                        onClick={confirmDelete}
                      >
                        刪除
                      </button>
                      <button
                        type="button"
                        className="btn modal-btn btn-outline-secondary-40 fs-6"
                        data-bs-dismiss="modal"
                      >
                        保留
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* visit內容 */}
              <div
                className="tab-pane fade"
                id="pills-visit"
                role="tabpanel"
                aria-labelledby="pills-visit-tab"
                tabIndex="0"
              >
                {/* 頁籤首頁 */}
                <div className="px-2 mb-11">
                  {/* 進度條 */}
                  <div className="line-container pt-7 pb-11">
                    <div className="circle left-circle hollow-circle"></div>
                    <div className="line right-line"></div>
                    <div className="circle middle-circle"></div>
                    <div className="line left-line"></div>
                    <div className="circle right-circle"></div>
                  </div>
                  {/* 全部刪除按鈕 */}
                  <div className="d-flex justify-content-end">
                    <button
                      type="button"
                      className="btn btn-outline-secondary-40 all-font"
                    >
                      全部刪除
                    </button>
                  </div>
                </div>
                {/* visit-card-1 */}
                <div
                  className="card overflow-hidden mb-11"
                  style={{ maxWidth: "1296px" }}
                >
                  <div className="row g-0">
                    <div className="col-lg-5">
                      <div className="checkbox-relative h-100">
                        <img
                          src="https://github.com/Jack-Xiao-2024/Project_D01/blob/main/assets/images/Building/B-10.png?raw=true"
                          className="img-fluid card-img rounded-0 h-100"
                          alt="building"
                        />
                        <div className="checkbox-mobile">
                          <input
                            className="form-check-input custom-checkbox checkbox-absolute"
                            type="checkbox"
                            id="checkboxNoLabel"
                            value=""
                            aria-label="勾選框"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-7">
                      <div className="card-body p-4">
                        {/* infor */}
                        <div className="infor mb-3">
                          <div className="checkbox d-flex justify-content-between mb-2">
                            <h5 className="card-title">靜宜護理家園</h5>
                            <div className="checkbox-desk">
                              <input
                                className="form-check-input custom-checkbox"
                                type="checkbox"
                                id="checkboxNoLabel"
                                value=""
                                aria-label="勾選框"
                              />
                            </div>
                          </div>
                          <div className="address d-flex">
                            <svg
                              width="16"
                              height="20"
                              viewBox="0 0 16 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1 7.92285C1 12.7747 5.24448 16.7869 7.12319 18.3252C7.39206 18.5454 7.52811 18.6568 7.72871 18.7132C7.88491 18.7572 8.1148 18.7572 8.271 18.7132C8.47197 18.6567 8.60707 18.5463 8.87695 18.3254C10.7557 16.7871 14.9999 12.7751 14.9999 7.9233C14.9999 6.08718 14.2625 4.32605 12.9497 3.02772C11.637 1.72939 9.8566 1 8.00008 1C6.14357 1 4.36301 1.7295 3.05025 3.02783C1.7375 4.32616 1 6.08674 1 7.92285Z"
                                fill="#EA8C55"
                              />
                              <path
                                d="M6 7C6 8.10457 6.89543 9 8 9C9.10457 9 10 8.10457 10 7C10 5.89543 9.10457 5 8 5C6.89543 5 6 5.89543 6 7Z"
                                fill="#EA8C55"
                              />
                              <path
                                d="M1 7.92285C1 12.7747 5.24448 16.7869 7.12319 18.3252C7.39206 18.5454 7.52811 18.6568 7.72871 18.7132C7.88491 18.7572 8.1148 18.7572 8.271 18.7132C8.47197 18.6567 8.60707 18.5463 8.87695 18.3254C10.7557 16.7871 14.9999 12.7751 14.9999 7.9233C14.9999 6.08718 14.2625 4.32605 12.9497 3.02772C11.637 1.72939 9.8566 1 8.00008 1C6.14357 1 4.36301 1.7295 3.05025 3.02783C1.7375 4.32616 1 6.08674 1 7.92285Z"
                                stroke="black"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M6 7C6 8.10457 6.89543 9 8 9C9.10457 9 10 8.10457 10 7C10 5.89543 9.10457 5 8 5C6.89543 5 6 5.89543 6 7Z"
                                stroke="black"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <p className="fs-7 ps-1 mb-5">新北市三重區仁愛路</p>
                          </div>
                        </div>
                        {/* information */}
                        <ul className="d-flex ps-0 mb-4 flex-wrap align-items-center">
                          <li className="border border-dark rounded-pill me-3">
                            <p className="d-flex align-items-center py-1 px-2">
                              <img
                                className="me-1"
                                src="https://raw.githubusercontent.com/Jack-Xiao-2024/Project_D01/00a6b3aa21b3ca63af31bb2774763919bbd1b1bf/assets/images/Icon/IconBlack/Doctor-B.svg"
                                alt="Doctor-B"
                              />
                              機構內門診
                            </p>
                          </li>
                          <li className="border border-dark rounded-pill me-3 mt-md-0">
                            <p className="d-flex align-items-center py-1 px-2 ">
                              <img
                                className="me-1"
                                src="https://raw.githubusercontent.com/Jack-Xiao-2024/Project_D01/00a6b3aa21b3ca63af31bb2774763919bbd1b1bf/assets/images/Icon/IconBlack/Shower-B.svg"
                                alt="Shower-B"
                              />
                              特殊沐浴設備
                            </p>
                          </li>
                          <li className="border border-dark rounded-pill me-3 mt-3 mt-md-0">
                            <p className="d-flex align-items-center py-1 px-2 ">
                              <img
                                className="me-1"
                                src="https://raw.githubusercontent.com/Jack-Xiao-2024/Project_D01/00a6b3aa21b3ca63af31bb2774763919bbd1b1bf/assets/images/Icon/IconBlack/Bus-B.svg"
                                alt="Bus-B"
                              />
                              門診接送
                            </p>
                          </li>
                          <li className="border border-dark rounded-pill me-3 mt-3 mt-md-0">
                            <p className="d-flex align-items-center py-1 px-2 ">
                              <img
                                className="me-1"
                                src="https://raw.githubusercontent.com/Jack-Xiao-2024/Project_D01/00a6b3aa21b3ca63af31bb2774763919bbd1b1bf/assets/images/Icon/IconBlack/Bandaid-B.svg"
                                alt="Bandaid-B"
                              />
                              大傷口照顧
                            </p>
                          </li>
                        </ul>
                        {/* 床位房型 */}
                        <div className="card-text d-flex justify-content-between align-items-end mb-2">
                          <div className="d-flex align-items-center">
                            <p className="fs-8 me-1">預定參訪時段：</p>
                            <div className="dropdown">
                              <button
                                className="btn btn-primary-40 dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton1"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                data-bs-display="static"
                              >
                                選擇參訪時段
                              </button>
                              <ul
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuButton1"
                              >
                                <li>
                                  <a className="dropdown-item" href="#">
                                    上午時段：10:00~12:00
                                  </a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">
                                    下午時段：14:00~16:00
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>

                          <div className="room-info text-end">
                            <p className="room-type fs-8">剩餘床位</p>
                            <p className="room-price fs-5">
                              <i className="bi bi-house-heart me-1"></i>
                              <span className="last-bed">12</span>個
                            </p>
                          </div>
                        </div>

                        {/* Button trigger modal */}
                        <div className="d-flex justify-content-end mb-10 mb-md-0">
                          <button
                            type="button"
                            className="btn btn-outline-secondary-40"
                            data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop"
                          >
                            <i className="bi bi-x-lg"></i>
                            <span className="fs-6">刪除</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* visit-card-2 */}
                <div
                  className="card overflow-hidden mb-11"
                  style={{ maxWidth: "1296px" }}
                >
                  <div className="row g-0">
                    <div className="col-lg-5">
                      <div className="checkbox-relative h-100">
                        <img
                          src="https://github.com/Jack-Xiao-2024/Project_D01/blob/main/assets/images/Building/B-05.png?raw=true"
                          className="img-fluid card-img rounded-0 h-100"
                          alt="building"
                        />
                        <div className="checkbox-mobile">
                          <input
                            className="form-check-input custom-checkbox checkbox-absolute"
                            type="checkbox"
                            id="checkboxNoLabel"
                            value=""
                            aria-label="勾選框"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-7">
                      <div className="card-body p-4">
                        {/* infor */}
                        <div className="infor mb-3">
                          <div className="checkbox d-flex justify-content-between mb-2">
                            <h5 className="card-title">祥和樂年苑</h5>
                            <div className="checkbox-desk">
                              <input
                                className="form-check-input custom-checkbox"
                                type="checkbox"
                                id="checkboxNoLabel"
                                value=""
                                aria-label="勾選框"
                              />
                            </div>
                          </div>
                          <div className="address d-flex">
                            <svg
                              width="16"
                              height="20"
                              viewBox="0 0 16 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1 7.92285C1 12.7747 5.24448 16.7869 7.12319 18.3252C7.39206 18.5454 7.52811 18.6568 7.72871 18.7132C7.88491 18.7572 8.1148 18.7572 8.271 18.7132C8.47197 18.6567 8.60707 18.5463 8.87695 18.3254C10.7557 16.7871 14.9999 12.7751 14.9999 7.9233C14.9999 6.08718 14.2625 4.32605 12.9497 3.02772C11.637 1.72939 9.8566 1 8.00008 1C6.14357 1 4.36301 1.7295 3.05025 3.02783C1.7375 4.32616 1 6.08674 1 7.92285Z"
                                fill="#EA8C55"
                              />
                              <path
                                d="M6 7C6 8.10457 6.89543 9 8 9C9.10457 9 10 8.10457 10 7C10 5.89543 9.10457 5 8 5C6.89543 5 6 5.89543 6 7Z"
                                fill="#EA8C55"
                              />
                              <path
                                d="M1 7.92285C1 12.7747 5.24448 16.7869 7.12319 18.3252C7.39206 18.5454 7.52811 18.6568 7.72871 18.7132C7.88491 18.7572 8.1148 18.7572 8.271 18.7132C8.47197 18.6567 8.60707 18.5463 8.87695 18.3254C10.7557 16.7871 14.9999 12.7751 14.9999 7.9233C14.9999 6.08718 14.2625 4.32605 12.9497 3.02772C11.637 1.72939 9.8566 1 8.00008 1C6.14357 1 4.36301 1.7295 3.05025 3.02783C1.7375 4.32616 1 6.08674 1 7.92285Z"
                                stroke="black"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M6 7C6 8.10457 6.89543 9 8 9C9.10457 9 10 8.10457 10 7C10 5.89543 9.10457 5 8 5C6.89543 5 6 5.89543 6 7Z"
                                stroke="black"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <p className="fs-7 ps-1 mb-5">新北市中和區中山路</p>
                          </div>
                        </div>
                        {/* information */}
                        <ul className="d-flex ps-0 mb-4 flex-wrap align-items-center">
                          <li className="border border-dark rounded-pill me-3">
                            <p className="d-flex align-items-center py-1 px-2">
                              <img
                                className="me-1"
                                src="https://raw.githubusercontent.com/Jack-Xiao-2024/Project_D01/00a6b3aa21b3ca63af31bb2774763919bbd1b1bf/assets/images/Icon/IconBlack/Doctor-B.svg"
                                alt="Doctor-B"
                              />
                              機構內門診
                            </p>
                          </li>
                          <li className="border border-dark rounded-pill me-3 mt-md-0">
                            <p className="d-flex align-items-center py-1 px-2 ">
                              <img
                                className="me-1"
                                src="https://raw.githubusercontent.com/Jack-Xiao-2024/Project_D01/00a6b3aa21b3ca63af31bb2774763919bbd1b1bf/assets/images/Icon/IconBlack/Shower-B.svg"
                                alt="Shower-B"
                              />
                              特殊沐浴設備
                            </p>
                          </li>
                          <li className="border border-dark rounded-pill me-3 mt-3 mt-md-0">
                            <p className="d-flex align-items-center py-1 px-2 ">
                              <img
                                className="me-1"
                                src="https://raw.githubusercontent.com/Jack-Xiao-2024/Project_D01/00a6b3aa21b3ca63af31bb2774763919bbd1b1bf/assets/images/Icon/IconBlack/Bus-B.svg"
                                alt="Bus-B"
                              />
                              門診接送
                            </p>
                          </li>
                          <li className="border border-dark rounded-pill me-3 mt-3 mt-md-0">
                            <p className="d-flex align-items-center py-1 px-2 ">
                              <img
                                className="me-1"
                                src="https://raw.githubusercontent.com/Jack-Xiao-2024/Project_D01/00a6b3aa21b3ca63af31bb2774763919bbd1b1bf/assets/images/Icon/IconBlack/Bandaid-B.svg"
                                alt="Bandaid-B"
                              />
                              大傷口照顧
                            </p>
                          </li>
                        </ul>
                        {/* 床位房型 */}
                        <div className="card-text d-flex justify-content-between align-items-end mb-2">
                          <div className="d-flex align-items-center">
                            <p className="fs-8 me-1">預定參訪時段：</p>
                            <div className="dropdown">
                              <button
                                className="btn btn-primary-40 dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton1"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                data-bs-display="static"
                              >
                                選擇參訪時段
                              </button>
                              <ul
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuButton1"
                              >
                                <li>
                                  <a className="dropdown-item" href="#">
                                    上午時段：10:00~12:00
                                  </a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">
                                    下午時段：14:00~16:00
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>

                          <div className="room-info text-end">
                            <p className="room-type fs-8">剩餘床位</p>
                            <p className="room-price fs-5">
                              <i className="bi bi-house-heart me-1"></i>
                              <span className="last-bed">8</span>個
                            </p>
                          </div>
                        </div>

                        {/* Button trigger modal */}
                        <div className="d-flex justify-content-end mb-10 mb-md-0">
                          <button
                            type="button"
                            className="btn btn-outline-secondary-40"
                            data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop"
                          >
                            <i className="bi bi-x-lg"></i>
                            <span className="fs-6">刪除</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* visit-card-3 */}
                <div
                  className="card overflow-hidden mb-11"
                  style={{ maxWidth: "1296px" }}
                >
                  <div className="row g-0">
                    <div className="col-lg-5">
                      <div className="checkbox-relative h-100">
                        <img
                          src="https://github.com/Jack-Xiao-2024/Project_D01/blob/main/assets/images/Building/B-07.png?raw=true"
                          className="img-fluid card-img rounded-0 h-100"
                          alt="building"
                        />
                        <div className="checkbox-mobile">
                          <input
                            className="form-check-input custom-checkbox checkbox-absolute"
                            type="checkbox"
                            id="checkboxNoLabel"
                            value=""
                            aria-label="勾選框"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-7">
                      <div className="card-body p-4">
                        {/* infor */}
                        <div className="infor mb-3">
                          <div className="checkbox d-flex justify-content-between mb-2">
                            <h5 className="card-title">康福護理苑</h5>
                            <div className="checkbox-desk">
                              <input
                                className="form-check-input custom-checkbox"
                                type="checkbox"
                                id="checkboxNoLabel"
                                value=""
                                aria-label="勾選框"
                              />
                            </div>
                          </div>
                          <div className="address d-flex">
                            <svg
                              width="16"
                              height="20"
                              viewBox="0 0 16 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1 7.92285C1 12.7747 5.24448 16.7869 7.12319 18.3252C7.39206 18.5454 7.52811 18.6568 7.72871 18.7132C7.88491 18.7572 8.1148 18.7572 8.271 18.7132C8.47197 18.6567 8.60707 18.5463 8.87695 18.3254C10.7557 16.7871 14.9999 12.7751 14.9999 7.9233C14.9999 6.08718 14.2625 4.32605 12.9497 3.02772C11.637 1.72939 9.8566 1 8.00008 1C6.14357 1 4.36301 1.7295 3.05025 3.02783C1.7375 4.32616 1 6.08674 1 7.92285Z"
                                fill="#EA8C55"
                              />
                              <path
                                d="M6 7C6 8.10457 6.89543 9 8 9C9.10457 9 10 8.10457 10 7C10 5.89543 9.10457 5 8 5C6.89543 5 6 5.89543 6 7Z"
                                fill="#EA8C55"
                              />
                              <path
                                d="M1 7.92285C1 12.7747 5.24448 16.7869 7.12319 18.3252C7.39206 18.5454 7.52811 18.6568 7.72871 18.7132C7.88491 18.7572 8.1148 18.7572 8.271 18.7132C8.47197 18.6567 8.60707 18.5463 8.87695 18.3254C10.7557 16.7871 14.9999 12.7751 14.9999 7.9233C14.9999 6.08718 14.2625 4.32605 12.9497 3.02772C11.637 1.72939 9.8566 1 8.00008 1C6.14357 1 4.36301 1.7295 3.05025 3.02783C1.7375 4.32616 1 6.08674 1 7.92285Z"
                                stroke="black"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M6 7C6 8.10457 6.89543 9 8 9C9.10457 9 10 8.10457 10 7C10 5.89543 9.10457 5 8 5C6.89543 5 6 5.89543 6 7Z"
                                stroke="black"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <p className="fs-7 ps-1 mb-5">台北市中正區中正路</p>
                          </div>
                        </div>
                        {/* information */}
                        <ul className="d-flex ps-0 mb-4 flex-wrap align-items-center">
                          <li className="border border-dark rounded-pill me-3">
                            <p className="d-flex align-items-center py-1 px-2">
                              <img
                                className="me-1"
                                src="https://raw.githubusercontent.com/Jack-Xiao-2024/Project_D01/00a6b3aa21b3ca63af31bb2774763919bbd1b1bf/assets/images/Icon/IconBlack/Doctor-B.svg"
                                alt="Doctor-B"
                              />
                              機構內門診
                            </p>
                          </li>
                          <li className="border border-dark rounded-pill me-3 mt-md-0">
                            <p className="d-flex align-items-center py-1 px-2 ">
                              <img
                                className="me-1"
                                src="https://raw.githubusercontent.com/Jack-Xiao-2024/Project_D01/00a6b3aa21b3ca63af31bb2774763919bbd1b1bf/assets/images/Icon/IconBlack/Shower-B.svg"
                                alt="Shower-B"
                              />
                              特殊沐浴設備
                            </p>
                          </li>
                          <li className="border border-dark rounded-pill me-3 mt-3 mt-md-0">
                            <p className="d-flex align-items-center py-1 px-2 ">
                              <img
                                className="me-1"
                                src="https://raw.githubusercontent.com/Jack-Xiao-2024/Project_D01/00a6b3aa21b3ca63af31bb2774763919bbd1b1bf/assets/images/Icon/IconBlack/Bus-B.svg"
                                alt="Bus-B"
                              />
                              門診接送
                            </p>
                          </li>
                          <li className="border border-dark rounded-pill me-3 mt-3 mt-md-0">
                            <p className="d-flex align-items-center py-1 px-2 ">
                              <img
                                className="me-1"
                                src="https://raw.githubusercontent.com/Jack-Xiao-2024/Project_D01/00a6b3aa21b3ca63af31bb2774763919bbd1b1bf/assets/images/Icon/IconBlack/Bandaid-B.svg"
                                alt="Bandaid-B"
                              />
                              大傷口照顧
                            </p>
                          </li>
                        </ul>
                        {/* 床位房型 */}
                        <div className="card-text d-flex justify-content-between align-items-end mb-2">
                          <div className="d-flex align-items-center">
                            <p className="fs-8 me-1">預定參訪時段：</p>
                            <div className="dropdown">
                              <button
                                className="btn btn-primary-40 dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton1"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                data-bs-display="static"
                              >
                                選擇參訪時段
                              </button>
                              <ul
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuButton1"
                              >
                                <li>
                                  <a className="dropdown-item" href="#">
                                    上午時段：10:00~12:00
                                  </a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">
                                    下午時段：14:00~16:00
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>

                          <div className="room-info text-end">
                            <p className="room-type fs-8">剩餘床位</p>
                            <p className="room-price fs-5">
                              <i className="bi bi-house-heart me-1"></i>
                              <span className="last-bed">3</span>個
                            </p>
                          </div>
                        </div>

                        {/* Button trigger modal */}
                        <div className="d-flex justify-content-end mb-10 mb-md-0">
                          <button
                            type="button"
                            className="btn btn-outline-secondary-40"
                            data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop"
                          >
                            <i className="bi bi-x-lg"></i>
                            <span className="fs-6">刪除</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* visit-card-4 */}
                <div
                  className="card overflow-hidden mb-11"
                  style={{ maxWidth: "1296px" }}
                >
                  <div className="row g-0">
                    <div className="col-lg-5">
                      <div className="checkbox-relative h-100">
                        <img
                          src="https://github.com/Jack-Xiao-2024/Project_D01/blob/main/assets/images/Building/B-01.png?raw=true"
                          className="img-fluid card-img rounded-0 h-100"
                          alt="building"
                        />
                        <div className="checkbox-mobile">
                          <input
                            className="form-check-input custom-checkbox checkbox-absolute"
                            type="checkbox"
                            id="checkboxNoLabel"
                            value=""
                            aria-label="勾選框"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-7">
                      <div className="card-body p-4">
                        {/* infor */}
                        <div className="infor mb-3">
                          <div className="checkbox d-flex justify-content-between mb-2">
                            <h5 className="card-title">樂康頤和園</h5>
                            <div className="checkbox-desk">
                              <input
                                className="form-check-input custom-checkbox"
                                type="checkbox"
                                id="checkboxNoLabel"
                                value=""
                                aria-label="勾選框"
                              />
                            </div>
                          </div>
                          <div className="address d-flex">
                            <svg
                              width="16"
                              height="20"
                              viewBox="0 0 16 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1 7.92285C1 12.7747 5.24448 16.7869 7.12319 18.3252C7.39206 18.5454 7.52811 18.6568 7.72871 18.7132C7.88491 18.7572 8.1148 18.7572 8.271 18.7132C8.47197 18.6567 8.60707 18.5463 8.87695 18.3254C10.7557 16.7871 14.9999 12.7751 14.9999 7.9233C14.9999 6.08718 14.2625 4.32605 12.9497 3.02772C11.637 1.72939 9.8566 1 8.00008 1C6.14357 1 4.36301 1.7295 3.05025 3.02783C1.7375 4.32616 1 6.08674 1 7.92285Z"
                                fill="#EA8C55"
                              />
                              <path
                                d="M6 7C6 8.10457 6.89543 9 8 9C9.10457 9 10 8.10457 10 7C10 5.89543 9.10457 5 8 5C6.89543 5 6 5.89543 6 7Z"
                                fill="#EA8C55"
                              />
                              <path
                                d="M1 7.92285C1 12.7747 5.24448 16.7869 7.12319 18.3252C7.39206 18.5454 7.52811 18.6568 7.72871 18.7132C7.88491 18.7572 8.1148 18.7572 8.271 18.7132C8.47197 18.6567 8.60707 18.5463 8.87695 18.3254C10.7557 16.7871 14.9999 12.7751 14.9999 7.9233C14.9999 6.08718 14.2625 4.32605 12.9497 3.02772C11.637 1.72939 9.8566 1 8.00008 1C6.14357 1 4.36301 1.7295 3.05025 3.02783C1.7375 4.32616 1 6.08674 1 7.92285Z"
                                stroke="black"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M6 7C6 8.10457 6.89543 9 8 9C9.10457 9 10 8.10457 10 7C10 5.89543 9.10457 5 8 5C6.89543 5 6 5.89543 6 7Z"
                                stroke="black"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <p className="fs-7 ps-1 mb-5">台北市萬華區中華路</p>
                          </div>
                        </div>
                        {/* information */}
                        <ul className="d-flex ps-0 mb-4 flex-wrap align-items-center">
                          <li className="border border-dark rounded-pill me-3">
                            <p className="d-flex align-items-center py-1 px-2">
                              <img
                                className="me-1"
                                src="https://raw.githubusercontent.com/Jack-Xiao-2024/Project_D01/00a6b3aa21b3ca63af31bb2774763919bbd1b1bf/assets/images/Icon/IconBlack/Doctor-B.svg"
                                alt="Doctor-B"
                              />
                              機構內門診
                            </p>
                          </li>
                          <li className="border border-dark rounded-pill me-3 mt-md-0">
                            <p className="d-flex align-items-center py-1 px-2 ">
                              <img
                                className="me-1"
                                src="https://raw.githubusercontent.com/Jack-Xiao-2024/Project_D01/00a6b3aa21b3ca63af31bb2774763919bbd1b1bf/assets/images/Icon/IconBlack/Shower-B.svg"
                                alt="Shower-B"
                              />
                              特殊沐浴設備
                            </p>
                          </li>
                          <li className="border border-dark rounded-pill me-3 mt-3 mt-md-0">
                            <p className="d-flex align-items-center py-1 px-2 ">
                              <img
                                className="me-1"
                                src="https://raw.githubusercontent.com/Jack-Xiao-2024/Project_D01/00a6b3aa21b3ca63af31bb2774763919bbd1b1bf/assets/images/Icon/IconBlack/Bus-B.svg"
                                alt="Bus-B"
                              />
                              門診接送
                            </p>
                          </li>
                          <li className="border border-dark rounded-pill me-3 mt-3 mt-md-0">
                            <p className="d-flex align-items-center py-1 px-2 ">
                              <img
                                className="me-1"
                                src="https://raw.githubusercontent.com/Jack-Xiao-2024/Project_D01/00a6b3aa21b3ca63af31bb2774763919bbd1b1bf/assets/images/Icon/IconBlack/Bandaid-B.svg"
                                alt="Bandaid-B"
                              />
                              大傷口照顧
                            </p>
                          </li>
                        </ul>
                        {/* 床位房型 */}
                        <div className="card-text d-flex justify-content-between align-items-end mb-2">
                          <div className="d-flex align-items-center">
                            <p className="fs-8 me-1">預定參訪時段：</p>
                            <div className="dropdown">
                              <button
                                className="btn btn-primary-40 dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton1"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                data-bs-display="static"
                              >
                                選擇參訪時段
                              </button>
                              <ul
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuButton1"
                              >
                                <li>
                                  <a className="dropdown-item" href="#">
                                    上午時段：10:00~12:00
                                  </a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">
                                    下午時段：14:00~16:00
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>

                          <div className="room-info text-end">
                            <p className="room-type fs-8">剩餘床位</p>
                            <p className="room-price fs-5">
                              <i className="bi bi-house-heart me-1"></i>
                              <span className="last-bed">3</span>個
                            </p>
                          </div>
                        </div>

                        {/* Button trigger modal */}
                        <div className="d-flex justify-content-end mb-10 mb-md-0">
                          <button
                            type="button"
                            className="btn btn-outline-secondary-40"
                            data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop"
                          >
                            <i className="bi bi-x-lg"></i>
                            <span className="fs-6">刪除</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* 頁籤尾頁 */}
                <div className="tab-footer d-flex justify-content-center justify-content-md-end mt-3">
                  <div className="flex-column">
                    <button
                      type="button"
                      className="btn next-btn next-btn-size fs-5 btn-primary-40"
                      onClick={() => {}}
                    >
                      下一步
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
