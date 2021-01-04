import React, { useState } from 'react';
import { useMutation, gql } from "@apollo/client";
import { useRouter } from 'next/router';
import PrescriptionDetailedForm from '../../component/PrescriptionDetailedForm';
import CouponsTiles from '../../component/CouponsTiles';
import styles from '../../../../../styles/ChooseYourCoupon.module.scss';


const ChooseYourCoupon = ({dataFromRoute,location}) => {
  

  const[coupons , setCoupons] = useState([])  
  const router = useRouter();
    const returnToLocation = () =>{
        router.push
        (
          {
            pathname: '/src/components/Home',
            query: { component: 'location', 
            prescriptions:dataFromRoute,
            location:location },
          })

    } 
    let arr = [];
    const fillCoupon = () =>{
       
        for(let i = 0 ; i < 7; i++)
        {
           arr.push(<CouponsTiles prescription={dataFromRoute} couponsData={dataFromRoute} />);
        }  
        

    }
    fillCoupon(); 
    return (
      <div>
        <span className={styles.desktop_main_left_find_prescription_home_title} >Step 3: Choose Your Coupon</span>
        <div className={styles.desktop_main_left_location_caption}>In { location } <u onClick={returnToLocation}>Change Location</u> </div>
        <PrescriptionDetailedForm disabled={true}  dataFromRoute={dataFromRoute}   />
        <br />
        <div className={styles.desktop_choose_your_coupon_sort}>Sorted by: Price</div>
        <div className={styles.desktop_choose_your_coupon_list_container}>
            {arr}
                
        </div>
  
      </div>
  
    );
  
  }
  
  export default ChooseYourCoupon;