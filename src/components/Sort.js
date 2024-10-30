import React from 'react';

export default function Sort({ sort, handleOnSort }) {
    return (
        <>
            <div className="col-xs-6 sort-by" style={{ zIndex: 0 }}>
                <div className="pull-right">
                    <label className="left hidden-xs" htmlFor="sort-select">Sắp xếp: </label>
                    <select id="sort-select" onChange={(e) => handleOnSort(e.target.value)} value={sort}>
                        <option value=''>Mặc định</option>
                        <option value="price-asc">Giá tăng dần</option>
                        <option value="price-desc">Giá giảm dần</option>
                        <option value="alpha-asc">Từ A-Z</option>
                        <option value="alpha-desc">Từ Z-A</option>
                        <option value="created-asc">Cũ đến mới</option>
                        <option value="created-desc">Mới đến cũ</option>
                    </select>
                </div>
            </div>
        </>
    );
}
