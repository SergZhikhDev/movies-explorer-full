import { useState, useEffect, useContext, useCallback } from "react";
import { useValidation } from "./useValidation";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export const useInputt = (initialValue, validations) => {
  const [value, setValue] = useState(initialValue);
  const currentUser = useContext(CurrentUserContext);

  const [isDirty, setisDirty] = useState(false);

  const valid = useValidation(value, validations);
  const { errorsKit, inputValid } = valid;
  const errorMessages = errorsKit.messages.message;
  const emptyMessage = valid.errorsKit.errors.emptyError;

  const [userName, setUserName] = useState(currentUser.currentUser.name);
  const [userEmail, setUserEmail] = useState(currentUser.currentUser.email);

  const handleChange = (e) => {
    //убирает имеющиеся значения
    e.persist();
    setisDirty(true);
    setValue({ ...value, field: e.target.value });
    valid.onClack(e);
  };

  const handleProfileChange = (e) => {
    //убирает имеющиеся значения
    e.persist();

    if (e.target.name === "name") {
      setUserName(e.target.value);
    }
    if (e.target.name === "email") {
      setUserEmail(e.target.value);
    }

    setisDirty(true);
    setValue({ ...value, field: e.target.value });
    valid.onClack(e);
  };

  const handleCheckBoxChange = (e) => {
    const isCheckbox = e.target.type === "checkbox";
    const name = e.target.name;
    const val = isCheckbox ? e.target.checked : e.target.value;
    setValue({ ...value, [name]: val });
  };

  const onBlur = (e) => {
    setisDirty(true);
  };

  const [nameReadyForUpdate, setNameReadyForUpdate] = useState(false);
  const [emailReadyForUpdate, setEmailReadyForUpdate] = useState(false);

  useEffect(() => {
    currentUser.currentUser.name !== (userName || value.field)
      ? setNameReadyForUpdate(true)
      : setNameReadyForUpdate(false);

    currentUser.currentUser.email !== (userEmail || value.field)
      ? setEmailReadyForUpdate(true)
      : setEmailReadyForUpdate(false);
  }, [
    currentUser.currentUser.email,
    currentUser.currentUser.name,
    userEmail,
    userName,
    value.field,
  ]);


  const callbackRef = useCallback((inputElement) => {
    if (inputElement) {
      inputElement.focus();
    }
  }, []);

  return {
    value,
    isDirty,
    userName,
    userEmail,
    emptyMessage,
    inputValid,
    errorMessages,
    nameReadyForUpdate,
    emailReadyForUpdate,
    onBlur,
    setValue,
    callbackRef,
    handleChange,
    handleProfileChange,
    handleCheckBoxChange,
    ...valid,
  };
};
