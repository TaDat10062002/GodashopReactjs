import React from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';

export default function Search({ items, handleOnSearch, handleOnSelect, ...styling }) {
    return (
        <>
            <ReactSearchAutocomplete
                items={items}
                onSearch={handleOnSearch}
                onSelect={handleOnSelect}
                styling={styling}
                // onSelect={handleOnSelect}
                autoFocus
                maxLength={50}
                placeholder="Tìm kiếm sản phẩm..."
                showNoResultsText='Không tìm thấy sản phẩm'
            />
        </>
    );
}
