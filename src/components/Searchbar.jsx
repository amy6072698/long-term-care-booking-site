import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router";

// 引入 ResultsLayout 中的 SearchContext
import { SearchContext } from '../pages/ResultsLayout';


// 建立 機構類型 照護需求 醫療需求 的搜尋框下拉選項 
const categories = [
  "長期照顧中心",
  "護理之家",
  "安養中心",
  "日間照顧中心"
]
// tag：services.name
// care: caringItem
const caringItems = [
  "鼻胃管",
  "導尿管",
  "氣切管",
  "氧氣",

  "精神照護",
  // 自己
  // "認知障礙（失智）",X
  // tag:5失智照顧

  "復健照護"
  // 自己
  // tag:6免外出復健
];
const medicalServices = [
  "巡診接送",
  // "醫師巡診",
  // tag:2門診接送

  "鄰近就醫",
  // "鄰近醫院",
  // tag:1機構內門診,

  "特殊飲食",
  // "藥師評估",X
  // "營養評估",
  // tag:7個別化飲食
  
  "腫瘤照護",
  // "腫瘤照顧",
  // care："腫瘤照護（癌症）",

  "洗腎照護",
  // "洗腎接送",
  // care："透析照護（洗腎）"
  
  "術後傷口",
  // "術後照顧"
  // "傷口照顧"X
  // tag:4大傷口照顧

  "生活照顧",
  // 自己
  // tag:3特殊沐浴設備
  // "如廁訓練",X
  // "延緩失能"X
]

