import React from 'react';

export default function PriceSideBar({ priceRange, handleOnPrice }) {
    return (
        <>
            <div className="price-range">
                <h5>Khoảng giá</h5>
                <ul>
                    <li>
                        <label htmlFor="filter-less-100">
                            <input type="radio" id="filter-less-100" name="filter-price" value="0-100000" onClick={(e) => handleOnPrice(e.target.value)} defaultChecked={priceRange === '0-100000' ? true : false} />
                            <i className="fa" />
                            Giá dưới 100.000đ
                        </label>
                    </li>
                    <li>
                        <label htmlFor="filter-100-200">
                            <input type="radio" id="filter-100-200" name="filter-price" value="100000-200000" onClick={(e) => handleOnPrice(e.target.value)} defaultChecked={priceRange === '100000-200000' ? true : false} />
                            <i className="fa" />
                            100.000đ - 200.000đ
                        </label>
                    </li>
                    <li>
                        <label htmlFor="filter-200-300">
                            <input type="radio" id="filter-200-300" name="filter-price" value="200000-300000" onClick={(e) => handleOnPrice(e.target.value)} defaultChecked={priceRange === '200000-300000' ? true : false} />
                            <i className="fa" />
                            200.000đ - 300.000đ
                        </label>
                    </li>
                    <li>
                        <label htmlFor="filter-300-500">
                            <input type="radio" id="filter-300-500" name="filter-price" value="300000-500000" onClick={(e) => handleOnPrice(e.target.value)} defaultChecked={priceRange === '300000-500000' ? true : false} />
                            <i className="fa" />
                            300.000đ - 500.000đ
                        </label>
                    </li>
                    <li>
                        <label htmlFor="filter-500-1000">
                            <input type="radio" id="filter-500-1000" name="filter-price" value="500000-1000000" onClick={(e) => handleOnPrice(e.target.value)} defaultChecked={priceRange === '500000-1000000' ? true : false} />
                            <i className="fa" />
                            500.000đ - 1.000.000đ
                        </label>
                    </li>
                    <li>
                        <label htmlFor="filter-greater-1000">
                            <input type="radio" id="filter-greater-1000" name="filter-price" value="1000000-greater" onClick={(e) => handleOnPrice(e.target.value)} defaultChecked={priceRange === '1000000-greater' ? true : false} />
                            <i className="fa" />
                            Giá trên 1.000.000đ
                        </label>
                    </li>
                </ul>
            </div>
        </>
    );
}
