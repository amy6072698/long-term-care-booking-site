import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;


export default function AccountProfile() {

  const [ userInfo, setUserInfo ] = useState({});
  const [ editingKey, setEditingKey ] = useState(null);

  // 用 React Hook Form 驗證表單
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();


  const getUserinfo = useCallback( async() => {
    try {
      const id = document.cookie.replace(
        /(?:(?:^|.*;\s*)myUserId\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
      );
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)myToken\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
      );

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const res = await axios.get(`${BASE_URL}/600/users/${id}`);
      setUserInfo({...res.data, address: res.data.address || ''});

      Object.keys(res.data).forEach((key) => setValue(key, res.data[key] || ''));

    } catch (error) {
      alert(`取得使用者資料失敗：${error.message}`);
    }
  },[setValue]);

  useEffect(() => {
    getUserinfo();
  }, [getUserinfo])

  // 修改資料API
  const patchUserinfo = async(key, value) => {
    try {
      const id = document.cookie.replace(
        /(?:(?:^|.*;\s*)myUserId\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
      );
      await axios.patch(`${BASE_URL}/600/users/${id}`,{
        [key]: value
      });
    } catch (error) {
      alert(`更新失敗，請稍後再試：${error.message}`);
    }
  }

  

  const handleEditClick = (e, key) => {
    e.preventDefault();
    setEditingKey(key);
  }
  const handleSaveClick = (data, key) => {
    
    const newValue = data[key];

    setUserInfo({
      ...userInfo,
      [key]: newValue,
    })
    setEditingKey(null);
    patchUserinfo(key, newValue);

  }

  return (
  <>
    <div className="text-primary-100">
      <h4 className="mb-2">個人資料</h4>
      <p className="mb-10">更新個人資訊與用途查看</p> 
    </div>
    <form onSubmit={handleSubmit((data) => handleSaveClick(data, editingKey))} action="">
      {/* 姓名 */}
      <div className="mb-3 row">

        <label htmlFor="profileName" className="col-sm-2 col-form-label text-primary-80 py-1">姓名</label>
        {editingKey === 'name' ? (<>
          <div className="col">
            <input 
            {...register("name",{
              required: "姓名欄位必填"
            })} 
            type="text" className={`form-control ${errors.name && 'is-invalid'}`} id="profileName"/>
            {errors.name && <p className="text-danger mt-1">{errors.name.message}</p>}
          </div>
          <div className="col-xxl-1 col-sm-2 col-3 d-flex flex-column">
            <button 
            type="button"
            onClick={(e) => handleEditClick(e, null)}
            className="btn btn-link link-primary-80 py-1 px-1 float-end">
              取消
            </button>
          
            <button 
            type="submit"
            className="btn btn-outline-secondary-40 py-1 px-1">
              保存
            </button>
          </div>
        </>):(<>
          <div className="col">
            <p className="py-1">{userInfo.name}</p>
          </div>
          <div className="col-xxl-1 col-sm-2 col-3">
            <button 
            type="button"
            onClick={(e) => handleEditClick(e, 'name')}
            className="btn btn-link link-primary-80 py-1 px-1 float-end">
              編輯
            </button>
          </div>
        </>)}
      </div>

      {/* 電子信箱 */}
      <div className="mb-3 row">
        <label htmlFor="profileEmail" className="col-sm-2 col-form-label text-primary-80 py-1">電子信箱</label>
        {editingKey === 'email' ? (<>
          <div className="col">
            <input 
            {...register("email",{
              required: "Email 欄位必填",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Email 格式錯誤"
              }
            })}
            type="email" className={`form-control ${errors.email && 'is-invalid'}`} id="profileEmail"/>
            {errors.email && <p className="text-danger mt-1">{errors.email.message}</p>}
          </div>
          <div className="col-xxl-1 col-sm-2 col-3 d-flex flex-column">
            <button 
            type="button"
            onClick={(e) => handleEditClick(e, null)}
            className="btn btn-link link-primary-80 py-1 px-1 float-end">
              取消
            </button>
          
            <button 
            type="submit"
            className="btn btn-outline-secondary-40 py-1 px-1">
              保存
            </button>
          </div>

        </>):(<>
          <div className="col">
            <p className="py-1">{userInfo.email}</p>
          </div>
          <div className="col-xxl-1 col-sm-2 col-3">
            <button 
            type="button"
            onClick={(e) => handleEditClick(e, 'email')}
            className="btn btn-link link-primary-80 py-1 px-1 float-end">
              編輯
            </button>
          </div>
        </>)}
        
      </div>

      {/* 電話 */}
      <div className="mb-3 row">
        
        <label htmlFor="profilePhone" className="col-sm-2 col-form-label text-primary-80 py-1">電話</label>
        {editingKey === 'phone' ? (<>
          <div className="col">
            <input 
            {...register("phone",{
              required: "電話欄位必填",
              pattern: {
                value: /^(0[2-8]\d{7}|09\d{8})$/,
                message: "電話格式錯誤"
              }
            })} 
            type="tel" className={`form-control ${errors.phone && 'is-invalid'}`} id="profilePhone"/>
            {errors.phone && <p className="text-danger mt-1">{errors.phone.message}</p>}
          </div>
          <div className="col-xxl-1 col-sm-2 col-3 d-flex flex-column">
            <button 
            type="button"
            onClick={(e) => handleEditClick(e, null)}
            className="btn btn-link link-primary-80 py-1 px-1 float-end">
              取消
            </button>
          
            <button 
            type="submit"
            className="btn btn-outline-secondary-40 py-1 px-1">
              保存
            </button>
          </div>

        </>):(<>
          <div className="col">
            <p className="py-1">{userInfo.phone}</p>
          </div>
          <div className="col-xxl-1 col-sm-2 col-3">
            <button 
            type="button"
            onClick={(e) => handleEditClick(e, 'phone')}
            className="btn btn-link link-primary-80 py-1 px-1 float-end">
              編輯
            </button>
          </div>
        </>)}
      </div>

      {/* 生日 */}
      <div className="mb-3 row">

        <label htmlFor="profileBirthday" className="col-sm-2 col-form-label text-primary-80 py-1">生日</label>
        {editingKey === 'birthday' ? (<>
          <div className="col">
            <input 
            {...register("birthday",{
              required: "生日欄位必填"
            })}
            type="date" className={`form-control ${errors.birthday && 'is-invalid'}`} id="profileBirthday"/>
            {errors.birthday && <p className="text-danger mt-1">{errors.birthday.message}</p>}
          </div>
          <div className="col-xxl-1 col-sm-2 col-3 d-flex flex-column">
            <button 
            type="button"
            onClick={(e) => handleEditClick(e, null)}
            className="btn btn-link link-primary-80 py-1 px-1 float-end">
              取消
            </button>
          
            <button 
            type="submit"
            className="btn btn-outline-secondary-40 py-1 px-1">
              保存
            </button>
          </div>

        </>):(<>
          <div className="col">
            <p className="py-1">{userInfo.birthday}</p>
          </div>
          <div className="col-xxl-1 col-sm-2 col-3">
            <button 
            type="button"
            onClick={(e) => handleEditClick(e, 'birthday')}
            className="btn btn-link link-primary-80 py-1 px-1 float-end">
              編輯
            </button>
          </div>
        </>)}

        
      </div>

      {/* 通訊地址 */}
      <div className="mb-3 row">

        <label htmlFor="profileAddress" className="col-sm-2 col-form-label text-primary-80 py-1">通訊地址</label>
        {editingKey === 'address' ? (<>
          <div className="col">
            <input 
            {...register("address")}
            type="text" className="form-control" id="profileEmail"/>
          </div>
          <div className="col-xxl-1 col-sm-2 col-3 d-flex flex-column">
            <button 
            type="button"
            onClick={(e) => handleEditClick(e, null)}
            className="btn btn-link link-primary-80 py-1 px-1 float-end">
              取消
            </button>
          
            <button 
            type="submit"
            className="btn btn-outline-secondary-40 py-1 px-1">
              保存
            </button>
          </div>
        </>):(<>
          <div className="col">
            <p className="py-1">{userInfo.address || "尚未填寫地址"}</p>
          </div>
          <div className="col-xxl-1 col-sm-2 col-3">
            <button 
            type="button"
            onClick={(e) => handleEditClick(e, 'address')}
            className="btn btn-link link-primary-80 py-1 px-1 float-end">
              編輯
            </button>
          </div>
        </>)}
      </div>

      {/* 性別 */}
      <div className="mb-3 row">

        <label htmlFor="profileGender" className="col-sm-2 col-form-label text-primary-80 py-1">性別</label>
        {editingKey === 'gender' ? (<>
          <div className="col">
            <div className="form-check form-check-inline fs-6">
              <input
              {...register("gender", {
                required: "性別欄位必填"
              })}
              value="male"
              className={`form-check-input ${errors.gender && 'is-invalid'}`} type="radio" id="profileMale"/>
              <label className="form-check-label fs-7" htmlFor="profileMale">
                男
              </label>
            </div>
            <div className="form-check form-check-inline fs-6">
              <input 
              {...register("gender",  {
                required: "性別欄位必填"
              })}
              value="female"
              className={`form-check-input ${errors.gender && 'is-invalid'}`} type="radio" id="profileFemale"/>
              <label className="form-check-label fs-7" htmlFor="profileFemale">
                女
              </label>
            </div>
            {errors.gender && <p className="text-danger mt-1">{errors.gender.message}</p>}
          </div>
          <div className="col-xxl-1 col-sm-2 col-3 d-flex flex-column">
            <button 
            type="button"
            onClick={(e) => handleEditClick(e, null)}
            className="btn btn-link link-primary-80 py-1 px-1 float-end">
              取消
            </button>
          
            <button 
            type="submit"
            className="btn btn-outline-secondary-40 py-1 px-1">
              保存
            </button>
          </div>

        </>):(<>
          <div className="col">
            <p className="py-1">{userInfo.gender === 'male' ? '男': '女'}</p>
          </div>
          <div className="col-xxl-1 col-sm-2 col-3">
            <button 
            type="button"
            onClick={(e) => handleEditClick(e, 'gender')}
            className="btn btn-link link-primary-80 py-1 px-1 float-end">
              編輯
            </button>
          </div>
        </>)}
      </div>
    </form>
  </>)

};