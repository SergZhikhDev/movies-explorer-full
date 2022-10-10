import { useState, useEffect, useContext, useCallback } from "react";
import { useValidation } from "./useValidation";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export const useInputt = (initialValue, validations) => {
  const [value, setValue] = useState(initialValue);
  const currentUser = useContext(CurrentUserContext);

  const [isDirty, setisDirty] = useState(false);
  // const [readyForUpdate, setReadyForUpdate] = useState(false);
  // const [needTwoChanges, setNeedTwoChanges] = useState("");

  const valid = useValidation(value, validations);
  const { errorsKit, inputValid } = valid;
  const errorMessages = errorsKit.messages.message;

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

  // const onClick = (input) => {
  //   // input.nativeEvent.target.autofocus=true
  //   // setisDirty(false);
  // };

  const onBlur = (e) => {
    setisDirty(true);
  };

  const [nameReadyForUpdate, setNameReadyForUpdate] = useState(false);
  const [emailReadyForUpdate, setEmailReadyForUpdate] = useState(false);

  useEffect(() => {
    valid.inputValid && currentUser.currentUser.name !== value.field
      ? setNameReadyForUpdate(true)
      : setNameReadyForUpdate(false);

    valid.inputValid && currentUser.currentUser.email !== value.field
      ? setEmailReadyForUpdate(true)
      : setEmailReadyForUpdate(false);
  }, [
    currentUser.currentUser.email,
    currentUser.currentUser.name,
    valid.inputValid,
    value.field,
  ]);

  // useEffect(() => {
  //   (value !== currentUser.currentUser.name &&
  //     value === currentUser.currentUser.email) ||
  //   (value === currentUser.currentUser.name &&
  //     value !== currentUser.currentUser.email)
  //     ? setNeedTwoChanges("Измените оба поля")
  //     : setNeedTwoChanges("");
  // }, [currentUser.currentUser.email, currentUser.currentUser.name, value]);

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
    // errorsKit,
    inputValid,
    errorMessages,
    nameReadyForUpdate,
    emailReadyForUpdate,
    onBlur,
    callbackRef,
    handleChange,
    handleProfileChange,
    setValue,
    ...valid,
  };
};