function Searchbar(){

  const [ cityData, setCityData ] = useState([]);
  const [ regionData, setRegionData ] = useState([]);

  const [ cityValue, setCityValue ] = useState("");
  const [ regionValue, setRegionValue ] = useState("");

  // 取得 縣市 地區 搜尋框下拉選項 
  const getTaiwanCity = async() => {
    const res = await axios.get('/taiwancity.json');
    setCityData(res.data);
  }

  useEffect(() => {
    getTaiwanCity();
    // console.log(cityData);
  },[])

  // 當縣市改變取得相應的地區選項資料更新至 regionData ，並用 cityValue 讓電腦版與手機板縣市選取的值同步
  const handleCityChange = (e) => {
    if (e.target.value !== '') {
      // 更新選取的值到 cityValue 
      setCityValue(e.target.value)

      // 找到符合的縣市物件
      const selectedCity = cityData.find((item) => (item.name === e.target.value));

      // 將符合的縣市內的 regions 陣列更新至 regionData
      setRegionData([...selectedCity.regions]);

    } else {
      setCityValue('');
      setRegionData([]);
    }
  }

  // 用 regionValue 讓電腦版與手機板地區選取的值同步
  const handleRegionChange = (e) => {
    if (e.target.value !== '') {
      // 更新選取的值到 regionValue 
      setRegionValue(e.target.value)
    } else {
      setRegionValue('');
    }
  }

  // react hook form 引入及預設值設定
  const {
    register,
    handleSubmit,
  } = useForm(
    {
      // 表單預設值
      defaultValues: {
        category: "",
        city: "",
        city_mobile:"",
        region: "",
        region_mobile:"",
        caringItem: "",
        medicalService: ""
      }
    }
  )

  // 用於更新網址搜尋參數
  const { setSearchParams } = useContext(SearchContext);

  // react router 跳轉頁面方法
  const navigate = useNavigate();

  // URLSearchParams 可將網址參數中的中文改寫成符合網址的格式
  const params = new URLSearchParams();

  // 選好搜尋項目、提交搜尋內容後執行
  const handleSearchSubmit = handleSubmit((data) => {

    // 解構 data 中 需要用到的 值，提交後 data 有各項下拉框內的提交值
    const { category, city, region, caringItem, medicalService } = data;
    // console.log(data);

    
    // 將 機構類型 提交值加入 params
    if (category) {
      params.append("category_like", category);
    }
    // 將 縣市 提交值加入 params
    if (city) {
      params.append("city_like", city);
    }
    // 將 地區 提交值加入 params
    if (region) {
      params.append("region_like", region);
    }

    // 判斷 照護需求 提交值加入相應的內容到 params
    if (
      caringItem === "鼻胃管" ||
      caringItem === "導尿管" || 
      caringItem === "氣切管" || 
      caringItem === "氧氣"
    ) {
      params.append("caringItem_like", caringItem);

    } else if (caringItem === "精神照護") {
      params.append("caringItem_like", caringItem);
      params.append("services.id", 5);

    } else if (caringItem === "復健照護") {
      params.append("caringItem_like", caringItem);
      params.append("services.id", 6);
    }

    // 判斷 醫療需求 提交值加入相應的內容到 params
    if (medicalService === "巡診接送") {
      params.append("medicalService_like", "醫師巡診");
      params.append("services.id", 2);

    } else if (medicalService === "鄰近就醫") {
      params.append("medicalService_like", "鄰近醫院");
      params.append("services.id", 1);

    } else if (medicalService === "特殊飲食") {
      params.append("medicalService_like", "營養評估");
      params.append("services.id", 7);

    } else if (medicalService === "腫瘤照護") {
      params.append("medicalService_like", "腫瘤照顧");
      params.append("caringItem_like", "腫瘤照護（癌症）");

    } else if (medicalService === "洗腎照護"){
      params.append("medicalService_like", "洗腎接送");
      params.append("caringItem_like", "透析照護（洗腎）");

    } else if (medicalService === "術後傷口"){
      params.append("medicalService_like", "術後照顧");
      params.append("services.id", 4);
      
    } else if (medicalService === "生活照顧"){
      params.append("medicalService_like", medicalService);
      params.append("services.id", 3);

    }

    // 將 params 的內容更新到 searchParams
    setSearchParams(params);

    // 判斷 params 是否為空，是就不加入網址參數，否就加入網址參數
    if(params){
      navigate(`results/search?${params.toString()}`);
    } else {
      navigate(`results/search`);
    }

  })
  


  return (

    <div className="searchbar container-lg container-fluid px-0">
      <form onSubmit={handleSearchSubmit} className="search-wrapper d-flex flex-md-row flex-column" action="">
        <select 
        {...register("category")}
        className="form-select fs-lg-6 fs-md-7 fs-6" aria-label="Default select example">
          <option value="">機構類型</option>
          {categories.map((item, index) => (
            <option key={index} value={item}>{item}</option>
          ))}
        </select>

        <select 
        {...register("city")} 
        onChange={handleCityChange} 
        value={cityValue} 
        className="form-select fs-lg-6 fs-md-7 fs-6 d-md-block d-none" aria-label="Default select example">
          <option value="">縣市</option>
          {cityData.map((item, index) => (
            <option key={index} value={item.name}>{item.name}</option>
          ))}
        </select>
        <select 
        {...register("region")} 
        onChange={handleRegionChange} 
          value={regionValue} 
        className="form-select fs-lg-6 fs-md-7 fs-6 d-md-block d-none" aria-label="Default select example">
          <option value="">地區</option>
          {regionData.map((item, index) => (
            <option key={index} value={item}>{item}</option>
          ))}
        </select>

        {/* 手機版 */}
        <div className="search-wrapper-sm d-flex d-md-none">
          <select 
          {...register("city_mobile")} 
          onChange={handleCityChange} 
          value={cityValue} 
          className="form-select fs-6 w-50" aria-label="Default select example">
            <option value="">縣市</option>
            {cityData.map((item, index) => (
              <option key={index} value={item.name}>{item.name}</option>
            ))}
          </select>
          <select 
          {...register("region_mobile")} 
          onChange={handleRegionChange} 
          value={regionValue} 
          className="form-select fs-6 w-50" aria-label="Default select example">
            <option value="">地區</option>
            {regionData.map((item, index) => (
              <option key={index} value={item}>{item}</option>
            ))}
          </select>
        </div>

        <select 
        {...register("caringItem")}
        className="form-select fs-lg-6 fs-md-7 fs-6" aria-label="Default select example">
          <option value="">照護需求</option>
          {caringItems.map((item, index) => (
            <option key={index} value={item}>{item}</option>
          ))}
        </select>
        <select 
        {...register("medicalService")}
        className="form-select fs-lg-6 fs-md-7 fs-6" aria-label="Default select example">
          <option value="">醫療需求</option>
          {medicalServices.map((item, index) => (
            <option key={index} value={item}>{item}</option>
          ))}
        </select>
        <div className="d-lg-block d-grid">
          <button type="submit" className="search-primary-btn btn-width btn btn-primary-40 rounded-1 py-5 px-0 fs-lg-5 fs-md-6 fs-5 text-black d-flex justify-content-center align-items-center gap-lg-4 gap-md-0 gap-4">
            <img src="https://raw.githubusercontent.com/Jack-Xiao-2024/Project_D01/972c057941c61b13fd6db44e084aac94405b25ed/assets/images/Icon/IconBlack/Search-B.svg" alt="search icon"/>
            <h5 className="fs-lg-5 fs-md-6">搜尋合適機構</h5>
          </button>
        </div>
      </form>
    </div>
  )
}

export default Searchbar;