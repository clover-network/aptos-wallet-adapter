import { Provider as ReduxProvider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { logger } from 'redux-logger';
import { ErrorBoundary } from 'components';
import reducer from 'modules/rootReducer';
import { AptosWalletProvider } from 'contexts/AptosWalletProvider';
import { DEVNET_NODE_URL } from 'config/aptosConstants';

const isDevelopmentMode = process.env.NODE_ENV === 'development';

const store = configureStore({
  reducer,
  devTools: isDevelopmentMode,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: {
        ignoredPaths: ['connection']
      }
    }).concat(isDevelopmentMode ? [logger] : [])
});

type TProps = {
  children: any;
};

const Providers: React.FC<TProps> = (props: TProps) => {
  return (
    <ErrorBoundary>
      <AptosWalletProvider connectUri={DEVNET_NODE_URL ? DEVNET_NODE_URL : ''}>
        <ReduxProvider store={store}>{props.children}</ReduxProvider>
      </AptosWalletProvider>
    </ErrorBoundary>
  );
};

export default Providers;