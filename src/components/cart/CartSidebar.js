import { Button, Empty } from 'antd';
import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';

import { formatNumber } from '../../utils/number';
import { calculateTotalPrice } from '../../utils/shopUtils';
import CartSidebarItem from './CartSidebarItem';

function CartSidebar() {
  const cartState = useSelector(state => state.cartReducer);
  return cartState.length === 0 ? (
    <Empty description='No products in cart' />
  ) : (
    <div className='cart-sidebar'>
      <div className='cart-sidebar-products'>
        {cartState.map((item, index) => (
          <CartSidebarItem key={index} data={item} />
        ))}
      </div>
      <div className='cart-sidebar-total'>
        <h5>
          Total:{' '}
          <span>
            {formatNumber(calculateTotalPrice(cartState))}
          </span>
        </h5>
        <div className='cart-sidebar-total__buttons'>
          <Button type='primary' shape='round'>
            <Link href={process.env.PUBLIC_URL + '/shop/checkout'}>
              <a>Checkout</a>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default React.memo(CartSidebar);
