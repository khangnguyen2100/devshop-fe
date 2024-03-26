import { Button, Modal, Rate, Skeleton, Spin, Tooltip, message } from 'antd';
import classNames from 'classnames';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  checkAvaiableQuantityToAdd,
  checkProductInWishlist,
} from 'utils/shopUtils';
import { addToCart } from 'redux/actions/cartActions';
import {
  addToWishlist,
  removeFromWishlist,
} from 'redux/actions/wishlistActions';
import { formatNumber } from 'utils/number';
import ShopQuickView from '../shop/ShopQuickView';

function Product({ data, productStyle }) {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  console.log('imageLoading:', imageLoading)
  const globalState = useSelector(state => state.globalReducer);
  const cartState = useSelector(state => state.cartReducer);
  const wishlistState = useSelector(state => state.wishlistReducer);
  const productInWishlist = checkProductInWishlist(wishlistState, data._id);
  const avaiableQuantity = checkAvaiableQuantityToAdd(cartState, data);
  useEffect(() => {
    setImageLoading(true);
  }, [globalState.category]);
  const renderProductType = () => {
    return null;
    if (data.discount && !data.isNew) {
      return <p className='product-type -sale'>Sale</p>;
    } else if (data.isNew && !data.discount) {
      return <p className='product-type -new'>New</p>;
    } else if (data.isNew && data.discount) {
      return <p className='product-type -new'>New</p>;
    } else {
      return null;
    }
  };
  const onAddToCart = data => {
    if (avaiableQuantity === 0) {
      return;
    }
    dispatch(addToCart(data, 1, 'none', 'none'));
    message.success('Product added to cart successfully');
  };
  const onAddToWishlist = data => {
    if (productInWishlist) {
      dispatch(removeFromWishlist(data._id));
      return message.error('Product removed from wishlist');
    } else {
      dispatch(addToWishlist(data));
      return message.success('Product added to wishlist successfully');
    }
  };
  const renderStyleClass = () => {
    const avaialeStyles = ['one', 'two', 'three'];
    if (avaialeStyles.includes(productStyle)) {
      if (!productStyle || productStyle === 'one') {
        return '-style-one';
      } else {
        return '-style-' + productStyle;
      }
    } else {
      return '-style-one';
    }
  };
  const showModal = () => {
    setVisible(true);
  };
  const handleCancel = e => {
    setVisible(false);
  };
  const handleImageLoaded = () => {
    setImageLoading(false);
  };
  return data ? (
    <>
      <div className={`product ${renderStyleClass()}`}>
        <div className='product-image'>
          <Link
            href={process.env.NEXT_PUBLIC_URL + `/product/[slug]`}
            as={process.env.NEXT_PUBLIC_URL + `/product/${data.productSlug}`}
          >
            <a className={classNames({ loading: imageLoading })}>
              <img
                onLoad={handleImageLoaded}
                // src={data.productThumb}
                src={'https://down-vn.img.susercontent.com/file/4a7fc7364c6e267ab67a479465fce3df'}
                alt='Product image'
              />
            </a>
          </Link>
          {imageLoading && (
            <div className='product-image-loading'>
              <Spin size='large' />
            </div>
          )}
          {renderProductType()}
          {productStyle === 'two' ? (
            <div className='product-button-group'>
              <Tooltip title='Quick view'>
                <Button onClick={showModal} type='text'>
                  <i className='icon_search' />
                </Button>
              </Tooltip>
              <Tooltip
                title={
                  productInWishlist ? 'Remove from wishlist' : 'Add to wishlist'
                }
              >
                <Button
                  className={`product-atw ${classNames({
                    active: productInWishlist,
                  })}`}
                  type='text'
                  onClick={() => onAddToWishlist(data)}
                >
                  <i className='icon_heart_alt' />
                </Button>
              </Tooltip>
              <Tooltip title='Add to cart'>
                <Button
                  disabled={avaiableQuantity === 0}
                  type='text'
                  onClick={() => onAddToCart(data)}
                >
                  <i className='icon_bag_alt' />
                </Button>
              </Tooltip>
            </div>
          ) : null}
          {!productStyle || productStyle === 'one' ? (
            <>
              <Tooltip
                placement='left'
                title={
                  productInWishlist ? 'Remove from wishlist' : 'Add to wishlist'
                }
              >
                <Button
                  className={`product-atw ${classNames({
                    active: productInWishlist,
                  })}`}
                  type='text'
                  shape='circle'
                  onClick={() => onAddToWishlist(data)}
                >
                  <i className='icon_heart_alt' />
                </Button>
              </Tooltip>

              <Button onClick={showModal} className='product-qv'>
                Quick view
              </Button>
            </>
          ) : null}
        </div>
        <div className='product-content'>
          <Link
            href={process.env.NEXT_PUBLIC_URL + `/product/[slug]`}
            as={process.env.NEXT_PUBLIC_URL + `/product/${data.productSlug}`}
          >
            <a className='product-name'>{data.productName}</a>
          </Link>
          <div className='product-rate'>
            <Rate defaultValue={data.productRatingAverage} disabled />
            <span className='product-rate-quantity'>(06)</span>
          </div>
          <div className='product-content__footer'>
            <div className='product-content__footer-price'>
              <h5 className='product-price'>
                {formatNumber(data.productPrice)}
              </h5>
            </div>
            {!productStyle || productStyle === 'one' ? (
              <Tooltip title='Add to cart'>
                <Button
                  disabled={avaiableQuantity === 0}
                  className='product-atc'
                  type='text'
                  shape='circle'
                  onClick={() => onAddToCart(data)}
                >
                  <i className='icon_bag_alt' />
                </Button>
              </Tooltip>
            ) : null}
          </div>
          {productStyle === 'three' ? (
            <div className='product-button-group'>
              <div className='product-button-group__wrapper'>
                <Tooltip placement='top' title='Quick view'>
                  <Button onClick={showModal} shape='circle'>
                    <i className='icon_search' />
                  </Button>
                </Tooltip>
                <Tooltip
                  placement='top'
                  title={
                    productInWishlist
                      ? 'Remove from wishlist'
                      : 'Add to wishlist'
                  }
                >
                  <Button
                    shape='circle'
                    className={`product-atw ${classNames({
                      active: productInWishlist,
                    })}`}
                    onClick={() => onAddToWishlist(data)}
                  >
                    <i className='icon_heart_alt' />
                  </Button>
                </Tooltip>
                <Tooltip placement='top' title='Add to cart'>
                  <Button
                    disabled={avaiableQuantity === 0}
                    shape='circle'
                    onClick={() => onAddToCart(data)}
                  >
                    <i className='icon_bag_alt' />
                  </Button>
                </Tooltip>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <Modal
        footer={null}
        afterClose={handleCancel}
        onCancel={handleCancel}
        visible={visible}
        width={850}
      >
        <ShopQuickView setModalVisible={setVisible} data={data} />
      </Modal>
    </>
  ) : (
    <Skeleton active />
  );
}

export default React.memo(Product);
