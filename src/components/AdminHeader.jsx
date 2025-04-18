import { useCallback, useContext, useEffect, useRef } from "react";
import LoginModal from "./LoginModal";
import { Link, NavLink, useNavigate } from "react-router";

// 將 FrontLayout 中的 UserContext 匯入
import { UserContext }  from "../contexts/UserContext";

// 安裝 vite-plugin-svgr 讓 icon svg 檔可以作為元件引入使用，安裝引入方法請看 vite.config
import Profile from "../assets/images/Account_Icon/profile.svg?react";
import LogOut from "../assets/images/Header_Icon/LogOut.svg?react";
import AdminHeaderLogo from "../assets/images/Logo/LB-White.svg?react";



import axios from "axios";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Collapse } from "bootstrap";



const BASE_URL = import.meta.env.VITE_BASE_URL;

function AdminHeader() {
  // 用 useContext 引入 isLogin, setIsLogin, userName, setUserName
  const { isLogin, setIsLogin } = useContext(UserContext); // 用來判斷是否登入
  const { userName, setUserName } = useContext(UserContext); // 用來記錄使用者姓名
  const { handleLoginModalOpen } = useContext(UserContext); // 判斷開啟登入還是註冊 modal

  const { isAdmin, setIsAdmin } = useContext(UserContext); // 判斷使用者是否為管理者

  const { isCollapseOpen, setIsCollapseOpen } = useContext(UserContext); // 判斷手機板漢堡選單開關

  const navigate = useNavigate();

  // 登出功能
  const handleLogout = () => {
    // 把 cookie 中的 myToken 移除，設定過去時間使其失效
    document.cookie = "myToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // 移除用 axios 預設夾帶在 header 的 token
    delete axios.defaults.headers.common["Authorization"];

    setIsLogin(false);
    setIsCollapseOpen(false);
    navigate('/');
    alert("登出成功");
    window.location.reload(); // 刷新網頁
  };

  // 取得cookie裡的token驗證是否還有效，是就維持登入狀態、否則自動登出
  const checkLogin = useCallback(async () => {
    try {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)myToken\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
      );

      if (!token) {
        setIsLogin(false);
        return;
      }

      axios.defaults.headers.common["Authorization"] = token;

      const id = document.cookie.replace(
        /(?:(?:^|.*;\s*)myUserId\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
      );

      // 試著訪問需要授權的 API（例如 /users）確認 token 是否有效
      const res = await axios.get(`${BASE_URL}/users/${id}`);

      if(res.data.role === "admin"){
        setIsAdmin(true);
      }
      setUserName(res.data.name);
      
      setIsLogin(true);
    } catch {
      setIsLogin(false);
    }
  },[setIsLogin, setIsAdmin, setUserName]);

  const collapseNavbarRef = useRef(null);

  useEffect(() => {
    if(collapseNavbarRef.current){
      new Collapse(collapseNavbarRef.current,{
        toggle: false
      });
    }
    checkLogin();
  }, [checkLogin]);

  

  
  useEffect(() => {
    const handleCollapseNavbarToggle = () => {
      const collapseInstance = Collapse.getOrCreateInstance(collapseNavbarRef.current);
      isCollapseOpen ? collapseInstance.show() : collapseInstance.hide();
    }
    handleCollapseNavbarToggle();
  }, [isCollapseOpen]);


  return (
    <>
      <header className="admin-header fixedTopControl">
        <nav className="navbar navbar-expand-lg py-0">
          <div className="container-fluid px-lg-4 px-0">
            <NavLink
              onClick={() => setIsCollapseOpen(false)}
              className="navbar-brand ms-11" to="/">
              <AdminHeaderLogo
                alt="logo"
                className="d-inline-block w-100"
                style={{ width: "100px", height: "50px" }}
              />
            </NavLink>
            <button
              className="navbar-toggler me-6 border-0 p-0 scrollControl"
              type="button"
              onClick={() => setIsCollapseOpen(!isCollapseOpen)}
              aria-controls="headerNavbar"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i className="bi bi-list"></i>
            </button>
            <div
              ref={collapseNavbarRef}
              className="collapse navbar-collapse"
              id="headerNavbar"
            >
              <ul className="navbar-nav ms-auto gap-lg-5 gap-0 flex-lg-row flex-column-reverse">
                <div className="d-lg-flex gap-lg-5 gap-0">
                  {/* 判斷是否登入若是顯示使用者姓名、否顯示註冊｜登入 */}
                  {isLogin ? (
                    <li className="nav-item dropdown">
                      <button
                        type="button" data-bs-toggle="dropdown" aria-expanded="false"
                        className="nav-link dropdown-toggle px-xl-5 px-lg-0 w-100 text-start"
                      >
                        <Profile className="me-xl-4 me-lg-0 me-3" style={{width:"22px"}}/>
                        <h6 className="d-inline align-middle">你好，{userName}</h6>
                      </button>
                      <ul className="dropdown-menu fs-6 w-100 mt-0 overflow-hidden">
                      {isAdmin && (
                        <li>
                          <Link 
                            onClick={() => setIsCollapseOpen(false)}
                            to="/" 
                            className="dropdown-item mb-1">
                            回前台首頁
                          </Link>
                        </li>
                      )}
                        <li>
                          <button
                            onClick={handleLogout}
                            className="dropdown-item"
                            type="button"
                          >
                            登出
                          </button>
                        </li>
                      </ul>
                    </li>
                  ) : (
                    <li className="nav-item">
                      <button
                        className="nav-link px-xl-5 px-lg-0 w-100 text-start"
                        type="button"
                        onClick={() => handleLoginModalOpen("login")}
                      >
                        <LogOut className="me-xl-4 me-lg-0 me-3"/>
                        <h6 className="d-inline align-middle">註冊｜登入</h6>
                      </button>
                    </li>
                  )}
                </div>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      {/* 引入寫在 Header 但需要在 LoginModal 中使用的內容 */}
      {/* <LoginModal /> */}
      <LoginModal />
    </>
  );
}

export default AdminHeader;
