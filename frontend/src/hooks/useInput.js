import { useState, useEffect, useContext,useCallback } from "react";
import { useValidation } from "./useValidation";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export const useInputt = (initialValue, validations) => {
  const [value, setValue] = useState(initialValue);
  const currentUser = useContext(CurrentUserContext);

  const [isDirty, setisDirty] = useState(false);
  const [readyForUpdate, setReadyForUpdate] = useState(false);
  const [needTwoChanges, setNeedTwoChanges] = useState("");

  const valid = useValidation(value, validations);
  const { errorsKit, inputValid } = valid;
  const errorMessages = errorsKit.messages.message;
  
  const handleChange = (e) => {
    //убирает имеющиеся значения
    // e.persist();
     e.preventDefault(e);
    setisDirty(true);
    setValue({ ...value, field: e.target.value });
     valid.onClack(e);
  };
  const onClick = (input) => {
    input.nativeEvent.target.autofocus=true
    console.log(input.nativeEvent.target.autofocus)
    // setisDirty(false);
   
  };

  const onBlur = (e) => {
    setisDirty(true);
  };

  useEffect(() => {
    valid.inputValid &&
    value !== currentUser.currentUser.name &&
    value !== currentUser.currentUser.email
      ? setReadyForUpdate(true)
      : setReadyForUpdate(false);
  }, [
    currentUser.currentUser.email,
    currentUser.currentUser.name,
    currentUser.email,
    currentUser.name,
    valid.inputValid,
    value,
  ]);

  useEffect(() => {
    (value !== currentUser.currentUser.name &&
      value === currentUser.currentUser.email) ||
    (value === currentUser.currentUser.name &&
      value !== currentUser.currentUser.email)
      ? setNeedTwoChanges("Измените оба поля")
      : setNeedTwoChanges("");
  }, [currentUser.currentUser.email, currentUser.currentUser.name, value]);

  const callbackRef = useCallback((inputElement) => {
    if (inputElement) {
      inputElement.focus();
    }
  }, []);




  return {
    errorMessages,
    callbackRef,
    value,
    errorsKit,
    inputValid,
    readyForUpdate,
    needTwoChanges,
    onBlur,
    handleChange,
    onClick,
    setValue,
    isDirty,
    ...valid,
  };
};
