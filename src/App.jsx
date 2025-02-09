import { useEffect, useState } from "react";
// import "./App.css";
import axios from "axios";
import { Navigation, FreeMode, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "./assets/scss/pages/_intro.scss";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function App() {
  const [products, setProducts] = useState({
    id: null,
    name: "",
    cardImg: "",
    images: [],
    city: "",
    region: "",
    address: "",
    like: 0,
    comments: 0,
    services: [],
    description: "",
    age: "",
    caringItem: [],
    medicalService: [],
    allowance: [],
    roomCards: [],
  });

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const res = await axios.get(`${BASE_URL}products`);
      console.log(res.data[0]);
      setProducts(res.data[0]);
    } catch (error) {
      alert("取得產品資料失敗");
    }
  };

  useEffect(() => {
    console.log(products);
  }, [products]);

  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <main>
        {/* header */}

        <div className="container pt-lg-14 pb-lg-14 pb-11 pt-0">
          <div className="d-flex column-gap-2">
            <Swiper
              style={{
                "--swiper-navigation-color": "#fff",
                "--swiper-pagination-color": "#fff",
              }}
              spaceBetween={10}
              navigation={true}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper2"
              loop={true}
            >
              {products?.images?.map((image,index) => {
                return (
                  <SwiperSlide key={index}>
                    <img
                      className="object-fit-cover"
                      style={{ height: "535px" }}
                      src={image}
                      alt="機構圖片"
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>

            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={8}
              loop={true}
              slidesPerView={4}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper"
              direction="vertical"
              style={{ height: "535px" }}
            >
              {products?.thumbs?.map((thumb,index) => {
                return (
                  <SwiperSlide key={index}>
                    <img src={thumb} alt="機構圖片" className="h-100"/>
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
                    {products.comments}個評論
                    <img
                      id="intro-like-icon"
                      src="https://github.com/Jack-Xiao-2024/Project_D01/blob/dev/assets/images/Interact%20Icon/Like-01.png?raw=true"
                      alt="praise"
                      className="align-bottom"
                      style={{ cursor: "pointer" }}
                    />
                    <span id="intro-like">{products.like}</span>
                  </div>
                </div>
                <h3 className="mb-2"></h3>
                <div className="d-flex mb-5 gap-1">
                  <i
                    className="bi bi-geo-alt-fill"
                    style={{ color: "#ea8c55" }}
                  ></i>
                  <div className="fs-7">{products.address}</div>
                </div>
                <div className="fs-7 mb-5">{products.description}</div>
                <div className="d-flex gap-2 flex-wrap mb-7">
                  {products.services.map((service) => {
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
              <div className="d-flex align-items-end col-lg-4 col-12 mb-7">
                <a
                  href="#"
                  className="btn btn-primary-40 py-4 w-100 mx-2 mx-lg-0 intro-btn"
                >
                  預約參訪
                </a>
                <a
                  href="#"
                  className="btn btn-primary-40 py-4 w-100 mx-2 mx-lg-0 intro-btn"
                >
                  預約參訪
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- service --> */}
        <div className="bg-primary-10">
          <div className="container pt-lg-14 pb-lg-11 pt-12 pb-12">
            <h4 className="mb-2">服務內容</h4>
            <div className="fs-7 mb-7 text-secondary-90">
              ＊入住者年齡限制：{products.age}歲
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
                      {products?.caringItem?.map((item, index) => {
                        if (products?.caringItem?.length - 1 !== index) {
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
                      {products?.medicalService?.map((item, index) => {
                        if (products?.medicalService?.length - 1 !== index) {
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
                      {products?.allowance?.map((item, index) => {
                        if (products?.allowance?.length - 1 !== index) {
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
        </div>

        {/* <!-- 房型費用 start--> */}
        <div className="container pt-lg-14 pb-lg-11 pt-12 pb-12">
          <h4 className="mb-1">房型費用</h4>
          <div className="fs-8 text-secondary-90 mb-7">
            ＊房型費用不含保證金、耗材及其他相關費用。價格以服務契約為準。
          </div>
          <div className="row row-cols-lg-3 row-cols-1 gx-lg-11 gx-7">
            {products.roomCards.map((room) => {
              return (
                <div className="col" key={room.id}>
                  <div className="card overflow-hidden intro-rounded">
                    <img
                      src={room.imgUrl}
                      className="card-img-top object-fit-cover"
                      alt="room"
                    />
                    <div className="card-body py-4 px-7">
                      <h5 className="text-center">{room.roomType}</h5>
                      <h6 className="d-flex align-items-center gap-1 justify-content-center">
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
                </div>
              );
            })}
          </div>
        </div>

        {/* 機構評價 */}
        <div className="bg-primary-80">
          <div className="container pt-lg-14 pb-lg-11 pt-12 pb-12">
            <h4 className="mb-9 text-primary-10">機構評價</h4>
            <div className="row g-7">
              <div className="col-md-4 col-12">
                <div className="gap-7 d-flex flex-column justify-content-between h-100 rounded-top-4 rounded-bottom-start-2 rounded-bottom-end-4 border border-dark bg-white pt-7 pb-8 px-7">
                  <h6>
                    參訪樂康頤和園後，我感受到這裡如家的溫暖，設施無障礙且現代化
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
                  <h6>我參觀了樂康頤和園，發現這裡的護理服務非常周到。</h6>
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
        </div>
        <div className="bg-primary-10">
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
        </div>
      </main>
    </>
  );
}

export default App;
