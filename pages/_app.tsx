import { ApolloProvider } from "@apollo/client";
import { useApollo } from "components/apolloClient";



import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.scss';
import Header from './src/components/Header';
import Footer from './src/components/Footer';
import _Head from './src/components/_Head';



import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useEffect } from "react";

// let windowWidth = window.innerWidth;
// let windowHeight = window.innerHeight;
function MyApp({ Component, pageProps }) {
  const client = useApollo(pageProps.initialApolloState);
  const getSizes = () => {

    let body = document.body;
    if (window.innerWidth > 550) {
      body.style.transform = `scale( ${((window.outerWidth - 10)
        / window.innerWidth).toString()})`;
      body.style.transformOrigin = '0 0';
      body.style.height = window.outerHeight.toString();
    }
    else{
      body.style.transform= 'none';
    }
    //console.log('windowWidth', windowWidth);  

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
