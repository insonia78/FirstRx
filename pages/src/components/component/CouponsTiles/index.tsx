
const CouponsTiles = ({ couponsData }) => {

    return (
        <div className='desktop-coupons-tiles-container'>
            <div className='desktop-coupons-tiles-store-info-container'>
                <div className='desktop-coupons-tiles-store'>Store</div>
                <div className='desktop-coupons-tiles-store-address'>Address</div>
            </div>
            <div className='desktop-coupons-tiles-store-details-container'>
                <div className='desktop-coupons-tiles-store-price'>$0.00</div>
                <div className='desktop-coupons-tiles-store-button'><u>Get Cupon</u></div>
            </div>
            
        </div>
    );
}

export default CouponsTiles