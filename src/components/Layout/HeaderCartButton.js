import {useContext, useEffect,useState} from 'react'
import CartIcon from '../Cart/CartIcon'
import classes from './HeaderCartButton.module.css'
import CartContext from '../../store/cart-context'


const HeaderCartButton = props => {

    const [btnIsActive, setBtnIsActive] = useState(false)

    const cartCtx = useContext(CartContext)
    const {items} = cartCtx

    //we limit the items number to specific item, not to the total of cart items.
    const numberOfCartItems = cartCtx.items.reduce((currNumber, item) => {
        return currNumber + item.amount
    }, 0)



//conditionally apply bump class to add animation
    const btnClasses = `${classes.button} ${btnIsActive ? classes.bump : ''}`;

    useEffect(() => {
        if(items.length === 0){
            return;
        }
    setBtnIsActive(true)


       const timer =  setTimeout(()=>{
            setBtnIsActive(false)
        },300)

        //timeout cleaner for side effects
        return () => {
            clearTimeout(timer)
        }
    }, [items])


    return (
        <button className={btnClasses} onClick={props.onClick}>
        <span className={classes.icon}>
            <CartIcon/>
        </span>
            <span className={classes.hide}>Your Cart</span>
            <span className={classes.badge}>
        {numberOfCartItems}
        </span>
        </button>)
}

export default HeaderCartButton