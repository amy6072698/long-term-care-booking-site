import { useEffect, useRef, useState } from "react";



// 匯入 Modal
import { Modal } from 'bootstrap';
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function LoginModal({
  isOpen,
  setIsOpen,
  modalMode,
  setModalMode,
  handleLoginModalOpen
}){

  const loginModalRef = useRef(null);

  const [users, setUsers] = useState({
    "email": "",
    "password": "",
    "name": "",
    "gender": "male",
    "birthday": "",
    "phone": ""
  });

  const [ isLogin, setIsLogin ] = useState(false);

  // 建立 LoginModal 實例
  useEffect(() => {
    new Modal(loginModalRef.current, {
      backdrop: false
    })
  },[])

  // LoginModal 開啟
  useEffect(() => {
    if(isOpen){
      const modalInstance = Modal.getInstance(loginModalRef.current)
      modalInstance.show();
    }
  }, [isOpen])

  // LoginModal 關閉
  const handleLoginModalClose = () => {
    const modalInstance = Modal.getInstance(loginModalRef.current)
    modalInstance.hide();
    setIsOpen(false);
  }

  // 處理輸入框寫入
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setUsers({
      ...users,
      [name]: value
    });
  }

  // 註冊 API
  const signUp = async() => {
    try {
      await axios.post(`${BASE_URL}/signup`, users)
    } catch (error) {
      alert("註冊失敗")
    }
  }

  // 登入 API
  const logIn = async() => {
    try {
      const res = await axios.post(`${BASE_URL}/login`, {
        email: users.email,
        password: users.password
      })
      
      const token = res.data.accessToken;

      // json-server-auth 預設 1 小時 token 失效，宣告失效時間變數 expired，並做時間處理
      const expired = new Date();
      expired.setTime(expired.getTime() + 60 * 60 * 1000);

      document.cookie = `${res.data.user.name}Token=${token}; expires=${expired.toUTCString()}`;

      axios.defaults.headers.common['Authorization'] = token;
    } catch (error) {
      alert("登入失敗")
    }
  }

  // 登入表單送出
  const handleLogin = (e) => {
    e.preventDefault();
    logIn();
  }

  // 註冊表單送出
  const handleSignup = (e) => {
    e.preventDefault();
    signUp();
  }
  


  return (
  <>
    
    <div ref={loginModalRef} className="modal fade" id="logInModal" aria-hidden="true" aria-labelledby="logInModalToggleLabel" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header border-bottom-0">
            <button type="button" className="btn-close" aria-label="Close" onClick={handleLoginModalClose}></button>
          </div>
          {modalMode === "login" ? (
            <>
              <div className="modal-body py-0 px-14">
                <h5 className="modal-title text-center mb-4" id="logInModalToggleLabel">帳號登入</h5>
                <form onSubmit={handleLogin} className="d-flex flex-column justify-content-center">
                  
                  <div className="input-group border-1 border-bottom py-6">
                    <label htmlFor="account" className="input-group-text border-0 fs-6 py-0 px-3 bg-white">帳號：</label>
                    <input name="email" value={users.email ?? ""} onChange={handleInputChange} type="email" className="form-control border-0 rounded-2 fs-6 py-0 px-3" id="account" placeholder="您的電子信箱" aria-label="Account" autoComplete="email"/>
                  </div>
                  <div className="input-group border-1 border-bottom py-6">
                    <label htmlFor="loginPassword" className="input-group-text border-0 fs-6 py-0 px-3 bg-white">密碼：</label>
                    <input name="password" value={users.password ?? ""} onChange={handleInputChange} type="password" className="form-control border-0 rounded-2 fs-6 py-0 px-3" id="loginPassword" placeholder="請輸入密碼" aria-label="Password" autoComplete="current-password"/>
                  </div>
                  <a href="#" className="ms-auto mt-4 link-secondary-40">忘記密碼</a>
                  <button type="submit" className="mt-4 btn btn-primary-40 custom-primary-btn fs-6 p-4">登入</button>
                </form>
              </div>
              <div className="modal-footer d-flex justify-content-center border-top-0 px-5 pt-5 pb-9">
                <p className="d-inline">還沒有帳號？</p>
                <button className="btn p-0 link-secondary-40 border-0" type="button" onClick={() => handleLoginModalOpen("signup")}>註冊</button>
              </div>
            </>
          ) : (
          <>
            <div className="modal-body py-0 px-14">
              <h5 className="modal-title text-center mb-4" id="logInModalToggleLabel">註冊</h5>
              <form onSubmit={handleSignup} className="d-flex flex-column justify-content-center">
                <div className="input-group border-1 border-bottom py-6">
                  <label htmlFor="email" className="input-group-text border-0 fs-6 py-0 px-3 bg-white">電子信箱：</label>
                  <input name="email" value={users.email ?? ""} onChange={handleInputChange} type="email" className="form-control border-0 rounded-2 fs-6 py-0 px-3" id="email" placeholder="作為帳號使用" aria-label="Email" autoComplete="email"/>
                </div>
                <div className="input-group border-1 border-bottom py-6">
                  <label htmlFor="password" className="input-group-text border-0 fs-6 py-0 px-3 bg-white">密碼：</label>
                  <input name="password" value={users.password ?? ""} onChange={handleInputChange} type="password" className="form-control border-0 rounded-2 fs-6 py-0 px-3" id="password" placeholder="設定密碼" aria-label="Password" autoComplete="current-password"/>
                </div>
                <div className="input-group border-1 border-bottom py-6">
                  <label htmlFor="name" className="input-group-text border-0 fs-6 py-0 px-3 bg-white">姓名：</label>
                  <input name="name" value={users.name ?? ""} onChange={handleInputChange} type="text" className="form-control border-0 rounded-2 fs-6 py-0 px-3" id="name" placeholder="陳小明" aria-label="Name" autoComplete="username"/>
                </div>
                <div className="input-group d-flex align-items-center gap-3 border-1 border-bottom py-6">
                  <span className="input-group-text border-0 fs-6 py-0 px-3 bg-white">性別：</span>
                  <div className="form-check fs-6">
                    <input className="form-check-input" type="radio" name="gender" value={users.gender ?? "male"} onChange={handleInputChange} id="male" defaultChecked/>
                    <label className="form-check-label" htmlFor="male">
                      男
                    </label>
                  </div>
                  <div className="form-check fs-6 ms-2">
                    <input className="form-check-input" type="radio" name="gender" value={users.gender ?? "male"} onChange={handleInputChange} id="female"/>
                    <label className="form-check-label" htmlFor="female">
                      女
                    </label>
                  </div>
                </div>
                <div className="input-group border-1 border-bottom py-6">
                  <label htmlFor="birthday" className="input-group-text border-0 fs-6 py-0 px-3 bg-white">生日：</label>
                  <input name="birthday" value={users.birthday ?? ""} onChange={handleInputChange} type="date" className="form-control border-0 rounded-2 fs-6 py-0 px-3" id="birthday" aria-label="Birthday"/>
                </div>
                <div className="input-group border-1 border-bottom py-6">
                  <label htmlFor="phone" className="input-group-text border-0 fs-6 py-0 px-3 bg-white">電話：</label>
                  <input name="phone" value={users.phone ?? ""} onChange={handleInputChange} type="tel" className="form-control border-0 rounded-2 fs-6 py-0 px-3" id="phone" placeholder="0912-345-678" aria-label="Phone"/>
                </div>
                <button type="submit" className="mt-12 btn btn-primary-40 custom-primary-btn fs-6 p-4">註冊</button>
              </form>
            </div>
            <div className="modal-footer d-flex justify-content-center border-top-0 px-5 pt-5 pb-9">
              <p className="text-center">點擊「註冊」即表示你同意我們的使用條款及隱私政策</p>
              <p className="d-inline">已有註冊？</p>
              <button className="btn p-0 link-secondary-40 border-0" onClick={() => handleLoginModalOpen("login")}>登入</button>
            </div>
          </>
          
          ) }
          
        </div>
      </div>
    </div>

    
    
  </>)
}

export default LoginModal;