import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div
        className="card overflow-hidden mb-11"
        style={{ maxWidth: "1296px" }}
      >
        <div className="row g-0">
          <div className="col-lg-5">
            <div className="checkbox-relative h-100">
              <img
                src="https://github.com/Jack-Xiao-2024/Project_D01/blob/main/assets/images/Building/B-05.png?raw=true"
                className="img-fluid card-img rounded-0 h-100"
                alt="building"
              />
              <div className="checkbox-moble">
                <input
                  className="form-check-input custom-checkbox checkbox-absolute"
                  type="checkbox"
                  id="checkboxNoLabel"
                  value=""
                  aria-label="勾選框"
                />
              </div>
            </div>
          </div>
          <div className="col-lg-7">
            <div className="card-body p-4">
              <div className="infor mb-3">
                <div className="checkbox d-flex justify-content-between mb-2">
                  <h5 className="card-title">祥和樂年苑</h5>
                  <div className="checkbox-desk">
                    <input
                      className="form-check-input custom-checkbox"
                      type="checkbox"
                      id="checkboxNoLabel"
                      value=""
                      aria-label="勾選框"
                    />
                  </div>
                </div>
                <div className="address d-flex">
                  <svg
                    width="16"
                    height="20"
                    viewBox="0 0 16 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 7.92285C1 12.7747 5.24448 16.7869 7.12319 18.3252C7.39206 18.5454 7.52811 18.6568 7.72871 18.7132C7.88491 18.7572 8.1148 18.7572 8.271 18.7132C8.47197 18.6567 8.60707 18.5463 8.87695 18.3254C10.7557 16.7871 14.9999 12.7751 14.9999 7.9233C14.9999 6.08718 14.2625 4.32605 12.9497 3.02772C11.637 1.72939 9.8566 1 8.00008 1C6.14357 1 4.36301 1.7295 3.05025 3.02783C1.7375 4.32616 1 6.08674 1 7.92285Z"
                      fill="#EA8C55"
                    />
                    <path
                      d="M6 7C6 8.10457 6.89543 9 8 9C9.10457 9 10 8.10457 10 7C10 5.89543 9.10457 5 8 5C6.89543 5 6 5.89543 6 7Z"
                      fill="#EA8C55"
                    />
                    <path
                      d="M1 7.92285C1 12.7747 5.24448 16.7869 7.12319 18.3252C7.39206 18.5454 7.52811 18.6568 7.72871 18.7132C7.88491 18.7572 8.1148 18.7572 8.271 18.7132C8.47197 18.6567 8.60707 18.5463 8.87695 18.3254C10.7557 16.7871 14.9999 12.7751 14.9999 7.9233C14.9999 6.08718 14.2625 4.32605 12.9497 3.02772C11.637 1.72939 9.8566 1 8.00008 1C6.14357 1 4.36301 1.7295 3.05025 3.02783C1.7375 4.32616 1 6.08674 1 7.92285Z"
                      stroke="black"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M6 7C6 8.10457 6.89543 9 8 9C9.10457 9 10 8.10457 10 7C10 5.89543 9.10457 5 8 5C6.89543 5 6 5.89543 6 7Z"
                      stroke="black"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <p className="fs-7 ps-1">新北市中和區中山路</p>
                </div>
              </div>

              <div className="date d-flex align-items-center mb-3">
                <p className="fs-8 me-1">預定入住：</p>
                <div className="calendar">
                  <p className="fs-6">2024/09/24</p>
                  <svg
                    className="d-block"
                    width="28"
                    height="29"
                    viewBox="0 0 28 29"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      y="0.600006"
                      width="28"
                      height="28"
                      rx="14"
                      fill="#FFE8C6"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M6.08008 8.48022C6.08008 8.08258 6.40243 7.76022 6.80008 7.76022H21.2001C21.5977 7.76022 21.9201 8.08258 21.9201 8.48022V22.1602C21.9201 22.5579 21.5977 22.8802 21.2001 22.8802H6.80008C6.40243 22.8802 6.08008 22.5579 6.08008 22.1602V8.48022ZM7.52008 9.20022V21.4402H20.4801V9.20022H7.52008Z"
                      fill="#A03200"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M10.4 7.40022V9.56022H8.95996V7.40022H10.4Z"
                      fill="#A03200"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M19.0396 7.40013V9.56013H17.5996V7.40013H19.0396Z"
                      fill="#A03200"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M6.7998 10.6402H21.1998V12.0802H6.7998V10.6402Z"
                      fill="#A03200"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M14.36 13.8802C12.7695 13.8802 11.48 15.1696 11.48 16.7602C11.48 18.3508 12.7695 19.6402 14.36 19.6402C15.9506 19.6402 17.24 18.3508 17.24 16.7602C17.24 15.1696 15.9506 13.8802 14.36 13.8802ZM10.04 16.7602C10.04 14.3743 11.9742 12.4402 14.36 12.4402C16.7459 12.4402 18.68 14.3743 18.68 16.7602C18.68 19.1461 16.7459 21.0802 14.36 21.0802C11.9742 21.0802 10.04 19.1461 10.04 16.7602Z"
                      fill="#A03200"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M13.28 17.1202V14.9602H14.72V16.4002H16.16V17.8402H14C13.6024 17.8402 13.28 17.5179 13.28 17.1202Z"
                      fill="#A03200"
                    />
                  </svg>
                </div>
              </div>

              <div class="card-text d-flex justify-content-between align-items-end mb-2">
                <div className="beds fs-7">
                  剩餘床位：<span className="last-bed">8</span>
                </div>
                <div className="room-info text-end">
                  <p className="room-tylie fs-8">三人房型</p>
                  <p className="romm-price fs-5">NTD 5,000</p>
                </div>
              </div>

              <div className="d-flex justify-content-end">
                <button
                  type="button"
                  className="btn btn-outline-secondary-40"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                >
                  <i className="bi bi-x-lg"></i>
                  <span className="fs-6">刪除</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
