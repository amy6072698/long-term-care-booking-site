import axios from "axios";
import { useRef, useEffect, useState, useCallback } from "react";
import getTokenFromCookie from "../assets/js/getTokenFromCookie";
import { Modal } from "bootstrap";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import { ToastContainer } from "react-toastify";
import showSuccessMessage from "../assets/js/showSuccessMessage";
import showErrorMessage from "../assets/js/showErrorMessage";
import { Link } from "react-router";
import ListGroup from "../components/ListGroup";

export default function AdminLOrder() {
  const { token } = getTokenFromCookie();
  const [orders, setOrders] = useState([]);
  const [tempOrder, setTempOrder] = useState([]);
  const [delId, setDelId] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = useRef(10);

  // 取得訂單資料
  // 將 getOrders 包裝成穩定函數，避免它在每次重新渲染時都被重新創建。
  const getOrders = useCallback(async () => {
    try {
      const { data, headers } = await axios.get(
        `${BASE_URL}/640/orders?_page=${currentPage}&_limit=10`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      const totalCount = headers["x-total-count"];
      setTotalPages(Math.ceil(totalCount / itemsPerPage.current));
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  }, [token, currentPage]);

  // 畫面渲染後觸發取得訂單
  useEffect(() => {
    getOrders();
  }, [getOrders]);

  // 建立一個ref物件
  const orderModalRef = useRef(null);

  // 畫面旋然後建立modal實例
  useEffect(() => {
    new Modal(orderModalRef.current, {
      backdrop: false,
    });
  }, []);

  useEffect(() => {
    console.log("tempOrder", tempOrder);
  }, [tempOrder]);

  //關閉產品
  const handleCloseOrderModal = () => {
    const modalInstance = Modal.getInstance(orderModalRef.current);
    modalInstance.hide();
  };

  // 打開orderModal
  const handleOpenOrderModal = (order) => {
    const modalInstance = Modal.getInstance(orderModalRef.current);
    setTempOrder(order);
    modalInstance.show();
  };

  // 更新表單欄位
  const handleModalInputChange = (e, mode) => {
    const { name, value } = e.target;
    if (mode === "order") {
      setTempOrder({
        ...tempOrder,
        [name]: value,
      });
    } else if (mode === "orderData") {
      const newValue = { ...tempOrder.orderData };
      newValue[name] = value;
      setTempOrder({
        ...tempOrder,
        orderData: newValue,
      });
    }
  };

  //  更新訂單
  const handleUpdateOrder = async () => {
    try {
      const res = await axios.put(
        `${BASE_URL}/660/orders/${tempOrder.id}`,
        {
          ...tempOrder,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
      handleCloseOrderModal();
      showSuccessMessage(`編輯成功！`);
      getOrders();
    } catch (error) {
      const { message } = error;
      showErrorMessage(message);
    }
  };

  // 刪除api
  const handleDelOrder = async (e, id) => {
    try {
      const res = await axios.delete(`${BASE_URL}/660/orders/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      console.log(res);
      handleCloseDelOrderModal();
      getOrders();
      showSuccessMessage(`刪除成功！`);
    } catch (error) {
      const { message } = error;
      showErrorMessage(message);
    }
  };

  // 刪除modal
  const orderDelModalRef = useRef(null);
  useEffect(() => {
    new Modal(orderDelModalRef.current, {
      backdrop: false,
    });
  }, []);

  // 打開刪除modal
  const handleOpenDelOrderModal = (id) => {
    const modalInstance = Modal.getInstance(orderDelModalRef.current);
    setDelId(id);
    modalInstance.show();
  };

  // 關閉刪除modal
  const handleCloseDelOrderModal = () => {
    const modalInstance = Modal.getInstance(orderDelModalRef.current);
    modalInstance.hide();
  };

  //
  const handleChangePage = (e, page) => {
    e?.preventDefault();
    setCurrentPage(page);
  };

  useEffect(() => {
    console.log(currentPage);
  }, [currentPage]);

  return (
    <>
      {/* toast */}
      <ToastContainer />
      <div className="container pt-lg-12 pt-8">
        <div className="row">
          <div className="col-3">
            <ListGroup />
          </div>
          <div className="col-9">
            <h4 className="mb-2 text-primary-100">訂單管理</h4>
            <p className="mb-10">查看所有使用者的訂單</p>
            <table className="table table-striped  admin-order">
              <thead>
                <tr>
                  <th scope="col">訂單編號</th>
                  <th scope="col">入住者姓名</th>
                  <th scope="col">手機號碼</th>
                  <th scope="col">機構名稱</th>
                  <th scope="col">入住房型</th>
                  <th scope="col">入住日期</th>
                  <th scope="col">詳細資料</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.orderData.fullName}</td>
                    <td>{order.orderData.mobilePhone}</td>
                    <td>{order.orderName}</td>
                    <td>{order.orderData.roomType}</td>
                    <td>{order.orderData.checkInDate}</td>
                    <td>
                      <div className="btn-group">
                        <button
                          onClick={() => handleOpenOrderModal(order)}
                          className="btn btn-outline-primary btn-sm"
                          type="button"
                        >
                          編輯
                        </button>
                        <button
                          onClick={() => handleOpenDelOrderModal(order.id)}
                          className="btn btn-outline-danger btn-sm"
                          type="button"
                        >
                          刪除
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <nav aria-label="Page navigation example">
              <ul className="pagination justify-content-center">
                <li
                  onClick={(e) => {
                    if (currentPage != 1) {
                      handleChangePage(e, currentPage - 1);
                    }
                  }}
                  className={`page-item ${currentPage == 1 && "disabled"}`}
                >
                  <Link className="page-link">上一頁</Link>
                </li>
                {Array.from({ length: totalPages }).map((_, index) => {
                  return (
                    <li
                      className="page-item"
                      key={index + 1}
                      onClick={(e) => {
                        handleChangePage(e, index + 1);
                      }}
                    >
                      <Link
                        className={`page-link 
                ${currentPage === index + 1 && "active"}
                  `}
                      >
                        {index + 1}
                      </Link>
                    </li>
                  );
                })}
                <li
                  className={`page-item ${
                    currentPage == totalPages && "disabled"
                  }`}
                  onClick={(e) => {
                    console.log("total", totalPages);
                    if (currentPage < totalPages) {
                      handleChangePage(e, currentPage + 1);
                    }
                  }}
                >
                  <Link className="page-link" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </Link>
                </li>
              </ul>
            </nav>

            {/* orderModal */}
            <div
              ref={orderModalRef}
              className="modal"
              style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            >
              <div className="modal-dialog modal-dialog-centered modal-xl">
                <div className="modal-content border-0 shadow">
                  <div className="modal-header px-10 border-bottom">
                    <h5 className="modal-title fs-4">編輯訂單</h5>
                    <button
                      type="button"
                      className="btn-close"
                      aria-label="Close"
                      onClick={handleCloseOrderModal}
                    ></button>
                  </div>

                  <div className="modal-body px-10">
                    <div className="row">
                      <div className="col-12">
                        <div className="d-flex gap-5 mb-5">
                          <div className="col">
                            <label htmlFor="orderId" className="form-label">
                              訂單id
                            </label>
                            <input
                              value={tempOrder?.id || ""}
                              id="orderId"
                              name="orderId"
                              type="text"
                              disabled
                              className="form-control"
                            />
                          </div>
                          <div className="col">
                            <label htmlFor="orderName" className="form-label">
                              機構名稱
                            </label>
                            <input
                              onChange={(e) => {
                                handleModalInputChange(e, "order");
                              }}
                              value={tempOrder?.orderName || ""}
                              name="orderName"
                              id="orderName"
                              type="text"
                              className="form-control"
                              placeholder="請輸入分類"
                            />
                          </div>
                        </div>
                        <div className="d-flex gap-5 mb-5">
                          <div className="col">
                            <label htmlFor="orderPrice" className="form-label">
                              機構價格
                            </label>
                            <input
                              onChange={(e) => {
                                handleModalInputChange(e, "order");
                              }}
                              value={tempOrder?.orderPrice || ""}
                              name="orderPrice"
                              id="orderPrice"
                              type="text"
                              className="form-control"
                            />
                          </div>
                          <div className="col">
                            <label htmlFor="roomType" className="form-label">
                              房型
                            </label>
                            <input
                              onChange={(e) => {
                                handleModalInputChange(e, "orderData");
                              }}
                              value={tempOrder?.orderData?.roomType || ""}
                              name="roomType"
                              id="roomType"
                              type="text"
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="d-flex gap-5 mb-5">
                          <div className="col">
                            <label htmlFor="checkInDate" className="form-label">
                              入住日期
                            </label>
                            <input
                              onChange={(e) => {
                                handleModalInputChange(e, "orderData");
                              }}
                              value={tempOrder?.orderData?.checkInDate || ""}
                              name="checkInDate"
                              id="checkInDate"
                              type="date"
                              className="form-control"
                            />
                          </div>
                          <div className="col"></div>
                        </div>
                        <div className="d-flex gap-5 mb-5">
                          <div className="col">
                            <label htmlFor="fullName" className="form-label">
                              入住者姓名
                            </label>
                            <input
                              onChange={(e) => {
                                handleModalInputChange(e, "orderData");
                              }}
                              value={tempOrder?.orderData?.fullName || ""}
                              id="fullName"
                              name="fullName"
                              type="text"
                              className="form-control"
                            />
                          </div>
                          <div className="col">
                            <label htmlFor="mobilePhone" className="form-label">
                              行動電話
                            </label>
                            <input
                              onChange={(e) => {
                                handleModalInputChange(e, "orderData");
                              }}
                              value={tempOrder?.orderData?.mobilePhone || ""}
                              name="mobilePhone"
                              id="mobilePhone"
                              type="tel"
                              className="form-control"
                              placeholder="請輸入分類"
                            />
                          </div>
                        </div>
                        <div className="d-flex gap-5 mb-5">
                          <div className="col">
                            <label htmlFor="address" className="form-label">
                              聯絡地址
                            </label>
                            <input
                              onChange={(e) => {
                                handleModalInputChange(e, "orderData");
                              }}
                              value={tempOrder?.orderData?.address || ""}
                              id="address"
                              name="address"
                              type="text"
                              className="form-control"
                            />
                          </div>
                          <div className="col">
                            <label htmlFor="mail" className="form-label">
                              E-mail
                            </label>
                            <input
                              onChange={(e) => {
                                handleModalInputChange(e, "orderData");
                              }}
                              value={tempOrder?.orderData?.mail || ""}
                              name="mail"
                              id="mail"
                              type="mail"
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="d-flex gap-5 mb-5">
                          <div className="col">
                            <label htmlFor="message" className="form-label">
                              備註
                            </label>
                            <textarea
                              onChange={(e) => {
                                handleModalInputChange(e, "orderData");
                              }}
                              value={tempOrder?.orderData?.message || ""}
                              name="message"
                              id="message"
                              className="form-control"
                              rows={4}
                            ></textarea>
                          </div>
                        </div>
                        <div className="d-flex gap-5 mb-5">
                          <div className="col">
                            <label htmlFor="creditCard" className="form-label">
                              信用卡號
                            </label>
                            <input
                              onChange={(e) => {
                                handleModalInputChange(e, "orderData");
                              }}
                              value={tempOrder?.orderData?.creditCard || ""}
                              name="creditCard"
                              id="creditCard"
                              type="text"
                              className="form-control"
                            />
                          </div>
                          <div className="col">
                            <label htmlFor="expiryDate" className="form-label">
                              有效日期
                            </label>
                            <input
                              onChange={(e) => {
                                handleModalInputChange(e, "orderData");
                              }}
                              value={tempOrder?.orderData?.expiryDate || ""}
                              name="expiryDate"
                              id="expiryDate"
                              type="text"
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="d-flex gap-5 mb-5">
                          <div className="col">
                            <label htmlFor="cvv" className="form-label">
                              安全碼
                            </label>
                            <input
                              onChange={(e) => {
                                handleModalInputChange(e, "orderData");
                              }}
                              value={tempOrder?.orderData?.cvv || ""}
                              name="cvv"
                              id="cvv"
                              type="text"
                              className="form-control"
                            />
                          </div>
                          <div className="col"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="modal-footer border-top bg-light">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleCloseOrderModal}
                    >
                      取消
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleUpdateOrder}
                    >
                      確認
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* delModal */}
            <div
              ref={orderDelModalRef}
              className="modal fade"
              id="delProductModal"
              tabIndex="-1"
              style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5">刪除產品</h1>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      onClick={handleCloseDelOrderModal}
                    ></button>
                  </div>
                  <div className="modal-body">
                    你是否要刪除
                    <span className="text-danger fw-bold">
                      `訂單編號{delId}`
                    </span>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleCloseDelOrderModal}
                    >
                      取消
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={(e) => {
                        handleDelOrder(e, delId);
                      }}
                    >
                      刪除
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
