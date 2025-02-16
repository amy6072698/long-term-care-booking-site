import { useEffect, useRef, useState } from "react";


// 匯入 Modal
import { Modal } from 'bootstrap';
import axios from "axios";



function LoginModal({
  isOpen,
  setIsOpen,
  modalMode,
  setModalMode,
  handleLoginModalOpen
}){

  const loginModalRef = useRef(null);


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
                <form action="" className="d-flex flex-column justify-content-center">
                  
                  <div className="input-group border-1 border-bottom py-6">
                    <label htmlFor="account" className="input-group-text border-0 fs-6 py-0 px-3 bg-white">帳號：</label>
                    <input type="email" className="form-control border-0 rounded-2 fs-6 py-0 px-3" id="account" placeholder="您的電子信箱" aria-label="Account" autoComplete="email"/>
                  </div>
                  <div className="input-group border-1 border-bottom py-6">
                    <label htmlFor="loginPassword" className="input-group-text border-0 fs-6 py-0 px-3 bg-white">密碼：</label>
                    <input type="password" className="form-control border-0 rounded-2 fs-6 py-0 px-3" id="loginPassword" placeholder="請輸入密碼" aria-label="Password" autoComplete="current-password"/>
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
              <form action="" className="d-flex flex-column justify-content-center">
                <div className="input-group border-1 border-bottom py-6">
                  <label htmlFor="email" className="input-group-text border-0 fs-6 py-0 px-3 bg-white">電子信箱：</label>
                  <input type="email" className="form-control border-0 rounded-2 fs-6 py-0 px-3" id="email" placeholder="作為帳號使用" aria-label="Email" autoComplete="email"/>
                </div>
                <div className="input-group border-1 border-bottom py-6">
                  <label htmlFor="password" className="input-group-text border-0 fs-6 py-0 px-3 bg-white">密碼：</label>
                  <input type="password" className="form-control border-0 rounded-2 fs-6 py-0 px-3" id="password" placeholder="設定密碼" aria-label="Password" autoComplete="current-password"/>
                </div>
                <div className="input-group border-1 border-bottom py-6">
                  <label htmlFor="name" className="input-group-text border-0 fs-6 py-0 px-3 bg-white">姓名：</label>
                  <input type="text" className="form-control border-0 rounded-2 fs-6 py-0 px-3" id="name" placeholder="陳小明" aria-label="Name" autoComplete="username"/>
                </div>
                <div className="input-group d-flex align-items-center gap-3 border-1 border-bottom py-6">
                  <span className="input-group-text border-0 fs-6 py-0 px-3 bg-white">性別：</span>
                  <div className="form-check fs-6">
                    <input className="form-check-input" type="radio" name="gender" id="male" defaultChecked/>
                    <label className="form-check-label" htmlFor="male">
                      男
                    </label>
                  </div>
                  <div className="form-check fs-6 ms-2">
                    <input className="form-check-input" type="radio" name="gender" id="female"/>
                    <label className="form-check-label" htmlFor="female">
                      女
                    </label>
                  </div>
                </div>
                <div className="input-group border-1 border-bottom py-6">
                  <label htmlFor="birth" className="input-group-text border-0 fs-6 py-0 px-3 bg-white">生日：</label>
                  <input type="date" className="form-control border-0 rounded-2 fs-6 py-0 px-3" id="birth" aria-label="Birthday"/>
                </div>
                <div className="input-group border-1 border-bottom py-6">
                  <label htmlFor="phone" className="input-group-text border-0 fs-6 py-0 px-3 bg-white">電話：</label>
                  <input type="tel" className="form-control border-0 rounded-2 fs-6 py-0 px-3" id="phone" placeholder="0912-345-678" aria-label="Phone"/>
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