import React, { useState } from 'react';
import { IconContext } from 'react-icons';
import { MdPrint } from 'react-icons/Md';
import Coupon from '../../component/Coupon';
import Link from 'next/link';
import styles from './../../../../../styles/CouponDetails.module.scss';

const CouponDetails = ({language, windowWidth, prescription, coupon }) => {





    return (
        <>
            {windowWidth > 420 ?
                <div className={styles.main_desktop_home_coupon_container}>
                    <Link href='/' as='/'>
                        <a className={styles.main_desktop_home_coupon_new_search}>
                        <u>
                        {language === 'english' || language === undefined && 'New Search'}
                        {language === 'spanish' && '<Spanish> New Search'}
                        </u>
                        </a>
                    </Link>
                    <div className={styles.main_desktop_home_coupon_printer_container}>
                        <IconContext.Provider value={{ className: styles.main_desktop_home_coupon_printer_icon }}>
                            <MdPrint />
                        </IconContext.Provider>
                        <div className={styles.main_desktop_home_coupon_printer_text}>
                            <u>
                                
                                {(language === 'english' || language === undefined) && `Print The Coupon`}
                                {language === 'spanish' && '<Spanish> Print The\\nCoupon'}
                            </u>
                        </div>
                    </div>
                    <div className={styles.main_desktop_home_coupon_label} >
                        {language === 'english' || language === undefined && 'Your Coupon'}
                        {language === 'spanish' && '<Spanish> Your Coupon'}                        
                    </div>
                    <Coupon windowWidth={windowWidth} prescription={prescription} coupon={coupon} />
                    <div className={styles.main_desktop_home_coupon_phone_text_container}>
                    <input
                        type="tel"
                        className={styles.main_desktop_home_coupon_phone_input}
                        placeholder='Type your phone number'
                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" />
                    <div className={styles.main_desktop_home_coupon_text_me}>
                        <u>
                            
                        {language === 'english' || language === undefined && 'Text Me The Coupon'}
                        {language === 'spanish' && '<Spanish> Text Me The Coupon'}                
                        </u>
                        </div>
                    </div>
                </div>
                :
                <div className={styles.main_desktop_home_coupon_container}>
                    <Link href='/' as='/'><a className={styles.main_desktop_home_coupon_new_search}>
                        <u>
                        {language === 'english' || language === undefined && 'New Search'}
                        {language === 'spanish' && '<Spanish> New Search'}
                            </u>
                        </a>
                    </Link>

                    <div className={styles.main_desktop_home_coupon_label} >
                        {language === 'english' || language === undefined && 'Your Coupon'}
                        {language === 'spanish' && '<Spanish> Your Coupon'}
                    </div>
                    <div className={styles.desktop_coupon_component_store_info}>
                        <b>                            
                        {language === 'english' || language === undefined && 'Show this coupon at'}
                        {language === 'spanish' && '<Spanish> Show this coupon at'}
                        </b> {'Store'}, {'Store Address'}
                    </div>

                    <div className={styles.desktop_coupon_component_phone_number} >
                        {language === 'english' || language === undefined && 'Questions? Give us a call at'}
                        {language === 'spanish' && '<Spanish> Questions? Give us a call at'}
                        <b>800.555.1212</b>    
                    </div>

                    <Coupon windowWidth={windowWidth} prescription={prescription} coupon={coupon} />
                    <div className={styles.main_desktop_home_coupon_phone_text_container}>
                        <input
                            type="tel"
                            className={styles.main_desktop_home_coupon_phone_input}
                            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" />
                        <div className={styles.main_desktop_home_coupon_text_me}>
                            <u>
                            {language === 'english' || language === undefined && 'Text Me The Coupon'}
                            {language === 'spanish' && '<Spanish> Text Me The Coupon'}
                            </u>
                        </div>
                    </div>
                </div>
            }
        </>


    );


}

export default CouponDetails;