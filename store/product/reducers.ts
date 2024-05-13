const customerId = typeof window !== 'undefined' ? parseInt(localStorage.getItem("id")) || 0 : 0;
// actions.js
export const setProducts = (products) => ({
  type: 'SET_PRODUCTS',
  payload: products,
});

export const setMenus = (menus) => ({
  type: 'SET_MENUS',
  payload: menus,
});


export const setFaqs = (faqs) => ({
  type: 'SET_FAQS',
  payload: faqs,
});

export const setCheckoutFormData = (formData) => ({
  type: 'SET_CHECKOUT_FORM_DATA',
  payload: formData,
});

// reducers.js
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const initialProductState = {
  product: {},
};

const initialMenuState = {
  menus: [],
};

const initialFaqState = {
  faqs: [],
};
const initialState = {
  formData: {
    firstName: "",
    lastName: "",
    phone: "",
    country: "Pakistan",
    email: "",
    state: "",
    address: "",
    address2: "",
    city: "",
    customer_id: customerId,
    pincode: 0,
    paymentMethod: "",
  },
};

export type ProductState = {
  product: {
    product: {

    };
  };
};


export type FaqState = {
  faqs: [];
};

export type MenuState = {
  menus: [];
};

export type CheckoutState = {
  checkout: {
    formData: {
      firstName: string;
      lastName: string;
      phone: string;
      country: string;
      email: string;
      state: string;
      address: string;
      address2: string;
      city: string;
      customer_id: number;
      pincode: number;
      paymentMethod: "cod";
    };
  }
};



const productReducer = (state = initialProductState, action) => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return {
        ...state,
        product: action.payload,
      };
    default:
      return state;
  }
};

const menuReducer = (state = initialMenuState, action) => {
  switch (action.type) {
    case 'SET_MENUS':
      return {
        ...state,
        menus: action.payload,
      };
    default:
      return state;
  }
};

const faqReducer = (state = initialFaqState, action) => {
  switch (action.type) {
    case 'SET_FAQS':
      return {
        ...state,
        faqs: action.payload,
      };
    default:
      return state;
  }
};


const checkoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CHECKOUT_FORM_DATA':
      console.log('action.payload checkout form', action.payload);
      return {
        ...state,
        formData: action.payload,
      };
    default:
      return state;
  }
};


const rootReducer = combineReducers({
  product: persistReducer(
    { key: 'product', storage },
    productReducer
  ),
  menu: persistReducer(
    { key: 'menu', storage },
    menuReducer
  ),
  faq: persistReducer(
    { key: 'faq', storage },
    faqReducer
  ),
  checkout: persistReducer(
    { key: 'checkout', storage },
    checkoutReducer
  ),
});

export default rootReducer;
