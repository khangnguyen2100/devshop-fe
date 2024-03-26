import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

import { message } from 'antd';
import Loading from 'components/other/Loading';
import { persistor } from 'redux/store';
import withReduxStore from 'redux/withReduxStore';
import 'styles/antd.less';
import 'styles/styles.scss';
import { SWRConfig } from 'swr';
import AxiosClient from 'api/base';

const fetcher = url => AxiosClient(url).then(res => res.data);

message.config({
  duration: 5,
});

const App = ({ Component, pageProps, reduxStore }) => {
  return (
    <Provider store={reduxStore}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <SWRConfig
          value={{
            fetcher,
            onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
              console.log('error:', error)
              if (error.status === 404) return;
              if (error.status === 403) return;

              if (retryCount >= 0) return;

              // Retry after 5 seconds.
              setTimeout(() => revalidate({ retryCount }), 5000);
            },
            refreshInterval: 5000,
          }}
        >
          <Component {...pageProps} />
        </SWRConfig>
      </PersistGate>
    </Provider>
  );
};

export default withReduxStore(App);

