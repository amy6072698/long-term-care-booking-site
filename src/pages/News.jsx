export default function AboutUs() {
  return (
    <>
    <div className="main">
        <div className="news-content">
          <div className="container">
              <div className="row row-cols-1 row-cols-md-2 g-8 g-md-12">
                {/* 卡片 1 */}
                <div className="col">
                    <div className="card news-card ease-in-out h-100 shadow-sm" style={{maxWidth: "100%" }}> 
                    <a href="https://1966.gov.tw/LTC/mp-207.html">
                        <img src="https://images.unsplash.com/photo-1532329683184-6ffd13057d1c?q=80&w=2075&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="card-img-top" alt="長照2.0申請"/>
                    </a>
                    <div className="card-body">
                        <p className="card-title fs-5 fs-md-4">長照2.0申請</p>
                        <p className="card-text fs-7 fs-md-6">衛福部推行的長照服務，實現在地老化，提供從支持家庭、居家、社區到住宿式照顧之多元連續服務。</p>
                    </div>
                    </div>
                </div>
                {/* 卡片 2 */}
                <div className="col">
                    <div className="card news-card ease-in-out h-100 shadow-sm" style={{maxWidth: "100%" }}>
                    <a href="https://www.sw.ntpc.gov.tw/home.jsp?id=b1f069174541f122">
                        <img src="https://images.unsplash.com/photo-1675179181155-6ed85bf810e7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="card-img-top" alt="長期照顧服務"/>
                    </a>
                    <div className="card-body">
                        <p className="card-title fs-5 fs-md-4">長期照顧服務</p>
                        <p className="card-text fs-7 fs-md-6">彙整老人機構安置補助、住宿式長期照顧服務機構、緊急救援服務等資訊。</p>
                    </div>
                    </div>
                </div>
                {/* 卡片 3 */}
                <div className="col">
                    <div className="card news-card ease-in-out h-100 shadow-sm" style={{maxWidth: "100%" }}>
                    <a href="https://www.sw.ntpc.gov.tw/home.jsp?id=bd3ac04bd17eafde">
                        <img src="https://images.unsplash.com/photo-1581579438530-e203e7572d95?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="card-img-top" alt="老人福利"/>
                    </a>
                    <div className="card-body">
                        <p className="card-title fs-5 fs-md-4">老人福利</p>
                        <p className="card-text fs-7 fs-md-6">老人健保、重陽節禮金、敬老卡等政府規定的老人福利，以及社會局補助辦理細則等資訊。</p>
                    </div>
                    </div>
                </div>
                {/* 卡片 4 */}
                <div className="col">
                    <div className="card news-card ease-in-out h-100 shadow-sm" style={{maxWidth: "100%" }}>
                        <a href="https://www.sw.ntpc.gov.tw/home.jsp?id=19985c6f908a8bb3">
                            <img src="https://images.unsplash.com/photo-1569937703691-0f9b8cf21a25?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="card-img-top" alt="身心障礙者福利"/>
                        </a>
                        <div className="card-body">
                            <p className="card-title fs-5 fs-md-4">身心障礙者福利</p>
                            <p className="card-text fs-7 fs-md-6">提供身心障礙鑒定及需求評估制度、經濟安全服務、社會參與服務等，一系列身障者保障及福利。</p>
                        </div>
                    </div>
                </div>
              </div>
          </div>
        </div>
    </div>
    </>
  );
}
