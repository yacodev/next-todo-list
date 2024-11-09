import { Product } from '@/products/data/products';
import { cookies } from 'next/headers';
import React from 'react';
import { products } from '@/products/data/products';
import { ItemCard } from '@/shopping-cart';
import { WidgetItem } from '@/components';

export const metadata = {
  title: 'cart',
  description: 'Cart',
};

interface ProductInCart {
  product: Product;
  quantity: number;
}
const getProductsInCart = (cart: { [id: string]: number }) => {
  const productsInCart: ProductInCart[] = [];
  console.log('cart', cart);
  for (const id in cart) {
    const product = products.find((product) => product.id === id);
    if (product) {
      productsInCart.push({ product, quantity: cart[id] });
    }
  }
  return productsInCart;
};

export default async function CartPage() {
  const cookiesStore = await cookies();
  const cart = JSON.parse(cookiesStore.get('cart')?.value ?? '{}') as {
    [id: string]: number;
  };

  const productsInCart = getProductsInCart(cart);

  const total = productsInCart.reduce((acc, productInCart) => {
    return acc + productInCart.product.price * productInCart.quantity;
  }, 0);

  return (
    <div>
      <h1 className='text-5xl'>CartsProducts </h1>
      <hr className='mb-2' />
      <div className='flex flex-col sm:flex-row gap-2 w-full'>
        <div className='flex flex-col gap-2 w-full sm:w-8/12'>
          {productsInCart.map((productInCart) => (
            <ItemCard
              key={productInCart.product.id}
              product={productInCart.product}
              quantity={productInCart.quantity}
            />
          ))}
        </div>
        <div className='flex flex-col w-full sm:w-4/12'>
          <WidgetItem title='total a pagar'>
            <div className='mt-2 flex  justify-center gap-4'>
              <h3 className='text-3xl font-bold text-gray-700'>
                $ {(total * 1.15).toFixed(2)}
              </h3>
            </div>
            <span>${(total * 0.15).toFixed(2)} de impuestos</span>
          </WidgetItem>
        </div>
      </div>
    </div>
  );
}
