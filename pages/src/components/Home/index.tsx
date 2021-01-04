
import React, { useEffect, useState } from 'react';

import FindPrescriptionHome from './FindPrescriptionHome';
import Location from './Location';
import { useRouter } from "next/router"
import ChooseYourCoupon from './ChooseYourCoupon';
import CouponDetails from './CouponDetails';
import styles from './../../../../styles/Home.module.scss';

export default function Home() {
    const [windowWidth, setWindowWidth] = useState(0);
    const getSizes = () => {
        setWindowWidth(window.innerWidth);
    }

    useEffect(() => {
        setWindowWidth(window.innerWidth);
        window.addEventListener(
            "resize", getSizes, false);

    });
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
                {(windowWidth <= 420 && container === 'coupon') ?                   
                    <CouponDetails windowWidth={windowWidth} prescription={prescriptions} coupon={coupon} />
                :
                <>
                    <div className={styles.main_desktop_container}>
                        <div className={styles.main_desktop_title}>Check here <b>First</b> for your <b>Rx</b> savings!</div>
                        <div className={styles.main_desktop_sides_container}>
                            {container === undefined &&
                                <div className={styles.main_desktop_sides_inner_container}>
                                    <span className={styles.main_desktop_side_left}>
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

                                    {windowWidth > 420 && <span className={styles.main_desktop_side_right}></span>}
                                </div>
                            }
                            {container === 'coupon' && <CouponDetails windowWidth={windowWidth} prescription={prescriptions} coupon={coupon} />}
                        </div>
                    </div>
                    <div className={styles.main_desktop_bottom_container}>
                        <span className={styles.main_desktop_bottom_text}>This is an easy and simple process to get big savings. Find the lowest price at a
                    pharmacy near you. Get texted a coupon. Bring to your pharmacist. Save $.</span>
                    </div>
                </>}
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