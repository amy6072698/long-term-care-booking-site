import { Link } from "react-router";

export default function AccountPurchase() {
  const product = [
    {
      id: 1,
      name: "康樂長照中心",
      category: "長期照顧中心",
      images: [
        "https://raw.githubusercontent.com/Jack-Xiao-2024/Project_D01/refs/heads/dev/assets/images/Intro-A/IntroA-01.png",
        "https://raw.githubusercontent.com/Jack-Xiao-2024/Project_D01/refs/heads/dev/assets/images/Intro-B/IntroB-01.png",
        "https://raw.githubusercontent.com/Jack-Xiao-2024/Project_D01/refs/heads/dev/assets/images/Intro-C/IntroC-01.png",
        "https://raw.githubusercontent.com/Jack-Xiao-2024/Project_D01/refs/heads/dev/assets/images/Intro-D/IntroD-01.png",
        "https://raw.githubusercontent.com/Jack-Xiao-2024/Project_D01/refs/heads/dev/assets/images/Intro-E/IntroE-01.png",
      ],
      thumbs: [
        "https://raw.githubusercontent.com/Jack-Xiao-2024/Project_D01/refs/heads/dev/assets/images/Building/B-01.png",
        "https://raw.githubusercontent.com/Jack-Xiao-2024/Project_D01/refs/heads/dev/assets/images/Building/B-18.png",
        "https://raw.githubusercontent.com/Jack-Xiao-2024/Project_D01/refs/heads/dev/assets/images/Building/B-17.png",
        "https://raw.githubusercontent.com/Jack-Xiao-2024/Project_D01/refs/heads/dev/assets/images/Building/B-15.png",
        "https://raw.githubusercontent.com/Jack-Xiao-2024/Project_D01/refs/heads/dev/assets/images/Building/B-13.png",
      ],
      city: "台北市",
      region: "中正區",
      address: "台北市中正區中正路",
      date: "2024/08/09",
      like: 5,
      comments: 15,
      services: [
        {
          id: 1,
          name: "機構內門診",
        },
        {
          id: 3,
          name: "特殊沐浴設備",
        },
        {
          id: 2,
          name: "門診接送",
        },
        {
          id: 4,
          name: "大傷口照顧",
        },
      ],
      description:
        "本長照機構設有無障礙設施、專業護理室、康復治療室、活動娛樂區及24小時緊急呼叫系統,提供全方位的照護服務。",
      age: "0~59 歲",
      caringItem: [
        "鼻胃管",
        "導尿管",
        "精神照護",
        "認知障礙（失智）",
        "氣切管",
        "氧氣",
        "復健照護",
        "腫瘤照護（癌症）",
        "透析照護（洗腎）",
      ],
      medicalService: [
        "醫師巡診",
        "鄰近醫院",
        "藥師評估",
        "腫瘤照顧",
        "洗腎接送",
        "營養評估",
        "術後照顧",
        "生活照顧",
        "傷口照顧",
        "如廁訓練",
        "延緩失能",
      ],
      allowance: ["老人補助（低收、中低收）", "身心障礙", "喘息服務"],
      roomCards: [
        {
          id: 1,
          imgUrl:
            "https://github.com/Jack-Xiao-2024/Project_D01/blob/dev/assets/images/Building/B-13.png?raw=true",
          roomType: "單人房",
          price: 40000,
          availableBeds: 2,
        },
        {
          id: 2,
          imgUrl:
            "https://raw.githubusercontent.com/Jack-Xiao-2024/Project_D01/refs/heads/dev/assets/images/Building/B-16.png",
          roomType: "三人房",
          price: 36000,
          availableBeds: 1,
        },
        {
          id: 3,
          imgUrl:
            "https://github.com/Jack-Xiao-2024/Project_D01/blob/dev/assets/images/Building/B-16.png?raw=true",
          roomType: "六人房",
          price: 33000,
          availableBeds: 3,
        },
      ],
    },
    {
      id: 2,
      name: "幸福頤養園",
      category: "長期照顧中心",
      images: [
        "https://images.unsplash.com/photo-1608979827489-2b855e79debe?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://raw.githubusercontent.com/Jack-Xiao-2024/Project_D01/refs/heads/dev/assets/images/Intro-B/IntroB-01.png",
        "https://raw.githubusercontent.com/Jack-Xiao-2024/Project_D01/refs/heads/dev/assets/images/Intro-C/IntroC-01.png",
        "https://raw.githubusercontent.com/Jack-Xiao-2024/Project_D01/refs/heads/dev/assets/images/Intro-D/IntroD-01.png",
        "https://raw.githubusercontent.com/Jack-Xiao-2024/Project_D01/refs/heads/dev/assets/images/Intro-E/IntroE-01.png",
      ],
      thumbs: [
        "https://raw.githubusercontent.com/Jack-Xiao-2024/Project_D01/refs/heads/dev/assets/images/Building/B-02.png",
        "https://raw.githubusercontent.com/Jack-Xiao-2024/Project_D01/refs/heads/dev/assets/images/Building/B-18.png",
        "https://raw.githubusercontent.com/Jack-Xiao-2024/Project_D01/refs/heads/dev/assets/images/Building/B-17.png",
        "https://raw.githubusercontent.com/Jack-Xiao-2024/Project_D01/refs/heads/dev/assets/images/Building/B-15.png",
        "https://raw.githubusercontent.com/Jack-Xiao-2024/Project_D01/refs/heads/dev/assets/images/Building/B-13.png",
      ],
      city: "新北市",
      region: "板橋區",
      address: "新北市板橋區中山路",
      date: "2024/10/25",
      like: 6,
      comments: 10,
      services: [
        {
          id: 5,
          name: "失智照顧",
        },
        {
          id: 2,
          name: "門診接送",
        },
        {
          id: 7,
          name: "個別化飲食",
        },
      ],
      description:
        "幸福頤養園致力於提供長者溫馨舒適的生活環境。我們的設施包括專業護理病房,確保長者健康;康復訓練區,幫助長者維持和提升體能。",
      age: "60 歲以上",
      caringItem: ["認知障礙（失智）", "氣切管", "氧氣"],
      medicalService: ["腫瘤照顧", "洗腎接送", "營養評估"],
      allowance: ["喘息服務"],
      roomCards: [
        {
          id: 1,
          imgUrl:
            "https://github.com/Jack-Xiao-2024/Project_D01/blob/dev/assets/images/Building/B-13.png?raw=true",
          roomType: "單人房",
          price: 40000,
          availableBeds: 3,
        },
        {
          id: 2,
          imgUrl:
            "https://raw.githubusercontent.com/Jack-Xiao-2024/Project_D01/refs/heads/dev/assets/images/Building/B-16.png",
          roomType: "三人房",
          price: 36000,
          availableBeds: 2,
        },
        {
          id: 3,
          imgUrl:
            "https://github.com/Jack-Xiao-2024/Project_D01/blob/dev/assets/images/Building/B-16.png?raw=true",
          roomType: "六人房",
          price: 33000,
          availableBeds: 2,
        },
      ],
    },
    {
      id: 3,
      name: "安康長青之家",
      category: "長期照顧中心",
      images: [
        "https://cdn.pixabay.com/photo/2015/11/05/21/13/senior-center-1024796_1280.jpg",
        "https://raw.githubusercontent.com/Jack-Xiao-2024/Project_D01/refs/heads/dev/assets/images/Intro-B/IntroB-01.png",
        "https://raw.githubusercontent.com/Jack-Xiao-2024/Project_D01/refs/heads/dev/assets/images/Intro-C/IntroC-01.png",
        "https://raw.githubusercontent.com/Jack-Xiao-2024/Project_D01/refs/heads/dev/assets/images/Intro-D/IntroD-01.png",
        "https://raw.githubusercontent.com/Jack-Xiao-2024/Project_D01/refs/heads/dev/assets/images/Intro-E/IntroE-01.png",
      ],
      thumbs: [
        "https://raw.githubusercontent.com/Jack-Xiao-2024/Project_D01/refs/heads/dev/assets/images/Building/B-03.png",
        "https://raw.githubusercontent.com/Jack-Xiao-2024/Project_D01/refs/heads/dev/assets/images/Building/B-18.png",
        "https://raw.githubusercontent.com/Jack-Xiao-2024/Project_D01/refs/heads/dev/assets/images/Building/B-17.png",
        "https://raw.githubusercontent.com/Jack-Xiao-2024/Project_D01/refs/heads/dev/assets/images/Building/B-15.png",
        "https://raw.githubusercontent.com/Jack-Xiao-2024/Project_D01/refs/heads/dev/assets/images/Building/B-13.png",
      ],
      city: "桃園市",
      region: "桃園區",
      address: "桃園市桃園區復興路",
      date: "2025/03/12",
      like: 7,
      comments: 15,
      services: [
        {
          id: 1,
          name: "機構內門診",
        },
        {
          id: 2,
          name: "門診接送",
        },
        {
          id: 3,
          name: "特殊沐浴設備",
        },
        {
          id: 4,
          name: "大傷口照顧",
        },
      ],
      description:
        "安康長青之家提供全面的長期照護服務,專為長者設計。我們擁有全天候護理中心,確保長者隨時能獲得專業照顧;健康膳食區,提供營養均衡的餐點。",
      age: "65 歲以上",
      caringItem: ["復健照護", "腫瘤照護（癌症）", "透析照護（洗腎）"],
      medicalService: ["術後照顧", "生活照顧", "傷口照顧"],
      allowance: ["老人補助（低收、中低收）"],
      roomCards: [
        {
          id: 1,
          imgUrl:
            "https://github.com/Jack-Xiao-2024/Project_D01/blob/dev/assets/images/Building/B-13.png?raw=true",
          roomType: "單人房",
          price: 40000,
          availableBeds: 3,
        },
        {
          id: 2,
          imgUrl:
            "https://raw.githubusercontent.com/Jack-Xiao-2024/Project_D01/refs/heads/dev/assets/images/Building/B-16.png",
          roomType: "三人房",
          price: 36000,
          availableBeds: 3,
        },
        {
          id: 3,
          imgUrl:
            "https://github.com/Jack-Xiao-2024/Project_D01/blob/dev/assets/images/Building/B-16.png?raw=true",
          roomType: "六人房",
          price: 33000,
          availableBeds: 6,
        },
      ],
    },
  ];

  return (
    <>
      <div className="main">
        <div className="text-primary-100">
          <h4 className="mb-2">留床紀錄</h4>
          <p className="mb-10">查看您已預訂留床的機構</p>
          <div className="cards">
            {product.map((product) => (
              <div className="col" key={product.id}>
                <div className="cards shadow rounded">
                  <div className="card mb-3">
                    <div className="row g-0">
                      <div className="col-md-5 ">
                        <img
                          className="card-img img-fluid result-card"
                          src={product?.thumbs?.[0]}
                          alt="building"
                          style={{ height: "290px" }}
                        />
                      </div>
                      <div className="col-md-7">
                        <div className="card-body">
                          <Link to={`/product/${product.id}`}>
                            <h5 className="card-title mt-7">{product.name}</h5>
                          </Link>
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
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M6 7C6 8.10457 6.89543 9 8 9C9.10457 9 10 8.10457 10 7C10 5.89543 9.10457 5 8 5C6.89543 5 6 5.89543 6 7Z"
                                stroke="black"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <p className="ms-1">{product.address}</p>
                          </div>
                          <div className="date d-flex">
                            <p>入住日期：</p>
                            <p>{product.date}</p>
                          </div>
                          <div className="type mt-2">
                            <p className="text-end">
                              {product.roomCards[0].roomType}型
                            </p>
                          </div>
                          <div className="room_price d-flex justify-content-between mt-1">
                            <div className="price">
                              <p>留床費用</p>
                            </div>
                            <div className="price_number">
                              <p className="h5">
                                NTD {product.roomCards[0].price}
                              </p>
                            </div>
                          </div>
                          <div className="detail mt-2">
                            <Link
                              to={`/product/${product.id}`}
                              style={{ width: "100%" }}
                            >
                              <button
                                type="button"
                                className="btn btn-primary-40"
                                style={{ width: "100%" }}
                              >
                                詳細資料
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
