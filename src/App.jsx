import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function App() {
  const [count, setCount] = useState(0);
  const [products, setProducts] = useState([]);
  //畫面渲染完取得產品
  useEffect(() => {
    getProducts();
  });
  //取得產品
  const getProducts = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/products`);
      setProducts(res.data);
    } catch (error) {
      alert("取得產品失敗");
    }
  };

  return (
    <>
      <div className="main">
        {/* banner部分 */}
        <section className="index-banner">
          <div className="card border-0 rounded-0">
            <div
              className="banner-image d-md-inline-block d-none "
              style={{
                backgroundImage: `url("/src/assets/images/Cover-lg.png")`,
                height: "624px",
              }}
            ></div>
            <div
              className="banner-image d-md-none d-inline-block"
              style={{
                backgroundImage: `url("/src/assets/images/Cover-sm.png")`,
                height: "644px",
              }}
            ></div>
            <div className="container-lg container-fluid card-img-overlay py-10">
              <h1 className="banner-title pb-9 px-lg-0 px-md-2 px-0">
                長照不煩惱，
                <br />
                好厝邊陪你找
              </h1>
              <p className="banner-subtitle fs-lg-4 fs-md-6 fs-8 px-lg-0 px-md-2 px-0">
                找機構跟訂飯店<span className="d-xl-inline d-none">，</span>
                <br class="d-xl-none d-block" />
                一樣簡單！
              </p>
            </div>
          </div>
        </section>

        {/* 電腦版搜尋框  */}

        <div className="container search-bar">
          <form className="search">
            <div className="row align-items-center">
              <div className="col px-0">
                <select
                  className="form-select p-6 rounded-1 rounded-1 fs-6"
                  aria-label="Default select example"
                >
                  <option selected>機構類型</option>
                  <option value="1">長期照顧中心</option>
                  <option value="2">護理之家</option>
                  <option value="3">安養中心</option>
                  <option value="3">日間照顧中心</option>
                </select>
              </div>
              <div className="col px-0">
                <select
                  className="form-select p-6 rounded-1 fs-6"
                  aria-label="Default select example"
                >
                  <option selected>縣市</option>
                  <option value="1">台北市</option>
                  <option value="2">新北市</option>
                </select>
              </div>
              <div className="col px-0">
                <select
                  className="form-select p-6 rounded-1 fs-6"
                  aria-label="Default select example"
                >
                  <option selected>地區</option>
                  <option value="1">中正區</option>
                  <option value="2">大同區</option>
                </select>
              </div>
              <div className="col px-0">
                <select
                  className="form-select p-6 rounded-1 fs-6"
                  aria-label="Default select example"
                >
                  <option selected>照護需求</option>
                  <option value="1">鼻胃管</option>
                  <option value="2">氣切管</option>
                  <option value="3">導尿管</option>
                </select>
              </div>
              <div className="col px-0">
                <select
                  className="form-select p-6 rounded-1 fs-6"
                  aria-label="Default select example"
                >
                  <option selected>醫療需求</option>
                  <option value="1">復健</option>
                  <option value="2">洗腎</option>
                  <option value="3">腫瘤</option>
                </select>
              </div>
              <div className="col px-0">
                <button
                  type="submit"
                  className=" search-btn btn btn-primary-40 p-5 rounded-1 fs-5"
                  style={{ width: "231px" }}
                >
                  <img
                    src="https://raw.githubusercontent.com/Jack-Xiao-2024/Project_D01/399576c7c8ec60e611e2d35218b94d8f6a92a78b/assets/images/Icon/IconBlack/Search-B.svg"
                    alt="search"
                  />
                  搜尋合適機構
                </button>
              </div>
            </div>
          </form>
        </div>

        {/*手機版搜尋框*/}

        <div className="container">
          <div className="d-flex justify-content-center">
            <form className="search phone-search-bar">
              <div className="row">
                <div className="col-12 px-0">
                  <select
                    className="form-select p-6 fs-6 rounded-1"
                    aria-label="Default select example"
                  >
                    <option selected>機構類型</option>
                    <option value="1">長期照顧中心</option>
                    <option value="2">護理之家</option>
                    <option value="3">安養中心</option>
                    <option value="3">日間照顧中心</option>
                  </select>
                </div>
                <div className="col-12 px-0">
                  <div className="container">
                    <div className="row">
                      <div className="col-6 p-0">
                        <select
                          className="form-select p-6 fs-6 rounded-1"
                          aria-label="Default select example"
                        >
                          <option selected>縣市</option>
                          <option value="1">台北市</option>
                          <option value="2">新北市</option>
                        </select>
                      </div>
                      <div className="col-6 p-0">
                        <select
                          className="form-select p-6 fs-6 rounded-1"
                          aria-label="Default select example"
                        >
                          <option selected>地區</option>
                          <option value="1">中正區</option>
                          <option value="2">大同區</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 px-0">
                  <select
                    className="form-select p-6 fs-6 rounded-1"
                    aria-label="Default select example"
                  >
                    <option selected>照護需求</option>
                    <option value="1">鼻胃管</option>
                    <option value="2">氣切管</option>
                    <option value="3">導尿管</option>
                  </select>
                </div>
                <div className="col-12 px-0">
                  <select
                    className="form-select p-6 fs-6 rounded-1"
                    aria-label="Default select example"
                  >
                    <option selected>醫療需求</option>
                    <option value="1">復健</option>
                    <option value="2">洗腎</option>
                    <option value="3">腫瘤</option>
                  </select>
                </div>
                <div className="col-12 px-0">
                  <a className="d-block" href="#">
                    <button
                      type="submit"
                      className=" search-btn btn btn-primary-40 fs-6 p-6 rounded-1"
                    >
                      <img
                        src="https://raw.githubusercontent.com/Jack-Xiao-2024/Project_D01/399576c7c8ec60e611e2d35218b94d8f6a92a78b/assets/images/Icon/IconBlack/Search-B.svg"
                        alt="search"
                      />
                      搜尋合適機構
                    </button>
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* 搜尋結果卡片 */}
        <div className="content pt-12 mt-md-14 result-content">
          <div className="container">
            <div className="row d-flex flex-column gy-7 gy-lg-9">
              {products.map((product) => (
                <div className="col">
                  <div className="cards shadow rounded">
                    <div className="card mb-3">
                      <div className="row g-0">
                        <div className="col-md-5 ">
                          <a className="card-img-box" href="intro.html">
                            <img
                              className="card-img img-fluid result-card"
                              src={product?.thumbs?.[0]}
                              alt="building"
                            />
                            <a className="heart" href="#">
                              <img
                                src="https://raw.githubusercontent.com/Jack-Xiao-2024/Project_D01/ed880d3f2bbe0799b124b8c29fb04e530924454e/assets/images/Interact%20Icon/Heard-01.svg"
                                alt="heart"
                              />
                            </a>
                          </a>
                        </div>
                        <div className="col-md-7">
                          <div className="card-body">
                            <a href="intro.html">
                              <h5 className="card-title mt-7">
                                {product.name}
                              </h5>
                            </a>
                            <div className="address d-flex align-items-center mb-4">
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
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M6 7C6 8.10457 6.89543 9 8 9C9.10457 9 10 8.10457 10 7C10 5.89543 9.10457 5 8 5C6.89543 5 6 5.89543 6 7Z"
                                  stroke="black"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                              <p className="ms-1">{product.address}</p>
                            </div>
                            <ul className="d-flex ps-0 mb-4 flex-wrap align-items-center">
                              <li className="border border-dark rounded-pill me-3">
                                <p className="d-flex align-items-center py-1 px-2">
                                  <img
                                    className="me-1"
                                    src={product.services?.[0]?.icon}
                                  />
                                  {product.services?.[0]?.name || "載入中..."}
                                </p>
                              </li>

                              <li className="border border-dark rounded-pill me-3 mt-md-0">
                                <p className="d-flex align-items-center py-1 px-2 ">
                                  <img
                                    className="me-1"
                                    src={product.services?.[1]?.icon}
                                    alt="Shower-B"
                                  />
                                  {product.services?.[1]?.name || "載入中..."}
                                </p>
                              </li>

                              <li className="border border-dark rounded-pill me-3 mt-md-0">
                                <p className="d-flex align-items-center py-1 px-2 ">
                                  <img
                                    className="me-1"
                                    src={product.services?.[2]?.icon}
                                    alt="Bus-B"
                                  />
                                  {product.services?.[2]?.name || "載入中..."}
                                </p>
                              </li>

                              <li className="border border-dark rounded-pill me-3 mt-3 mt-md-0">
                                <p className="d-flex align-items-center py-1 px-2 ">
                                  <img
                                    className="me-1"
                                    src={product.services?.[3]?.icon}
                                    alt="Bandaid-B"
                                  />
                                  {product.services?.[3]?.name || "載入中..."}
                                </p>
                              </li>
                            </ul>
                            <div className="card_comment d-flex justify-content-between mb-1">
                              <div className="comment_left d-flex align-items-center">
                                <p className="me-2">{product.comments}個評論</p>
                                <p className="d-flex align-items-center">
                                  <img
                                    src="https://github.com/Jack-Xiao-2024/Project_D01/blob/dev/assets/images/Interact%20Icon/Like-01.png?raw=true"
                                    alt="Like-01"
                                  />
                                  {product.like}
                                </p>
                              </div>
                              <div className="comment_right d-flex align-items-center">
                                <h6>
                                  {product.roomCards?.[0]?.roomType ||
                                    "載入中..."}
                                  剩餘床位：
                                </h6>{" "}
                                <h5>
                                  {product.roomCards?.[0]?.availableBeds ||
                                    "載入中..."}
                                </h5>
                              </div>
                            </div>
                            <div className="buttons d-flex justify-content-between mt-2">
                              <button
                                type="button"
                                className="btn book-btn fs-6 py-4 btn-outline-primary-40  me-3"
                              >
                                預約參訪
                              </button>
                              <button
                                type="button"
                                className="btn book-btn fs-6  py-4 btn-primary-40 "
                              >
                                預定留床
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pagnation d-lg-flex py-8 justify-content-center d-none">
              <div className="left d-flex align-items-center">
                <a className="d-flex align-items-center" href="#">
                  <span className="material-symbols-outlined text-secondary-80 ">
                    chevron_left
                  </span>
                </a>
              </div>

              <div className="pagnation-num px-6">
                <p className="text-secondary-50">1/20</p>
              </div>

              <div className="right d-flex align-items-center">
                <a className="d-flex align-items-center" href="#">
                  <span className="material-symbols-outlined text-secondary-80">
                    chevron_right
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
