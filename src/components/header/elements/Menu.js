import React, { useState } from 'react';
import Link from 'next/link';
import { Button, Drawer } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { CloseOutlined } from '@ant-design/icons';

import productsData from 'src/data/product.json';
import CartSidebar from 'components/cart/CartSidebar';
import WishlistSidebar from 'components/wishlist/WishlistSidebar';
import MenuSidebar from './MenuSidebar';
import SearchBar from './SearchBar';
import { getTotalProductInCart } from 'src/utils/shopUtils';
import Container from 'components/other/Container';

function Menu({ containerType }) {
  const cartState = useSelector(state => state.cartReducer);
  const wishlistState = useSelector(state => state.wishlistReducer);
  const [cartSidebarOpen, setCartSidebarOpen] = useState(false);
  const [menuSidebarOpen, setMenuSidebarOpen] = useState(false);
  const [wishlistSidebarOpen, setWishlistSidebarOpen] = useState(false);
  return (
    <>
      <div className='menu'>
        <Container type={containerType}>
          <div className='menu-wrapper'>
            <a
              href='#'
              className='menu-sidebar-opener'
              onClick={e => {
                e.preventDefault();
                setMenuSidebarOpen(true);
              }}
            >
              <div></div>
              <div></div>
              <div></div>
            </a>
            <div className='menu-logo'>
              <Link href={process.env.NEXT_PUBLIC_URL + '/'}>
                <a>
                  <img
                    src={process.env.NEXT_PUBLIC_URL + '/assets/images/logo.png'}
                    alt='Logo'
                  />
                </a>
              </Link>
            </div>
            <SearchBar
              fillData={productsData}
              placeholder='What are you looking for ?'
            />
            <div className='menu-functions'>
              <Button>
                <Link href='#'>
                  <a>Join now</a>
                </Link>
              </Button>
              <div
                className='menu-function-item'
                onClick={() => setWishlistSidebarOpen(true)}
              >
                <img
                  src={
                    process.env.NEXT_PUBLIC_URL +
                    '/assets/images/header/menu-wishlist.png'
                  }
                  alt=''
                />
                <span>{wishlistState.length}</span>
              </div>
              <div
                className='menu-function-item'
                onClick={() => setCartSidebarOpen(true)}
              >
                <img
                  src={
                    process.env.NEXT_PUBLIC_URL +
                    '/assets/images/header/menu-bag.png'
                  }
                  alt=''
                />
                <span>{getTotalProductInCart(cartState)}</span>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <div className='menu-mobile-search'>
        <Container>
          <SearchBar fillData={productsData} placeholder='Searching...' />
        </Container>
      </div>
      <Drawer
        placement='right'
        title={`Wishlist (${wishlistState.length})`}
        closable={true}
        onClose={() => setWishlistSidebarOpen(false)}
        closeIcon={
          <>
            <p>Close</p> <CloseOutlined />
          </>
        }
        visible={wishlistSidebarOpen}
        width={445}
        className='menu-side'
      >
        <WishlistSidebar />
      </Drawer>
      <Drawer
        placement='right'
        title={`Shopping cart (${getTotalProductInCart(cartState)})`}
        closable={true}
        onClose={() => setCartSidebarOpen(false)}
        closeIcon={
          <>
            <p>Close</p> <CloseOutlined />
          </>
        }
        visible={cartSidebarOpen}
        width={445}
        className='menu-side'
      >
        <CartSidebar />
      </Drawer>
      <Drawer
        placement='right'
        closable={true}
        title=' '
        onClose={() => setMenuSidebarOpen(false)}
        closeIcon={
          <>
            <p>Close</p> <CloseOutlined />
          </>
        }
        visible={menuSidebarOpen}
        width={350}
        className='menu-side'
      >
        <MenuSidebar />
      </Drawer>
    </>
  );
}

export default React.memo(Menu);
