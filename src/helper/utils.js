import axios from 'axios';
import slugify from 'react-slugify';

export const getCategoryLinks = (category) => {
    return `/danh-muc/${slugify(category.name)}-${category.id}`;
}

export const getCategoryId = ({ slug }) => {
    // truong hop cho tat ca san pham
    if (!slug) return '';
    const parts = slug.split('.');
    const partOne = parts[0];
    const smallPart = partOne.split('-');
    const cateogoryId = smallPart.pop();
    return cateogoryId;
}

export const getProductId = (slug) => {
    // if (!slug) return '';
    // const parts = slug.split('.html');
    // const partOne = parts[0];
    // const smallPart = partOne.split('-');
    // const productId = smallPart.pop();
    // return productId;
    return getCommonId(slug);
}

export const getOrderId = (slug) => {
    // if (!slug) return '';
    // const parts = slug.split('.html');
    // const partOne = parts[0];
    // const smallPart = partOne.split('-');
    // const productId = smallPart.pop();
    // return productId;
    return getCommonId(slug);
}

export const getCommonId = (slug) => {
    if (!slug) return '';
    const parts = slug.split('.html');
    const partOne = parts[0];
    const smallPart = partOne.split('-');
    const itemId = smallPart.pop();
    return itemId;
}

export const getProductDetailLinks = (product) => {
    return `/san-pham/${slugify(product.name)}-${slugify(product.id)}.html`;
}

export const getOrderDetailLinks = (order) => {
    return `don-hang/${slugify('chi-tiet-don-hang')}-${order.id}.html`;
}

export const getAuthInfo = () => {
    const authInfo = JSON.parse(localStorage.getItem('authInfo') || '{}');
    return authInfo;
}

export const axiosAuthInstance = () => axios.create({
    headers: {
        Authorization: `Bearer ${getAuthInfo().access_token}`
    }
})

export const axiosNonAuthInstance = () => axios.create({

})


// add to cart
// cartItems namg ben localStorage, product la ben UI 
export const process_add_to_cart = (cartItems, product) => {
    // mark existingIndex = -1
    let existingIndex = -1;
    for (let i = 0; i <= cartItems.length - 1; i++) {
        // kiem tra xem san pham nguoi dung them co trong gio hang?
        const item = cartItems[i];
        if (item.id === product.id) {
            existingIndex = i;
            break;
        }
    }

    // copy to the new memory
    const newCartItems = JSON.parse(JSON.stringify(cartItems));
    // neu san pham da ton tai, tang so luong
    if (existingIndex !== -1) {
        newCartItems[existingIndex].qty += Number(product.qty);
    }
    // nguoc lai them 1 san pham moi
    else {
        newCartItems.push(product);
    }
    return newCartItems;
}

// cap nhat gio hang
export const process_update_to_cart = (cartItems, product) => {
    let existingIndex = -1;
    for (let i = 0; i <= cartItems.length - 1; i++) {
        const item = cartItems[i];
        if (item.id === product.id) {
            existingIndex = i;
            break;
        }
    }

    const newCartItems = JSON.parse(JSON.stringify(cartItems));
    if (existingIndex !== -1) {
        newCartItems[existingIndex].qty = Number(product.qty);
    }
    return newCartItems;
}

export const process_delete_from_cart = (cartItems, product) => {
    let existingIndex = -1;
    for (let i = 0; i <= cartItems.length - 1; i++) {
        const item = cartItems[i];
        if (item.id === product.id) {
            existingIndex = i;
            break;
        }
    }

    const newCartItems = JSON.parse(JSON.stringify(cartItems));
    if (existingIndex !== -1) {
        newCartItems.splice(existingIndex, 1);
    }
    return newCartItems;
}