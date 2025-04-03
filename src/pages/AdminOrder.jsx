import axios from "axios";
import { useRef, useEffect, useState, useCallback } from "react";
import getTokenFromCookie from "../assets/js/getTokenFromCookie";
import { Modal } from "bootstrap";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import { ToastContainer } from "react-toastify";
import showSuccessMessage from "../assets/js/showSuccessMessage";
import showErrorMessage from "../assets/js/showErrorMessage";
import { Link } from "react-router";
import OrderModal from "../components/OrderModal";
import DelOrderModal from "../components/DelOrderModal";



export default function AdminLOrder() {
  const { token } = getTokenFromCookie();
  const [orders, setOrders] = useState([]);
  const [tempOrder, setTempOrder] = useState({});
  const [delId, setDelId] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);  
  const itemsPerPage = useRef(10);

  // 取得訂單資料
  // 將 getOrders 包裝成穩定函數，避免它在每次重新渲染時都f被重新創建。
  const getOrders = useCallback(async () => {
    try {
      const { data, headers } = await axios.get(
        `${BASE_URL}/640/orders?_page=${currentPage}&_limit=${itemsPerPage.current}`,
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

  //關閉產品orderModal
  const handleCloseOrderModal = () => {
    const modalInstance = Modal.getInstance(orderModalRef.current);
    modalInstance.hide();
  };

  // 打開orderModal
  const handleOpenOrderModal = (order) => {
    console.log(order);
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
      await axios.put(
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
      await axios.delete(`${BASE_URL}/660/orders/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
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

  //改變頁數
  const handleChangePage = (e, page) => {
    e?.preventDefault();
    setCurrentPage(page);
  };

  

  return (
    <>
      {/* toast */}
      <ToastContainer />
      <h4 className="mb-2 text-primary-100 pt-14">訂單管理</h4>
      <p className="mb-10">查看所有使用者的訂單</p>
      {/* 表格 */}
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
                    className="btn btn-outline-primary-80 btn-sm"
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
      {/* 分頁 */}
      <nav className="admin-page" aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li
            onClick={(e) => {
              if (currentPage != 1) {
                handleChangePage(e, currentPage - 1);
              }
            }}
            className={`page-item ${currentPage == 1 && "disabled"}`}
          >
            <Link className="page-link">&laquo;</Link>
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
      <OrderModal
        orderModalRef={orderModalRef}
        handleCloseOrderModal={handleCloseOrderModal}
        handleModalInputChange={handleModalInputChange}
        handleUpdateOrder={handleUpdateOrder}
        tempOrder={tempOrder}
      />
      {/* delModal */}
      <DelOrderModal
        orderDelModalRef={orderDelModalRef}
        handleCloseDelOrderModal={handleCloseDelOrderModal}
        handleDelOrder={handleDelOrder}
        delId={delId}
      />
    </>
  );
}
