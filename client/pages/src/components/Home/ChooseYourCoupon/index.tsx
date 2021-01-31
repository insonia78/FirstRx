import React, { useState } from 'react';
import { useMutation, gql } from "@apollo/client";
import { useRouter } from 'next/router';
import PrescriptionDetailedForm from '../../component/PrescriptionDetailedForm';
import CouponsTiles from '../../component/CouponsTiles';
//import styles from '../../../../../styles/ChooseYourCoupon.module.scss'; used in version 1

/**
 * @Pages
 * 
 * List of coupons based on prescriptin details
 * uses coupon service
 * 
 * refrencing version of: 1/28/2021
 * source: https://github.com/emilynorton?tab=repositories
 * 
 * @param language the language to display the data 
 * @param prescriptionFromRoute the prescription passed by the Route 
 * @param location the location where to search
 * 
 * uses
 * 
 * @component CouponTiles
 * @component PrescriptionDetailedForm
 */

const ChooseYourCoupon = ({ language, prescriptionFromRoute, location }) => {


  const [coupons, setCoupons] = useState([])
  const router = useRouter();


  /**
   * returns to the location pages 
   * 
   */
  const returnToLocation = () => {
    router.push
      (
        {
          pathname: '/src/components/Home',
          query: {
            component: 'location',
            prescriptions: prescriptionFromRoute,
            location: location,
            language: language
          },
        })

  }
  let arr = [];

  /**
   * helper function for development 
   * filles the coupons
   * 
   * @component CouponTiles 
   */
  const fillCoupon = () => {

    for (let i = 0; i < 7; i++) {
      arr.push(<CouponsTiles language={language} prescription={prescriptionFromRoute} couponsData={prescriptionFromRoute} />);
    }


  }
  fillCoupon();
  return (
    <div>

      {/**
         * refrencing version of: 1/28/2021
         * source: https://github.com/emilynorton?tab=repositories
         */}

          {(language === 'english' || language === undefined) && <> <h3><span>Step 3 of 3: </span>Choose Your Coupon</h3></>}
          {language === 'spanish' && <><h3><span>{'<Spanish>'} Step 3 of 3: </span>Choose Your Coupon</h3></>}
          <div  className='location cursor'>
            {(language === 'english' || language === undefined) &&
              <>
                Location: {location} <u onClick={returnToLocation}>Clear</u>
              </>

            }
            {language === 'spanish' &&
              <>
                {'<Spanish>'}Location: {location} <u onClick={returnToLocation}>Clear</u>
              </>
            }
          </div>
          <PrescriptionDetailedForm language={language} disabled={true} prescriptionFromRoute={prescriptionFromRoute} />
          <div className="list_info">
								<p><span>Sorted by: </span>Price</p>
								<p><span>Number of Results: </span>3</p>
								<p className="radius"><span>Radius: </span>15 miles</p>
					</div>
          <div>
            {arr}                
          </div>  


      {/* 
        
        used in version 1 with wire frames
        // version 1 from wire frames
        // https://www.figma.com/proto/f1Af0b6joE7OVyo4R4hb7i/FirstRx-Design?node-id=25%3A1&viewport=520%2C440%2C0.5&scaling=min-zoom
        // https://www.figma.com/proto/f1Af0b6joE7OVyo4R4hb7i/FirstRx-Design?node-id=102%3A1390&viewport=212%2C389%2C0.5&scaling=min-zoom
        // https://www.figma.com/proto/f1Af0b6joE7OVyo4R4hb7i/FirstRx-Design?node-id=349%3A797&viewport=317%2C508%2C0.5&scaling=scale-down 

        
        <span className={styles.desktop_main_left_find_prescription_home_title} >
        {(language === 'english' ||  language === undefined) && 'Step 3: Choose Your Coupon'}
        {language === 'spanish' &&  '<Spanish>Step 3: Choose Your Coupon'} 
          
          
          
        </span>
        <div className={styles.desktop_main_left_location_caption}>
        {(language === 'english' ||  language === undefined) && 
        <>
          In { location } <u onClick={returnToLocation}>Change Location</u> 
        </>
        
        }
        {language === 'spanish' &&  
        <>
         {'<Spanish>'}  In { location } <u onClick={returnToLocation}>Change Location</u> 
        </>        
        }
        </div>
        <PrescriptionDetailedForm language={language} disabled={true}  prescriptionFromRoute={prescriptionFromRoute}   />
        <br />
        <div className={styles.desktop_choose_your_coupon_sort}>
        {(language === 'english' ||  language === undefined) && 'Sorted by: Price'}
        {language === 'spanish' &&  'Sorted by: Price'}          
        </div>
        <div className={styles.desktop_choose_your_coupon_list_container}>
            {arr}
                
        </div> */}

    </div>

  );

}

export default ChooseYourCoupon;