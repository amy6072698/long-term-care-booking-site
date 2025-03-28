import { Link } from "react-router";

export default function ListGroup() {
  const adminPath = [
    {
      path: "/admin",
      title: "訂單管理",
      // icon: <Profile className="icon-color p-1 me-5" />,
      description: "查看訂單",
    },
    {
      path: "/admin/product",
      title: "機構管理",
      // icon: <Paste className="icon-color p-1 me-5" />,
      description: "查看產品",
    },
    {
      path: "/admin/orderChart",
      title: "圖表分析",
      // icon: <Paste className="icon-color p-1 me-5" />,
      description: "查看圖表分析",
    },
  ];
  return (
    <ul className="list-group">
      {adminPath.map((item,index) => {
        return (
          <li className="list-group-item p-0" key={index}>
            <Link to={item.path} className="d-block py-2 px-5 text-center text-primary-100 fs-5">
              {item.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
