import { useEffect, useState } from "react";
import { Link } from "react-router";
import axios from "axios";
import BannerNoSearch from "../components/BannerNoSearch";
import { useNavigate } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function Cart() {
  const [cartsData, setCartsData] = useState([]);

  //請求購物車資料
  useEffect(() => {
    try {
      (async () => {
        const { data } = await axios.get(`${BASE_URL}/carts?_expand=product`);
        setCartsData(data);
        console.log(data);
      })();
    } catch (error) {
      console.log(error);
    }
  }, []);

  //一次只選取一張卡片
  const [selectId, setSelectId] = useState(null);

  //存放產品資訊到localStorage
  const handleCheckboxChange = (id) => {
    setSelectId(selectId === id ? null : id);
    localStorage.setItem("selectProductId", id); //存入localStorage
  };

  //點擊下一步跳轉到ProductPage

  const navigate = useNavigate();
  const goToProductPage = () => {
    if (!selectId) {
      alert("請選擇一間機構！");
      return;
    }
    navigate(`/product/${selectId}`); //將選中的ID帶入網址
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
                  {/* 全選按鈕 */}
                  <div className="d-flex justify-content-end">
                    <button type="button" className="btn btn-outline-secondary-40 all-font">
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
                                    src={`src/assets/images/Icon/IconBlack/${service.name}.svg`}
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
                          {/* Button trigger modal */}
                          <div className="d-flex justify-content-end">
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
                ))}
                {/* 頁籤尾頁 */}
                <div className="tab-footer d-flex justify-content-center justify-content-md-end mt-3">
                  <div className="flex-column">
                    <p className="text-end">
                      總金額：<span className="fs-5">10,000</span>元
                    </p>
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
                  {/* 全選按鈕 */}
                  <div className="d-flex justify-content-end">
                    <button type="button" className="btn btn-outline-secondary-40 all-font">
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
