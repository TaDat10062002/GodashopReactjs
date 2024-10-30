import React, { useEffect } from 'react';
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

export default function ProductInfor({ product, brand }) {
    // main image
    const images = [
        {
            original: product.featured_image,
            thumbnail: product.featured_image
        }
    ]

    // thumbnail image 
    for (const image of product.thumbnailItems) {
        images.push(
            {
                original: image.name,
                thumbnail: image.name
            }
        )
    }

    return (
        <>
            <div className="row product-info">
                <div className="col-md-6">
                    <ImageGallery
                        items={images}
                        slideDuration={1000}
                        showIndex={true}
                    />
                </div>
                <div className="col-md-6">
                    <h5 className="product-name">{product.name}</h5>
                    <div className="brand">
                        <span>Nhãn hàng: </span> <span>
                            {brand.name}
                        </span>
                    </div>
                    <div className="product-status">
                        <span>Trạng thái: </span>
                        {
                            product.inventory_qty >= 1 ?
                                <span span className="label-success">Còn hàng</span>
                                : <span span className="label-warning">Hết hàng</span>
                        }
                    </div>
                    <div className="product-item-price">
                        <span>Giá: </span>
                        <span className="product-item-discount"> {Number(product.sale_price).toLocaleString('vi-VN')}₫</span>
                    </div>
                </div>
            </div >
        </>
    );
}
