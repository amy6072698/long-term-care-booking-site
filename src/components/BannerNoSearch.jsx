function BannerNoSearch(){
  return (
  <>
    <section className="banner-no-search">
      <div className="card border-0 rounded-0 position-relative">
        <div className="banner-image d-md-inline-block d-none" style={{backgroundImage: "url('https://github.com/Jack-Xiao-2024/Project_D01/blob/dev/assets/images/Cover-lg.png?raw=true')", height: "427px"}}></div>
        <div className="banner-image d-md-none d-inline-block" style={{backgroundImage: "url('https://github.com/Jack-Xiao-2024/Project_D01/blob/dev/assets/images/Cover-lg.png?raw=true')", height: "267px"}}></div>
        <div className="container-lg container-fluid card-img-overlay py-13">
          <h1 className="banner-title pb-5 px-lg-0 px-md-2 px-0">長照不煩惱，<br/>好厝邊陪你找</h1>
          <p className="banner-subtitle fs-lg-4 fs-md-6 px-lg-0 px-md-2 px-0">找機構跟訂飯店<span className="d-xl-inline d-none">，</span><br className="d-xl-none d-block"/>一樣簡單！</p>
        </div>
      </div>
    </section>
  </>)
}

export default BannerNoSearch;