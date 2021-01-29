
import React, { useEffect, useState } from 'react';

import FindPrescriptionHome from './FindPrescriptionHome';
import Location from './Location';
import { useRouter } from "next/router"
import ChooseYourCoupon from './ChooseYourCoupon';
import CouponDetails from './CouponDetails'; 
//import styles from './../../../../styles/Home.module.scss'; used for version 1

/**
 * Home page 
 */
export default function Home() {
    let data = {
        search_name: "",
        name: "",
        generic_name: "",
        manufacturer: "",
        form: "",
        quantity: "",
        dosage: [],
    }
    
    /**@gets @sets    sthe size of the window used in version 1*/
    const [windowWidth, setWindowWidth] = useState(0);
   
    /** @gets @sets prescription used when using the back button to pass the pescription*/
    const [getPrescription, setPrescriptionUseState] = useState({ ...data });

    /**
     * Used for responsive design for version 1 of wire frames 
     */
    // const getSizes = () => {
    //     setWindowWidth(window.innerWidth);
    // }

    // useEffect(() => {
    //     setWindowWidth(window.innerWidth);
    //     window.addEventListener(
    //         "resize", getSizes, false);

    // });


    

    
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
            language = 'english' },
    } = router

    return (
        <>
            {
            /**
              * refrencing version of: 1/28/2021
              * source: https://github.com/emilynorton?tab=repositories
              */
            }
  
            <main>
                <h2>Save on Prescriptions!</h2>

                <section className="stepped_process">
                    {(language === 'english' || language === undefined) && <> <h3><span>Start Here: Step 1 of 3: </span>Your Prescription</h3></>}
                    {language === 'spanish' && <><h3><span>{'<Spanish>'} Start Here: Step 1 of 3: </span>Your Prescription</h3></>}
                    {(container === undefined || container === '' || container === null) &&
                        <>
                            {/** first component when the page   */}
                            {(component === undefined || component === '' || component === null) && <FindPrescriptionHome language={language} prescriptionFromRoute={prescriptions} getPrescriptionDetails={getPrescription} setPrescriptionDetails={setPrescription} />}
                            {component === 'choose-your-coupon' && < ChooseYourCoupon language={language} prescriptionFromRoute={prescriptions} location={location} />}
                            {component === 'prescription' &&
                                <FindPrescriptionHome
                                    language={language}
                                    location={location}
                                    prescriptionFromRoute={prescriptions}
                                    getPrescriptionDetails={getPrescription}
                                    setPrescriptionDetails={setPrescription} />}


                            {component === 'location' && <Location language={language} prescriptionFromRoute={prescriptions} location={location} />}
                            {container === 'coupon' && <CouponDetails language={language} windowWidth={windowWidth} prescription={prescriptions} coupon={coupon} />}
                        
                        </>}
                </section>

            </main>



             
             
                  
            {/* 
            
                  // version 1 from wire frames
                  // https://www.figma.com/proto/f1Af0b6joE7OVyo4R4hb7i/FirstRx-Design?node-id=25%3A1&viewport=520%2C440%2C0.5&scaling=min-zoom
                  // https://www.figma.com/proto/f1Af0b6joE7OVyo4R4hb7i/FirstRx-Design?node-id=102%3A1390&viewport=212%2C389%2C0.5&scaling=min-zoom
                  // https://www.figma.com/proto/f1Af0b6joE7OVyo4R4hb7i/FirstRx-Design?node-id=349%3A797&viewport=317%2C508%2C0.5&scaling=scale-down 
   
            
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
                                        {component === 'choose-your-coupon' && < ChooseYourCoupon language={language} prescriptionFromRoute={prescriptions} location={location} />}
                                        {component === 'prescription' &&
                                            <FindPrescriptionHome
                                                language={language}
                                                location={location}
                                                prescriptionFromRoute={prescriptions}
                                                getPrescriptionDetails={getPrescription}
                                                setPrescriptionDetails={setPrescription} />}
                                         
                                         
                                        {component === 'location' && <Location language={language} prescriptionFromRoute={prescriptions} location={location} />}
                                        {(component === undefined || component === '' || component === null) && <FindPrescriptionHome language={language} prescriptionFromRoute={prescriptions} getPrescriptionDetails={getPrescription} setPrescriptionDetails={setPrescription} />}


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
                                        {component === 'choose-your-coupon' && < ChooseYourCoupon language={language} prescriptionFromRoute={prescriptions} location={location} />}
                                        {component === 'prescription' &&
                                            <FindPrescriptionHome
                                                language={language}
                                                location={location}
                                                prescriptionFromRoute={prescriptions}
                                                getPrescriptionDetails={getPrescription}
                                                setPrescriptionDetails={setPrescription} />}

                                        {component === 'location' && <Location language={language} prescriptionFromRoute={prescriptions} location={location} />}
                                        {(component === undefined || component === '' || component === null) && <FindPrescriptionHome  language={language} prescriptionFromRoute={prescriptions} getPrescriptionDetails={getPrescription} setPrescriptionDetails={setPrescription} />}


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
                </main> */}
                
               

        

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