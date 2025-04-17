import { Link } from "react-router";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import axios from "axios";
import { useEffect, useState } from "react";
import getTokenFromCookie from "../assets/js/getTokenFromCookie";

export default function AccountPurchase() {
  const { token, myUserId } = getTokenFromCookie();
  const [orders, setOrders] = useState([]); // 用 useState 存取訂單

  useEffect(() => {
    const getOrders = async () => {
      try {
        const data = await axios.get(
          `${BASE_URL}/600/orders?userId=${myUserId}&_expand=product`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        setOrders(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getOrders();
  }, [token, myUserId]);

  return (
    <>
      <div className="main">
        <div className="text-primary-100">
          <h4 className="mb-2">留床紀錄</h4>
          <p className="mb-10">查看您已預訂留床的機構</p>
          <div className="cards">
            {orders.map((order) => (
              <div className="col" key={order.id}>
                <div className="cards shadow rounded">
                  <div className="card mb-3">
                    <div className="row g-0">
                      <div className="col-md-5 ">
                        <img
                          className="card-img img-fluid result-card"
                          src={order?.product?.thumbs?.[0]}
                          alt="building"
                          style={{ height: "290px" }}
                        />
                      </div>
                      <div className="col-md-7">
                        <div className="card-body">
                          <Link to={`/product/${order.id}`}>
                            <h5 className="card-title mt-7">
                              {order.orderName}
                            </h5>
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
                            <p className="ms-1">{order.product.address}</p>
                          </div>
                          <div className="date d-flex">
                            <p>入住日期：</p>
                            <p>{order.orderData.checkInDate}</p>
                          </div>
                          <div className="type mt-2">
                            <p className="text-end">
                              {order.orderData.roomType}型
                            </p>
                          </div>
                          <div className="room_price d-flex justify-content-between mt-1">
                            <div className="price">
                              <p>留床費用</p>
                            </div>
                            <div className="price_number">
                              <p className="h5">NTD {order.orderPrice}</p>
                            </div>
                          </div>
                          <div className="detail mt-2">
                            <Link
                              to={`/account/inner/purchaseDetail/${order.id}`}
                              style={{ width: "100%" }}
                            >
                              <button
                                type="button"
                                className="btn btn-primary-40"
                                style={{ width: "100%" }}
                              >
                                詳細資料
                              </button>
                            </Link>
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
    </>
  );
}
