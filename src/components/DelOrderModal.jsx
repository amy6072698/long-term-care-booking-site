import PropTypes from "prop-types";
export default function DelOrderModal({
    orderDelModalRef,
    handleCloseDelOrderModal,
    handleDelOrder,
    delId
}) {
  return (
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
            <span className="text-danger fw-bold">`訂單編號{delId}`</span>
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
  );
}
DelOrderModal.propTypes = {
  orderDelModalRef: PropTypes.object,
  handleCloseDelOrderModal: PropTypes.func,
  handleDelOrder: PropTypes.func,
  delId: PropTypes.number,
};