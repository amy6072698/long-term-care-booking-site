import { Link } from "react-router";

// 安裝 vite-plugin-svgr 讓 icon svg 檔可以作為元件引入使用，安裝引入方法請看 vite.config
import Profile from "../assets/images/Account_Icon/profile.svg?react";
import Paste from "../assets/images/Account_Icon/paste.svg?react";
import Favorite from "../assets/images/Account_Icon/favorite.svg?react";
import Building from "../assets/images/Account_Icon/building.svg?react";

const accountIndexTab = [
  {
    path: "inner/profile",
    title: "個人資料",
    icon: <Profile className="icon-color p-1 me-5" />,
    description: "更新個人資訊與用途查看",
  },
  {
    path: "inner/purchase",
    title: "留床記錄",
    icon: <Paste className="icon-color p-1 me-5" />,
    description: "查看您已預訂留床的機構",
  },
  {
    path: "inner/purchase",
    title: "收藏機構",
    icon: <Favorite className="icon-color p-1 me-5" />,
    description: "查看您已收藏的機構",
  },
  {
    path: "inner/profile",
    title: "參訪記錄",
    icon: <Building className="icon-color p-1 me-5" />,
    description: "查看您已預約參訪的機構",
  },
];

export default function AccountIndex() {
  return (
    <>
      <div className="container pt-12" style={{ paddingBottom: "364px" }}>
        <div className="mx-lg-12 px-lg-12 px-md-10 text-primary-100">
          <h4 className="mb-2 ms-lg-0 ms-4">帳號設定</h4>
          <p className="mb-lg-12 mb-8 ms-lg-0 ms-4">
            管理您的長照好厝邊使用體驗
          </p>
          <div className="row row-cols-lg-2 row-cols-1">
            {accountIndexTab.map((item, index) => (
              <div key={index} className="col d-grid">
                <Link
                  to={item.path}
                  key={index}
                  className="account-index-btn btn px-11 py-9 my-3 text-start"
                >
                  <div className="d-flex align-items-center">
                    {item.icon}
                    <div>
                      <h4 className="mb-1">{item.title}</h4>
                      <p>{item.description}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
