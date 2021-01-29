import Link from "next/link";
//import Image from 'next/image';
import React, { useEffect, useState } from "react";
import SlidingHamburgerMenu from "../component/SlidingHamburgerMenu";
import styles from './../../../../styles/Header.module.scss';
import { useRouter } from "next/router";
/**
 * Header of the application
 * refrencing version of: 1/28/2021
 * source: https://github.com/emilynorton?tab=repositories   
 * 
 * @param props 
 */


const Header = (props) => {

    const [windowWidth, setWindowWidth] = useState(0);

    const [menuOpen, setOpenMenu] = useState(false);

    /**@gets @sets language type */
    const [selectedLanguage, setSelectedLanguage] = useState('english');

    const router = useRouter();

    const {
        query: { component,
            prescriptions,
            location,
            coupon,
            container,
            language },
    } = router;

    const getSizes = () => {
        setWindowWidth(window.innerWidth);

    }

    /**
     * Selects the lanugage for which to diplay the data
     * options: English, Spanish
     * 
     * @useState setSetectedLanugage
     * @event e 
     */
    const selecteLanguage = (e) => {
        console.log(e.target.value);
        setSelectedLanguage(e.target.value);
        router.push(
            {
                pathname: router.pathname,
                query: {
                    component: component,
                    prescriptions: prescriptions,
                    location: location,
                    coupon: coupon,
                    container: container,
                    language: e.target.value

                },
            });

    }
    const openMenu = () => {
        setOpenMenu(!menuOpen);

    }
    useEffect(() => {
        setWindowWidth(window.innerWidth);
        window.addEventListener(
            "resize", getSizes, false);
        console.log('width', window.innerWidth);

    });


    return (
        <>
            {/** Header Version2 from html and css from repository  https://github.com/emilynorton?tab=repositories */}
            <header>
                <div className='flexcontainer'>
                    <div className='left'>
                        <div id="logo" className="logo">
                            <a href="/">
                                <img src="/_images/FirstRX_logo.svg" alt="FirstRx Logo" />
                            </a>
                        </div>
                        <h1>
                            <a href="/">
                                <span>First Rx: </span>
                                <span className="tagline">Low Cash Prices for Prescriptions</span>
                            </a>
                        </h1>
                    </div>
                    <div className="right">
                        <form id="language" className="language">
                            <label htmlFor="language">Language</label>
                            <button type="submit" form="language">Select</button>  </form>
                        <div>
                            <div className={styles.header_desktop_select_language_label_container}>
                                {(selectedLanguage === 'english' || selectedLanguage === undefined) && 'Select Language'}
                                {selectedLanguage === 'spanish' && '<Spanish>Select Language'}
                            </div>
                            <select value={selectedLanguage} onChange={selecteLanguage} name="language" className={styles.header_desktop_select_language}>
                                <option value="english">English</option>
                                <option value="spanish">Spanish</option>
                            </select>
                        </div>
                        <nav className="primary" aria-label="main navigation">
                            <ul>
                                <li className="homelink"><a className="selected" href="/">Home</a></li>

                                <Link 
                                href={{
                                    pathname: '/src/components/Header/Help',
                                    query: { language: selectedLanguage }
                                }}><li><a href="./help/">
                                    {(selectedLanguage === 'english' || selectedLanguage === undefined) && 'Help'}
                                    {selectedLanguage === 'spanish' && '<Spanish>Help'}</a></li></Link>
                                <li><a href="./about/">About FirstRx</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>



            {/* Version 1 of the application referincing wire frames 
               version 1 
               // https://www.figma.com/proto/f1Af0b6joE7OVyo4R4hb7i/FirstRx-Design?node-id=25%3A1&viewport=520%2C440%2C0.5&scaling=min-zoom
               // https://www.figma.com/proto/f1Af0b6joE7OVyo4R4hb7i/FirstRx-Design?node-id=102%3A1390&viewport=212%2C389%2C0.5&scaling=min-zoom
               // https://www.figma.com/proto/f1Af0b6joE7OVyo4R4hb7i/FirstRx-Design?node-id=349%3A797&viewport=317%2C508%2C0.5&scaling=scale-down 

                
            <header className={styles.header_desktop_container}>

            
              
             <div className={styles.header_desktop}>                
                <div className={styles.header_desktop_title_container} >
                    FirstRx
                    </div>
                <div className={styles.header_desktop_slogan_container}>
                {(selectedLanguage === 'english' ||  selectedLanguage === undefined) && 'Find low cash prices for prescriptions'}
                {selectedLanguage === 'spanish' &&  '<Spanish>Find low cash prices for prescriptions'}    
            
                </div>

               {windowWidth > 1440 && <nav>
                    <div className={styles.header_desktop_about_first_rx_container}>
                    {(selectedLanguage === 'english' || selectedLanguage === undefined) && 'About FirstRx'}
                    {selectedLanguage === 'spanish' &&  '<Spanish>About FirstRx'}                       
                    </div>
                    <Link href={{
                        pathname:'/src/components/Header/Help',
                        query:{language:selectedLanguage}
                        }}><div className={styles.header_desktop_help_container}>
                        {(selectedLanguage === 'english' || selectedLanguage === undefined) && 'Help'}
                        {selectedLanguage === 'spanish' &&  '<Spanish>Help'}    
                        
                    </div></Link>
                    <div>
                        <div className={styles.header_desktop_select_language_label_container}>
                        {(selectedLanguage === 'english' ||  selectedLanguage=== undefined) && 'Select Language'}
                        {selectedLanguage === 'spanish' &&  '<Spanish>Select Language'}                           
                        </div>
                        <select value={selectedLanguage} onChange={selecteLanguage} name="language" className={styles.header_desktop_select_language }>
                            <option value="english">English</option>
                            <option value="spanish">Spanish</option>
                        </select>
                    </div>
                </nav>}
                {windowWidth <= 550 && <nav>                
                    <div>
                        <select name="language" onChange={selecteLanguage} className={styles.header_desktop_select_language }>
                            <option value="english">English</option>
                            <option value="spanish">Spanish</option>
                        </select>
                    </div>
                    <div onClick={openMenu}  className={styles.hamburger_menu_container}>
                        <div className={styles.hamburger_menu_line}></div>
                        <div className={styles.hamburger_menu_line}></div>
                        <div className={styles.hamburger_menu_line}></div>
                    </div>
                </nav>}                
                {(windowWidth > 550 && windowWidth <= 1440) && <nav>                
                    <div>
                         <div className={styles.header_desktop_select_language_label_container}>
                         {(selectedLanguage === 'english' ||  selectedLanguage === undefined) && 'Select Language'}
                        {selectedLanguage === 'spanish' &&  '<Spanish>Select Language'}
                        </div>
                        <select onChange={selecteLanguage} name="language" className={styles.header_desktop_select_language }>
                            <option value="english">English</option>
                            <option value="spanish">Spanish</option>
                        </select>
                    </div>
                    <div  onClick={openMenu}  className={styles.hamburger_menu_container}>
                        <div className={styles.hamburger_menu_line}></div>
                        <div className={styles.hamburger_menu_line}></div>
                        <div className={styles.hamburger_menu_line}></div>
                    </div>
                </nav>}    
                
            </div>
            </header>
            <SlidingHamburgerMenu language={selectedLanguage} menuOpen={menuOpen} setOpenMenu={ openMenu}/>
         */}
        </>

    );
};

export default Header;