import React, { useState } from 'react';
import { useMutation, gql } from "@apollo/client";
import { useRouter } from 'next/router';
import PrescriptionDetailedForm from '../../component/PrescriptionDetailedForm';
import CouponsTiles from '../../component/CouponsTiles';



const ChooseYourCoupon = ({dataFromRoute,location}) => {
  

  const[coupons , setCoupons] = useState([])  
  const router = useRouter();
    const returnToLocation = () =>{
        router.push
        (
          {
            pathname: '/src/components/HomeDesktop',
            query: { component: 'location', 
            prescriptions:dataFromRoute,
            location:location },
          })

    } 
    let arr = [];
    const fillCoupon = () =>{
       
        for(let i = 0 ; i < 7; i++)
        {
           arr.push(<CouponsTiles couponsData={null} />);
        }  
        

    }
    fillCoupon(); 
    return (
      <div>
        <span className="desktop-main-left-find-prescription-home-title" >Step 3: Choose Your Coupon</span>
        <div className="desktop-main-left-location-caption">In { location } <u onClick={returnToLocation}>Change Location</u> </div>
        <PrescriptionDetailedForm disabled={true}  dataFromRoute={dataFromRoute}  />
        <br />
        <div className="desktop-choose-your-coupon-sort">Sorted by: Price</div>
        <div className='desktop-choose-your-coupon-list-container'>
            {arr}
                
        </div>
  
      </div>
  
    );
  
  }
  
  export default ChooseYourCoupon;