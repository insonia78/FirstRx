
import React, { useState } from 'react';
import HeaderDesktop from '../HeaderDesktop';
import FindPrescriptionHome from './FindPrescriptionHome';
import Location from './Location';
import { useRouter } from "next/router"
import ChooseYourCoupon from './ChooseYourCoupon';
import { IconContext } from "react-icons";
import { MdPrint } from 'react-icons/Md';
import Coupon from '../component/Coupon';
import CouponDetails from './CouponDetails';

export default function HomeDesktop() {
    let data = {
        search_name: "",
        name: "",
        generic_name: "",
        manufacturer: "",
        form: "",
        quantity: "",
        dosage: [],
    }
    const [getPrescription, setPrescriptionUseState] = useState({ ...data });
    const router = useRouter();
    const setPrescription = (value) => {

        setPrescriptionUseState(getPrescription => ({
            ...getPrescription, ...value
        }));

    }

    const {
        query: { component,
            prescriptions,
            location,
            coupon,
            container },
    } = router

    return (
        <>
            <main>
                <div className="main-desktop-container">
                    <div className="main-desktop-title">Check here <b>First</b> for your <b>Rx</b> savings!</div>
                    <div className="main-desktop-sides-container">
                        {container === undefined &&
                            <div className='main-desktop-sides-inner-container'>
                                <span className="main-desktop-side-left">
                                    {component === 'choose-your-coupon' && < ChooseYourCoupon dataFromRoute={prescriptions} location={location} />}
                                    {component === 'prescription' &&
                                        <FindPrescriptionHome
                                            location={location}
                                            dataFromRoute={prescriptions}
                                            getPrescriptionDetails={getPrescription}
                                            setPrescriptionDetails={setPrescription} />}

                                    {component === 'location' && <Location dataFromRoute={prescriptions} location={location} />}
                                    {component === undefined && <FindPrescriptionHome dataFromRoute={prescriptions} getPrescriptionDetails={getPrescription} setPrescriptionDetails={setPrescription} />}


                                </span>

                                <span className="main-desktop-side-right"></span>
                            </div>
                        }
                        {container === 'coupon' && <CouponDetails prescription={prescriptions} coupon={coupon} />}
                    </div>
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




// export async function getStaticProps(){

//     return {};
// }

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