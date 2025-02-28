import BannerNoSearch from "../components/BannerNoSearch";
import { useForm } from "react-hook-form";

export default function Checkout() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    // reset,
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <main className="checkout">
      <BannerNoSearch />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="container py-11 bg-white"
      >
        <div className="row justify-content-center ">
          <div className="col-md-10 col-12">
            {/* 訂單資訊 */}
            <div className=" checkout-border-primary rounded-2 overflow-hidden mb-11">
              <div className="bg-primary-30  px-5 py-4 ">
                <h6>訂單資訊</h6>
              </div>
              {/* 機構資訊 */}
              <div>
                <div className="d-flex flex-wrap flex-lg-nowrap gap-7">
                  <img
                    className="w-100"
                    src="src/assets/images/Building/B-01.png"
                    alt="機構照片"
                  />
                  <div className="d-flex flex-column row-gap-5 pt-7 px-7 px-lg-0 pb- py-lg-7 pe-lg-7 w-100">
                    <h5>康福護理苑</h5>
                    <div className="d-flex">
                      <i
                        className="bi bi-geo-alt-fill"
                        style={{ color: "#ea8c55" }}
                      ></i>
                      <div className="fs-7">新北市板橋區中山路Ｆ</div>
                    </div>
                    <div className="d-flex gap-4 justify-content-between  align-items-center">
                      <div
                        style={{ width: "52px" }}
                        className="fs-8 flex-shrink-0 text-nowrap"
                      >
                        入住日期
                      </div>
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
                      <div
                        style={{ width: "52px" }}
                        className=" flex-shrink-0 fs-8  text-nowrap "
                      >
                        房型
                      </div>
                      <select
                        {...register("option", { required: "請選擇一個選項" })}
                        defaultValue=""
                        className="form-select py-5 checkout-border-primary"
                        aria-label="Default select example"
                      >
                        <option value="" disabled>
                          選擇房型
                        </option>
                        <option value="三人房">三人房</option>
                        <option value="單人房">單人房</option>
                        <option value="六人房">六人房</option>
                      </select>
                    </div>
                    {errors.option && (
                      <small className="text-danger">
                        {errors.option.message}
                      </small>
                    )}
                    <div>
                      <div className="fs-8 d-flex justify-content-end">
                        單人房型
                      </div>
                      <div className="d-flex gap-1 gap-lg-4 justify-content-between align-items-center">
                        <div className="fs-7 ">留床費用</div>
                        <div className="d-flex">
                          <h5>NTD 5000</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <hr />
              {/* 請填寫入住者資料 */}
              <div className="pt-7 pb-11 px-8">
                <div className="d-flex flex-column row-gap-5">
                  <h6>請填寫入住者資料</h6>
                  {/* 姓名 */}
                  <div className="d-flex gap-5 justify-content-between">
                    <div className="w-50">
                      <label htmlFor="name" className="form-label">
                        姓名<span className="text-danger">*</span>
                      </label>
                      <div className="input-group">
                        <input
                          {...register("name", {
                            required: "請填寫姓名",
                          })}
                          placeholder="您的大名"
                          type="text"
                          className="form-control px-2 py-2 checkout-border-primary"
                          id="name"
                          aria-describedby="basic-addon3 basic-addon4"
                        />
                      </div>
                      {errors.name && (
                        <p className="text-danger my-2">
                          {errors.name?.message}
                        </p>
                      )}
                    </div>
                    <div className="w-50">
                      <label htmlFor="phone" className="form-label">
                        行動電話<span className="text-danger">*</span>
                      </label>
                      <div className="input-group">
                        <input
                         {...register("tel", {
                          required: "電話必填",
                          pattern: {
                            value: /^(0[2-8]\d{7}|09\d{2}-\d{3}-\d{3})$/,
                            message: "電話格式錯誤",
                          },
                        })}
                          placeholder="09XX-XXX-XXX"
                          type="tel"
                          className="form-control px-2 py-2 checkout-border-primary"
                          id="phone"
                          aria-describedby="basic-addon3 basic-addon4"
                        />
                      </div>
                      {errors.tel && (
                        <p className="text-danger my-2">
                          {errors.tel?.message}
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
                      <label htmlFor="email" className="form-label">
                        E-mail<span className="text-danger">*</span>
                      </label>
                      <div className="input-group">
                        <input
                          {...register("email", {
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
                          placeholder="example@email.com"
                          type="text"
                          className="form-control px-2 py-2 checkout-border-primary"
                          id="email"
                          aria-describedby="basic-addon3 basic-addon4"
                        />
                      </div>
                      {errors.email && (
                        <p className="text-danger my-2">
                          {errors.email?.message}
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
                          id="message"
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
                    <label htmlFor="name" className="form-label">
                      信用卡號<span className="text-danger">*</span>
                    </label>
                    <div className="input-group">
                      <input
                        {...register("cardNumber", {
                          required: "請輸入信用卡號",
                          pattern: {
                            value:
                              /^(\d{4}-){3}\d{4}$|^(\d{4}-){2}\d{4}-\d{3}$/,
                            message:
                              "信用卡號碼格式不正確。請輸入16位或15位數字，並以XXXX-XXXX-XXXX-XXXX或XXXX-XXXX-XXXX-XXX的格式呈現",
                          },
                        })}
                        placeholder="0000-0000-0000-0000"
                        type="text"
                        className="form-control px-2 py-2 checkout-border-primary"
                        id="name"
                        aria-describedby="basic-addon3 basic-addon4"
                      />
                    </div>
                    {errors.cardNumber && (
                      <p className="text-danger my-2">
                        {errors.cardNumber.message}
                      </p>
                    )}
                  </div>
                  <div className="w-50">
                    <label htmlFor="phone" className="form-label">
                      有效日期<span className="text-danger">*</span>
                    </label>
                    <div className="input-group">
                      <input
                        {...register("expiryDate", {
                          required: "請輸入有效日期",
                          pattern: {
                            // 格式為 MM/YY，月份為 01-12，年份為兩位數
                            value: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
                            message: "請以 MM/YY 格式輸入有效日期",
                          },
                          validate: {
                            // 驗證日期是否已過期
                            notExpired: (value) => {
                              const [month, year] = value.split("/");
                              const expiryDate = new Date(
                                2000 + parseInt(year),
                                parseInt(month) - 1,
                                1
                              );
                              const today = new Date();
                              return expiryDate > today || "信用卡已過期";
                            },
                          },
                        })}
                        placeholder="DD/YY"
                        type="tel"
                        className="form-control px-2 py-2 checkout-border-primary"
                        id="phone"
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
                  <label htmlFor="phone" className="form-label">
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
                      type="tel"
                      className="form-control px-2 py-2 checkout-border-primary"
                      id="phone"
                      aria-describedby="basic-addon3 basic-addon4"
                    />
                  </div>
                  {errors.cvv && (
                    <p className="text-danger my-2">{errors.cvv.message}</p>
                  )}
                </div>
                <div className="d-flex gap-2  justify-content-end">
                  <div className="fs-7 align-self-end">付款金額</div>
                  <h5>NTD 5,000</h5>
                </div>
              </div>
            </div>
            {/* 按鈕 */}
            <div className="d-flex gap-6">
              <button
                type="button"
                onClick={() => {}}
                className="btn btn-outline-primary-40 py-4 w-100  d-flex justify-content-center align-items-center gap-2"
              >
                上一步
              </button>

              <button
                type="submit"
                // onClick={() => {}}
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
