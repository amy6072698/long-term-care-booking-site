import { useEffect, useState } from "react";
import { Link } from "react-router";
import HeartCard from "../components/HeartCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import StarIcon from "../assets/images/Icon/Stars-Change.svg?react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const indexHotsCategories = [
  {
    title: "長期照顧中心",
    engName: "longTermCareCenter",
  },
  {
    title: "安養中心",
    engName: "restHome",
  },
  {
    title: "護理之家",
    engName: "nursingHome",
  },
  {
    title: "日間照顧中心",
    engName: "dayCareCenter",
  },
];

const indexReviewsData = [
  {
    title: "輕鬆媒合",
    context:
      "長照預約服務網讓我能輕鬆找到適合的長照機構，省去了繁瑣的現場詢問。網站操作簡單，預約流程流暢，非常方便！",
    userImage:
      "https://github.com/Jack-Xiao-2024/Project_D01/blob/dev/assets/images/User/Ellipse-04.png?raw=true",
    userName: "郭先生",
  },
  {
    title: "資訊透明",
    context:
      "使用這個預約網後，我發現各機構的服務詳情和評價都很清楚，讓我能夠仔細比較，選擇最適合的長照服務，感覺很安心。",
    userImage:
      "https://github.com/Jack-Xiao-2024/Project_D01/blob/dev/assets/images/User/Ellipse-05.png?raw=true",
    userName: "李小姐",
  },
  {
    title: "即時更新",
    context:
      "預約服務網的即時更新功能非常好，讓我隨時能夠掌握各機構的最新服務和床位情況。這樣的靈活性讓我感到很放心！",
    userImage:
      "https://github.com/Jack-Xiao-2024/Project_D01/blob/dev/assets/images/User/Ellipse-03.png?raw=true",
    userName: "王先生",
  },
  {
    title: "貼心解答 安心選擇",
    context:
      "客服非常耐心，回答了我很多疑問，最終選擇的長照機構也非常滿意，感謝這個平台！",
    userImage:
      "https://github.com/Jack-Xiao-2024/Project_D01/blob/dev/assets/images/User/Ellipse-01.png?raw=true",
    userName: "張先生",
  },
  {
    title: "快速確認",
    context:
      "整個預約過程很順利，選擇多樣,，約後很快就收到確認通知，家人都覺得很安心。",
    userImage:
      "https://github.com/Jack-Xiao-2024/Project_D01/blob/dev/assets/images/User/Ellipse-02.png?raw=true",
    userName: "林小姐",
  },
  {
    title: "找到理想護理之家",
    context:
      "這個預約網讓我找到了一家非常適合的護理之家，服務周到，網站使用也非常方便。",
    userImage:
      "https://github.com/Jack-Xiao-2024/Project_D01/blob/dev/assets/images/User/Ellipse-07.png?raw=true",
    userName: "黃太太",
  },
];

const indexFaqsData = [
  {
    id: 1,
    question: "如何註冊預約長照服務網的帳號？",
    answer:
      "訪問網站首頁，點擊「註冊｜登入」按鈕，填寫必要的個人資訊，包括姓名、電話和電子信箱，然後按照提示完成註冊程序即可。",
  },
  {
    id: 2,
    question: "如何查看點愛心收藏的長照機構？",
    answer:
      "您可以在點愛心收藏喜歡的長照機構後，進入會員中心頁面，選擇「收藏機構」，查看收藏的長照機構，若想取消也可以在此取消收藏。",
  },
  {
    id: 3,
    question: "如何找到適合的長照機構？",
    answer:
      "您可以利用網站的搜尋功能，根據地區、醫療或照護需求篩選長照機構，查看詳細資訊和用戶評價，以便做出最佳選擇。",
  },
  {
    id: 4,
    question: "預約參訪機構需要支付費用嗎？",
    answer:
      "預約參訪不會收取預約費用，但具體長照機構的各項服務收費標準可能會有所不同，建議在參訪前確認清楚。",
  },
  {
    id: 5,
    question: "如果遇到技術問題，如何聯繫客服？",
    answer:
      "在網站最底下有提供客服社群聯繫方式。您可以通過這些方式聯繫客服，並描述您遇到的問題，客服將協助您解決。",
  },
];

