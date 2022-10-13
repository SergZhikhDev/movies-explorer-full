import { useState } from "react";

export const useConstant = (value, validations) => {
  const [nameField, setNameField] = useState("");
  
  const onClack = (e) => {
    setNameField(e.target.name);
  };

  const reports = {
    errorMessages: {
      emptyError: `Поле ${nameField} должно быть заполнено!`,
      minLengthError: `Минимальное количество символов поля "${nameField}" - ${validations.minLength}`,
      maxLengthError: `Максимальное количество символов поля "${nameField}" - ${validations.maxLength}`,
      nameError: `Имя может состоять только из букв, пробелов и знака"-"`,
      emailError: `Неправильный формат e-mail`,
      passwordError: `Пароль должен содержать: 1-заглавную букву, 1-прописную букву, 1-спецсимвол,1-цифру, без пробелов`,
    },
    apiMessages: {
      not_found: "Ничего не найдено",
      error:
        "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз",
    },

    attentionMessages: {
      done: {
        upd_profile: "Данные профиля успешно обновлены!",
      },

      error: {
        upd_profile: "Не удалось обновить данные профиля!",
        delete_movie: "Не удалось удалить фильм!",
        add_movie: "Не удалось добавить фильм!",
        get_user: "Произошла ошибка!",
      },
    },
  };

  return {
    onClack,
    nameField,
    reports,
  };
};
