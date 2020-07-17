export default class UserInfo {
  constructor(userNameSelector, userInfoSelector) {
    this._userNameSelector = userNameSelector;
    this._userInfoSelector = userInfoSelector;
    this._userName = document.querySelector(this._userNameSelector);
    this._userInfo = document.querySelector(this._userInfoSelector);
  }

  getUserInfo() {

    this._userProfile = {};
    this._userProfile.name = this._userName.textContent;
    this._userProfile.info = this._userInfo.textContent;
    return this._userProfile;
  }

  setUserInfo(name, info) {
    this._userName.textContent = name;
    this._userInfo.textContent = info;
  }

}
