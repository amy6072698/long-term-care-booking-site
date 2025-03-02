import { Link } from "react-router";
export default function NotFound() {
  return (
    <>
      <div className="container mt-3 d-flex flex-column align-items-center">
        <h3 className="py-5 fs-md-1">找不到頁面</h3>
        <img width="300" src="https://images.unsplash.com/photo-1574063413132-354db9f190fd?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="NotFondPage" />
        <Link to="/" className="btn btn-primary mt-5">回到首頁</Link>
      </div>
    </>
  );
}
