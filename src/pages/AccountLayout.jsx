import { Outlet, Link } from "react-router";

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
  return (
    <>
      <div
        className="account-layout container pt-12"
        style={{ paddingBottom: "96px" }}
      >
        <div className="row">
          <div className="col-4 d-grid">
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
          <div className="col-8">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
