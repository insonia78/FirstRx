
import Link from 'next/link';
import React from 'react';
import styles from './../../../../../styles/SlidingHamburgerMenu.module.scss';
const SlidingHamburgerMenu = ({ menuOpen,setOpenMenu }) => {

    return (
        <div className={`${styles.sliding_hamburger_menu_container_start} ` + (menuOpen && styles.sliding_hamburger_menu_container)}>
            {menuOpen && <div className={styles.sliding_hamburger_menu_content_container}>
                <br />
                <br />
                <div className={styles.sliding_hamburger_menu_title}>Menu</div>
                <br />
                <br />
                <div>
                    <ul onClick={ setOpenMenu}>
                        <li><u>About FirstRx</u></li>
                        <Link href='/src/components/Header/Help'><li><u>Help</u></li></Link>
                        <li><u>Home / Start Search</u></li>
                    </ul>
                </div>
            </div>}
        </div>
    )
}

export default SlidingHamburgerMenu;