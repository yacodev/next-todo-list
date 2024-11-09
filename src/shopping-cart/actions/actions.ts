import { getCookie, hasCookie, setCookie } from 'cookies-next';

export const getCookiesCart = (): { [id: string]: number } => {
  if (hasCookie('cart')) {
    const cookieCart = JSON.parse(getCookie('cart') ?? '{}');
    return cookieCart;
  }
  return {};
};

export const addProductToCart = (id: string) => {
  const cookieCart = getCookiesCart();
  const newCart = {
    ...cookieCart,
    [id]: (cookieCart[id] ?? 0) + 1,
  };

  setCookie('cart', JSON.stringify(newCart));
};

export const removeProductFromCart = (id: string) => {
  const cookieCart = getCookiesCart();
  const newCart = { ...cookieCart };
  delete newCart[id];

  setCookie('cart', JSON.stringify(newCart));
};

export const removeSingleItemFromCart = (id: string) => {
  const cookieCart = getCookiesCart();
  if (!cookieCart[id]) {
    return;
  }

  const itemsInCart = cookieCart[id] - 1;

  if (itemsInCart <= 0) {
    delete cookieCart[id];
  } else {
    cookieCart[id] = itemsInCart;
  }

  setCookie('cart', JSON.stringify(cookieCart));
};
