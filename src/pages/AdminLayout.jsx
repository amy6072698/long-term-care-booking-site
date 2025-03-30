import { Outlet } from "react-router";
import AdminHeader from "../components/AdminHeader";
import ListGroup from "../components/ListGroup";

export default function AdminLayout() {
  return (
    <>
      <AdminHeader/>
      <div className="container-fluid">
        <div className="row">
          <div className="col-2 px-0" style={{backgroundColor: "#33240E"}}>
            <ListGroup/>
          </div>
          <div className="col-10 pt-8 px-8">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
