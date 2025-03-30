import { useState } from "react";
import { Link } from "react-router";

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
  const [isActive, setIsActive] = useState('訂單管理');
  return (
    <div className="admin-list-group">
      <ul className="list-group mt-6">
        {adminPath.map((item,index) => {
          return (
            <li className={`list-group-item p-0 border-0 mb-1 ${isActive === item.title && 'active'}`} key={index}>
              <Link onClick={() => setIsActive(item.title)} to={item.path} className="d-block py-2 px-4 text-center fs-5">
                <i className={`bi ${item.icon} p-1 me-5`}></i>
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
