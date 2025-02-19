import { Link } from "react-router";

function Searchbar(){
  return (

    <div className="searchbar container-lg container-fluid px-0">
      <form className="search-wrapper d-flex flex-md-row flex-column" action="">
        <select className="form-select fs-lg-6 fs-md-7 fs-6" aria-label="Default select example">
          <option defaultValue="機構類型">機構類型</option>
          <option value="1">長期照顧中心</option>
          <option value="2">護理之家</option>
          <option value="3">安養中心</option>
          <option value="3">日間照顧中心</option>
        </select>
        <select className="form-select fs-lg-6 fs-md-7 fs-6 d-md-block d-none" aria-label="Default select example">
          <option defaultValue="縣市">縣市</option>
          <option value="1">台北市</option>
          <option value="2">新北市</option>
        </select>
        <select className="form-select fs-lg-6 fs-md-7 fs-6 d-md-block d-none" aria-label="Default select example">
          <option defaultValue="地區">地區</option>
          <option value="1">中正區</option>
          <option value="2">大同區</option>
        </select>

        {/* 手機版 */}
        <div className="search-wrapper-sm d-flex d-md-none">
          <select className="form-select fs-6 w-50" aria-label="Default select example">
            <option defaultValue="縣市">縣市</option>
            <option value="1">台北市</option>
            <option value="2">新北市</option>
          </select>
          <select className="form-select fs-6 w-50" aria-label="Default select example">
            <option defaultValue="地區">地區</option>
            <option value="1">中正區</option>
            <option value="2">大同區</option>
          </select>
        </div>

        <select className="form-select fs-lg-6 fs-md-7 fs-6" aria-label="Default select example">
          <option defaultValue="照護需求">照護需求</option>
          <option value="1">鼻胃管</option>
          <option value="2">氣切管</option>
          <option value="3">導尿管</option>
        </select>
        <select className="form-select fs-lg-6 fs-md-7 fs-6" aria-label="Default select example">
          <option defaultValue="醫療需求">醫療需求</option>
          <option value="1">復健</option>
          <option value="2">洗腎</option>
          <option value="3">腫瘤</option>
        </select>
        <div className="d-lg-block d-grid">
          <Link to='results' role="button" className="search-primary-btn btn-width btn btn-primary-40 rounded-1 py-5 px-0 fs-lg-5 fs-md-6 fs-5 text-black d-flex justify-content-center align-items-center gap-lg-4 gap-md-0 gap-4">
            <img src="https://raw.githubusercontent.com/Jack-Xiao-2024/Project_D01/972c057941c61b13fd6db44e084aac94405b25ed/assets/images/Icon/IconBlack/Search-B.svg" alt="search icon"/>
            <h5 className="fs-lg-5 fs-md-6">搜尋合適機構</h5>
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Searchbar;