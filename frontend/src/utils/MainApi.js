class Api { 
  // export default class MainApi{
    constructor({ baseUrl, headers }) { 
      this._baseUrl = baseUrl; 
      this._headers = headers; 
    } 

    _fetch(path, method, body, token) {
        const url = this._baseUrl + path
        return fetch(url, {
            method,
            headers: {
                ...this._headers,
                authorization: token ? `Bearer ${token}` : ''
            },
            body
        })
            .then(res => {
                return res.ok
                    ? res.json()
                    : Promise.reject(`Ошибка: ${res.status}`)
            })
    }

    signup(user) {
        const body = JSON.stringify(user)

        return fetch(`${this._baseUrl}/api/signup`, {
            headers:  {
              'Content-Type': 'application/json'
          }, 
           method: 'POST',
            body}
          ) 
            .then((res) => 
              res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`) 
            ) 
    }

  //   signup(user) {
  //     const body = JSON.stringify(user)
  //     return this._fetch('/api/signup', 'POST', body)
  // }

    signin(user) {
        const body = JSON.stringify(user)
        return this._fetch('/api/signin', 'POST', body)
    }

 
 
    updateUserInfo({ name, email }, token) {
      const body = JSON.stringify({ name, email })
      return this._fetch('/api/users/me',
       'PATCH',
        body,
         token)
  }

  getUserInfo(token) {
      return this._fetch('/api/users/me', 'GET', null, token)
  }

  fetchLikeFilms(token) {
      return this._fetch('/api/movies', 'GET', null, token)
  }

  addLikeFilm(film, token) {
      const body = JSON.stringify(film)
      return this._fetch('/api/movies', 'POST', body, token)
  }

  deleteLikeFilm(filmId, token) {
      return this._fetch(`/api/movies/${filmId}`, 'DELETE', null, token)
  }
  
 
}




    export const mainApi = new Api({ 
        baseUrl: "http://localhost:3002", 
        headers: { 
          // authorization: "$2b$10$JMhnSg/mONjSxtW9qR7Z/uda0QUjnjPSsosXkWc6/4piDqxjEF9kG", 
          "Content-Type": "application/json", 
        }, 
      });