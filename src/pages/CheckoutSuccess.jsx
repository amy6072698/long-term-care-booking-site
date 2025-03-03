import { Link } from "react-router";
export default function CheckoutSuccess() {
  return (
    <>
      <div className="container d-flex  flex-column align-items-center">
        <div className="p-5 rounded" style={{ backgroundColor: "#fff8e1" }}>
          {/* 淺黃色背景 */}
          <img
            src="https://images.unsplash.com/photo-1574063413132-354db9f190fd?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Booking Success"
            className="img-fluid mb-4" // 使用 Bootstrap 的 img-fluid 響應式圖片
            style={{ maxWidth: "200px" }} // 設定圖片最大寬度
          />
          <h1 className="mb-3" style={{ color: "#d84315" }}>
            恭喜您已預訂成功
          </h1>
          <div className="d-flex justify-content-center">
            <Link to="/" className="btn btn-warning mx-2">
              回到首頁
            </Link>
            <Link to="/cart" className="btn btn-warning mx-2">
              回到立即預訂
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
