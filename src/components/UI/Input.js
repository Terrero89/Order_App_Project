import React from 'react'
import classes from './Input.module.css'

const Input = React.forwardRef((props, ref) => {
    return (
        <div className={classes.input}>
            <label htmlFor={props.input.id}>{props.label}</label>
            {/*make the input highly configurable with all values pairs for the input obj*/}
            <input ref={ref} {...props.input} />
        </div>
    );

});

export default Input