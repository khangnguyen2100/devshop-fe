import { Col, Empty, Pagination, Row } from 'antd';
import classNames from 'classnames';

import { useGetAllProductByUser } from 'api/product';
import Loading from 'components/other/Loading';
import { useState } from 'react';
import Product from 'components/product/Product';

function ShopContentProduct({
  productResponsive,
  fiveColumn,
  productPerPage,
  productStyle,
}) {
  const [params, setParams] = useState({
    limit: 10,
    page: 0,
    category: 'clothing',
  });
  const { data, isLoading } = useGetAllProductByUser(params);
  console.log('data:', data);

  const itemRender = (current, type, originalElement) => {
    if (type === 'prev') {
      return (
        <a>
          <i className='fal fa-angle-left' />
        </a>
      );
    }
    if (type === 'next') {
      return (
        <a>
          <i className='fal fa-angle-right' />
        </a>
      );
    }
    return originalElement;
  };
  const onChangeOffset = (page, pageSize) => {
    console.log('page:', page)
    console.log('pageSize:', pageSize)
    setParams({
      ...params,
      limit: pageSize,
      page: page - 1,
    });
  };

  if (isLoading) return <Loading />;
  return (
    <div className='shop-content__product'>
      {!data ? (
        <Empty description='No products in this category' />
      ) : (
        <>
          {data.data.length > 0 ? (
            <>
              <Row gutter={[{ xs: 5, sm: 5, xl: 15, xxl: 30 }, 30]}>
                {data.data.map((product, index) => (
                  <Col
                    key={index}
                    className={classNames({ 'five-col': fiveColumn })}
                    {...productResponsive}
                  >
                    <Product data={product} productStyle={productStyle} />
                  </Col>
                ))}
              </Row>
              {data.total >= data.limit && (
                <Pagination
                  classNames='shop-content__product-pagination'
                  defaultCurrent={1}
                  current={data.page + 1}
                  total={data.total}
                  pageSize={data.limit}
                  itemRender={itemRender}
                  onChange={(page, pageSize) => onChangeOffset(page, pageSize)}
                />
              )}
            </>
          ) : (
            <Empty />
          )}
        </>
      )}
    </div>
  );
}

export default React.memo(ShopContentProduct);
