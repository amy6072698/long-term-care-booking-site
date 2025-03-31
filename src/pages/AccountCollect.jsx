import { Link } from "react-router";
import HeartCard from "../components/HeartCard";
import { useEffect, useState } from "react";
import axios from "axios";
import getTokenFromCookie from "../assets/js/getTokenFromCookie";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function AccountProduct() {
  const { token, myUserId } = getTokenFromCookie();
  const [products, setProducts] = useState([]);

  //取得收藏機構
  const getProducts = async () => {
    // setLoading(true);
    // setError(null);

    try {
      // 取得包含產品資訊的收藏資料
      const response = await axios.get(`${BASE_URL}/collects`, {
        params: {
          userId: myUserId,
          _expand: "product",
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data && Array.isArray(response.data)) {
        // 提取每個收藏項目中的產品資料
        const productData = response.data
          .map((item) => {
            // 確保產品資料存在
            if (item.product) {
              return {
                collectId: item.id, // 收藏記錄ID
                productId: item.productId, // 產品ID
                createdAt: item.createdAt, // 收藏時間
                // 以下是產品相關資料
                name: item.product.name,
                category: item.product.category,
                images: item.product.images,
                thumbs: item.product.thumbs,
                // 可以根據實際需要提取更多產品屬性
                ...item.product, // 如果需要產品的所有屬性，可以使用展開運算符
              };
            }
            return null;
          })
          .filter((item) => item !== null); // 過濾掉不含產品資料的項目

        console.log("成功提取產品資料:", productData);
        setProducts(productData);
      } else {
        console.warn("獲取的資料格式不符合預期");
        setProducts([]);
      }
    } catch (error) {
      console.error("獲取收藏資料時發生錯誤:", error);
      // setError(error.message || "無法獲取收藏資料");
      setProducts([]);
    } finally {
      // setLoading(false);
    }
  };
  // 組件載入時獲取資料
  useEffect(() => {
    getProducts();
  }, []);

  // **處理刪除收藏**
  const handleRemoveProduct = (removedProductId) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.productId !== removedProductId)
    );
  };
  return (
    <>
      {products.map((product) => {
        return (
          <div className="col" key={product.id}>
            <div className="cards shadow rounded">
              <div className="card mb-3">
                <div className="row g-0">
                  <div className="col-md-5">
                    <div className="image" style={{ position: "relative" }}>
                      <img
                        className="card-img img-fluid result-card"
                        src={product?.thumbs?.[0]}
                        alt="building"
                        style={{ height: "290px" }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          top: "10px",
                          right: "10px",
                          zIndex: 10,
                        }}
                      >
                        <HeartCard
                          productId={product.id}
                          onRemove={handleRemoveProduct}
                        />
                      </div>
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
                            className="border border-dark rounded-pill"
                          >
                            <p className="d-flex align-items-center py-1 px-2">
                              <img
                                className="me-1"
                                src={`https://raw.githubusercontent.com/Jack-Xiao-2024/ReactC5/ed70683e88e44a1c0854ab9849a0f2dbc072916e/src/assets/images/Icon/tag/${service.name}.svg`}
                                alt={service.name}
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
                          <h6>剩餘床位：</h6>
                          <h5>
                            {product.roomCards?.[0]?.availableBeds ||
                              "載入中..."}
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
