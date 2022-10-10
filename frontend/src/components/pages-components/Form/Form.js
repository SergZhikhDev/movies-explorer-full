import { useState } from "react";
import "./Form.css";
export const Form = () => {
  console.log(777);

  const [value, setValue] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setValue(value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(999);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        name='field'
        className='fieldForm'
        placeholder='поле'
        value={value}
        onChange={handleChange}
      />
      <button type='submit' className='buttonForm'></button>
    </form>
  );
};
