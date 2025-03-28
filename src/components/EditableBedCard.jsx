import React, { useState } from 'react';

function EditableBedCard() {
  const [isEditing, setIsEditing] = useState(false);
  const [editableBed, setEditableBed] = useState({ ...bed });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableBed(prevBed => ({
      ...prevBed,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // 在這裡處理儲存編輯後的資料，並回傳給父元件
    onBedUpdated(editableBed);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditableBed({ ...bed }); // 還原為原始資料
    setIsEditing(false);
  };

  return (
    <div className="card shadow-sm mb-3">
      <div className="row g-0">
        <div className="col-md-4 d-flex align-items-center justify-content-center bg-light p-3">
          <img
            src={editableBed.imgUrl}
            alt={editableBed.roomType}
            className="img-fluid rounded"
            style={{ maxHeight: '150px', objectFit: 'contain' }}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body p-3">
            {isEditing ? (
              <>
                <div className="mb-2">
                  <label htmlFor={`roomType-${editableBed.id}`} className="form-label">房型</label>
                  <input type="text" className="form-control" id={`roomType-${editableBed.id}`} name="roomType" value={editableBed.roomType} onChange={handleChange} />
                </div>
                <div className="mb-2">
                  <label htmlFor={`price-${editableBed.id}`} className="form-label">價格</label>
                  <input type="number" className="form-control" id={`price-${editableBed.id}`} name="price" value={editableBed.price} onChange={handleChange} />
                </div>
                <div className="mb-2">
                  <label htmlFor={`availableBeds-${editableBed.id}`} className="form-label">剩餘房型</label>
                  <input type="number" className="form-control" id={`availableBeds-${editableBed.id}`} name="availableBeds" value={editableBed.availableBeds} onChange={handleChange} />
                </div>
                <div className="mb-2">
                  <label htmlFor={`imgUrl-${editableBed.id}`} className="form-label">圖片網址</label>
                  <input type="text" className="form-control" id={`imgUrl-${editableBed.id}`} name="imgUrl" value={editableBed.imgUrl} onChange={handleChange} />
                </div>
                <div className="d-flex gap-2">
                  <button className="btn btn-primary btn-sm" onClick={handleSave}>儲存</button>
                  <button className="btn btn-secondary btn-sm" onClick={handleCancel}>取消</button>
                </div>
              </>
            ) : (
              <>
                <h5 className="card-title mb-2">{editableBed.roomType}</h5>
                <p className="card-text mb-1">價格：${editableBed.price}</p>
                <p className="card-text mb-1">剩餘：{editableBed.availableBeds} 間</p>
                <button className="btn btn-primary btn-sm" onClick={handleEdit}>編輯</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditableBedCard;