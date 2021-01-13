import { useRouter } from "next/router";
import styles from '../../../../../styles/CouponsTiles.module.scss';
const CouponsTiles = ({language, prescription, couponsData }) => {

    console.log('CouponsTiles', prescription);
    const router = useRouter();
    const sendToCoupon = () => {
        router.push
            (
                {
                    pathname: '/src/components/Home',
                    query: { container: 'coupon', prescriptions: prescription,language:language },
                })


    }
    return (
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
                
            </div>

        </div>
    );
}

export default CouponsTiles