import { Menu } from 'antd';
import Link from 'next/link';
import React from 'react';

function MenuSidebar() {
  const { SubMenu } = Menu;
  return (
    <div className='menu-sidebar'>
      <Menu mode='inline'>
        <SubMenu key='sub2' title='Shop'>
          <SubMenu key='sub2-1' title='Shop detail'>
            <Menu.Item key='5'>
              <Link
                href={
                  process.env.NEXT_PUBLIC_URL +
                  '/shop/product-detail/product-detail-1'
                }
              >
                <a>Product Detail 1</a>
              </Link>
            </Menu.Item>
            <Menu.Item key='6'>
              <Link
                href={
                  process.env.NEXT_PUBLIC_URL +
                  '/shop/product-detail/product-detail-2'
                }
              >
                <a>Product Detail 2</a>
              </Link>
            </Menu.Item>
            <Menu.Item key='7'>
              <Link
                href={
                  process.env.NEXT_PUBLIC_URL +
                  '/shop/product-detail/product-detail-3'
                }
              >
                <a>Product Detail 3</a>
              </Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key='8'>
            <Link href={process.env.NEXT_PUBLIC_URL + '/shop/checkout'}>
              <a>Checkout</a>
            </Link>
          </Menu.Item>
          <Menu.Item key='9'>
            <Link href={process.env.NEXT_PUBLIC_URL + '/shop/checkout-complete'}>
              <a>Checkout Complete</a>
            </Link>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key='10'>
          <Link href={process.env.NEXT_PUBLIC_URL + '#'}>
            <a>Help</a>
          </Link>
        </Menu.Item>
        <Menu.Item key='11'>
          <Link href={process.env.NEXT_PUBLIC_URL + '#'}>
            <a>Offer</a>
          </Link>
        </Menu.Item>
      </Menu>
    </div>
  );
}

export default React.memo(MenuSidebar);
