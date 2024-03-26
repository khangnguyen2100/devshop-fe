import React from 'react';
import { Row, Col } from 'antd';
import Link from 'next/link';

import FooterSubcribe from './elements/FooterSubcribe';
import Container from '../other/Container';
import links from '../../data/footer-links.json';

function Footer({ containerType }) {
  return (
    <div className='footer'>
      <div className='footer-top'>
        <Container type={containerType}>
          <Row justify='center' gutter={30}>
            <Col className='gutter-row' span='24' sm={12} lg={8}>
              <div className='footer-top-item -col-one'>
                <Link href='#'>
                  <a>
                    <img
                      src={
                        process.env.NEXT_PUBLIC_URL + '/assets/images/logo-dark.png'
                      }
                      alt='Logo'
                    />
                  </a>
                </Link>
                <p>123 Pham Van Dong, P. Hiep Binh Chanh, TP. Thu Duc</p>
                <ul>
                  <li>khangng2100@gmail.com</li>
                  <li>0933807909</li>
                </ul>
              </div>
            </Col>
            <Col className='gutter-row' span='24' sm={12} lg={8}>
              <div className='footer-top-item -col-two'>
                <Row gutter={30}>
                  <Col className='gutter-row' span={12}>
                    <h5 className='footer-title'>Information</h5>
                    <ul>
                      {links.information.map((item, index) => (
                        <li key={index}>
                          <Link href='#'>
                            <a>{item.name}</a>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </Col>
                  <Col className='gutter-row' span={12}>
                    <h5 className='footer-title'>My account</h5>
                    <ul>
                      {links.account.map((item, index) => (
                        <li key={index}>
                          <Link href='#'>
                            <a>{item.name}</a>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className='footer-bottom'>
        <Container type={containerType}>
          <p>Copyright © 2020 Avitex Inc. All rights reserved</p>
        </Container>
      </div>
    </div>
  );
}

export default React.memo(Footer);
