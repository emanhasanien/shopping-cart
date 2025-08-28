import { createContext, useContext, useEffect, useReducer } from "react";

// 1. إنشاء الكونتكست
const cartContext = createContext();

// 2. Reducer function للتحكم في حالة السلة
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItem = state.find(item => item.id === action.payload.id);
      if (existingItem) {
        // لو المنتج موجود نزود الكمية فقط
        return state.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // لو جديد نضيفه مع quantity = 1
        return [...state, { ...action.payload, quantity: 1 }];
      }
    }

    case "REMOVE_FROM_CART":
      return state.filter(item => item.id !== action.payload);

    case "INCREASE_QUANTITY":
      return state.map(item =>
        item.id === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

    case "DECREASE_QUANTITY":
      return state.map(item =>
        item.id === action.payload && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );

    default:
      return state;
  }
};

// 3. Wrapper component
export const CartProvider = ({ children }) => {
// نجيب البيانات من localStorage أو نخليها []
  const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

  const [cart, dispatch] = useReducer(cartReducer, storedCart);

  // أي تعديل في cart يتحفظ في localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <cartContext.Provider value={{ cart, dispatch }}>
      {children}
    </cartContext.Provider>
  );
};

// 4. Custom hook 
export const useCart = () => useContext(cartContext);
