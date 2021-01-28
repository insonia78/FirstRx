import React, { useState } from 'react';
import { IconContext } from 'react-icons';
import { MdPrint } from 'react-icons/Md';
import Coupon from '../../component/Coupon';
import Link from 'next/link';
import styles from './../../../../../styles/CouponDetails.module.scss';
import { useMutation, gql } from '@apollo/client';
import { useAlert } from 'react-alert';

const SEND_PHONENUMBER_AND_COUPON = gql`
mutation  SendTextMessageMutation($value:String){
    SendTextMessageMutation(value:$value)
      {
           code
           message
           
      }
}
`;




const CouponDetails = ({ language, windowWidth, prescription, coupon }) => {

   

    const [phoneNumber, setPhoneNumber] = useState("");

    const printCoupon = () => {
        window.print();
    }
    const getPhoneNumberEvent = (e) => {        
        setPhoneNumber(e.target.value);
    }

    const sendCouponAndPhoneNumber = (e) => {
        
        
        if(isNaN(+phoneNumber) || phoneNumber.length !== 10)
        {
            alert(`there is an error is the format ${phoneNumber}`);
            return;
        }

        sendPhobneNumberAndCoupon({ variables: { value: phoneNumber }, context: { clientName: 'textMessage' } });

    }
    const [sendPhobneNumberAndCoupon] = useMutation(SEND_PHONENUMBER_AND_COUPON, {
        onError(err) {
            console.log(err);
            //alert.show(err);

        },
        update(proxy, result) {
            console.log(result);
            if(result.data.SendTextMessageMutation.code !== 200)
            {
                alert(`there was an error ${result.data.message} ` )
                return;
            }
            alert(`Message succesfully sent` );
        }
    });
    const clearInput = ()=>{

        setPhoneNumber("");
    }   

    return (
        <>
            {windowWidth > 550 ?
                <div className={styles.main_desktop_home_coupon_container}>
                    <Link href={
                        {
                            pathname: '/',
                            query: { language: language }
                        }
                    } as='/'>
                        <a className={styles.main_desktop_home_coupon_new_search}>
                            <u>
                                {(language === 'english' || language === undefined) && 'New Search'}
                                {language === 'spanish' && '<Spanish> New Search'}
                            </u>
                        </a>
                    </Link>
                    <div className={styles.main_desktop_home_coupon_printer_container}>
                        <IconContext.Provider value={{ className: styles.main_desktop_home_coupon_printer_icon }}>
                            <MdPrint />
                        </IconContext.Provider>
                        <map name="print">
                            <area shape="rect" coords="0,0,82,126" />
                        </map>

                        <div onClick={printCoupon} className={styles.main_desktop_home_coupon_printer_text}>
                            <u>

                                {(language === 'english' || language === undefined) && <>Print The <br /> Coupon</>}
                                {language === 'spanish' && <>{'<Spanish>'} Print The<br />Coupon</>}
                            </u>
                        </div>

                    </div>
                    <div className={styles.main_desktop_home_coupon_label} >
                        {(language === 'english' || language === undefined) && 'Your Coupon'}
                        {language === 'spanish' && '<Spanish> Your Coupon'}
                    </div>
                    <Coupon language={language} windowWidth={windowWidth} prescription={prescription} coupon={coupon} />
                    <div className={styles.main_desktop_home_coupon_phone_text_container}>
                        <input
                            type="tel"
                            onFocus={clearInput}
                            value={phoneNumber}
                            onChange={getPhoneNumberEvent}
                            className={styles.main_desktop_home_coupon_phone_input}
                            placeholder='Type your phone number'
                            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" />
                        <div onClick={sendCouponAndPhoneNumber} className={styles.main_desktop_home_coupon_text_me}>
                            <u>

                                {(language === 'english' || language === undefined) && 'Text Me The Coupon'}
                                {language === 'spanish' && '<Spanish> Text Me The Coupon'}
                            </u>
                        </div>
                    </div>
                </div>
                :
                <div className={styles.main_desktop_home_coupon_container}>
                    <Link href=
                        {
                            {
                                pathname: '/',
                                query: { language: language }
                            }
                        }
                        as='/'
                    ><a className={styles.main_desktop_home_coupon_new_search}>
                            <u>
                                {(language === 'english' || language === undefined) && 'New Search'}
                                {language === 'spanish' && '<Spanish> New Search'}
                            </u>
                        </a>
                    </Link>

                    <div className={styles.main_desktop_home_coupon_label} >
                        {(language === 'english' || language === undefined) && 'Your Coupon'}
                        {language === 'spanish' && '<Spanish> Your Coupon'}
                    </div>
                    <div className={styles.desktop_coupon_component_store_info}>
                        <b>
                            {(language === 'english' || language === undefined) && 'Show this coupon at'}
                            {language === 'spanish' && '<Spanish> Show this coupon at'}
                        </b> {'Store'}, {'Store Address'}
                    </div>

                    <div className={styles.desktop_coupon_component_phone_number} >
                        {(language === 'english' || language === undefined) && 'Questions? Give us a call at'}
                        {language === 'spanish' && '<Spanish> Questions? Give us a call at'}
                        <b>800.555.1212</b>
                    </div>

                    <Coupon language={language} windowWidth={windowWidth} prescription={prescription} coupon={coupon} />
                    <div className={styles.main_desktop_home_coupon_phone_text_container}>
                        <input
                            type="tel"
                            onFocus={clearInput}
                            value={phoneNumber}
                            onChange={getPhoneNumberEvent}
                            className={styles.main_desktop_home_coupon_phone_input}
                            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" />
                        <div onClick={sendCouponAndPhoneNumber} className={styles.main_desktop_home_coupon_text_me}>
                            <u>
                                {(language === 'english' || language === undefined) && 'Text Me The Coupon'}
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