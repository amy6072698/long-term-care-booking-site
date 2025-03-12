import { useNavigate, useParams } from "react-router";
import BannerNoSearch from "../components/BannerNoSearch";
import { useForm, useWatch } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import Cleave from "cleave.js/react";
import "cleave.js/dist/addons/cleave-phone.TW";

let token;
let myUserId;
let selectProductId;

export default function Checkout() {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const [checkoutData, setCheckoutData] = useState({});
  const [price, setPrice] = useState(0);
  const [roomType, setRoomType] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue,
    setError,
    trigger,
    clearErrors,
  } = useForm({
    mode: "onChange",
  });

  //取得token和登入id、selectProductId
  const getToken = () => {
    document.cookie = "myToken";
    token = document.cookie.replace(
      /(?:(?:^|.*;\s*)myToken\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    myUserId = document.cookie.replace(
      /(?:(?:^|.*;\s*)myUserId\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    selectProductId = document.cookie.replace(
      /(?:(?:^|.*;\s*)selectProductId\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
  };

  //元件渲染完後觸發請求id
  //使用600無法的原因可能是products資料表中沒有userId做辨認
  //請求完資料後重設roomType的預設值
  useEffect(() => {
    getToken();
    (async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/products/${productId}`);
        setCheckoutData(data);
        setPrice(data.roomCards[0].price);
        setRoomType(data.roomCards[0].roomType);
      } catch (error) {}
    })();
  }, []);

  //處理提交
  const onSubmit = (data, e) => {
    // setTimeout(() => {
    e.preventDefault();
    console.log(data);
    handleCheckoutSuccess();
    addOrderItem(data);
    // }, 0);
  };

  const addOrderItem = async (data) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/600/orders`,
        {
          productId: Number(productId),
          userId: Number(myUserId),
          data: data,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  //處理結帳
  const handleCheckoutSuccess = async () => {
    try {
      await axios.delete(`${BASE_URL}/600/carts/${selectProductId}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      navigate("/checkoutSuccess");
      reset();
    } catch (error) {
      alert("結帳失敗");
    }
  };

  //監聽表單roomType，如有更動則賦予值到selectedRoomType
  const selectedRoomType = useWatch({
    control,
    name: "roomType",
  });

  // 尋找房型中符合的項目並賦予值到price中
  useEffect(() => {
    if (selectedRoomType) {
      const result = checkoutData.roomCards.find((item) => {
        return item.roomType === selectedRoomType;
      });
      setPrice(result.price);
      setRoomType(result.roomType);
    }
  }, [selectedRoomType]);

  // 判斷哪間發行信用卡並將規則回傳
  function getCreditCardType(cardNumber) {
    const visaPattern = /^4[0-9]{12}(?:[0-9]{3})?$/;
    const mastercardPattern = /^5[1-5][0-9]{14}$/;
    const amexPattern = /^3[47][0-9]{13}$/;
    const discoverPattern = /^6(?:011|5[0-9]{2})[0-9]{12}$/;
    const jcbPattern = /^(?:2131|1800|35\d{3})\d{11}$/;

    if (visaPattern.test(cardNumber)) {
      return { type: "Visa", length: 16 };
    } else if (mastercardPattern.test(cardNumber)) {
      return { type: "Mastercard", length: 16 };
    } else if (amexPattern.test(cardNumber)) {
      return { type: "American Express", length: 15 };
    } else if (discoverPattern.test(cardNumber)) {
      return { type: "Discover", length: 16 };
    } else if (jcbPattern.test(cardNumber)) {
      return { type: "JCB", length: 16 };
    } else {
      return { type: "Unknown", length: null };
    }
  }

  return (
    <main className="checkout">
      <BannerNoSearch />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="container py-11 bg-white"
      >
        <div className="row justify-content-center  ">
          {/* 進度條 */}
          <div className="col-6 d-flex align-items-center px-4 py-11">
            <div className="circle left-circle"></div>
            <div className="line left-line"></div>
            <div className="circle middle-circle"></div>
            <div className="line left-line"></div>
            <div className="circle middle-circle"></div>
          </div>
        </div>

        <div className="row justify-content-center ">
          <div className="col-md-10 col-12">
            {/* 訂單資訊 */}
            <div className=" checkout-border-primary rounded-2 overflow-hidden mb-11">
              <div className="bg-primary-30  px-5 py-4 ">
                <h6>訂單資訊</h6>
              </div>
              {/* 機構資訊 */}
              <div>
                <div className="d-flex justify-content-between  flex-wrap flex-lg-nowrap">
                  <img
                    className="object-fit-cover checkout-thumb-img"
                    src={checkoutData?.thumbs?.[0]}
                    alt="機構照片"
                  />
                  <div className="checkout-input d-flex flex-column row-gap-5 pt-7 px-7 px-lg-0 pt-lg-7 pe-lg-7">
                    <h5>{checkoutData?.name}</h5>
                    <div className="d-flex">
                      <i
                        className="bi bi-geo-alt-fill"
                        style={{ color: "#ea8c55" }}
                      ></i>
                      <div className="fs-7">{checkoutData?.address}</div>
                    </div>
                    <div className="d-flex gap-4 justify-content-between  align-items-center">
                      <label
                        style={{ width: "52px" }}
                        className="fs-8 flex-shrink-0 text-nowrap"
                        htmlFor="checkInDate"
                      >
                        入住日期
                      </label>
                      <div className="input-group mb-3">
                        <input
                          {...register("checkInDate", {
                            required: "請選擇入住日期",
                            validate: (value) => {
                              const selectedDate = new Date(value);
                              const today = new Date();
                              today.setHours(0, 0, 0, 0);
                              if (selectedDate < today) {
                                return "入住日請選擇今天或之後的日期";
                              }
                              return true;
                            },
                          })}
                          type="date"
                          id="checkInDate"
                          className="form-control  py-4 checkout-border-primary"
                          aria-describedby="basic-addon1"
                        />
                      </div>
                    </div>
                    {errors.checkInDate && (
                      <small className="text-danger">
                        {errors.checkInDate.message}
                      </small>
                    )}
                    <div className="d-flex gap-4 justify-content-between align-items-center">
                      <label
                        style={{ width: "52px" }}
                        className=" flex-shrink-0 fs-8  text-nowrap"
                        htmlFor="roomType"
                      >
                        房型
                      </label>
                      {checkoutData.roomCards && (
                        <select
                          {...register("roomType", {
                            required: "請選擇一個房型",
                          })}
                          defaultValue={checkoutData?.roomCards?.[0]?.roomType}
                          id="roomType"
                          className="form-select py-5
      checkout-border-primary"
                          aria-label="Default
      select example"
                        >
                          {checkoutData?.roomCards?.map((item) => {
                            return (
                              <option key={item.id} value={item.roomType}>
                                {item.roomType}
                              </option>
                            );
                          })}
                        </select>
                      )}
                    </div>
                    {errors.roomType && (
                      <small className="text-danger">
                        {errors.roomType.message}
                      </small>
                    )}
                    <div>
                      <div className="fs-8 d-flex justify-content-end">
                        {roomType}
                      </div>
                      <div className="d-flex gap-1 gap-lg-4 justify-content-between align-items-center">
                        <div className="fs-7 ">留床費用</div>
                        <div className="d-flex">
                          <h5>NTD {price?.toLocaleString()}</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <hr />
              {/*  */}
              {/* 請填寫入住者資料 */}
              <div className="pt-7 pb-11 px-8">
                <div className="d-flex flex-column row-gap-5">
                  <h6>請填寫入住者資料</h6>
                  {/* 姓名 */}
                  <div className="d-flex gap-5 justify-content-between">
                    <div className="w-50">
                      <label htmlFor="fullName" className="form-label">
                        姓名<span className="text-danger">*</span>
                      </label>
                      <div className="input-group">
                        <input
                          {...register("fullName", {
                            required: "請填寫姓名",
                          })}
                          id="fullName"
                          placeholder="您的大名"
                          type="text"
                          className="form-control px-2 py-2 checkout-border-primary"
                          aria-describedby="basic-addon3 basic-addon4"
                        />
                      </div>
                      {errors.fullName && (
                        <p className="text-danger my-2">
                          {errors.fullName?.message}
                        </p>
                      )}
                    </div>
                    <div className="w-50">
                      <label htmlFor="mobilePhone" className="form-label">
                        行動電話<span className="text-danger">*</span>
                      </label>
                      <div className="input-group">
                        <Cleave
                          options={{
                            phone: true,
                            // 格式設為台灣
                            phoneRegionCode: "TW",
                          }}
                          {...register("mobilePhone", {
                            required: "請輸入行動電話",
                          })}
                          onChange={(e) => {
                            const input = e.target;
                            //清理非數字格式並賦予值到formattedValue
                            const formattedValue = input.value.replace(
                              /\D/g,
                              ""
                            );
                            // 如果formattedValue長度大於10則跳轉
                            if (formattedValue.length >= 10) {
                              const nextInput =
                                document.getElementById("address");
                              if (nextInput) {
                                nextInput.focus();
                              }
                            }
                            setValue("mobilePhone", e.target.value);
                            // 手動驗證此欄位
                            trigger("mobilePhone");
                          }}
                          placeholder="0912 345 678"
                          id="mobilePhone"
                          type="tel"
                          className="form-control px-2 py-2 checkout-border-primary"
                          aria-describedby="basic-addon3 basic-addon4"
                        />
                      </div>
                      {errors.mobilePhone && (
                        <p className="text-danger my-2">
                          {errors.mobilePhone?.message}
                        </p>
                      )}
                    </div>
                  </div>
                  {/* 聯絡地址 */}
                  <div className="d-flex gap-5 justify-content-between">
                    <div className="w-50">
                      <label htmlFor="address" className="form-label">
                        聯絡地址<span className="text-danger">*</span>
                      </label>
                      <div className="input-group">
                        <input
                          {...register("address", {
                            required: "聯絡地址必填",
                          })}
                          placeholder="請輸入完整的聯絡地址"
                          type="text"
                          className="form-control px-2 py-2 checkout-border-primary"
                          id="address"
                          aria-describedby="basic-addon3 basic-addon4"
                        />
                      </div>
                      {errors.address && (
                        <p className="text-danger my-2">
                          {errors.address?.message}
                        </p>
                      )}
                    </div>
                    <div className="w-50">
                      <label htmlFor="mail" className="form-label">
                        E-mail<span className="text-danger">*</span>
                      </label>
                      <div className="input-group">
                        <input
                          {...register("mail", {
                            required: {
                              value: true,
                              message: "email必填",
                            },
                            pattern: {
                              value:
                                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                              message: "email格式錯誤",
                            },
                          })}
                          id="mail"
                          placeholder="example@email.com"
                          type="email"
                          className="form-control px-2 py-2 checkout-border-primary"
                          aria-describedby="basic-addon3 basic-addon4"
                        />
                      </div>
                      {errors.mail && (
                        <p className="text-danger my-2">
                          {errors.mail?.message}
                        </p>
                      )}
                    </div>
                  </div>
                  {/* 備註*/}
                  <div className="d-flex gap-5 justify-content-between">
                    <div className="w-100">
                      <label htmlFor="remark" className="form-label">
                        備註
                      </label>
                      <div className="input-group">
                        <input
                          {...register("message")}
                          placeholder="入住期間需要特別注意事項。"
                          type="text"
                          className="form-control px-2 py-2 checkout-border-primary"
                          id="remark"
                          aria-describedby="basic-addon3 basic-addon4"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 付款資料 */}
            <div className="checkout-border-primary rounded-2 overflow-hidden mb-11">
              <div className="bg-primary-30  px-5 py-4 ">
                <h6>付款資料</h6>
              </div>
              <div className="pt-7 pb-11 px-8">
                {/* 信用卡 */}
                <div className="mb-5 d-flex gap-5 justify-content-between">
                  <div className="w-50">
                    <label htmlFor="creditCard" className="form-label">
                      信用卡號<span className="text-danger">*</span>
                    </label>
                    <div className="input-group">
                      <Cleave
                        options={{
                          creditCard: true, // 自動套用信用卡格式
                          delimiter: " ", // 使用空格作為分隔符
                        }}
                        {...register("creditCard", {
                          required: "請輸入正確信用卡號碼",
                        })}
                        onChange={(e) => {
                          const input = e.target;
                          // 清理非數字格式並賦予值到formattedValue
                          const formattedValue = input.value.replace(/\D/g, "");
                          //判斷該卡長度及類型
                          const cardInfo = getCreditCardType(formattedValue);
                          // 如果該卡存在且輸入長度大於該卡長度則自動跳轉至下一格
                          if (
                            cardInfo.length &&
                            formattedValue.length >= cardInfo.length
                          ) {
                            const nextInput =
                              document.getElementById("expiryDate");
                            if (nextInput) {
                              nextInput.focus();
                            }
                            setValue("creditCard", e.target.value);
                            trigger("creditCard");
                          } else {
                            //當input長度小於該卡長度時，則清空creditCard
                            setValue("creditCard", "");
                            trigger("creditCard");
                          }
                        }}
                        placeholder="1234 5678 9012 3456"
                        id="creditCard"
                        type="text"
                        className="form-control px-2 py-2 checkout-border-primary"
                        aria-describedby="basic-addon3 basic-addon4"
                      />
                    </div>
                    {errors.creditCard && (
                      <p className="text-danger my-2">
                        {errors.creditCard.message}
                      </p>
                    )}
                  </div>
                  <div className="w-50">
                    <label htmlFor="expiryDate" className="form-label">
                      有效日期<span className="text-danger">*</span>
                    </label>
                    <div className="input-group">
                      <Cleave
                        options={{
                          date: true,
                          datePattern: ["m", "y"],
                        }}
                        {...register("expiryDate", {
                          required: "請輸入有效期限",
                        })}
                        onChange={(e) => {
                          const input = e.target;
                          const expiryDate = input.value;
                          let [month, year] = expiryDate.split("/");
                          // 獲取當前年份
                          const currentYear = new Date().getFullYear();
                          // 獲取當前月
                          const currentMonth = new Date().getMonth() + 1;
                          // 輸入年份
                          const chooseYear = parseInt(year) + 2000;
                          // 欲跳轉的input
                          const cvv = document.querySelector("#cvv");

                          // 輸入長度不滿5則值為空
                          if (expiryDate.length != 5) {
                            setValue("expiryDate", "");
                            // 判斷有效日期是否到期
                            return;
                          }
                          // 判斷是否過期
                          if (
                            chooseYear < currentYear ||
                            (currentYear == chooseYear && currentMonth >= month)
                          ) {
                            setError("expiryDate", {
                              type: "manual",
                              message: "信用卡已過期",
                            });
                            return;
                          }
                          cvv.focus();
                          // 未到期才寫入值
                          setValue("expiryDate", e.target.value);
                          // 手動驗證expiryDate
                          trigger("expiryDate");
                        }}
                        placeholder="MM/YY"
                        id="expiryDate"
                        type="text"
                        className="form-control px-2 py-2 checkout-border-primary"
                        aria-describedby="basic-addon3 basic-addon4"
                      />
                    </div>
                    {errors.expiryDate && (
                      <p className="text-danger my-2">
                        {errors.expiryDate.message}
                      </p>
                    )}
                  </div>
                </div>
                {/* 安全碼 */}
                <div className="w-100 mb-11">
                  <label htmlFor="cvv" className="form-label">
                    安全碼<span className="text-danger">*</span>
                  </label>
                  <div className="input-group">
                    <input
                      {...register("cvv", {
                        required: "安全碼為必填",
                        minLength: { value: 3, message: "安全碼至少 3 位數" },
                        maxLength: { value: 4, message: "安全碼最多 4 位數" },
                        pattern: {
                          value: /^\d+$/,
                          message: "安全碼只能是數字",
                        },
                      })}
                      placeholder="000"
                      type="text"
                      className="form-control px-2 py-2 checkout-border-primary"
                      id="cvv"
                      aria-describedby="basic-addon3 basic-addon4"
                    />
                  </div>
                  {errors.cvv && (
                    <p className="text-danger my-2">{errors.cvv.message}</p>
                  )}
                </div>
                <div className="d-flex gap-2  justify-content-end">
                  <div className="fs-7 align-self-end">付款金額</div>
                  <h5>NTD {price.toLocaleString()}</h5>
                </div>
              </div>
              {/*  */}
            </div>

            {/*  */}
            {/* 按鈕 */}
            <div className="d-flex gap-6">
              <button
                type="button"
                onClick={() => {
                  navigate(-1);
                }}
                className="btn btn-outline-primary-40 py-4 w-100  d-flex justify-content-center align-items-center gap-2"
              >
                上一步
              </button>

              <button
                type="submit"
                className="btn btn-primary-40 py-4 w-100  d-flex justify-content-center align-items-center gap-2"
              >
                確定付款
              </button>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
}
