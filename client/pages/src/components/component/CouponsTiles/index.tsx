import { useRouter } from "next/router";
//import styles from '../../../../../styles/CouponsTiles.module.scss'; used in version 1


/**
 * @Component
 * Tile for an overview of the coupon
 * 
 * 
 * refrencing version of: 1/28/2021
 * source: https://github.com/emilynorton?tab=repositories
 * 
 * @param language the language to display the data 
 * @param prescription the prescription details 
 * @param couponData the dataOf the Coupon
 */

const CouponsTiles = ({ language, prescription, couponsData }) => {

    
    const router = useRouter();

    /**
     * sends the detailes of the coupon to the componentDetails
     * component 
     */
    const sendToCoupon = () => {
        router.push
            (
                {
                    pathname: '/src/components/Home',
                    query: { container: 'coupon', prescriptions: prescription, language: language },
                })


    }
    return (
        <>
            {/**
             * refrencing version of: 1/28/2021
             * source: https://github.com/emilynorton?tab=repositories
             */}
            <div className="coupon article">

                <div className="price">
                    <a href="#"><div>$8.09</div></a>
                </div>

                <div onClick={sendToCoupon} className="coupon_button cursor">
                    <u>  {(language === 'english' || language === undefined) && 'Get Coupon'}
                        {(language === 'spanish') && '<Spanish>Get Coupon'}
                    </u>
                </div>

                <div className="pharmacy">
                    <div className="pharmacy"><address><strong>Walgreens</strong> 1201 E. Superior Street, Duluth, MN 55805 </address><a href="https://maps.google.com" target="_blank">Map</a></div>
                </div>

            </div>



            {/*           
                 used in version 1 with wire frames
                // version 1 from wire frames
                // https://www.figma.com/proto/f1Af0b6joE7OVyo4R4hb7i/FirstRx-Design?node-id=25%3A1&viewport=520%2C440%2C0.5&scaling=min-zoom
                // https://www.figma.com/proto/f1Af0b6joE7OVyo4R4hb7i/FirstRx-Design?node-id=102%3A1390&viewport=212%2C389%2C0.5&scaling=min-zoom
                // https://www.figma.com/proto/f1Af0b6joE7OVyo4R4hb7i/FirstRx-Design?node-id=349%3A797&viewport=317%2C508%2C0.5&scaling=scale-down 
                
            <div className={styles.desktop_coupons_tiles_container}> 
                <div className={styles.desktop_coupons_tiles_store_info_container}>
                <div className={styles.desktop_coupons_tiles_store}>
                 {(language === 'english' || language === undefined ) && 'Store'}
                 {(language === 'spanish') && '<Spanish>Store'}
                    
                </div>
                <div className={styles.desktop_coupons_tiles_store_address}>
                {(language === 'english' || language === undefined) &&   'Address' }
                {(language === 'spanish') &&   '<Spanish>Address' }

                </div>
            </div>

            <div className={styles.desktop_coupons_tiles_store_price}>$0.00</div>
            <div onClick={sendToCoupon} className={styles.desktop_coupons_tiles_store_button}>
                <u>  {(language === 'english' || language === undefined) &&   'Get Coupon' }
                     {(language === 'spanish') &&   '<Spanish>Get Coupon' }
                </u>
                
            </div> */}

        </>
    );
}

export default CouponsTiles