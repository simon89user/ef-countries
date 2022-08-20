import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../components/layout/Header";
import { ThemeProvider } from "next-themes";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider defaultTheme="dark">
      <>
        <Header />
        <Component {...pageProps} />
      </>
    </ThemeProvider>
  );
}

export default MyApp;
