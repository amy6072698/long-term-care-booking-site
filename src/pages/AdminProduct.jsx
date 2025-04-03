import { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import getTokenFromCookie from "../assets/js/getTokenFromCookie";
import { Link } from "react-router";
import { Modal } from "bootstrap";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import Select from "react-select";
import showSuccessMessage from "../assets/js/showSuccessMessage";
import showErrorMessage from "../assets/js/showErrorMessage";
import { ToastContainer } from "react-toastify";
const initialProduct = {
  id: 0, // 數字保持不變，或者你也可以設為 null 或其他代表初始狀態的值
  name: "",
  category: "",
  address: "",
  age: "",
  allowance: [],
  caringItem: [],
  city: "",
  comments: 0, // 數字保持不變
  description: "",
  images: [],
  like: 0, // 數字保持不變
  medicalService: [],
  region: "",
  roomCards: [
    {
      availableBeds: 0, // 數字保持不變
      id: 0, // 數字保持不變
      imgUrl: "",
      price: 0, // 數字保持不變
      roomType: "",
    },
  ],
  services: [
    {
      content: "",
      id: 0, // 數字保持不變
    },
  ],
  thumbs: [],
};
const defaultTempProduct = {
  // id: 0,
  name: "",
  category: "",
  address: "",
  age: "",
  allowance: [],
  caringItem: [],
  city: "",
  comments: 0,
  description: "",
  images: [],
  like: 0,
  medicalService: [],
  region: "",
  roomCards: [],
  services: [],
  thumbs: [],
};
export default function AdminLProduct() {
  const { token } = getTokenFromCookie();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = useRef(10);
  const [totalPages, setTotalPages] = useState(0);
  const [tempProduct, setTempProduct] = useState(initialProduct);

  // 取得產品資料
  const getProducts = useCallback(async () => {
    try {
      const { headers, data } = await axios.get(
        `${BASE_URL}/640/products?_page=${currentPage}&_limit=${itemsPerPage.current}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      const totalCount = headers["x-total-count"];
      setTotalPages(Math.ceil(totalCount / itemsPerPage.current));
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  }, [token, currentPage]);

  // 初始化時、getProducts變動時會觸發getProducts
  useEffect(() => {
    getProducts();
  }, [getProducts]);

  //改變頁數
  const handleChangePage = (e, page) => {
    e?.preventDefault();
    setCurrentPage(page);
  };

  // 建立product ref物件
  const productModalRef = useRef(null);

  // 畫面旋然後建立modal實例
  useEffect(() => {
    new Modal(productModalRef.current, {
      backdrop: false,
    });
  }, []);

  // 打開productModal
  const [modalMode, setModalMode] = useState([]);
  const handleOpenProductModal = (mode, product) => {
    const modalInstance = Modal.getInstance(productModalRef.current);
    setModalMode(mode);
    switch (mode) {
      case "create":
        setTempProduct(defaultTempProduct);

        break;
      case "update":
        setTempProduct(product);

        break;
    }
    modalInstance.show();
  };

  // 關閉刪除productModal
  const handleCloseProductModal = () => {
    const modalInstance = Modal.getInstance(productModalRef.current);
    modalInstance.hide();
  };

  // 將選項寫入到options中
  const [allowanceOptions, setAllowanceOptions] = useState([]);
  const [caringItemOptions, setCaringItemOptions] = useState([]);
  const [medicalServiceOptions, setMedicalServiceOptions] = useState([]);
  const [servicesOptions, setServicesOptions] = useState([]);
  const [ageOptions, setAgeOptions] = useState([]);

  useEffect(() => {
    const ages = ["0-59歲", "60歲以上", "65歲以上"];
    const allowance = ["老人補助（低收、中低收）", "身心障礙", "喘息服務"];
    const caringItem = [
      "鼻胃管",
      "導尿管",
      "精神照護",
      "認知障礙（失智）",
      "氣切管",
      "氧氣",
      "復健照護",
      "腫瘤照護（癌症）",
      "透析照護（洗腎）",
    ];
    const medicalService = [
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
    ];

    const services = [
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
      {
        id: 5,
        name: "失智照顧",
      },
      {
        id: 6,
        name: "免外出復健",
      },
      {
        id: 7,
        name: "個別化飲食",
      },
    ];

    setAgeOptions(
      ages.map((item) => {
        return {
          value: item,
          label: item,
        };
      })
    );

    setAllowanceOptions(
      allowance.map((item) => {
        return {
          value: item,
          label: item,
        };
      })
    );

    setCaringItemOptions(
      caringItem.map((item) => {
        return {
          value: item,
          label: item,
        };
      })
    );

    setMedicalServiceOptions(
      medicalService.map((item) => {
        return {
          value: item,
          label: item,
        };
      })
    );

    setServicesOptions(
      services.map((item) => {
        return {
          value: item.id,
          label: item.name,
        };
      })
    );
  }, []);

  const [allowanceValues, setAllowanceValues] = useState([]);
  const [caringItemValues, setCaringItemValues] = useState([]);
  const [medicalServiceValues, setMedicalServiceValues] = useState([]);
  const [servicesValues, setServicesValues] = useState([]);
  const [ageValues, setAgeValues] = useState([]);
  // tempProduct變動時寫入到select的values中
  useEffect(() => {
    setAllowanceValues(
      tempProduct?.allowance?.map((allowance) => ({
        value: allowance,
        label: allowance,
      }))
    );
    setCaringItemValues(
      tempProduct?.caringItem?.map((caringItem) => ({
        value: caringItem,
        label: caringItem,
      }))
    );
    setMedicalServiceValues(
      tempProduct?.medicalService?.map((medicalService) => ({
        value: medicalService,
        label: medicalService,
      }))
    );
    setServicesValues(
      tempProduct?.services?.map((service) => ({
        value: service.id,
        label: service.name,
      }))
    );

    setAgeValues({
      value: tempProduct.age,
      label: tempProduct.age,
    });
  }, [tempProduct]);

  // react-selected中寫入tempProduct(特殊格式寫回tempProduct)
  const handleChange = (selected, e) => {
    const { name } = e;
    const { value } = selected;
    if (name === "services") {
      const newValues = selected
        ? selected.map((item) => {
            return {
              id: item.value,
              name: item.label,
            };
          })
        : [];
      setTempProduct({
        ...tempProduct,
        [name]: newValues,
      });
    } else if (name === "age") {
      setTempProduct({
        ...tempProduct,
        [name]: value,
      });
    } else {
      const newValues = selected ? selected.map((item) => item.value) : [];
      setTempProduct({
        ...tempProduct,
        [name]: newValues,
      });
    }
  };

  // 一般input寫入tempProduct
  const handleModalInputChange = (e) => {
    const { name, value } = e.target;
    setTempProduct({
      ...tempProduct,
      [name]: value,
    });
  };

  // 處理images、thumbs圖片數量
  const handleImgInputChange = (e, index) => {
    const { name, value } = e.target;
    const newImages = [...tempProduct[name]];
    newImages[index] = value;
    setTempProduct({
      ...tempProduct,
      [name]: [...newImages],
    });
  };

  //處理房型資訊
  const handleRoomInputChange = (e, index) => {
    const { value, name, dataset } = e.target;
    const dataId = dataset.id;
    const newValues = [...tempProduct[name]];
    if (dataId == "price" || dataId == "availableBeds") {
      newValues[index][dataId] = Number(value);
    } else {
      newValues[index][dataId] = value;
    }

    setTempProduct({
      ...tempProduct,
      [name]: newValues,
    });
  };

  // 新增房型
  const handleAddRoomType = (e) => {
    const { name } = e.target;
    const roomId = tempProduct.roomCards.length + 1;
    const room = {
      id: roomId,
      imgUrl: "",
      roomType: "",
      price: 0,
      availableBeds: 0,
    };
    const newValues = [...tempProduct[name], room];
    setTempProduct({
      ...tempProduct,
      [name]: newValues,
    });
  };

  // 辨認送出是更新還是新增api
  const handleUpdateProduct = async () => {
    const apiCall = modalMode === "update" ? updateProduct : createProduct;
    try {
      await apiCall();
      handleCloseProductModal();
      // showSuccessMessage(`編輯成功！`);
      getProducts();
    } catch (error) {
      const { message } = error;
      showErrorMessage(message);
    }
  };

  // 更新產品api
  const updateProduct = async () => {
    try {
      await axios.put(
        `${BASE_URL}/660/products/${tempProduct.id}`,
        {
          ...tempProduct,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      showSuccessMessage(`編輯成功！`);
    } catch (error) {
      console.log(error);
    }
  };

  // 新增產品api
  const createProduct = async () => {
    try {
      await axios.post(
        `${BASE_URL}/660/products`,
        {
          ...tempProduct,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      showSuccessMessage(`新增成功！`);
    } catch (error) {
      console.log(error);
    }
  };

  //新增附圖
  const handleAddImage = (e) => {
    const { name } = e.target;
    const newImages = [...tempProduct[name], ""];
    setTempProduct({
      ...tempProduct,
      [name]: newImages,
    });
  };
  //移除副圖
  const handleRemoveImage = (e) => {
    const { name } = e.target;
    const newImages = [...tempProduct[name]];
    newImages.pop();
    setTempProduct({
      ...tempProduct,
      [name]: newImages,
    });
  };

  // 建立ref物件
  const productDelModalRef = useRef(null);

  //
  // 畫面旋然後建立modal實例
  useEffect(() => {
    new Modal(productDelModalRef.current, {
      backdrop: false,
    });
  }, []);

  const [delId, setDelId] = useState(0);

  // 打開刪除modal
  const handleOpenDelProductModal = (id) => {
    const modalInstance = Modal.getInstance(productDelModalRef.current);
    setDelId(id);
    modalInstance.show();
  };

  // 關閉刪除modal
  const handleCloseDelProductModal = () => {
    const modalInstance = Modal.getInstance(productDelModalRef.current);
    modalInstance.hide();
  };

  // 刪除api
  const handleDelProduct = async (e, id) => {
    try {
      await axios.delete(`${BASE_URL}/660/products/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      handleCloseDelProductModal();
      getProducts();
      showSuccessMessage(`刪除成功！`);
    } catch (error) {
      const { message } = error;
      showErrorMessage(message);
    }
  };

  return (
    <>
      {/* toast */}
      <ToastContainer />
      <div className="d-flex justify-content-between pt-14">
        <h4 className="mb-2 text-primary-100">機構管理</h4>
        <button
          type="button"
          className="btn btn-primary-110"
          onClick={() => {
            handleOpenProductModal("create");
          }}
        >
          新增機構
        </button>
      </div>
      <p className="mb-10">查看所有產品</p>
      <table className="table table-striped  admin-order">
        <thead>
          <tr>
            <th scope="col">產品編號</th>
            <th scope="col">機構名稱</th>
            <th scope="col">機構類型</th>
            <th scope="col">機構地址</th>
            <th scope="col">機構城市</th>
            <th scope="col">詳細資料</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.address}</td>
              <td>{product.city}</td>
              <td>
                <div className="btn-group">
                  <button
                    onClick={() =>
                      handleOpenProductModal("update", product)
                    }
                    className="btn btn-outline-primary-80 btn-sm"
                    type="button"
                  >
                    編輯
                  </button>
                  <button
                    onClick={() => handleOpenDelProductModal(product.id)}
                    className="btn btn-outline-danger btn-sm"
                    type="button"
                  >
                    刪除
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
          
        
      

      {/* 分頁 */}
      <nav className="admin-page" aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li
            onClick={(e) => {
              if (currentPage != 1) {
                handleChangePage(e, currentPage - 1);
              }
            }}
            className={`page-item ${currentPage == 1 && "disabled"}`}
          >
            <Link className="page-link">&laquo;</Link>
          </li>
          {Array.from({ length: totalPages }).map((_, index) => {
            return (
              <li
                className="page-item"
                key={index + 1}
                onClick={(e) => {
                  handleChangePage(e, index + 1);
                }}
              >
                <Link
                  className={`page-link 
                ${currentPage === index + 1 && "active"}
                  `}
                >
                  {index + 1}
                </Link>
              </li>
            );
          })}
          <li
            className={`page-item ${currentPage == totalPages && "disabled"}`}
            onClick={(e) => {
              if (currentPage < totalPages) {
                handleChangePage(e, currentPage + 1);
              }
            }}
          >
            <Link className="page-link" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* 產品modal */}
      <div
        ref={productModalRef}
        className="modal"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content border-0 shadow">
            <div className="modal-header px-10 border-bottom">
              <h5 className="modal-title fs-4">
                {modalMode === "create" ? "新增機構" : "編輯機構"}
              </h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={handleCloseProductModal}
              ></button>
            </div>

            <div className="modal-body px-10">
              <div className="row">
                <div className="col-4">
                  {/* 大圖 */}
                  <div>輪播主圖</div>
                  <div className="border mb-11 border-2 border-dashed rounded-3 p-3">
                    {tempProduct?.images?.map((image, index) => {
                      if (index === 0) {
                        // 主圖
                        return (
                          <div key={index} className="mb-2">
                            <label htmlFor="mainImage" className="form-label">
                              輪播主圖
                            </label>
                            <input
                              value={image}
                              onChange={(e) => {
                                handleImgInputChange(e, index);
                              }}
                              id="mainImage"
                              name="images"
                              type="text"
                              placeholder="主圖網址"
                              className="form-control mb-2"
                            />
                            {image && (
                              <img
                                src={image}
                                alt="主圖"
                                className="img-fluid mb-2"
                              />
                            )}
                          </div>
                        );
                      } else {
                        // 副圖
                        return (
                          <div key={index} className="mb-2">
                            <label
                              htmlFor={`imagesUrl-${index}`}
                              className="form-label"
                            >
                              副圖 {index}
                            </label>
                            <input
                              onChange={(e) => {
                                handleImgInputChange(e, index);
                              }}
                              name="images"
                              value={image}
                              id={`imagesUrl-${index}`}
                              type="text"
                              placeholder={`圖片網址 ${index}`}
                              className="form-control mb-2"
                            />
                            {image && (
                              <img
                                src={image}
                                alt={`副圖 ${index}`}
                                className="img-fluid mb-2"
                              />
                            )}
                          </div>
                        );
                      }
                    })}

                    <div className="btn-group w-100">
                      {tempProduct.images.length < 5 &&
                        tempProduct.images[tempProduct.images.length - 1] !==
                          "" && (
                          <button
                            name="images"
                            className="btn btn-outline-primary-80 btn-sm w-100"
                            onClick={(e) => {
                              handleAddImage(e);
                            }}
                          >
                            新增圖片
                          </button>
                        )}
                      {tempProduct.images.length > 1 && (
                        <button
                          name="images"
                          className="btn btn-outline-danger btn-sm w-100"
                          onClick={(e) => {
                            handleRemoveImage(e);
                          }}
                        >
                          取消圖片
                        </button>
                      )}
                    </div>
                  </div>
                  {/* swiper縮圖 */}
                  <div>輪播縮圖</div>
                  <div className="border border-2 border-dashed rounded-3 p-3">
                    {tempProduct?.thumbs?.map((thumb, index) => {
                      return (
                        <div key={index} className="mb-2">
                          <label
                            htmlFor={`thumb-${index}`}
                            className="form-label"
                          >
                            {`輪播右側縮圖${index + 1}`}
                          </label>
                          <input
                            value={thumb}
                            onChange={(e) => {
                              handleImgInputChange(e, index);
                            }}
                            id={`thumb-${index}`}
                            name="thumbs"
                            type="text"
                            placeholder="縮圖網址"
                            className="form-control mb-2"
                          />
                          {thumb && (
                            <img
                              src={thumb}
                              alt="縮圖"
                              className="img-fluid mb-2"
                            />
                          )}
                        </div>
                      );
                    })}
                    <div className="btn-group w-100">
                      {tempProduct.thumbs.length < 5 &&
                        tempProduct.thumbs[tempProduct.thumbs.length - 1] !==
                          "" && (
                          <button
                            name="thumbs"
                            className="btn btn-outline-primary-80 btn-sm w-100"
                            onClick={(e) => {
                              handleAddImage(e);
                            }}
                          >
                            新增圖片
                          </button>
                        )}
                      {tempProduct.thumbs.length > 1 && (
                        <button
                          name="thumbs"
                          className="btn btn-outline-danger btn-sm w-100"
                          onClick={(e) => {
                            handleRemoveImage(e);
                          }}
                        >
                          取消圖片
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-8">
                  <div className="d-flex gap-5 mb-5">
                    <div className="col">
                      <label htmlFor="productId" className="form-label">
                        機構編號
                      </label>
                      <input
                        value={tempProduct?.id || "自動生成"}
                        id="productId"
                        name="productId"
                        type="text"
                        disabled
                        className="form-control"
                      />
                    </div>
                    <div className="col">
                      <label htmlFor="name" className="form-label">
                        機構名稱
                      </label>
                      <input
                        onChange={(e) => {
                          handleModalInputChange(e);
                        }}
                        value={tempProduct?.name}
                        name="name"
                        id="name"
                        type="text"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="d-flex gap-5 mb-5">
                    <div className="col">
                      <label htmlFor="category" className="form-label">
                        機構類型
                      </label>
                      <input
                        onChange={(e) => {
                          handleModalInputChange(e);
                        }}
                        value={tempProduct.category}
                        name="category"
                        id="category"
                        type="text"
                        className="form-control"
                      />
                    </div>
                    <div className="col">
                      <label htmlFor="address" className="form-label">
                        機構地址
                      </label>
                      <input
                        onChange={(e) => {
                          handleModalInputChange(e);
                        }}
                        value={tempProduct.address}
                        name="address"
                        id="address"
                        type="text"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="d-flex gap-5 mb-5">
                    <div className="col">
                      <label htmlFor="city" className="form-label">
                        機構所在縣市
                      </label>
                      <input
                        onChange={(e) => {
                          handleModalInputChange(e);
                        }}
                        value={tempProduct.city}
                        name="city"
                        id="city"
                        type="text"
                        className="form-control"
                      />
                    </div>
                    <div className="col">
                      <label htmlFor="region" className="form-label">
                        機構所在地區
                      </label>
                      <input
                        onChange={(e) => {
                          handleModalInputChange(e);
                        }}
                        value={tempProduct.region}
                        name="region"
                        id="region"
                        type="text"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="d-flex gap-5 mb-5">
                    <div className="col">
                      <label htmlFor="age" className="form-label">
                        入住者年齡限制
                      </label>
                      <Select
                        inputId="age"
                        name="age"
                        onChange={handleChange}
                        options={ageOptions}
                        value={ageValues}
                      />
                    </div>
                  </div>

                  <div className="mb-5">
                    <label htmlFor="allowance">政府補助</label>
                    <Select
                      isMulti
                      inputId="allowance"
                      name="allowance"
                      onChange={handleChange}
                      options={allowanceOptions}
                      value={allowanceValues}
                    />
                  </div>

                  <div className="mb-5">
                    <label htmlFor="caringItem">服務對象</label>
                    <Select
                      isMulti
                      inputId="caringItem"
                      name="caringItem"
                      onChange={handleChange}
                      options={caringItemOptions}
                      value={caringItemValues}
                    />
                  </div>

                  <div className="mb-5">
                    <label htmlFor="medicalService">醫療服務</label>
                    <Select
                      isMulti
                      inputId="medicalService"
                      name="medicalService"
                      onChange={handleChange}
                      options={medicalServiceOptions}
                      value={medicalServiceValues}
                    />
                  </div>

                  <div className="mb-5">
                    <label htmlFor="services">特色服務</label>
                    <Select
                      isMulti
                      inputId="services"
                      name="services"
                      onChange={handleChange}
                      options={servicesOptions}
                      value={servicesValues}
                    />
                  </div>
                  <div className="mb-5">
                    <label htmlFor="description">機構描述</label>
                    <textarea
                      value={tempProduct.description}
                      onChange={handleModalInputChange}
                      className="form-control"
                      placeholder="請輸入機構描述"
                      name="description"
                      id="description"
                      style={{ style: "100px" }}
                    ></textarea>
                  </div>
                  <div>機構房型</div>
                  <div className="row gy-7">
                    {tempProduct?.roomCards?.map((item, index) => {
                      return (
                        <div className="col-md-6 mb-4" key={index}>
                          <div className="card shadow-sm">
                            {item.imgUrl && (
                              <img
                                src={item.imgUrl}
                                alt={item.roomType}
                                className="card-img-top img-fluid"
                                style={{ height: "200px", objectFit: "cover" }}
                              />
                            )}

                            <div className="card-body">
                              <div className="mb-3">
                                <label
                                  className="form-label"
                                  htmlFor={`imgUrl-${index}`}
                                >
                                  房型圖片網址
                                </label>
                                <input
                                  onChange={(e) => {
                                    handleRoomInputChange(e, index);
                                  }}
                                  id={`imgUrl-${index}`}
                                  data-id="imgUrl"
                                  name="roomCards"
                                  type="text"
                                  className="form-control"
                                  value={item.imgUrl}
                                />
                              </div>
                              <div className="mb-3">
                                <label
                                  className="form-label"
                                  htmlFor={`roomType-${index}`}
                                >
                                  房型
                                </label>
                                <input
                                  onChange={(e) => {
                                    handleRoomInputChange(e, index);
                                  }}
                                  name="roomCards"
                                  data-id="roomType"
                                  id={`roomType-${index}`}
                                  type="text"
                                  className="form-control"
                                  value={item.roomType}
                                />
                              </div>
                              <div className="mb-3">
                                <label
                                  className="form-label"
                                  htmlFor={`price-${index}`}
                                >
                                  房型價格
                                </label>
                                <input
                                  onChange={(e) => {
                                    handleRoomInputChange(e, index);
                                  }}
                                  name="roomCards"
                                  data-id="price"
                                  id={`price-${index}`}
                                  type="number"
                                  className="form-control"
                                  value={item.price}
                                />
                              </div>
                              <div className="mb-3">
                                <label
                                  className="form-label"
                                  htmlFor={`availableBeds-${index}`}
                                >
                                  剩餘數量
                                </label>
                                <input
                                  onChange={(e) => {
                                    handleRoomInputChange(e, index);
                                  }}
                                  type="number"
                                  data-id="availableBeds"
                                  name="roomCards"
                                  id={`availableBeds-${index}`}
                                  className="form-control"
                                  value={item.availableBeds}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    <div className="btn-group w-100">
                      <button
                        name="roomCards"
                        className="btn btn-outline-primary-80 btn-sm w-100"
                        onClick={(e) => {
                          handleAddRoomType(e);
                        }}
                      >
                        新增機構房型
                      </button>

                      {tempProduct.roomCards.length > 0 && (
                        <button
                          name="roomCards"
                          className="btn btn-outline-danger btn-sm w-100"
                          onClick={(e) => {
                            handleRemoveImage(e);
                          }}
                        >
                          取消機構房型
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer border-top bg-light">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCloseProductModal}
              >
                取消
              </button>
              <button
                type="button"
                className="btn btn-primary-110"
                onClick={handleUpdateProduct}
              >
                確認
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 刪除modal */}
      <div
        ref={productDelModalRef}
        className="modal fade"
        id="delProductModal"
        tabIndex="-1"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">刪除產品</h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleCloseDelProductModal}
              ></button>
            </div>
            <div className="modal-body">
              你是否要刪除
              <span className="text-danger fw-bold">`訂單編號{delId}`</span>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCloseDelProductModal}
              >
                取消
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={(e) => {
                  handleDelProduct(e, delId);
                }}
              >
                刪除
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
