export default class Api {
  constructor(data) {
    this._url = data.link;
    this._groupId = data.groupId;
    this._headers = data.headers;
  }

  _prepareData(res){
    if (res.ok) {
      return res.json();
    }

    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitalCards() {
    return fetch(`${this._url}/v1/${this._groupId}/cards`,
      {
        method: 'GET',
        headers: this._headers
      })
      .then(this._prepareData);
  }

  getProfileData() {
    return fetch(`${this._url}/v1/${this._groupId}/users/me`,
      {
        method: 'GET',
        headers: this._headers
      })
      .then(this._prepareData);
  }

  dislike(itemId) {
    return fetch(`${this._url}/v1/${this._groupId}/cards/likes/${itemId}`,
      {
        method: 'DELETE',
        headers: this._headers
      }).then(this._prepareData);
  }

  like(itemId) {
    return fetch(`${this._url}/v1/${this._groupId}/cards/likes/${itemId}`,
      {
        method: 'PUT',
        headers: this._headers
      }).then(this._prepareData);
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/v1/${this._groupId}/cards/${cardId}`,
      {
        method: 'DELETE',
        headers: this._headers
      });
  }

  createCard(name, link) {
    return fetch(`${this._url}/v1/${this._groupId}/cards`,
      {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: name,
          link: link
        })
      }).then(this._prepareData);
  }

  updateProfile(name, about) {
    return fetch(`${this._url}/v1/${this._groupId}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    }).then(this._prepareData);
  }

  updateAvatar(avatarLink) {
    return fetch(`${this._url}/v1/${this._groupId}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarLink
      })
    }).then(this._prepareData);
  }
}
