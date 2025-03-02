import { useContext, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

// 匯入 Modal
import { Modal } from 'bootstrap';

import axios from "axios";

// 將 FrontLayout 中的 UserContext 匯入
import { UserContext } from '../pages/FrontLayout';

const BASE_URL = import.meta.env.VITE_BASE_URL;

function LoginModal({
  // 引入在 Header 寫的內容(名稱為自訂義)
  isOpen,
  setIsOpen,
  modalMode,
  handleLoginModalOpen
}){

  // 用 useRef 取得要控制的 Modal DOM 元素 
  // const loginModalRef = useRef(null);

  // 用 useContext 引入 setIsLogin, setUserName
  const { setIsLogin } = useContext(UserContext);
  const { setUserName } = useContext(UserContext);
  const { loginModalRef } = useContext(UserContext);


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


  // 用 React Hook Form 驗證表單
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    // 表單預設值
    defaultValues: {
      email: "",
      password: "",
      name: "",
      gender: "",
      birthday: "",
      phone: ""
    }
  });

  // 註冊 API
  const signUp = async(data) => {
    try {
      await axios.post(`${BASE_URL}/signup`, data);

      // 註冊後刷新清空表單內容
      reset();

      // 註冊後自動切換到登入 Modal 
      handleLoginModalOpen("login");
    } catch (error) {
      console.error(error);
      alert("註冊失敗")
    }
  }

  // 登入 API
  const logIn = async(data) => {
    try {
      const res = await axios.post(`${BASE_URL}/login`, data)
      // console.log(res.data);

      const id = res.data.user.id; // 使用者的 id
      const token = res.data.accessToken; // 使用者的 token
      const name = res.data.user.name; // 使用者的 name

      // json-server-auth 預設 1 小時 token 失效，宣告失效時間變數 expired，並做時間處理
      const expired = new Date();
      expired.setTime(expired.getTime() + 60 * 60 * 1000);

      // 將使用者 token 和 id 存入 cookie 避免網頁重整失去資料
      document.cookie = `myToken=${token}; expires=${expired.toUTCString()}; path=/;`;
      document.cookie = `myUserId=${id}; expires=${expired.toUTCString()}; path=/;`;

      // 用 axios 將 token 預設帶入 header
      axios.defaults.headers.common['Authorization'] = token;

      // 把使用者的 name 更新到 userName
      setUserName(name);

      // 登入後刷新清空表單內容
      reset();

      // 將 isLogin 設為 true 表示已登入
      setIsLogin(true);

      // 自動關閉登入的 Modal
      handleLoginModalClose();
    } catch (error) {
      console.error(error);
      alert("登入失敗")
    }
  }

  // 用 React Hook Form 中的方法 handleSubmit 來提交表單內容
  const onSubmitSignup = handleSubmit((data) => {
    // console.log(data);
    signUp(data);
  })

  const onSubmitLogin = handleSubmit((data) => {
    // console.log(data);

    // 從 data 解構出使用者填入的 email 和 password 
    const { email, password } = data;
    const logInData = {
      email,
      password
    }

    // 將解構後的新資料帶入 logIn 
    logIn(logInData);
  })


  return (
  <>
    
    <div ref={loginModalRef} className="modal fade" id="logInModal" aria-labelledby="logInModalToggleLabel" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header border-bottom-0">
            <button type="button" className="btn-close" aria-label="Close" onClick={handleLoginModalClose}></button>
          </div>

          {/* 用從 Header 引入的 modalMode 判斷要開啟哪個 Modal */}
          {modalMode === "login" ? (
            // 登入的 Modal
            <>
              <div className="modal-body py-0 px-14">
                <h5 className="modal-title text-center mb-4" id="logInModalToggleLabel">帳號登入</h5>
                <form onSubmit={onSubmitLogin} className="d-flex flex-column justify-content-center">
                  
                  <label htmlFor="account" className="fs-6">帳號：</label>
                  <input 
                  // 用 React Hook Form 中的 register 撰寫 input 表單驗證內容
                  {...register("email",{  // 這行的 "email" 是 input 的 name 屬性值
                    required: "Email 欄位必填",  // 必填錯誤訊息
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,  // email 格式驗證
                      message: "Email 格式錯誤"  // 格式驗證錯誤訊息
                    }
                  })} 
                  type="email" 
                  // 用 React Hook Form 中的 formState 裡的 errors 判斷送出值是否有錯誤，有就在 className 加入 bs 的表單驗證樣式 is-invalid ，其他 mb-1 mb-6 border-primary-50 為調整版面用
                  className={`form-control rounded-1 fs-6 py-1 mt-1 ${errors.email ? 'is-invalid mb-1' : 'mb-6 border-primary-50'}`} id="account" placeholder="您的電子信箱" aria-label="Account" autoComplete="email"/>

                  {/* 用 React Hook Form 中的 formState 裡的 errors 判斷送出值是否有錯誤，有就帶入錯誤訊息內容到 p 標籤 */}
                  {errors.email && <p className="text-danger mb-6">{errors.email.message}</p>}

                  <label htmlFor="loginPassword" className="fs-6">密碼：</label>
                  <input 
                  {...register("password", {
                    required: "密碼欄位必填",
                    minLength: {
                      value: 6,
                      message: "密碼長度最少 6 碼"
                    }
                  })} 
                  type="password" className={`form-control rounded-1 fs-6 py-1 mt-1 ${errors.password ? 'is-invalid mb-1' : 'mb-10 border-primary-50'}`} id="loginPassword" placeholder="請輸入密碼" aria-label="Password" autoComplete="current-password"/>

                  {errors.password && <p className="text-danger mb-10">{errors.password.message}</p>}

                  <a href="#" className="ms-auto mb-4 link-secondary-40">忘記密碼</a>
                  <button type="submit" className="btn btn-primary-40 custom-primary-btn fs-6 p-4">登入</button>
                </form>
              </div>
              <div className="modal-footer d-flex justify-content-center border-top-0 px-5 pt-5 pb-9">
                <p className="d-inline">還沒有帳號？</p>
                <button className="btn p-0 link-secondary-40 border-0" type="button" onClick={() => handleLoginModalOpen("signup")}>註冊</button>
              </div>
            </>
          ) : (
          // 註冊的 Modal
          <>
            <div className="modal-body py-0 px-14">
              <h5 className="modal-title text-center mb-4" id="logInModalToggleLabel">註冊</h5>
              <form onSubmit={onSubmitSignup} className="d-flex flex-column justify-content-center">
                <label htmlFor="email" className="fs-6">電子信箱</label>
                <input
                {...register("email",{
                  required: "Email 欄位必填",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Email 格式錯誤"
                  }
                })} 
                type="email" className={`form-control rounded-1 fs-6 py-1 mt-1 ${errors.email ? 'is-invalid mb-1' : 'mb-6 border-primary-50'}`} id="email" placeholder="作為帳號使用" aria-label="Email" autoComplete="email"/>

                {errors.email && <p className="text-danger mb-6">{errors.email.message}</p>}


                <label htmlFor="password" className="fs-6">密碼</label>
                <input
                {...register("password",{
                  required: "密碼欄位必填",
                  minLength: {
                    value: 6,
                    message: "密碼長度最少 6 碼"
                  }
                })} 
                type="password" className={`form-control rounded-1 fs-6 py-1 my-1 ${errors.password ? 'is-invalid mb-1' : 'mb-6 border-primary-50'}`} id="password" placeholder="設定密碼" aria-label="Password" autoComplete="current-password"/>

                {errors.password && <p className="text-danger mb-6">{errors.password.message}</p>}

                
                <label htmlFor="name" className="fs-6">姓名</label>
                <input
                {...register("name",{
                  required: "姓名欄位必填"
                })} 
                type="text" className={`form-control rounded-1 fs-6 py-1 my-1 ${errors.name ? 'is-invalid mb-1' : 'mb-6 border-primary-50'}`} id="name" placeholder="陳小明" aria-label="Name" autoComplete="username"/>

                {errors.name && <p className="text-danger mb-6">{errors.name.message}</p>}

                <div>
                  <p className="fs-6">性別</p>

                  <div className="form-check form-check-inline fs-6">
                    <input
                    {...register("gender", {
                      required: "性別欄位必填"
                    })} value="male" 
                    className={`form-check-input ${errors.gender ? 'is-invalid mb-1' : 'mb-6 border-primary-50'}`} type="radio" 
                    id="male"/>
                    <label className="form-check-label" htmlFor="male">
                      男
                    </label>
                  </div>
                  <div className="form-check form-check-inline fs-6">
                    <input 
                    {...register("gender",  {
                      required: "性別欄位必填"
                    })} value="female" 
                    className={`form-check-input ${errors.gender ? 'is-invalid mb-1' : 'mb-6 border-primary-50'}`} type="radio" 
                    id="female"/>
                    <label className="form-check-label" htmlFor="female">
                      女
                    </label>
                  </div>

                  {errors.gender && <p className="text-danger mb-6">{errors.gender.message}</p>}

                </div>

                <label htmlFor="birthday" className="fs-6">生日</label>
                <input 
                {...register("birthday",{
                  required: "生日欄位必填"
                })}
                type="date" className={`form-control rounded-1 fs-6 py-1 my-1 ${errors.birthday ? 'is-invalid mb-1' : 'mb-6 border-primary-50'}`} id="birthday" aria-label="Birthday"/>

                {errors.birthday && <p className="text-danger mb-6">{errors.birthday.message}</p>}


                <label htmlFor="phone" className="fs-6">電話</label>
                <input 
                {...register("phone",{
                  required: "電話欄位必填",
                  pattern: {
                    value: /^(0[2-8]\d{7}|09\d{8})$/,
                    message: "電話格式錯誤"
                  }
                })} 
                type="tel" className={`form-control rounded-1 fs-6 py-1 my-1 ${errors.phone ? 'is-invalid mb-1' : 'mb-11 border-primary-50'}`} id="phone" placeholder="0912-345-678" aria-label="Phone"/>

                {errors.phone && <p className="text-danger mb-11">{errors.phone.message}</p>}
                
                <button type="submit" className="btn btn-primary-40 custom-primary-btn fs-6 p-4">註冊</button>
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