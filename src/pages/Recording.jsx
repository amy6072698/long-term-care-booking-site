import { Link } from "react-router";
export default function Recordings() {
  return (
    <>
      <div className="main">
        <div className="container mt-5">
          <div className="row">
            <div className="col-3">
              <ul className="list-group ">
                <a href="">
                  <li className="list-group-item h5 text-primary-100 rounded-3">
                    <img
                      src="src/assets/images/Account Icon/profile-red.svg"
                      alt="profile"
                      className=" me-5"
                    />
                    個人資料
                  </li>
                </a>
                <a href="">
                  <li
                    className="list-group-item h5 text-primary-100
                  "
                  >
                    <img
                      src="src/assets/images/Account Icon/favorite-red.svg"
                      alt="favorite"
                      className="me-4"
                    />
                    收藏機構
                  </li>
                </a>
                <a href="">
                  <li className="list-group-item h5 text-primary-100">
                    <img
                      src="src/assets/images/Account Icon/paste-red.svg"
                      alt="paster"
                      className="me-4"
                    />
                    留床紀錄
                  </li>
                </a>
                <a href="">
                  <li className="list-group-item h5 text-primary-100">
                    <img
                      src="src/assets/images/Account Icon/building-red.svg"
                      alt="building"
                      className="me-5"
                    />
                    參訪紀錄
                  </li>
                </a>
              </ul>
            </div>
            <div className="col-8">
              <div className="recording_title">
                <div className="h4">留床紀錄</div>
                <div className="p">查看您已預訂留床的機構</div>
              </div>
              <div className="card mt-6">card</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
