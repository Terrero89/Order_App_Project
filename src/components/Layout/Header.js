import React, {Fragment} from 'react';
import mealsImg from '../../assets/photo-1606787366850-de6330128bfc.avif'
import classes from './Header.module.css'
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {

    return (<Fragment>

        <header className={classes.header}>
            <h1 className={classes.title}>Order Meals</h1>
            <HeaderCartButton onClick={props.onShowCart}/>
        </header>
            <div className={classes['main-image']}>
                <img src={mealsImg} alt="Delicious food"/>
            </div>


    </Fragment>)

}

export default Header