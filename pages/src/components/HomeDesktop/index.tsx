
import React, { useState } from 'react';
import HeaderDesktop from '../HeaderDesktop';
import FindPrescriptionHome from './FindPrescriptionHome';








export default function HomeDesktop() {

    return (
        <>

            <main>
                <div className="main-desktop-container">
                    <div className="main-desktop-title">Check here <b>First</b> for your <b>Rx</b> savings!</div>
                    <div className="main-desktop-side-left">
                         <FindPrescriptionHome />                    
                    </div>
                    <div className="main-desktop-side-right"></div>
                </div>
                <div className="main-desktop-bottom-container">
                    <span className="main-desktop-bottom-text">This is an easy and simple process to get big savings. Find the lowest price at a 
                    pharmacy near you. Get texted a coupon. Bring to your pharmacist. Save $.</span>
                </div>
            </main>

        </>
        //<HomeMobile /> 
    );
}
// <Head>
// <title>FirstRx</title>
// <link rel="icon" href="/favicon.ico" />
// </Head>  
 // <footer>
      //   <a
      //     href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
      //     target="_blank"
      //     rel="noopener noreferrer"
      //   >
      //     Powered by{' '}
      //     <img src="/vercel.svg" alt="Vercel Logo"/>
      //   </a>
      // </footer>
// export async function getStaticProps(){
//   const apolloClient = initializeApollo();

//   // await apolloClient.query({
//   //   query:"",
//   // });
//   // return{
//   //   props:{
//   //     intialApolloState: apolloClient.cache.extract(),
//   //   }
//   // }
// }