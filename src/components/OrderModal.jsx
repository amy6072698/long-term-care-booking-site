export default function OrderModal({
  orderModalRef,
  handleCloseOrderModal,
  handleModalInputChange,
  handleUpdateOrder,
  tempOrder,
}) {
  return (
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
  );
}
