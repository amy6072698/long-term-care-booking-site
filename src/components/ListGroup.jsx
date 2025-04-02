import { Link, useLocation } from "react-router";

export default function ListGroup() {
  const adminPath = [
    {
      path: "/admin",
      title: "訂單管理",
      icon: "bi-wallet2",
      description: "查看訂單",
    },
    {
      path: "/admin/product",
      title: "機構管理",
      icon: "bi-houses",
      description: "查看產品",
    },
    {
      path: "/admin/orderChart",
      title: "圖表分析",
      icon: "bi-bar-chart",
      description: "查看圖表分析",
    },
  ];

  const location = useLocation();

  // 判斷當前路徑是否是 item.path 或其子路徑
  const isPathActive = (path) => {
    // 精確匹配 "/admin"
    if (path === "/admin") {
      return location.pathname === "/admin";
    }
    // 其他路徑可以是前綴匹配
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <ul className="list-group">
        {adminPath.map((item,index) => {
          return (
            <li className={`list-group-item p-0 border-0 mb-1 ${isPathActive(item.path) ? 'active' : ''}`} key={index}>
              <Link to={item.path} className="d-block py-2 px-4 text-center fs-5">
                <i className={`bi ${item.icon} p-1 me-5`}></i>
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
