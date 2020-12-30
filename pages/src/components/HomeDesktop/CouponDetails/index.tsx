import React, { useState } from 'react';
import { IconContext } from 'react-icons';
import { MdPrint } from 'react-icons/Md';
import Coupon from '../../component/Coupon';
import Link from 'next/link';


const CouponDetails = ({prescription,coupon}) => {
   
    

  

    return (
        <div className='main-desktop-home-coupon-container'>
        <Link href='/' as='/'><a  className='main-desktop-home-coupon-new-search'><u>New Search</u></a></Link>
        <div className='main-desktop-home-coupon-printer-container'>
            <IconContext.Provider value={{ className: 'main-desktop-home-coupon-printer-icon' }}>
                <MdPrint />
            </IconContext.Provider>
            <div className="main-desktop-home-coupon-printer-text"><u>Print The<br />Coupon</u></div>                                     
        </div>
        <div className='main-desktop-home-coupon-label' >Your Coupon</div>
        <Coupon prescription={prescription} coupon={coupon} />
        <input 
        type="tel" 
        className='main-desktop-home-coupon-phone-input' 
        placeholder='Type your phone number'
        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"/>
        <div className='main-desktop-home-coupon-text-me'><u>Text Me The Coupon</u></div>
    </div>

  
    );
  
  }
  
  export default CouponDetails;