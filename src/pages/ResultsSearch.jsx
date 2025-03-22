import { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import Booking from "../components/Booking";
//匯入使用者資料
import { UserContext }  from "../contexts/UserContext";
//帶入token
import getToken from "../assets/js/getTokenFromCookie";
import { ToastContainer } from "react-toastify";

// 引入 ResultsLayout 中的 SearchContext
import { SearchContext } from "../contexts/SearchContext";
import HeartCard from "../components/HeartCard";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function ResultsSearch() {
  // 用於取出網址搜尋參數
  const { searchParams } = useContext(SearchContext);

  // 搜尋結果
  const [resultsSearch, setResultsSearch] = useState([]);

  // 用來判斷是否登入
  const { isLogin } = useContext(UserContext);
  //取得登入token
  const { token, myUserId } = getToken();
  const [isLoading, setIsLoading] = useState(false);
  //登入狀態變動時觸發取得token
  useEffect(() => {
    if (isLogin) {
      getToken();
    }
  }, [isLogin]);

  // 分頁
  const itemsPerPage = 5; //每頁顯示5筆資料
  const [currentPage, setCurrentPage] = useState(1); //當前頁數
  const [totalPages, setTotalPages] = useState(1);

  // 取得符合搜尋參數的 products
  const getProductsSearch = useCallback(async (param) => {
    try {
      // 帶入搜尋參數到 API 網址取得相應資料
      const res = await axios.get(
        `${BASE_URL}/products?_page=${currentPage}&_limit=${itemsPerPage}&${param.toString()}`
      );

      // 將符合的 products 資料更新到 resultsSearch
      setResultsSearch(res.data);

      // 取得 json server 存在 headers 的資料總筆數
      const totalCount = res.headers["x-total-count"];

      // 處理總頁數，用總資料數除以每頁顯示幾筆再用 Math.ceil 處理無條件進位
      setTotalPages(Math.ceil(totalCount / itemsPerPage));
    } catch (error) {
      console.log(error);
      alert("取得產品搜尋失敗");
    }
  },[currentPage]);
  // 取得所有 products
  const getProducts = useCallback(async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/products?_page=${currentPage}&_limit=${itemsPerPage}`
      );
      setResultsSearch(res.data);
      // console.log(res.data);
    } catch (error) {
      console.log(error);
      alert("取得產品失敗");
    }
  },[currentPage]);

  // 從網址取得搜尋參數，並判斷處理各項目搜尋參數
  const handleSearchParams = useCallback(() => {
    const getParams = new URLSearchParams();

    // 取得各項的搜尋參數值，getAll 用於有多項參數時
    const categoryParam = searchParams.get("category_like");
    const cityParam = searchParams.get("city_like");
    const regionParam = searchParams.get("region_like");
    const caringItemParams = searchParams.getAll("caringItem_like");
    const servicesParams = searchParams.getAll("services.id");
    const medicalServiceParams = searchParams.getAll("medicalService_like");

    // 把 categoryParam、cityParam、regionParam 的值加入 getParams
    if (categoryParam) {
      getParams.append("category_like", categoryParam);
    }
    if (cityParam) {
      getParams.append("city_like", cityParam);
    }
    if (regionParam) {
      getParams.append("region_like", regionParam);
    }

    // 把 caringItemParams、servicesParams、medicalServiceParams 的值一個個加入 getParams
    if (caringItemParams) {
      caringItemParams.forEach((item) => {
        getParams.append("caringItem_like", item);
      });
    }
    if (servicesParams) {
      servicesParams.forEach((item) => {
        getParams.append("services.id", item);
      });
    }
    if (medicalServiceParams) {
      medicalServiceParams.forEach((item) => {
        getParams.append("medicalService_like", item);
      });
    }

    // 若 getParams 非空值取得符合搜尋參數的 products，是空值則取得所有 products
    if (getParams) {
      getProductsSearch(getParams);
      // console.log(resultsSearch);
    } else {
      getProducts();
    }
  },[searchParams, getProductsSearch, getProducts]);

  // 若 searchParams、currentPage 更新就觸發 handleSearchParams
  useEffect(() => {
    handleSearchParams();
  }, [searchParams, currentPage, handleSearchParams]);

  //切換分頁
  const handlePageChange = (page) => {
    setCurrentPage(page);
    //滾動到頁面頂部
    window.scrollTo({ top: 400, behavior: "smooth" });
  };

  return (
    <>
      <ToastContainer />
      {/* 搜尋結果卡片 */}
      <div className="content pt-12 pt-md-14 result-content">
        <div className="container">
          <div className="row d-flex flex-column gy-7 gy-lg-9">
            {resultsSearch.map((product) => (
              <div className="col" key={product.id}>
                <div className="cards shadow rounded">
                  <div className="card mb-3">
                    <div className="row g-0">
                      <div className="col-md-5 ">
                        <div className="image">
                          <img
                            className="card-img img-fluid result-card"
                            src={product?.thumbs?.[0]}
                            alt="building"
                            style={{ height: "290px" }}
                          />
                          <HeartCard />
                        </div>
                      </div>
                      <div className="col-md-7">
                        <div className="card-body">
                          <Link to={`/product/${product.id}`}>
                            <h5 className="card-title mt-7">{product.name}</h5>
                          </Link>
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
                            <p className="ms-1">{product.address}</p>
                          </div>
                          <ul className="d-flex ps-0 mb-4 flex-wrap align-items-center gap-2">
                            {product.services?.map((service, index) => (
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
                              <h6>剩餘床位：</h6>{" "}
                              <h5>
                                {product.roomCards?.[0]?.availableBeds ||
                                  "載入中..."}
                              </h5>
                            </div>
                          </div>
                          <div className="buttons d-flex justify-content-between mt-2">
                            <button
                              type="button"
                              className="btn book-btn fs-7 py-4 btn-outline-primary-40  me-3"
                            >
                              預約參訪
                            </button>
                            {/* <button
                              type="button"
                              className="btn book-btn fs-6  py-4 btn-primary-40 "
                            >
                              預定留床
                            </button> */}
                            <Booking
                              product={product}
                              token={token}
                              myUserId={myUserId}
                              isLoading={isLoading}
                              setIsLoading={setIsLoading}
                            ></Booking>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 分頁 */}
      {totalPages > 1 && (
        <nav aria-label="...">
          {/* 上一頁 */}
          <ul className="pagination d-lg-flex py-8 justify-content-center ">
            <li className={`page-item ${currentPage === 1 && "disabled"}`}>
              <button
                className={`page-link ${currentPage === 1 && "disabled"} `}
                style={{ background: "transparent", border: "none" }}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                <img
                  src="https://raw.githubusercontent.com/Jack-Xiao-2024/ReactC5/a442977a25033104ad6b0fdb00c77acbcfc2c59a/src/assets/images/Icon/IconSecondary/VectorLeft-S-80.svg"
                  alt="left"
                />
              </button>
            </li>
            {/* 頁數 */}

            {Array.from({ length: totalPages }).map((_, index) => (
              <li
                key={index}
                className={`page-item ${currentPage === index + 1 && "active"}`}
              >
                <button
                  className="page-link text-secondary-50"
                  style={{ background: "transparent", border: "none" }}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}

            <li
              className={`page-item ${
                currentPage === totalPages && "disabled"
              }`}
            >
              <button
                className={`page-link ${
                  currentPage === totalPages && "disabled"
                }`}
                style={{ background: "transparent", border: "none" }}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                <img
                  src="https://raw.githubusercontent.com/Jack-Xiao-2024/ReactC5/a442977a25033104ad6b0fdb00c77acbcfc2c59a/src/assets/images/Icon/IconSecondary/VectorRight-S-80.svg"
                  alt="left"
                />
              </button>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
}
