import { useState, useEffect, useContext } from "react";
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
    e.persist();
    setisDirty(true);
    setValue(e.target.value);
  };
  const onClick = (e) => {
    setisDirty(false);
    valid.onClack(e);
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

  return {
    errorMessages,
    value,
    errorsKit,
    inputValid,
    readyForUpdate,
    needTwoChanges,
    onBlur,
    handleChange,
    onClick,
    isDirty,
    ...valid,
  };
};
