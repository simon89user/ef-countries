import type { AppProps } from "next/app";
import Header from "../components/layout/Header";
import { ThemeProvider } from "next-themes";
import "../styles/global.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <>
        <Header />
        <Component {...pageProps} />
      </>
    </ThemeProvider>
  );
}

export default MyApp;
