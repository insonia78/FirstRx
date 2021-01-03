import { useRouter } from "next/router";

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
        <div className='desktop-coupons-tiles-container'>
            <div className='desktop-coupons-tiles-store-info-container'>
                <div className='desktop-coupons-tiles-store'>Store</div>
                <div className='desktop-coupons-tiles-store-address'>Address</div>
            </div>

            <div className='desktop-coupons-tiles-store-price'>$0.00</div>
            <div onClick={sendToCoupon} className='desktop-coupons-tiles-store-button'><u>Get Cupon</u></div>

        </div>
    );
}

export default CouponsTiles