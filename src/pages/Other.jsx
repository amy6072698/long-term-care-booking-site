export default function Other() {
  return (
    <>
    <div className="main">
        <div className="other-content">
            <div className="container">
                <div className="row g-6 g-md-14 justify-content-center">
                    {/* 卡片 1 */}
                    <div className="col-md-6 col-12 mb-6 mb-md-0">
                        <div className="card h-100 shadow-sm" style={{maxWidth: "100%" }}>
                            <img src="https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="card-img-top" alt="小型復康巴士"/>
                            <div className="card-body">
                                <p className="card-title fs-5 fs-md-4 mt-2 mt-md-5 mb-3 mb-md-6">小型復康巴士</p>
                                <p className="card-text fs-7 fs-md-6 mb-8">提供北台北市公共運輸處的「小型復康巴士」預約，目前服務地區開放範圍為新北市全區、基隆市及桃園市，詳見最新消息。
                                </p>
                                <div className="d-flex justify-content-center mb-8">
                                <a href="https://0809080650.gov.taipei" className="btn btn-primary-40 fs-7 fs-md-5 other-btn">預約復康巴士</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* 卡片 2 */}
                    <div className="col-md-6 col-12 mb-6 mb-md-0">
                        <div className="card h-100 shadow-sm" style={{maxWidth: "100%" }}>
                            <img src="https://images.unsplash.com/photo-1565615833231-e8c91a38a012?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="card-img-top" alt="輔具服務單位"/>
                            <div className="card-body">
                                <p className="card-title fs-5 fs-md-4 mt-2 mt-md-5 mb-3 mb-md-6">輔具服務單位</p>
                                <p className="card-text fs-7 fs-md-6 mb-8">提供全台灣各鄉鎮縣市的輔具中心與輔具服務單位，讓需要輔具租借的民眾能夠便捷地查詢資訊，以利照顧長輩。
                                </p>
                                <div className="d-flex justify-content-center mb-8">
                                <a href="https://newrepat.sfaa.gov.tw/home/repat-center" className="btn btn-primary-40 fs-7 fs-md-5 other-btn">輔具單位查詢</a>
                                </div>
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
