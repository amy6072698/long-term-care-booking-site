

export default function OrderDetail() {


  return (
    <>
      <div className="main">
        <div className="OrderDetail-content">
          <div className="container">
            {/* 機構資訊 */}
            <div className="d-flex justify-content-center">
              <div className="card overflow-hidden" style={{maxWidth: 1076}}>
                <div className="row g-0">
                  {/* 左側圖片 */}
                  <div className="col-lg-5">
                    <div className="checkbox-relative h-100">
                      <img src="https://github.com/Jack-Xiao-2024/Project_D01/blob/main/assets/images/Building/B-07.png?raw=true" className="img-fluid card-img rounded-0 h-100" alt="building"/>
                    </div>
                  </div>
                  {/* 右側資訊 */}
                  <div className="col-lg-7">
                    <div className="card-body p-4">
                      <div className="infor mb-3">
                        <div className="checkbox d-flex justify-content-between mb-2">
                          <h5 className="card-title">康福護理苑</h5>
                        </div>
                        <div className="address d-flex">
                          <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 7.92285C1 12.7747 5.24448 16.7869 7.12319 18.3252C7.39206 18.5454 7.52811 18.6568 7.72871 18.7132C7.88491 18.7572 8.1148 18.7572 8.271 18.7132C8.47197 18.6567 8.60707 18.5463 8.87695 18.3254C10.7557 16.7871 14.9999 12.7751 14.9999 7.9233C14.9999 6.08718 14.2625 4.32605 12.9497 3.02772C11.637 1.72939 9.8566 1 8.00008 1C6.14357 1 4.36301 1.7295 3.05025 3.02783C1.7375 4.32616 1 6.08674 1 7.92285Z" fill="#EA8C55"/>
                            <path d="M6 7C6 8.10457 6.89543 9 8 9C9.10457 9 10 8.10457 10 7C10 5.89543 9.10457 5 8 5C6.89543 5 6 5.89543 6 7Z" fill="#EA8C55"/>
                            <path d="M1 7.92285C1 12.7747 5.24448 16.7869 7.12319 18.3252C7.39206 18.5454 7.52811 18.6568 7.72871 18.7132C7.88491 18.7572 8.1148 18.7572 8.271 18.7132C8.47197 18.6567 8.60707 18.5463 8.87695 18.3254C10.7557 16.7871 14.9999 12.7751 14.9999 7.9233C14.9999 6.08718 14.2625 4.32605 12.9497 3.02772C11.637 1.72939 9.8566 1 8.00008 1C6.14357 1 4.36301 1.7295 3.05025 3.02783C1.7375 4.32616 1 6.08674 1 7.92285Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M6 7C6 8.10457 6.89543 9 8 9C9.10457 9 10 8.10457 10 7C10 5.89543 9.10457 5 8 5C6.89543 5 6 5.89543 6 7Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <p className="fs-7 ps-1">台北市中正區中正路</p>
                        </div>
                      </div>
                      {/* date */}
                      <div className="date d-flex align-items-center mb-3">
                        <p className="fs-8 me-1">預定入住：</p>
                        <p className="fs-6">2024/10/01</p>
                      </div>
                      {/* 床位房型 */}
                      <div className="card-text d-flex justify-content-between align-items-end mb-2">
                        <div className="beds fs-7">留床費用</div>
                        <div className="room-info text-end">
                          <p className="room-tylie fs-8">單人房型</p>
                          <p className="romm-price fs-5">NTD 5,000</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* 使用者資訊 */}
                <div className="border-top p-11">
                  <h5 className="mb-7">入住者資訊</h5>
                  <div className="row">
                    <div className="col-md-6 mb-7">
                        <p className="mb-2 text-muted">姓名</p>
                        <p className="fs-6">陳小伶</p>
                    </div>
                    <div className="col-md-6 mb-7">
                        <p className="mb-2 text-muted">手機號碼</p>
                        <p className="fs-6">0975-877-565</p>
                    </div>
                    <div className="col-md-6 mb-7">
                        <p className="mb-2 text-muted">聯絡地址</p>
                        <p className="fs-6">新北市新莊區民樂街53號1樓</p>
                    </div>
                    <div className="col-md-6 mb-7">
                        <p className="mb-2 text-muted">E-mail</p>
                        <p className="fs-6">hexschool@gmail.com.tw</p>
                    </div>
                    <div className="col-12">
                        <p className="mb-2 text-muted">備註</p>
                        <p className="fs-6">需要特別餐食</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* 回上一頁按鈕 */}
            <div className="d-flex justify-content-center">
            <button type="button" className="btn OrderDetail-btn-style otherDetail-btn fs-4 btn-primary-40 mt-9 mt-md-12">回上一頁</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
};
