export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
// to GET user profile
export const GET_USER_PROFILE = `${BACKEND_URL}/api/profile`;
// to UPDATE user profile
export const UPDATE_USER_PROFILE = `${BACKEND_URL}/api/update-profile`;
// to UPDATE user shipping address
export const UPDATE_USER_SHIPPING_ADDRESS = `${BACKEND_URL}/api/update-shipping-address`;
// to GET sponsored products
export const GET_SPONSORED_PRODUCT = `${BACKEND_URL}/api/s_product`;
// to download produt file(.zip,.pdf, etc.)
export const PRODUCT_FILE_PATH = `${BACKEND_URL}/upload/products/attachments`;
// to POST User Order
export const ORDER_CHECKOUT = `${BACKEND_URL}/api/checkout`;
// to GET SINGLE PRODUCT DETAILS
export const GET_SINGLE_PRODUCT_DETAILS = `${BACKEND_URL}/api/single-product`;
// to GET ALL PRODUCTS DETAILS
export const GET_ALL_PRODUCTS_DETAILS = `${BACKEND_URL}/api/products`;
