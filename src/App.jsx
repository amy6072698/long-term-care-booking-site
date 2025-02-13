import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="content pt-12 mt-md-14 result-content">
        <div className="container">
          <div className="row d-flex flex-column gy-7 gy-lg-9">
            <div className="col">
              <div className="cards shadow rounded">
                <div className="card mb-3">
                  <div className="row g-0">
                    <div className="col-md-5 ">
                      <a className="card-img-box" href="intro.html">
                        <img
                          className="card-img img-fluid result-card"
                          src="https://github.com/Jack-Xiao-2024/Project_D01/blob/dev/assets/images/Building/B-04.png?raw=true"
                          alt="building"
                        />
                        <a className="heart" href="#">
                          <img
                            src="https://raw.githubusercontent.com/Jack-Xiao-2024/Project_D01/ed880d3f2bbe0799b124b8c29fb04e530924454e/assets/images/Interact%20Icon/Heard-01.svg"
                            alt="heart"
                          />
                        </a>
                      </a>
                    </div>
                    <div className="col-md-7">
                      <div className="card-body">
                        <a href="intro.html">
                          <h5 className="card-title mt-7">康樂長照中心</h5>
                        </a>
                        <div className="address d-flex align-items-center mb-4">
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
                          <p className="ms-1">台北市中正區中正路</p>
                        </div>
                        <ul className="d-flex ps-0 mb-4 flex-wrap align-items-center">
                          <li className="border border-dark rounded-pill me-3">
                            <p className="d-flex align-items-center py-1 px-2">
                              <img
                                className="me-1"
                                src="https://raw.githubusercontent.com/Jack-Xiao-2024/Project_D01/00a6b3aa21b3ca63af31bb2774763919bbd1b1bf/assets/images/Icon/IconBlack/Doctor-B.svg"
                                alt="Doctor-B"
                              />
                              機構內門診
                            </p>
                          </li>

                          <li className="border border-dark rounded-pill me-3 mt-md-0">
                            <p className="d-flex align-items-center py-1 px-2 ">
                              <img
                                className="me-1"
                                src="https://raw.githubusercontent.com/Jack-Xiao-2024/Project_D01/00a6b3aa21b3ca63af31bb2774763919bbd1b1bf/assets/images/Icon/IconBlack/Shower-B.svg"
                                alt="Shower-B"
                              />
                              特殊沐浴設備
                            </p>
                          </li>

                          <li className="border border-dark rounded-pill me-3 mt-md-0">
                            <p className="d-flex align-items-center py-1 px-2 ">
                              <img
                                className="me-1"
                                src="https://raw.githubusercontent.com/Jack-Xiao-2024/Project_D01/00a6b3aa21b3ca63af31bb2774763919bbd1b1bf/assets/images/Icon/IconBlack/Bus-B.svg"
                                alt="Bus-B"
                              />
                              門診接送
                            </p>
                          </li>

                          <li className="border border-dark rounded-pill me-3 mt-3 mt-md-0">
                            <p className="d-flex align-items-center py-1 px-2 ">
                              <img
                                className="me-1"
                                src="https://raw.githubusercontent.com/Jack-Xiao-2024/Project_D01/00a6b3aa21b3ca63af31bb2774763919bbd1b1bf/assets/images/Icon/IconBlack/Bandaid-B.svg"
                                alt="Bandaid-B"
                              />
                              大傷口照顧
                            </p>
                          </li>
                        </ul>
                        <div className="card_comment d-flex justify-content-between mb-1">
                          <div className="comment_left d-flex align-items-center">
                            <p className="me-2">15個評論</p>
                            <p className="d-flex align-items-center">
                              <img
                                src="https://github.com/Jack-Xiao-2024/Project_D01/blob/dev/assets/images/Interact%20Icon/Like-01.png?raw=true"
                                alt="Like-01"
                              />
                              5
                            </p>
                          </div>
                          <div className="comment_right d-flex align-items-center">
                            <h6>剩餘床位：</h6> <h5>5</h5>
                          </div>
                        </div>
                        <div className="buttons d-flex justify-content-between mt-2">
                          <button
                            type="button"
                            className="btn book-btn fs-6 py-4 btn-outline-primary-40  me-3"
                          >
                            預約參訪
                          </button>
                          <button
                            type="button"
                            className="btn book-btn fs-6  py-4 btn-primary-40 "
                          >
                            預定留床
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pagnation d-lg-flex py-8 justify-content-center d-none">
            <div className="left d-flex align-items-center">
              <a className="d-flex align-items-center" href="#">
                <span className="material-symbols-outlined text-secondary-80 ">
                  chevron_left
                </span>
              </a>
            </div>

            <div className="pagnation-num px-6">
              <p className="text-secondary-50">1/20</p>
            </div>

            <div className="right d-flex align-items-center">
              <a className="d-flex align-items-center" href="#">
                <span className="material-symbols-outlined text-secondary-80">
                  chevron_right
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
