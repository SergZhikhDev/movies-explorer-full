import { useState, useEffect } from "react";
import { regex } from "../utils/constants";
import { useConstant } from "./useConstants";

export const useValidation = (value, validations) => {
  const { reports, onClack } = useConstant(value, validations);
  const [errorsKit, setErrorsKit] = useState({
    errors: {
      emptyError: true, //true- поле пустое. есть ошибка
      maxLengthError: false, //true- длина меньше=> есть ошибка
      minLengthError: false, //true- длина больше=> есть ошибка
      nameError: false, //true- email не шаблон=> есть ошибка
      emailError: false, //true-name не шаблон=> есть ошибка
      passwordError: false, //true-password не шаблон=> есть ошибка
    },
    messages: {
      message: "",
    },
  });
  const kitErr = errorsKit.errors;
  const kitMess = errorsKit.messages;
  const emptyErr = errorsKit.errors.emptyError;
  const minLhErr = errorsKit.errors.minLengthError;
  const maxLhErr = errorsKit.errors.maxLengthError;
  const namErr = errorsKit.errors.nameError;
  const emlErr = errorsKit.errors.emailError;
  const pasErr = errorsKit.errors.passwordError;

  const errMess = reports.errorMessages;

  const [inputValid, setInputValid] = useState(false);
  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case "isEmpty":
          value.field
            ? setErrorsKit({
                errors: { ...kitErr, emptyError: false },
                messages: { ...kitMess, message: null },
              })
            : setErrorsKit({
                errors: { ...kitErr, emptyError: true },
                messages: { ...kitMess, message: errMess.emptyError },
              });
          break;

        case "minLength":
          !emptyErr && value.field.length < validations[validation]
            ? setErrorsKit((errorsKit) => ({
                errors: { ...errorsKit.errors, minLengthError: true },
                messages: {
                  ...kitMess,
                  message: errMess.minLengthError,
                },
              }))
            : !emptyErr && !minLhErr && !namErr
            ? setErrorsKit((errorsKit) => ({
                errors: { ...errorsKit.errors, minLengthError: false },
                messages: {
                  ...kitMess,
                  message: null,
                },
              }))
            : setErrorsKit((errorsKit) => ({
                errors: { ...errorsKit.errors, minLengthError: false },
                messages: {
                  ...kitMess,
                  message: errMess.emptyError,
                },
              }));

          break;

        case "maxLength":
          !emptyErr && value.field.length > validations[validation]
            ? setErrorsKit((errorsKit) => ({
                errors: { ...errorsKit.errors, maxLengthError: true },
                messages: {
                  ...errorsKit.messages,
                  message: reports.errorMessages.maxLengthError,
                },
              }))
            : !emptyErr && minLhErr && !maxLhErr
            ? setErrorsKit((errorsKit) => ({
                errors: { ...errorsKit.errors, maxLengthError: false },
                messages: {
                  ...kitMess,
                  message: errMess.minLengthError,
                },
              }))
            : !emptyErr && !minLhErr && !maxLhErr
            ? setErrorsKit((errorsKit) => ({
                errors: { ...errorsKit.errors, maxLengthError: false },
                messages: {
                  ...kitMess,
                  message: null,
                },
              }))
            : setErrorsKit((errorsKit) => ({
                errors: { ...errorsKit.errors, maxLengthError: false },
                messages: {
                  ...errorsKit.messages,
                  message: errMess.emptyError,
                },
              }));

          break;

        case "isEmail":
          !emptyErr && !regex.email.test(String(value.field).toLowerCase())
            ? setErrorsKit((errorsKit) => ({
                errors: { ...errorsKit.errors, emailError: true },
                messages: {
                  ...kitMess,
                  message: errMess.emailError,
                },
              }))
            : emptyErr
            ? setErrorsKit((errorsKit) => ({
                errors: { ...errorsKit.errors, emailError: false },
                messages: {
                  ...kitMess,
                  message: errMess.emptyError,
                },
              }))
            : setErrorsKit((errorsKit) => ({
                errors: { ...errorsKit.errors, emailError: false },
                messages: {
                  ...kitMess,
                  message: null,
                },
              }));

          break;
        case "isName":
          !regex.name.test(String(value.field).toLowerCase()) && !emptyErr
            ? setErrorsKit((errorsKit) => ({
                errors: { ...errorsKit.errors, nameError: true },
                messages: {
                  ...errorsKit.messages,
                  message: errMess.nameError,
                },
              }))
            : regex.name.test(String(value.field).toLowerCase()) && minLhErr
            ? setErrorsKit((errorsKit) => ({
                errors: { ...errorsKit.errors, nameError: false },
                messages: {
                  ...errorsKit.messages,
                  message: errMess.minLengthError,
                },
              }))
            : regex.name.test(String(value.field).toLowerCase()) && maxLhErr
            ? setErrorsKit((errorsKit) => ({
                errors: { ...errorsKit.errors, nameError: false },
                messages: {
                  ...errorsKit.messages,
                  message: errMess.maxLengthError,
                },
              }))
            : emptyErr
            ? setErrorsKit((errorsKit) => ({
                errors: { ...errorsKit.errors, nameError: false },
                messages: {
                  ...errorsKit.messages,
                  message: errMess.emptyError,
                },
              }))
            : setErrorsKit((errorsKit) => ({
                errors: { ...errorsKit.errors, nameError: false },
                messages: {
                  ...errorsKit.messages,
                  message: null,
                },
              }));

          break;

        case "isPass":
          !regex.password.test(String(value.field)) && !emptyErr
            ? setErrorsKit((errorsKit) => ({
                errors: { ...errorsKit.errors, passwordError: true },
                messages: {
                  ...errorsKit.messages,
                  message: errMess.passwordError,
                },
              }))
            : regex.password.test(String(value.field)) && minLhErr
            ? setErrorsKit((errorsKit) => ({
                errors: { ...errorsKit.errors, passwordError: false },
                messages: {
                  ...errorsKit.messages,
                  message: errMess.minLengthError,
                },
              }))
            : regex.password.test(String(value.field)) && maxLhErr
            ? setErrorsKit((errorsKit) => ({
                errors: { ...errorsKit.errors, passwordError: false },
                messages: {
                  ...errorsKit.messages,
                  message: errMess.maxLengthError,
                },
              }))
            : regex.password.test(String(value.field)) && emptyErr
            ? setErrorsKit((errorsKit) => ({
                errors: { ...errorsKit.errors, passwordError: false },
                messages: {
                  ...errorsKit.messages,
                  message: errMess.emptyError,
                },
              }))
            : setErrorsKit((errorsKit) => ({
                errors: { ...errorsKit.errors, passwordError: false },
                messages: {
                  ...errorsKit.messages,
                  message: null,
                },
              }));

          break;
        default:
      }
    }
    // eslint-disable-next-line
  }, [
    value,
    validations,
    emptyErr,
    minLhErr,
    maxLhErr,
    emlErr,
    namErr,
    pasErr,
  ]);

  useEffect(() => {
    if (emptyErr || minLhErr || maxLhErr || emlErr || namErr || pasErr) {
      setInputValid(false);
    } else {
      setInputValid(true);
    }
  }, [emptyErr, minLhErr, maxLhErr, emlErr, namErr, pasErr]);

  return {
    errorsKit,
    inputValid,
    onClack,
  };
};
