import Link from "next/link";
import React from "react";
import styles from './../../../../styles/Header.module.scss';


const HeaderDesktop = (props) => {


    return (
        
        <header className={styles.header_desktop_container}>
            
            <div className={styles.header_desktop}>                
                <div className={styles.header_desktop_title_container} >
                    FirstRx
                    </div>
                <div className={styles.header_desktop_slogan_container}>
                    Find low cash prices for prescriptions
                </div>

                <nav>
                    <div className={styles.header_desktop_about_first_rx_container}>
                        About FirstRx
                    </div>
                    <Link href='/src/components/HeaderDesktop/Help'><div className={styles.header_desktop_help_container}>
                        Help
                    </div></Link>
                    <div>
                        <div className={styles.header_desktop_select_language_label_container}>
                            Select Language
                        </div>
                        <select name="language" className={styles.header_desktop_select_language }>
                            <option value="english">English</option>
                            <option value="spanish">Spanish</option>
                        </select>
                    </div>
                </nav> 
                
            </div>
        </header>

    );
};

export default HeaderDesktop;