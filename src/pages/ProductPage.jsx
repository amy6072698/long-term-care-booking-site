import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Navigation, FreeMode, Thumbs, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ReactLoading from "react-loading";
import { ToastContainer, toast, Zoom } from "react-toastify";
import { useParams } from "react-router";
import { UserContext } from "./FrontLayout";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/pagination";
import "swiper/css";

const BASE_URL = import.meta.env.VITE_BASE_URL;

let token;
let myUserId;

export default function ProductPage() {
  const { isLogin } = useContext(UserContext); // 用來判斷是否登入
  const { id: productId } = useParams();
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [bannerIsLoading, setBannerIsLoading] = useState(true);
  const [thumbsIsLoading, setThumbsIsLoading] = useState(true);
  const bannerRefNum = useRef(0);
  const thumbsRefNum = useRef(0);
  const { setIsLoginModalOpen } = useContext(UserContext);
  const { setLoginModalMode } = useContext(UserContext);

  //取得token和登入id
  const getToken = () => {
    //取得cookie中的token和useId
    document.cookie = "myToken";
    token = document.cookie.replace(
      /(?:(?:^|.*;\s*)myToken\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    myUserId = document.cookie.replace(
      /(?:(?:^|.*;\s*)myUserId\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
  };

  //登入狀態變動時觸發取得token
  useEffect(() => {
    if (isLogin) {
      getToken();
    }
  }, [isLogin]);

  //畫面渲染完成觸發取得產品
  useEffect(() => {
    getProducts();
  }, []);

  //取得產品資料
  const getProducts = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/products`);
      const productIndex = res.data.findIndex((item) => {
        return item.id === Number(productId);
      });

      setProduct(res.data[productIndex]);
    } catch (error) {
      alert("取得產品資料失敗");
    }
  };

  //加入預約留床
  const addCartItem = async (e, id) => {
    e.preventDefault();
    if (!isLogin) {
      setLoginModalMode("login");
      setIsLoginModalOpen(true);
      return;
    }
    try {

      // const res = await axios.get(`${BASE_URL}/600/carts`, {
      //   headers: {
      //     authorization: `Bearer ${token}`,
      //   },
      // });
      // const duplicates = res.data.find((item) => {
      //   return item.productId === Number(id);
      // });
      // console.log(duplicates);
      // // //如果有重複選取則跳出
      // if (duplicates) {
      //   console.log(duplicates)
      //   return;
      // }
      
      //如果沒跳出就新增
      await axios.post(
        `${BASE_URL}/600/carts`,
        {
          productId: id,
          userId: myUserId,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      setIsLoading(true);
      showSuccessMessage();
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    } catch (error) {
      console.log(error);
      showErrorMessage();
    }
  };

  //加入預約成功觸發彈跳視窗
  const showSuccessMessage = () => {
    toast.success(`加入預約成功👋\n請去立即預訂查看`, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Zoom,
      style: { whiteSpace: "pre-line" },
    });
  };

  //加入預約成功觸發彈跳視窗
  const showErrorMessage = () => {
    toast.error("預訂失敗", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Zoom,
    });
  };

  return (
    <main>
      {/* 彈跳視窗 */}
      <div>
        <ToastContainer />
      </div>

      {/* mobile */}
      <section className="d-lg-none mb-7">
        <Swiper
          style={{
            "--swiper-navigation-color": "var(--swiper-primary)",
            "--swiper-pagination-color": "var(--swiper-primary)",
            "--swiper-pagination-bullet-size": "15px",
          }}
          loop={true}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination, Navigation]}
          navigation={true}
          className=" d-lg-none swiper-mobile-banner"
        >
          {product?.images?.map((thumb, index) => {
            return (
              <SwiperSlide key={index}>
                <img
                  src={thumb}
                  alt="機構圖片"
                  className=" w-100 h-100 object-fit-cover"
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </section>

      {/* header */}

      <section className="container pt-lg-14 pb-lg-14 pb-11 pt-0">
        <div className="d-lg-flex column-gap-2  d-none swiper-banner justify-content-center">
          {bannerIsLoading && thumbsIsLoading && (
            <>
              <div
                className="spinner-grow text-warning"
                style={{ width: "3rem", height: "3rem" }}
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            </>
          )}
          <Swiper
            style={{
              display: !bannerIsLoading ? "block" : "none",
              "--swiper-navigation-color": "var(--swiper-primary)",
            }}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper2 h-100"
            loop={true}
          >
            {product?.images?.map((imageUrl, index) => {
              return (
                <SwiperSlide key={index}>
                  <img
                    className="object-fit-cover"
                    style={{ height: "535px" }}
                    src={imageUrl}
                    alt="機構圖片"
                    onLoad={() => {
                      bannerRefNum.current++;
                      bannerRefNum.current === product.images.length
                        ? setBannerIsLoading(false)
                        : null;
                    }}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>

          <Swiper
            style={{
              display: !thumbsIsLoading ? "block" : "none",
              "--swiper-navigation-color": "var(--swiper-primary)",
              height: "535px",
            }}
            init={false}
            onSwiper={setThumbsSwiper}
            spaceBetween={8}
            loop={true}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper"
            direction="vertical"
          >
            {product?.thumbs?.map((thumb, index) => {
              return (
                <SwiperSlide key={index}>
                  <img
                    src={thumb}
                    alt="機構圖片"
                    className="h-100"
                    onLoad={() => {
                      thumbsRefNum.current++;
                      thumbsRefNum.current === product.thumbs.length
                        ? setThumbsIsLoading(false)
                        : null;
                    }}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        {/* <!--description --> */}
        <div className="container">
          <div className="row mt-lg-11">
            <div className="col-lg-8 col-12">
              <div className="d-flex mb-2">
                <div className="fs-7">
                  {product.comments}個評論
                  <img
                    id="intro-like-icon"
                    src="https://github.com/Jack-Xiao-2024/Project_D01/blob/dev/assets/images/Interact%20Icon/Like-01.png?raw=true"
                    alt="praise"
                    className="align-bottom"
                    style={{ cursor: "pointer" }}
                  />
                  <span id="intro-like">{product.like}</span>
                </div>
              </div>
              <h3 className="mb-2">{product.name}</h3>
              <div className="d-flex mb-5 gap-1">
                <i
                  className="bi bi-geo-alt-fill"
                  style={{ color: "#ea8c55" }}
                ></i>
                <div className="fs-7">{product.address}</div>
              </div>
              <div className="fs-7 mb-5">{product.description}</div>
              <div className="d-flex gap-2 flex-wrap mb-7">
                {product?.services?.map((service) => {
                  return (
                    <div
                      key={service.name}
                      className="border border-dark rounded-2 py-1 px-2"
                    >
                      <img
                        src={`./src/assets/images/Icon/tag/${service.name}.svg`}
                        alt={service.name}
                      />
                      {service.name}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="d-flex align-items-end col-lg-4 col-12 mb-7 gap-3">
              <button
                disabled={isLoading}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                }}
                className="btn btn-outline-primary-40  py-4 w-100  intro-btn d-flex justify-content-center align-items-center gap-2"
              >
                預約參訪
                {isLoading && (
                  <ReactLoading
                    type={"spin"}
                    color={"#000"}
                    height={"1.5rem"}
                    width={"1.5rem"}
                  />
                )}
              </button>
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
            </div>
          </div>
        </div>
      </section>

      {/* <!-- service --> */}
      <section className="bg-primary-10">
        <div className="container pt-lg-14 pb-lg-11 pt-12 pb-12">
          <h4 className="mb-2">服務內容</h4>
          <div className="fs-7 mb-7 text-secondary-90">
            ＊入住者年齡限制：{product.age}歲
          </div>
          <div className="row g-7">
            <div
              className="col-lg-4"
              data-aos="flip-left"
              data-aos-duration="1000"
              data-aos-offset="300"
            >
              <div className="card w-100 pt-9 pb-10 px-7 rounded-2 border-0 h-100">
                <img
                  className="mx-auto intro-service"
                  src="https://raw.githubusercontent.com/Jack-Xiao-2024/Project_D01/399576c7c8ec60e611e2d35218b94d8f6a92a78b/assets/images/Vector%20Icon/VI-04.svg"
                  alt="card"
                />
                <div className="card-body">
                  <h5 className="card-title text-center text-secondary-60">
                    照護項目
                  </h5>
                  <p className="card-text">
                    {product?.caringItem?.map((item, index) => {
                      if (product?.caringItem?.length - 1 !== index) {
                        return `${item}、`;
                      } else {
                        return `${item}`;
                      }
                    })}
                  </p>
                </div>
              </div>
            </div>
            <div
              className="col-lg-4"
              data-aos="flip-left"
              data-aos-duration="1000"
              data-aos-offset="300"
            >
              <div className="card w-100 pt-9 pb-10 px-7 rounded-2 border-0 h-100">
                <img
                  className="mx-auto intro-service"
                  src="https://raw.githubusercontent.com/Jack-Xiao-2024/Project_D01/399576c7c8ec60e611e2d35218b94d8f6a92a78b/assets/images/Vector%20Icon/VI-06.svg.svg"
                  alt="card"
                />
                <div className="card-body">
                  <h5 className="card-title text-center text-secondary-60 overflow-hidden text-nowrap">
                    醫療服務＆專業照護
                  </h5>
                  <p className="card-text">
                    {product?.medicalService?.map((item, index) => {
                      if (product?.medicalService?.length - 1 !== index) {
                        return `${item}、`;
                      } else {
                        return `${item}`;
                      }
                    })}
                  </p>
                </div>
              </div>
            </div>
            <div
              className="col-lg-4"
              data-aos="flip-left"
              data-aos-duration="1000"
              data-aos-offset="300"
            >
              <div className="card w-100 pt-9 pb-10 px-7 rounded-2 border-0 h-100">
                <img
                  className="mx-auto intro-service"
                  src="https://raw.githubusercontent.com/Jack-Xiao-2024/Project_D01/399576c7c8ec60e611e2d35218b94d8f6a92a78b/assets/images/Vector%20Icon/VI-05.svg"
                  alt="card"
                />
                <div className="card-body">
                  <h5 className="card-title text-center text-secondary-60">
                    政府補助
                  </h5>
                  <p className="card-text text-center mb-auto">
                    {product?.allowance?.map((item, index) => {
                      if (product?.allowance?.length - 1 !== index) {
                        return `${item}、`;
                      } else {
                        return `${item}`;
                      }
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- 房型費用 start--> */}
      <section className="container pt-lg-14 pb-lg-11 pt-12 pb-12">
        <h4 className="mb-1">房型費用</h4>
        <div className="fs-8 text-secondary-90 mb-7">
          ＊房型費用不含保證金、耗材及其他相關費用。價格以服務契約為準。
        </div>
        <Swiper
          style={{
            "--swiper-navigation-color": "var(--swiper-primary)",
          }}
          modules={[Navigation]}
          spaceBetween={24}
          navigation={true}
          slidesPerView={1}
          breakpoints={{
            768: {
              slidesPerView: 3,
              hideOnClick: true,
            },
          }}
        >
          {product?.roomCards?.map((room) => {
            return (
              <SwiperSlide key={room.id}>
                <div className="card overflow-hidden intro-rounded">
                  <img
                    src={room.imgUrl}
                    className="card-img-top object-fit-cover"
                    alt="room"
                  />
                  <div className="card-body py-4 px-7">
                    <h5 className="text-center">{room.roomType}</h5>
                    <h6 className="d-flex align-items-center gap-1 justify-content-center fs-7 fs-lg-6">
                      每月
                      <span className="h5 align-self-center mb-0 text-secondary-40">
                        {room.price}
                      </span>
                      元起
                    </h6>
                    <div className="fs-7 text-end mb-1">
                      剩餘床位：{room.availableBeds}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </section>

      {/* 機構評價 */}
      <section className="bg-primary-80">
        <div className="container pt-lg-14 pb-lg-11 pt-12 pb-12">
          <h4 className="mb-9 text-primary-10">機構評價</h4>
          <div className="row g-7">
            <div className="col-md-4 col-12">
              <div className="gap-7 d-flex flex-column justify-content-between h-100 rounded-top-4 rounded-bottom-start-2 rounded-bottom-end-4 border border-dark bg-white pt-7 pb-8 px-7">
                <h6>
                  參訪{product.name}
                  後，我感受到這裡如家的溫暖，設施無障礙且現代化
                </h6>
                <div className="d-flex gap-1 align-items-center">
                  <img
                    src="https://github.com/Jack-Xiao-2024/Project_D01/blob/dev/assets/images/User/Ellipse-04.png?raw=true"
                    alt="user"
                    className="intro-user"
                  />
                  <div className="fs-7">郭先生</div>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-12">
              <div className="gap-7 d-flex flex-column justify-content-between h-100 rounded-top-4 rounded-bottom-start-2 rounded-bottom-end-4 border border-dark bg-white pt-7 pb-8 px-7">
                <h6>我參觀了{product.name}，發現這裡的護理服務非常周到。</h6>
                <div className="d-flex gap-1 align-items-center">
                  <img
                    src="https://github.com/Jack-Xiao-2024/Project_D01/blob/dev/assets/images/User/Ellipse-05.png?raw=true"
                    alt="user"
                    className="intro-user"
                  />
                  <div className="fs-7">李小姐</div>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-12">
              <div className="gap-7 d-flex flex-column justify-content-between h-100 rounded-top-4 rounded-bottom-start-2 rounded-bottom-end-4 border border-dark bg-white pt-7 pb-8 px-7">
                <h6>
                  這裡的環境不僅舒適，還有很多促進長者互動的公共區域和活動。
                </h6>
                <div className="d-flex gap-1 align-items-center">
                  <img
                    src="https://github.com/Jack-Xiao-2024/Project_D01/blob/dev/assets/images/User/Ellipse-03.png?raw=true"
                    alt="user"
                    className="intro-user"
                  />
                  <div className="fs-7">王先生</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* 貼心提醒 */}
      <section className="bg-primary-10">
        <div className="container pt-lg-14 pb-lg-11 text-primary-100 pt-12 pb-12">
          <h4 className="mb-9">貼心提醒！</h4>
          <ul
            className="d-flex list-group gap-1 flex-column gap-5 ps-6"
            style={{ listStyle: "disc" }}
          >
            <li className="fs-7 ">
              入住者須提供體檢報告，體檢項目請依各機構規定。體檢後約需七個工作天才能領取報告，敬請即早準備。
            </li>
            <li className="fs-7">
              參訪時，請攜帶病歷摘要或相關資料，讓機構可以評估參考。
            </li>
            <li className="fs-7">
              參訪後，需經由機構進行評估、確認可以收住後，才會安排後續入住事宜。
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
