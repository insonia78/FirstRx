import { useRouter } from "next/router";
import styles from '../../../../../styles/CouponsTiles.module.scss';
const CouponsTiles = ({ prescription, couponsData }) => {

    console.log('CouponsTiles', prescription);
    const router = useRouter();
    const sendToCoupon = () => {
        router.push
            (
                {
                    pathname: '/src/components/Home',
                    query: { container: 'coupon', prescriptions: prescription },
                })


    }
    return (
        <div className={styles.desktop_coupons_tiles_container}>
            <div className={styles.desktop_coupons_tiles_store_info_container}>
                <div className={styles.desktop_coupons_tiles_store}>Store</div>
                <div className={styles.desktop_coupons_tiles_store_address}>Address</div>
            </div>

            <div className={styles.desktop_coupons_tiles_store_price}>$0.00</div>
            <div onClick={sendToCoupon} className={styles.desktop_coupons_tiles_store_button}><u>Get Cupon</u></div>

        </div>
    );
}

export default CouponsTiles