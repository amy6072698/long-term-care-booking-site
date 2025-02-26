import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";


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

  // const [users, setUsers] = useState({
  //   "email": "",
  //   "password": "",
  //   "name": "",
  //   "gender": "male",
  //   "birthday": "",
  //   "phone": ""
  // });

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

  // // 處理輸入框寫入
  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;

  //   setUsers({
  //     ...users,
  //     [name]: value
  //   });
  // }

  // 表單驗證
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
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
      reset();
      handleLoginModalOpen("login");
    } catch (error) {
      alert("註冊失敗")
    }
  }

  // 登入 API
  const logIn = async(data) => {
    try {
      const res = await axios.post(`${BASE_URL}/login`, data)
      
      const token = res.data.accessToken;

      // json-server-auth 預設 1 小時 token 失效，宣告失效時間變數 expired，並做時間處理
      const expired = new Date();
      expired.setTime(expired.getTime() + 60 * 60 * 1000);

      document.cookie = `${res.data.user.id}Token=${token}; expires=${expired.toUTCString()}`;

      axios.defaults.headers.common['Authorization'] = token;
      reset();
      setIsLogin(true);
      handleLoginModalClose();
    } catch (error) {
      alert("登入失敗")
    }
  }

  // // 登入表單送出
  // const handleLogin = (e) => {
  //   e.preventDefault();
  //   logIn();
  // }

  // // 註冊表單送出
  // const handleSignup = (e) => {
  //   e.preventDefault();
  //   signUp();
  // }

  const onSubmitSignup = handleSubmit((data) => {
    console.log(data);

    signUp(data);

  })

  const onSubmitLogin = handleSubmit((data) => {
    console.log(data);
    const { email, password } = data;
    const logInData = {
      email,
      password
    }

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
          {modalMode === "login" ? (
            <>
              <div className="modal-body py-0 px-14">
                <h5 className="modal-title text-center mb-4" id="logInModalToggleLabel">帳號登入</h5>
                <form onSubmit={onSubmitLogin} className="d-flex flex-column justify-content-center">
                  
                  <label htmlFor="account" className="fs-6">帳號：</label>
                  <input 
                  {...register("email",{
                    required: "Email 欄位必填",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Email 格式錯誤"
                    }
                  })} 
                  type="email" 
                  className={`form-control rounded-1 fs-6 py-1 mt-1 ${errors.email ? 'is-invalid mb-1' : 'mb-6 border-primary-50'}`} id="account" placeholder="您的電子信箱" aria-label="Account" autoComplete="email"/>

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