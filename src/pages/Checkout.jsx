import BannerNoSearch from "../components/BannerNoSearch";

export default function Checkout() {
  return (
    <main className="checkout">
      <BannerNoSearch />
      <section className="container py-11">
        <div className="row justify-content-center">
          <div className="col-10">
            <div className=" checkout-border-primary rounded-2 overflow-hidden">
              <div className="bg-primary-30  px-5 py-4 ">
                <h6>訂單資訊</h6>
              </div>

              {/* 機構資訊 */}
              <div>
                <div className="d-flex  gap-7">
                  <img
                    src="src/assets/images/Building/B-01.png"
                    alt="機構照片"
                  />
                  <div className="d-flex flex-column row-gap-5 py-7 pe-7 w-100">
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
                          type="date"
                          className="form-control  py-4"
                          aria-describedby="basic-addon1"
                        />
                      </div>
                    </div>
                    <div className="d-flex gap-4 justify-content-between align-items-center">
                      <div
                        style={{ width: "52px" }}
                        className=" flex-shrink-0 fs-8  text-nowrap "
                      >
                        房型
                      </div>
                      <select
                        defaultValue="三人房"
                        className="form-select py-5 checkout-border-secondary"
                        aria-label="Default select example"
                      >
                        <option value="三人房">三人房</option>
                        <option value="單人房">單人房</option>
                        <option value="六人房">六人房</option>
                      </select>
                    </div>
                    <div>
                      <div className="fs-8 d-flex justify-content-end">
                        單人房型
                      </div>
                      <div className="d-flex gap-4 justify-content-between align-items-center">
                        <div className="fs-5 ">留床費用</div>
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
                  <div className="d-flex gap-5 justify-content-between">
                    <div className="w-50">
                      <label htmlFor="name" className="form-label">
                        姓名<span className="text-danger">*</span>
                      </label>
                      <div className="input-group">
                        <input
                          placeholder="您的大名"
                          type="text"
                          className="form-control"
                          id="name"
                          aria-describedby="basic-addon3 basic-addon4"
                        />
                      </div>
                    </div>
                    <div className="w-50">
                      <label htmlFor="tel" className="form-label">
                        行動電話<span className="text-danger">*</span>
                      </label>
                      <div className="input-group">
                        <input
                          placeholder="09XX-XXX-XXX"
                          type="tex"
                          className="form-control"
                          id="tel"
                          aria-describedby="basic-addon3 basic-addon4"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
