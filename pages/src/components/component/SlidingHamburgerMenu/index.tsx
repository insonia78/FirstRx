
import styles from './../../../../../styles/SlidingHamburgerMenu.module.scss';
const SlidingHamburgerMenu = () =>{

    return(
        <div className={styles.sliding_hamburger_menu_container}>
                 <div className={styles.sliding_hamburger_menu_content_container}> 
                    <div className={styles.sliding_hamburger_menu_title}>Menu</div>
                    <ul>
                        <li><u>About FirstRx</u></li>
                        <li><u>Help</u></li>
                        <li><u>Home / Start Search</u></li>
                    </ul>
                 </div>
        </div>
    )
}

export default SlidingHamburgerMenu;