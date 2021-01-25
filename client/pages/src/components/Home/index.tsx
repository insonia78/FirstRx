
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
            container,
            language='english'},
    } = router

    return (
        <>
            <main>
                {(windowWidth <= 550 && container === 'coupon') &&                  
                    <CouponDetails language={language} windowWidth={windowWidth} prescription={prescriptions} coupon={coupon} />
                
                }
                { (windowWidth > 1440 || (windowWidth <= 550 && container !== 'coupon' )) &&
                 <>    
                     <div className={styles.main_desktop_container}>
                     {(language === 'english' ||  language === undefined) && <> <div className={styles.main_desktop_title}>Check here <b>First</b> for your <b>Rx</b> savings!</div></>}
                     {language === 'spanish' &&   <><div className={styles.main_desktop_title}> Spanish  <b>Spanish</b> for your <b>Rx</b> Spanish!</div></>}
                      
                        <div className={styles.main_desktop_sides_container}>
                            {(container === undefined || container === '' || container === null) &&
                                <div className={styles.main_desktop_sides_inner_container}>
                                    <span className={styles.main_desktop_side_left}>
                                        {component === 'choose-your-coupon' && < ChooseYourCoupon language={language} dataFromRoute={prescriptions} location={location} />}
                                        {component === 'prescription' &&
                                            <FindPrescriptionHome
                                                language={language}
                                                location={location}
                                                dataFromRoute={prescriptions}
                                                getPrescriptionDetails={getPrescription}
                                                setPrescriptionDetails={setPrescription} />}
                                         
                                         
                                        {component === 'location' && <Location language={language} dataFromRoute={prescriptions} location={location} />}
                                        {(component === undefined || component === '' || component === null) && <FindPrescriptionHome language={language} dataFromRoute={prescriptions} getPrescriptionDetails={getPrescription} setPrescriptionDetails={setPrescription} />}


                                    </span>

                                    {windowWidth > 550 && <span className={styles.main_desktop_side_right}></span>}
                                </div>
                            }
                            {container === 'coupon' && <CouponDetails language={language} windowWidth={windowWidth} prescription={prescriptions} coupon={coupon} />}
                        </div>
                    </div>
                    <div className={styles.main_desktop_bottom_container}>
                    { (language === 'english' ||  language === undefined) &&    <span className={styles.main_desktop_bottom_text}>This is an easy and simple process to get big savings. Find the lowest price at a
                    pharmacy near you. Get texted a coupon. Bring to your pharmacist. Save $.</span>}
                    {language === 'spanish' &&    <span className={styles.main_desktop_bottom_text}>{'<<Spanish>>'} This is an easy and simple process to get big savings. Find the lowest price at a
                    pharmacy near you. Get texted a coupon. Bring to your pharmacist. Save $.</span>}
                    
                    </div>
                </>}
                { (windowWidth > 550 && windowWidth <= 1440 ) &&
                 <>    
                     
                     {(language === 'english' ||  language === undefined) &&   <><div className={styles.main_desktop_title}>Check here <b>First</b> for your <b>Rx</b> savings!</div></>}
                     {language === 'spanish' &&   <><div className={styles.main_desktop_title}> Spanish  <b>Spanish</b> for your <b>Rx</b> Spanish!</div></> }
                     
                        <div className={styles.main_desktop_sides_container}>
                        {(container === undefined || container === '' || container === null) &&
                                <div className={styles.main_desktop_sides_inner_container}>
                                    <span className={styles.main_desktop_side_left}>
                                        {component === 'choose-your-coupon' && < ChooseYourCoupon language={language} dataFromRoute={prescriptions} location={location} />}
                                        {component === 'prescription' &&
                                            <FindPrescriptionHome
                                                language={language}
                                                location={location}
                                                dataFromRoute={prescriptions}
                                                getPrescriptionDetails={getPrescription}
                                                setPrescriptionDetails={setPrescription} />}

                                        {component === 'location' && <Location language={language} dataFromRoute={prescriptions} location={location} />}
                                        {(component === undefined || component === '' || component === null) && <FindPrescriptionHome  language={language} dataFromRoute={prescriptions} getPrescriptionDetails={getPrescription} setPrescriptionDetails={setPrescription} />}


                                    </span>

                                    {windowWidth > 550 && <span className={styles.main_desktop_side_right}></span>}
                                </div>
                            }
                            {container === 'coupon' && <CouponDetails language={language} windowWidth={windowWidth} prescription={prescriptions} coupon={coupon} />}
                        </div>
                    
                    <div className={styles.main_desktop_bottom_container}>
                    {(language === 'english' ||  language === undefined) &&    <span className={styles.main_desktop_bottom_text}>This is an easy and simple process to get big savings. Find the lowest price at a
                    pharmacy near you. Get texted a coupon. Bring to your pharmacist. Save $.</span>}
                    {language === 'spanish' &&    <span className={styles.main_desktop_bottom_text}>{'<<Spanish>>'} This is an easy and simple process to get big savings. Find the lowest price at a
                    pharmacy near you. Get texted a coupon. Bring to your pharmacist. Save $.</span>}
                    </div>
                </>}

            </main>

        </>
     
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