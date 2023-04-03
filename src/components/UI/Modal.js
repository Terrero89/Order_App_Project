import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';

import classes from './Modal.module.css'

//since no much code i will create a second component here.


const Backdrop = (props) => {
    return (<div className={classes.backdrop} onClick={props.onClose}></div>)
}
const ModalOverlay = (props) => {
    return <div className={classes.modal}>
        <div className={classes.content}> {props.children}</div>
    </div>

}

//helper constant
const portalElement = document.getElementById('overlays');
//modal used a wrapper
const Modal = (props) => {
    return <Fragment>
        {ReactDOM.createPortal(<Backdrop onClose={props.onClose}/>, portalElement)}
        {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
    </Fragment>

}

export default Modal