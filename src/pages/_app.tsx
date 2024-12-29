import type { AppProps } from 'next/app';
import { PagesProgressBar as ProgressBar } from 'next-nprogress-bar';
import { Provider, useSelector } from 'react-redux';

import store from '@/init/store/store';

import '@/styles/globals.css';
import { TooltipProvider } from '@/components/ui/tooltip';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const settings = {
  height: '2px',
  color: '#FFF',
  options: {
    showSpinner: false,
  },
};
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store} stabilityCheck="never">
      <ProgressBar {...settings} />
      <ToastContainer />
      <TooltipProvider>
        <Component {...pageProps} />
      </TooltipProvider>
    </Provider>
  );
}
