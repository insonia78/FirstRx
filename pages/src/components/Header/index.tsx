import Link from "next/link";
import React, { useEffect, useState } from "react";
import SlidingHamburgerMenu from "../component/SlidingHamburgerMenu";
import styles from './../../../../styles/Header.module.scss';
import { useRouter } from "next/router";

const Header = (props) => {
   const[windowWidth, setWindowWidth] = useState(0);
   const [menuOpen,setOpenMenu] = useState(false);
     
   const getSizes = () => { 
    setWindowWidth(window.innerWidth);
    // if(window.innerHeight <=420)
    //     window.location.reload();   
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
    const router = useRouter();
    const {
        query: { component,
            prescriptions,
            location,
            coupon,
            container,
            language  },
    } = router;

    return (
        <>        
        <header className={styles.header_desktop_container}>
            
            <div className={styles.header_desktop}>                
                <div className={styles.header_desktop_title_container} >
                    FirstRx
                    </div>
                <div className={styles.header_desktop_slogan_container}>
                    Find low cash prices for prescriptions
                </div>

               {windowWidth > 1560 && <nav>
                    <div className={styles.header_desktop_about_first_rx_container}>
                        About FirstRx
                    </div>
                    <Link href='/src/components/Header/Help'><div className={styles.header_desktop_help_container}>
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
                </nav>}
                {windowWidth <= 420 && <nav>                
                    <div>
                        <select name="language" className={styles.header_desktop_select_language }>
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
                {(windowWidth > 420 && windowWidth <= 1560) && <nav>                
                    <div>
                         <div className={styles.header_desktop_select_language_label_container}>
                            Select Language
                        </div>
                        <select name="language" className={styles.header_desktop_select_language }>
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
                
            </div>
        </header>
         <SlidingHamburgerMenu menuOpen={menuOpen} setOpenMenu={ openMenu}/>
        </>

    );
};

export default Header;