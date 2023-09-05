export function getUsers() {
  const users = localStorage.getItem("users");
  return users !== null ? JSON.parse(users) : [];
}

export function getLoggedInUser() {
  const user = localStorage.getItem("loggedIn");
  return user !== null ? JSON.parse(user) : null;
}

export function getCartItems() {
  const cart = localStorage.getItem("cart");
  return cart !== null ? JSON.parse(cart) : [];
}

export function getOrders() {
  const orders = localStorage.getItem('orders')
  return (orders !== null) ? JSON.parse(orders) : []
}