export default function Home() {
  const [indexHotsData, setIndexHotsData] = useState([]);
  const [clickedCategory, setClickedCategory] = useState("長期照顧中心");

  const getIndexHotsData = async (category) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/products?category_like=${encodeURIComponent(
          category
        )}&_sort=like&_order=desc&_start=0&_end=3`
      );
      setIndexHotsData(res.data);
    } catch (error) {
      console.error(error);
      alert("取得人氣機構失敗");
    }
  };

  // 預設載入 "長期照顧中心"
  useEffect(() => {
    getIndexHotsData(clickedCategory);
  }, [clickedCategory]);

  const handleHotsTabClick = (category) => {
    setClickedCategory(category);
  };

  return (
    <>
      <div className="index">
        {/* index 人氣機構精選區段 */}
        <section className="index-hots pb-lg-14 pb-0">
          <div className="hots-container">
            {/* 上方分頁按鈕 */}
            <div
              className="px-lg-0 px-4"
              data-aos="zoom-in-down"
              data-aos-anchor-placement="top-bottom"
            >
              <h4 className="text-center text-primary-100 fs-lg-2 mb-10">
                人氣機構精選
              </h4>
              <ul
                className="hots-content row row-cols-4 nav nav-pills flex-nowrap justify-content-md-center justify-content-start align-items-center mb-13 fs-6 px-1"
                id="pills-tab"
                role="tablist"
              >
                {indexHotsCategories.map((category) => (
                  <li
                    key={category.engName}
                    className="col nav-item px-lg-5 px-2"
                    role="presentation"
                    style={{ width: "180px" }}
                  >
                    <button
                      onClick={() => handleHotsTabClick(category.title)}
                      className={`nav-link ${
                        category.title === clickedCategory && "active"
                      }`}
                      style={{ width: "156px" }}
                      id={`pills-${category.engName}-tab`}
                      data-bs-toggle="pill"
                      data-bs-target={`#pills-${category.engName}`}
                      type="button"
                      role="tab"
                      aria-controls={`pills-${category.engName}`}
                      aria-selected="false"
                    >
                      {category.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            {/* 下方卡片區段 */}
            <div>
              <div
                className="hots-content tab-content"
                id="pills-tabContent"
                data-aos="zoom-in-up"
                data-aos-anchor-placement="center-bottom"
              >
                {/* 長期照顧中心 */}
                <div
                  className="tab-pane fade show active"
                  id="pills-longTermCareCenter"
                  role="tabpanel"
                  aria-labelledby="pills-longTermCareCenter-tab"
                  tabIndex="0"
                >
                  <div className="hots-cards px-4 pb-lg-0 pb-13">
                    {indexHotsData.map((item) => (
                      <div
                        key={item.id}
                        className="card-shadow card-hover-big rounded-2 position-relative"
                        style={{ width: "312px" }}
                      >
                        <HeartCard productId={item.id} />
                        <div
                          className="hots-card-image rounded-top-2"
                          style={{
                            backgroundImage: `url(${item.thumbs[0]})`,
                          }}
                        ></div>
                        <div className="px-7 pt-9 pb-11">
                          <Link
                            to={`product/${item.id}`}
                            className="text-secondary-70 stretched-link fs-5 mb-2"
                          >
                            {item.name}
                          </Link>
                          <p className="mb-5">
                            <img
                              style={{ width: "14px" }}
                              src="https://raw.githubusercontent.com/Jack-Xiao-2024/Project_D01/c686e8ab8f54332bdd0d43ab1421309a7ffb91e6/assets/images/Icon/Map.svg"
                              alt="map icon"
                            />
                            <span className="ms-2 align-middle">
                              {item.address}
                            </span>
                          </p>
                          <p
                            className="card-para-truncate"
                            style={{ height: "72px" }}
                          >
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* 安養中心 */}
                <div
                  className="tab-pane fade"
                  id="pills-restHome"
                  role="tabpanel"
                  aria-labelledby="pills-restHome-tab"
                  tabIndex="0"
                >
                  <div className="hots-cards px-4 pb-lg-0 pb-13">
                    {indexHotsData.map((item) => (
                      <div
                        key={item.id}
                        className="card-shadow card-hover-big rounded-2 position-relative"
                        style={{ width: "312px" }}
                      >
                        <HeartCard productId={item.id} />
                        <div
                          className="hots-card-image rounded-top-2"
                          style={{
                            backgroundImage: `url(${item.thumbs[0]})`,
                          }}
                        ></div>
                        <div className="px-7 pt-9 pb-11">
                          <Link
                            to={`product/${item.id}`}
                            className="text-secondary-70 stretched-link fs-5 mb-2"
                          >
                            {item.name}
                          </Link>
                          <p className="mb-5">
                            <img
                              style={{ width: "14px" }}
                              src="https://raw.githubusercontent.com/Jack-Xiao-2024/Project_D01/c686e8ab8f54332bdd0d43ab1421309a7ffb91e6/assets/images/Icon/Map.svg"
                              alt="map icon"
                            />
                            <span className="ms-2 align-middle">
                              {item.address}
                            </span>
                          </p>
                          <p
                            className="card-para-truncate"
                            style={{ height: "72px" }}
                          >
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* 護理之家 */}
                <div
                  className="tab-pane fade"
                  id="pills-nursingHome"
                  role="tabpanel"
                  aria-labelledby="pills-nursingHome-tab"
                  tabIndex="0"
                >
                  <div className="hots-cards px-4 pb-lg-0 pb-13">
                    {indexHotsData.map((item) => (
                      <div
                        key={item.id}
                        className="card-shadow card-hover-big rounded-2 position-relative"
                        style={{ width: "312px" }}
                      >
                        <HeartCard productId={item.id} />
                        <div
                          className="hots-card-image rounded-top-2"
                          style={{
                            backgroundImage: `url(${item.thumbs[0]})`,
                          }}
                        ></div>
                        <div className="px-7 pt-9 pb-11">
                          <Link
                            to={`product/${item.id}`}
                            className="text-secondary-70 stretched-link fs-5 mb-2"
                          >
                            {item.name}
                          </Link>
                          <p className="mb-5">
                            <img
                              style={{ width: "14px" }}
                              src="https://raw.githubusercontent.com/Jack-Xiao-2024/Project_D01/c686e8ab8f54332bdd0d43ab1421309a7ffb91e6/assets/images/Icon/Map.svg"
                              alt="map icon"
                            />
                            <span className="ms-2 align-middle">
                              {item.address}
                            </span>
                          </p>
                          <p
                            className="card-para-truncate"
                            style={{ height: "72px" }}
                          >
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* 日間照顧中心 */}
                <div
                  className="tab-pane fade"
                  id="pills-dayCareCenter"
                  role="tabpanel"
                  aria-labelledby="pills-dayCareCenter-tab"
                  tabIndex="0"
                >
                  <div className="hots-cards px-4 pb-lg-0 pb-13">
                    {indexHotsData.map((item) => (
                      <div
                        key={item.id}
                        className="card-shadow card-hover-big rounded-2 position-relative"
                        style={{ width: "312px" }}
                      >
                        <HeartCard productId={item.id} />
                        <div
                          className="hots-card-image rounded-top-2"
                          style={{
                            backgroundImage: `url(${item.thumbs[0]})`,
                          }}
                        ></div>
                        <div className="px-7 pt-9 pb-11">
                          <Link
                            to={`product/${item.id}`}
                            className="text-secondary-70 stretched-link fs-5 mb-2"
                          >
                            {item.name}
                          </Link>
                          <p className="mb-5">
                            <img
                              style={{ width: "14px" }}
                              src="https://raw.githubusercontent.com/Jack-Xiao-2024/Project_D01/c686e8ab8f54332bdd0d43ab1421309a7ffb91e6/assets/images/Icon/Map.svg"
                              alt="map icon"
                            />
                            <span className="ms-2 align-middle">
                              {item.address}
                            </span>
                          </p>
                          <p
                            className="card-para-truncate"
                            style={{ height: "72px" }}
                          >
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* index 為何選擇長照好厝邊區段 */}
        <section className="index-why pt-lg-14 pb-lg-11 py-12">
          <div className="container">
            <h4
              className="text-center text-secondary-80 fs-lg-2 mb-lg-8 mb-5"
              data-aos="flip-up"
              data-aos-easing="ease-in-sine"
              data-aos-duration="200"
            >
              為何選擇長照好厝邊？
            </h4>
            <h5
              id="indexWhySubtitle"
              className="text-center fs-lg-4 mb-lg-13 mb-10"
              data-aos="flip-up"
              data-aos-easing="ease-in-sine"
              data-aos-duration="200"
              data-aos-delay="100"
            >
              更便捷的搜尋，更合適的機構
            </h5>
            <div className="row row-cols-lg-3 row-cols-1 justify-content-center align-items-stretch gap-lg-0 gap-7">
              <div className="col px-lg-2" style={{ maxWidth: "368px" }}>
                <div
                  id="indexWhyCard1"
                  className="card border-0 text-center h-100"
                  data-aos="flip-left"
                  data-aos-easing="ease-in-sine"
                  data-aos-duration="300"
                  data-aos-delay="200"
                  data-aos-anchor="#indexWhySubtitle"
                >
                  <div className="card-body pt-9 pb-10 px-9">
                    <img
                      src="https://raw.githubusercontent.com/Jack-Xiao-2024/Project_D01/c05cfb3173696d6d96ec4b0ff35ae09339d41735/assets/images/Vector%20Icon/VI-03.svg"
                      className="w-100 mb-5"
                      style={{ height: "80px" }}
                      alt="Convenient reservation"
                    />
                    <h5 className="card-title mb-5 text-secondary-60">
                      便捷預約機構
                    </h5>
                    <p className="card-text text-start fs-6">
                      您還在一間一間打電話尋找長照機構嗎？長照好厝邊幫您快速搜尋合適機構、找到直接線上預約省時又方便！
                    </p>
                  </div>
                </div>
              </div>
              <div className="col px-lg-2" style={{ maxWidth: "368px" }}>
                <div
                  id="indexWhyCard2"
                  className="card border-0 text-center h-100"
                  data-aos="flip-left"
                  data-aos-easing="ease-in-sine"
                  data-aos-duration="300"
                  data-aos-delay="400"
                  data-aos-anchor="#indexWhyCard1"
                >
                  <div className="card-body pt-9 pb-10 px-9">
                    <img
                      src="https://raw.githubusercontent.com/Jack-Xiao-2024/Project_D01/c05cfb3173696d6d96ec4b0ff35ae09339d41735/assets/images/Vector%20Icon/VI-02.svg"
                      className="w-100 mb-5"
                      style={{ height: "80px" }}
                      alt="Compare various choices"
                    />
                    <h5 className="card-title mb-5 text-secondary-60">
                      多樣選擇比較
                    </h5>
                    <p className="card-text text-start fs-6">
                      長照好厝邊提供多家長照機構的詳細資訊及用戶評價，讓用戶透過比較服務內容、評價及價格，選擇最適合的機構。
                    </p>
                  </div>
                </div>
              </div>
              <div className="col px-lg-2" style={{ maxWidth: "368px" }}>
                <div
                  className="card border-0 text-center h-100"
                  data-aos="flip-left"
                  data-aos-easing="ease-in-sine"
                  data-aos-duration="300"
                  data-aos-delay="600"
                  data-aos-anchor="#indexWhyCard2"
                >
                  <div className="card-body pt-9 pb-10 px-9">
                    <img
                      src="https://raw.githubusercontent.com/Jack-Xiao-2024/Project_D01/c05cfb3173696d6d96ec4b0ff35ae09339d41735/assets/images/Vector%20Icon/VI-01.svg"
                      className="w-100 mb-5"
                      style={{ height: "80px" }}
                      alt="Instant renewing information"
                    />
                    <h5 className="card-title mb-5 text-secondary-60">
                      即時資訊更新
                    </h5>
                    <p className="card-text text-start fs-6">
                      長照好厝邊平台會即時更新各長照機構目前的可用服務和床位資訊，讓用戶隨時掌握最新情況，安排入住參訪更靈活。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* index 聽聽大家怎麼說區段 */}
        <section className="index-reviews pt-lg-14 pb-lg-11 py-12">
          <div className="container">
            <h4 className="text-center text-primary-100 fs-lg-2 mb-lg-8 mb-5">
              聽聽大家怎麼說
            </h4>
            <h6 className="text-center fs-lg-3 mb-lg-13 mb-10">
              超過
              <p
                className="d-inline-block reviews-number fs-lg-2 fs-4 px-lg-5 px-2 text-secondary-40"
                data-aos="fade-down"
              >
                5000+
              </p>
              使用長照好厝邊
            </h6>
          </div>
          {/* Swiper 用戶評價卡片 */}
          <div className="reviewSwiper-container">
            <Swiper
              modules={[Navigation, Pagination]}
              cssMode={true}
              navigation={{
                nextEl: ".swiper-next",
                prevEl: ".swiper-prev",
              }}
              pagination={{
                clickable: true,
                el: ".swiper-pagination",
              }}
              breakpoints={{
                0: {
                  loop: false,
                  direction: "vertical",
                  slidesPerView: "auto", // 讓他顯示所有內容
                  spaceBetween: 24,
                  allowTouchMove: false, // 禁止滑動
                },
                768: {
                  loop: true,
                  direction: "horizontal",
                  slidesPerView: 2,
                  spaceBetween: 24,
                },
                992: {
                  loop: true,
                  direction: "horizontal",
                  slidesPerView: 3,
                  spaceBetween: 32,
                },
                1400: {
                  loop: true,
                  direction: "horizontal",
                  slidesPerView: 4,
                  spaceBetween: 64,
                },
              }}
            >
              {indexReviewsData.map((item) => (
                <SwiperSlide key={item.userName}>
                  <div className="card reviews-card d-flex flex-column justify-content-between">
                    <div>
                      <h5 className="card-title text-secondary-70 mx-2 mb-0">
                        {item.title}
                      </h5>
                      <StarIcon className="stars-icon mb-xl-6 mb-2" />
                      <p className="card-text text-start fs-6">
                        {item.context}
                      </p>
                    </div>
                    <div className="users d-flex justify-content-end align-items-center mt-auto">
                      <img
                        className="d-block me-2"
                        src={item.userImage}
                        style={{ width: "44px", height: "44px" }}
                        alt="user picture"
                      />
                      <p className="card-text text-white-100 me-4">
                        {item.userName}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          {/* Swiper next、prev、pagination 底下頁面控制按鈕 */}
          <div className="container d-none d-lg-block">
            <div
              className="d-flex justify-content-center gap-6"
              style={{ width: "100%", height: "30px" }}
            >
              <button className="swiper-prev ms-auto"></button>
              <div className="swiper-pagination mx-0 d-flex justify-content-center align-items-center gap-6"></div>
              <button className="swiper-next me-auto"></button>
            </div>
          </div>
        </section>
        {/* index 常見問題 Ｑ＆Ａ 區段 */}
        <section className="index-faq bg-primary-30" id="faq">
          <div className="container">
            <h4 className="text-center text-secondary-80 fs-lg-2 mb-lg-9 mb-10">
              常見問題 Ｑ＆Ａ
            </h4>
            <div
              className="faq-content accordion d-flex flex-column gap-2"
              id="accordionIndexFaq"
            >
              {indexFaqsData.map((item) => (
                <div className="accordion-item" key={item.id}>
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed fs-lg-4 fs-7"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#IndexFaq-collapse${item.id}`}
                      aria-expanded="false"
                      aria-controls={`IndexFaq-collapse${item.id}`}
                    >
                      {`${item.id}. ${item.question}`}
                    </button>
                  </h2>
                  <div
                    id={`IndexFaq-collapse${item.id}`}
                    className="accordion-collapse collapse"
                  >
                    <p className="accordion-body fs-lg-5 bg-white">
                      {item.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
