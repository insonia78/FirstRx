import { ApolloProvider } from "@apollo/client";
import { useApollo } from "components/apolloClient";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.scss';
import Header from './src/components/Header';
import Footer from './src/components/Footer';
import _Head from './src/components/_Head';
import '../styles/desktop.scss';
//import '../styles/main-desktop-left-prescription-detailed-form.scss';
import '../styles/main-desktop-location.scss';
import '../styles/main-choose-home-coupon.scss';
import '../styles/main-desktop-coupon-component.scss';
import '../styles/main-desktop-coupons-tiles.scss';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  const client = useApollo(pageProps.initialApolloState);
  const getSizes = () => {
        
    let body = document.body;
    body.style.transform = `scale( ${((window.outerWidth - 10)
      / window.innerWidth).toString()})`;
    body.style.transformOrigin = '0 0';
    body.style.height = window.outerHeight.toString();
    


  }
  useEffect(() => {
    window.addEventListener(
      "resize", getSizes, false);

  }, []);


  return (
    <ApolloProvider client={client}>
      <_Head />
      < Header />
      <Component {...pageProps} />
      {/* <Footer /> */}
    </ApolloProvider>

  );
}

export default MyApp
