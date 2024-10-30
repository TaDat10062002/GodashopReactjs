import React from 'react';
import CommentForm from './CommentForm';
import DOMPurify from 'dompurify';

export default function ProductDescription({ product }) {
    return (
        <>
            <div className="row product-description">
                <div className="col-xs-12">
                    <div role="tabpanel">
                        {/* Nav tabs */}
                        <ul className="nav nav-tabs" role="tablist">
                            <li role="presentation" className="active">
                                <a href="#product-description" aria-controls="home" role="tab" data-toggle="tab">Mô tả</a>
                            </li>
                            <li role="presentation">
                                <a href="#product-comment" aria-controls="tab" role="tab" data-toggle="tab">Đánh giá</a>
                            </li>
                        </ul>
                        {/* Tab panes */}
                        <div className="tab-content">
                            <div role="tabpanel" className="tab-pane active" id="product-description" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.description) }}>
                            </div>
                            <CommentForm product={product} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
