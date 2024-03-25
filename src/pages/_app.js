import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

import Loading from '../components/other/Loading';
import { persistor } from '../redux/store';
import withReduxStore from '../redux/withReduxStore';
import '../styles/antd.less';
import '../styles/styles.scss';

const App = ({ Component, pageProps, reduxStore }) => {
  return (
    <Provider store={reduxStore}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
};

export default withReduxStore(App);

