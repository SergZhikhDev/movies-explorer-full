// import { useState } from "react";
import "./Form.css";
import { useInputt } from "../../../hooks/useInput";
import { config } from "../../../utils/constants";
import { ErrorText } from "../../nested-components/ErrorText/ErrorText";

export const Form = () => {
  console.log(777);

  // const [value, setValue] = useState("");

  // const handleChange = (e) => {
  //   const value = e.target.value;
  //   setValue(value);
  // };
  const handleSubmit = (e) => {
    e.preventDefault();
   alert(999);
  };










  const field = useInputt({}, config.name);


  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        name='field'
        className='fieldForm'
        placeholder='поле'
        value={field.value.field || ""}
        onChange={field.handleChange}
      />
      <button type='submit' className='buttonForm'></button>
      <hr className='form__line line line_form line_form_type_auth'></hr>
                <span className='form__error' id='error-userName'>
                  {field.isDirty && (
                    <ErrorText type='auth'>{field.errorMessages}</ErrorText>
                  )}
                </span>
    </form>
  );
};
