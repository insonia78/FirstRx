import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import styles from '../../../../../styles/Help.module.scss';

export default function Help() {


    const [windowWidth, setWindowWidth] = useState(0);
    const getSizes = () => {
        setWindowWidth(window.innerWidth);
    }

    useEffect(() => {
        setWindowWidth(window.innerWidth);
        window.addEventListener(
            "resize", getSizes, false);

    });

    return (
        <>
            <main>
                {windowWidth > 420 ?
                <>
                    <div className="main-desktop-container">
                        <Link href='/'><div className={styles.header_desktop_help} ><u>{'<<<'}Home</u></div></Link>
                        <div className={styles.main_desktop_help_title}><b>FirstRX Help</b></div>
                        <div className='main-desktop-home-coupon-container'>
                            <div className={styles.main_desktop_help_question}>Questions? Give us a call at <b>800.555.1212</b></div>
                            <br />
                            <br />
                            <div className={styles.main_desktop_help_content_title}>Help Topic 1</div>
                            <br />
                            <p className={styles.main_desktop_help_content_paragraph}>Content needs to be here</p>
                            <br />
                            <br />
                            <div className={styles.main_desktop_help_content_title}>Help Topic 2</div>
                            <br />
                            <p className={styles.main_desktop_help_content_paragraph}>Content needs to be here</p>
                            <br />
                            <br />
                            <div className={styles.main_desktop_help_content_title}>Help Topic 3</div>
                            <br />
                            <p className={styles.main_desktop_help_content_paragraph}>Content needs to be here</p>
                        </div>
                    </div>
                    <div className="main-desktop-bottom-container">
                        <span className="main-desktop-bottom-text">This is an easy and simple process to get big savings. Find the lowest price at a
                pharmacy near you. Get texted a coupon. Bring to your pharmacist. Save $.</span>
                    </div>
                </>:
                <div>
                    <Link href='/'><div className={styles.header_desktop_help} ><u>{'<<<'}Home</u></div></Link>
                    <div className={styles.main_desktop_help_title}><b>FirstRX Help</b></div>
                    <div className={styles.main_desktop_help_question}>Questions? Give us a call at <b>800.555.1212</b></div>
                    <p className={styles.main_desktop_help_content_paragraph}>Content needs to be here</p> 
                </div>
                }
            </main>
        </>
    );
}