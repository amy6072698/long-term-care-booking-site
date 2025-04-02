import { defaults } from "chart.js/auto";
import { Pie, Bar, Line } from "react-chartjs-2";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import Select from "react-select";
import getTokenFromCookie from "../assets/js/getTokenFromCookie";



// 全域響應式
defaults.responsive = true;

export default function AdminOrderChart() {
  const { token } = getTokenFromCookie();
  const [chartData, setChartData] = useState([]);
  const [chartObj, setChartObj] = useState([]);


  // 取得產品資料
  const getProducts = useCallback(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/640/products`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        setChartData(data);
      } catch (error) {
        console.log(error);
      }
    })();
  },[token])

  useEffect(() => {
    getProducts();
  }, [getProducts]);


  // 取得訂單資料
  const getOrders = () => {
    (async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/orders?_expand=product`,{
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        setChartData(data);
      } catch (error) {
        console.log(error);
      }
    })();
  };

  const data = {
    labels: Object.keys(chartObj),
    datasets: [
      {
        label: "每個城市有的機構數量",
        data: Object.values(chartObj),
        tension: 0.1,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };

  const [options] = useState([
    {
      label: "依每個城市的機構數量",
      value: "countsByCity",
    },
    {
      label: "依單一機構被預訂數量",
      value: "bookingsByInstitution",
    },
    {
      label: "依機構類型被預訂數量",
      value: "bookingsByCategory",
    },
  ]);
  // 圖表的資料類型
  const [chartType, setChartType] = useState("countsByCity");
  const [chartValues, setChartValues] = useState(options[0]);

  // 判斷點選到的是什麼圖表，並將資料篩選後渲染至圖表
  useEffect(() => {
    if (chartType === "countsByCity") {
      setChartObj(
        chartData.reduce((accumulator, currentItem) => {
          const city = currentItem.city;
          accumulator[city] = (accumulator[city] || 0) + 1;
          return accumulator;
        }, {})
      );
    } else if (
      chartType === "bookingsByInstitution" ||
      chartType === "bookingsByCategory"
    ) {
      handleChartData(chartData, chartType);
    }
  }, [chartData, chartType]);

  // 選擇右側select查看機構訂單數量或是機構所在地
  const handleInputChange = (selected) => {
    setChartValues(selected);
    setChartType(selected.value);
    if (selected.value === "countsByCity") {
      getProducts();
    } else if (
      selected.value === "bookingsByInstitution" ||
      selected.value === "bookingsByCategory"
    ) {
      getOrders();
    }
  };

  const [chartOptions, setChartOptions] = useState([]);
  // select的options
  useEffect(() => {
    setChartOptions(
      options.map((item) => {
        return {
          value: item.value,
          label: item.label,
        };
      })
    );
  }, [options]);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // 開始日
  const handleStartDateChange = (e) => {
    console.log(e);
    setStartDate(e.target.value);
  };

  // 結束日
  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  // 按下查詢時觸發篩選日期區間和依機構或是類型區分
  const handleSearch = () => {
    if (startDate == "" || endDate == "") {
      alert("請填寫日期");
      return;
    }
    const searchCriteria = {
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    };
    const searchData = chartData.filter((item) => {
      return (
        searchCriteria.startDate <= new Date(item.orderData.checkInDate) &&
        searchCriteria.endDate >= new Date(item.orderData.checkInDate)
      );
    });
    if (searchData.length == 0) {
      alert("區間內無資料");
    }
    console.log("searchData", searchData);
    handleChartData(searchData, chartType);
  };

  // 處理訂單中機構資料
  const handleChartData = (orderData, type) => {
    const filterData = orderData.filter((item) => {
      return item.orderData?.checkInDate;
    });
    console.log("filterData", filterData);
    let filter = "";
    if (type === "bookingsByCategory") {
      filter = filterData.reduce((accumulator, currentItem) => {
        const orderName = currentItem.product.category;
        // console.log('orderName',orderName);
        accumulator[[orderName]] = (accumulator[orderName] || 0) + 1;
        return accumulator;
      }, {});
    } else {
      filter = filterData.reduce((accumulator, currentItem) => {
        const orderName = currentItem.product.name;

        accumulator[[orderName]] = (accumulator[orderName] || 0) + 1;
        return accumulator;
      }, {});
    }
    setChartObj(filter);
    console.log(type, filter);
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-10">
        <div>
          <h4 className="mb-2 text-primary-100 pt-14">圖表分析</h4>
          <p>分析訂單數量和機構所在地區</p>
        </div>
        <Select
          onChange={handleInputChange}
          options={chartOptions}
          value={chartValues}
        />
      </div>
      {chartValues.value != "countsByCity" && (
        <div className="d-flex gap-2 align-items-center mb-10">
          {/* 日期選擇 */}
          <div className="input-group">
            <label className="input-group-text" htmlFor="startDate">
              開始日期
            </label>
            <input
              onChange={handleStartDateChange}
              value={startDate}
              id="startDate"
              type="date"
              className="form-control"
            />
          </div>

          <span className="fw-bold">到</span>

          <div className="input-group">
            <label className="input-group-text" htmlFor="endDate">
              結束日期
            </label>
            <input
              value={endDate}
              id="endDate"
              type="date"
              className="form-control"
              onChange={handleEndDateChange}
            />
          </div>

          {/* 查詢按鈕 */}
          <button
            className="btn btn-primary text-nowrap"
            onClick={handleSearch}
          >
            查詢
          </button>
        </div>
      )}

      <div className="d-flex gap-3 mb-3">
        <div className="card w-100">
          <div className="card-body">
            <Pie data={data} options={{ responsive: true }} />
          </div>
        </div>
        <div className="card w-100">
          <div className="card-body align-items-center d-flex">
            <Bar data={data} options={{ responsive: true }} />
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <Line
            data={data}
            options={{
              responsive: true,
              scales: {
                y: {
                  beginAtZero: true, // 確保 Y 軸從 0 開始
                },
              },
            }}
          />
        </div>
      </div>
    </>
  );
}
