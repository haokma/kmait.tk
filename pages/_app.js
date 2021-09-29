import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LayoutComponent from "../components/Layout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [isDark, setIsDark] = useState(false);
  const handleDark = () => {
    setIsDark(!isDark);
    localStorage.setItem("dark", !isDark);
  };
  useEffect(() => {
    const check = JSON.parse(localStorage.getItem("dark"));
    setIsDark(check);
  }, []);

  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <div className={isDark ? "app dark  " : "app "}>
        <LayoutComponent>
          <Head>
            <link
              href="https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css"
              rel="stylesheet"
            />
            <script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=UA-208281120-1`}
            />
            <script
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'UA-208281120-1', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </Head>
          <Component {...pageProps} />
          <div className="checkbox">
            <input
              type="checkbox"
              checked={isDark}
              onChange={() => handleDark()}
            />
          </div>
        </LayoutComponent>
      </div>
    </>
  );
}

export default MyApp;
