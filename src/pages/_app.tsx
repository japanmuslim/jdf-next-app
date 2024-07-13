import type { AppProps } from "next/app";
import { PagesProgressBar as ProgressBar } from 'next-nprogress-bar';
import { Provider } from "react-redux";

import store from "@/init/store/store";

import "@/styles/globals.css";

const settings = {
  height: "2px",
  color: "#FFF",
  options: {
    showSpinner: false,
  },
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ProgressBar {...settings} />
      <Component {...pageProps} />
    </Provider>
  );
}
