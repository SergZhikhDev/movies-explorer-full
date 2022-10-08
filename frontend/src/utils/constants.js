const regex = {
  name: /^[A-Za-zА-Яа-яЁё /s -]+$/,
  email: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
  password:
    /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]/,
};
const config = {
  name: { isEmpty: true, minLength: 2, maxLength: 16, isName: true },
  email: { isEmpty: true, isEmail: true },
  password: { isEmpty: true, minLength: 6, maxLength: 20, isPass: true },
  etc:{isEmpty: true},
};
const reports = {
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

const count = {
  narrow_screen: {
    add: 2,
    start: 5,
  },
  normal_screen: {
    add: 2,
    start: 8,
  },
  wide_screen: {
    add: 3,
    start: 12,
  },
};

const breackpoint = {
  two: 1000,
  one: 700,
};

const base_url = "https://api.nomoreparties.co";

const short_movie = 40;

export { reports, base_url, count, short_movie, breackpoint, regex, config };
