export default {
  user: {
    get: () => {
      const userString = localStorage.getItem('delivery_app_trybe_user');
      return JSON.parse(userString);
    },
    set: (user) => {
      const userString = JSON.stringify(user);
      localStorage.setItem('delivery_app_trybe_user', userString);
    },
    remove: () => {
      localStorage.removeItem('delivery_app_trybe_user');
    },
  },
  cart: {
    get: () => {
      const cartString = localStorage.getItem('delivery_app_trybe_cart');
      return JSON.parse(cartString);
    },
    set: (item) => {
      const cartString = localStorage.getItem('delivery_app_trybe_cart');
      const cartJson = (!cartString) ? {} : JSON.parse(cartString);
      cartJson[item.name] = { id: item.id, quantity: item.quantity, price: item.price };
      const newCartString = JSON.stringify(cartJson);
      localStorage.setItem('delivery_app_trybe_cart', newCartString);
    },
    remove: () => {
      localStorage.removeItem('delivery_app_trybe_cart');
    },
  },
};
