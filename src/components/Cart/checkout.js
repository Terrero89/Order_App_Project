import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

//?helper functions
const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
    //useStates for each input validationwithan object
  
  const [formInputsValidation, setFormInputsValidation] = useState({
    name: true,
    street: true,
    city: true,
    postal: true,
  });

  //using useRef for the values

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName); //validating entered name
    const enteredStreetIsValid = !isEmpty(enteredStreet); //validating entered name
    const enteredCityIsValid = !isEmpty(enteredCity); //validating entered name
    const enteredPostalIsValid = isFiveChars(enteredPostal); //validating entered name

    setFormInputsValidation({
      name: enteredNameIsValid,
      street: enteredCityIsValid,
      city: enteredCityIsValid,
      postal: enteredPostalIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredCityIsValid &&
      enteredPostalIsValid &&
      enteredStreetIsValid;

    if (!formIsValid) {
      return;
    }
      
      props.onConfirm({
          name: enteredName,
          street: enteredCity,
          postal: enteredPostal,
          city: enteredCity
      })
      //action 
    console.log("form sent")
  };

  const nameControlClasses = `${classes.control} ${
    formInputsValidation.name ? "" : classes.invalid
  }`;
  const cityControlClasses = `${classes.control} ${
    formInputsValidation.city ? "" : classes.invalid
  }`;
  const streetControlClasses = `${classes.control} ${
    formInputsValidation.street ? "" : classes.invalid
  }`;
  const postalControlClasses = `${classes.control} ${
    formInputsValidation.postal ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputsValidation.name && <p>Please enter correct name</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputsValidation.street && (
          <p>Please enter correct street</p>
        )}
      </div>
      <div className={postalControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalInputRef} />
        {!formInputsValidation.postal && (
          <p>Please enter correct postal</p>
        )}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputsValidation.city && <p>Please enter correct city</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
