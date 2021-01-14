import Link from "next/link";
import React, { useEffect, useState } from "react";
import SlidingHamburgerMenu from "../component/SlidingHamburgerMenu";
import styles from './../../../../styles/Header.module.scss';
import { useRouter } from "next/router";

const Header = (props) => {
   const[windowWidth, setWindowWidth] = useState(0);
   const [menuOpen,setOpenMenu] = useState(false);
   const[selectedLanguage,setSelectedLanguage] = useState('english'); 
   const router = useRouter(); 
   const {
    query: { component,
        prescriptions,
        location,
        coupon,
        container,
        language  },
} = router;
   const getSizes = () => { 
    setWindowWidth(window.innerWidth);
       
  }
  const selecteLanguage = (e) =>{
      console.log(e.target.value);
      setSelectedLanguage(e.target.value);
      router.push(
        {
          pathname: router.pathname,
          query: { component: component, 
          prescriptions:prescriptions,
          location:location, 
          coupon:coupon,
          container:container,
          language:e.target.value  

        },
        });

  }
  const openMenu = ()=>{
      setOpenMenu(!menuOpen);

  }
   useEffect(()=>{
       setWindowWidth(window.innerWidth);
       window.addEventListener(
        "resize", getSizes, false);
        console.log('width', window.innerWidth);      
  
    });
    
    
    return (
        <>        
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
        </>

    );
};

export default Header;