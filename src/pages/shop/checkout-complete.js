import LayoutOne from 'components/layouts/LayoutOne';
import Container from 'components/other/Container';
import { formatNumber } from 'utils/number';

export default function checkoutComplete() {
  return (
    <LayoutOne title='Checkout completed'>
      <Container>
        <div className='checkout-complete'>
          <div className='checkout-complete-summary'>
            <h3>Congratulation! You’ve completed payment.</h3>
            <div className='checkout-complete-summary__table'>
              <div className='checkout-complete-summary__table-item'>
                <h5>Order Number</h5>
                <p>120</p>
              </div>
              <div className='checkout-complete-summary__table-item'>
                <h5>Date</h5>
                <p>12 August 2020</p>
              </div>
              <div className='checkout-complete-summary__table-item'>
                <h5>Total</h5>
                <p>{formatNumber(200)}</p>
              </div>
              <div className='checkout-complete-summary__table-item'>
                <h5>Payment methods</h5>
                <p>Check payment</p>
              </div>
            </div>
          </div>
          <div className='checkout-complete-details'>
            <h3>Order Details</h3>
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>Stay-Matte Sheer Pressed x 1</td>
                  <td className='bold'>{formatNumber(100)}</td>
                </tr>
                <tr>
                  <td>Subtotal</td>
                  <td className='bold'>{formatNumber(100)}</td>
                </tr>
                <tr>
                  <td>Shipping</td>
                  <td>Free ship</td>
                </tr>
                <tr>
                  <td>Payment Method</td>
                  <td>Check Payments</td>
                </tr>
                <tr>
                  <td>Total</td>
                  <td className='bold'>{formatNumber(100)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </LayoutOne>
  );
}
