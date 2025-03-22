import { Outlet, Link, useNavigate } from "react-router";

// 安裝 vite-plugin-svgr 讓 icon svg 檔可以作為元件引入使用，安裝引入方法請看 vite.config
import Profile from "../assets/images/Account_Icon/profile.svg?react";
import Paste from "../assets/images/Account_Icon/paste.svg?react";
import Favorite from "../assets/images/Account_Icon/favorite.svg?react";
import Building from "../assets/images/Account_Icon/building.svg?react";

const accountInnerTab = [
  {
    path: "profile",
    title: "個人資料",
    icon: <Profile className="icon-color p-1 me-5" />,
  },
  {
    path: "purchase",
    title: "留床記錄",
    icon: <Paste className="icon-color p-1 me-5" />,
  },
  {
    path: "profile",
    title: "收藏機構",
    icon: <Favorite className="icon-color p-1 me-5" />,
  },
  {
    path: "profile",
    title: "參訪記錄",
    icon: <Building className="icon-color p-1 me-5" />,
  },
];

export default function AccountLayout() {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="account-layout container pt-lg-12 pt-8"
        style={{ paddingBottom: "96px" }}
      >
        <div className="row">
          <div className="col-4 d-lg-flex flex-column d-none">
            <div
              className="btn-group-vertical"
              role="group"
              aria-label="Vertical button group"
            >
              {accountInnerTab.map((item, index) => (
                <Link
                  to={item.path}
                  key={index}
                  className="d-grid account-layout-btn btn px-5 py-6 text-start"
                >
                  <div className="d-flex align-items-center">
                    {item.icon}

                    <h5>{item.title}</h5>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="col-lg-8 col">
            <button onClick={() => navigate("/account")} className="d-block d-lg-none btn btn-link p-0 link-primary-50 mb-3 fs-6">
              
              <i className="bi bi-chevron-left"></i>返回會員中心
              
            </button>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
