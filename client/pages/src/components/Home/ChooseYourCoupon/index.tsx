import React, { useState } from 'react';
import { useMutation, gql } from "@apollo/client";
import { useRouter } from 'next/router';
import PrescriptionDetailedForm from '../../component/PrescriptionDetailedForm';
import CouponsTiles from '../../component/CouponsTiles';
import styles from '../../../../../styles/ChooseYourCoupon.module.scss';


const ChooseYourCoupon = ({language,prescriptionFromRoute,location}) => {
  

  const[coupons , setCoupons] = useState([])  
  const router = useRouter();
    const returnToLocation = () =>{
        router.push
        (
          {
            pathname: '/src/components/Home',
            query: { component: 'location', 
            prescriptions:prescriptionFromRoute,
            location:location,
            language:language },
          })

    } 
    let arr = [];
    const fillCoupon = () =>{
       
        for(let i = 0 ; i < 7; i++)
        {
           arr.push(<CouponsTiles language={language} prescription={prescriptionFromRoute} couponsData={prescriptionFromRoute} />);
        }  
        

    }
    fillCoupon(); 
    return (
      <div>
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
                
        </div>
  
      </div>
  
    );
  
  }
  
  export default ChooseYourCoupon;