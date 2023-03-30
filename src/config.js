export const ENV = {
  // baseUrl: "https://qetc-api.apextreasure.com/v1/front",
  // imageUrl: "https://qetc-api.apextreasure.com/images/",
  baseUrl: "http://localhost:8080/v1/front",
  imageUrl: "http://localhost:8080/images/",
  
  decimalNumberValidator: function (e) {
    // Allow: backspace, delete, tab, escape, enter and .
    let specialKeys = [46, 8, 9, 27, 13, 110, 190];

    if (e.target.value.includes(".")) {
      specialKeys = [46, 8, 9, 27, 13];
    } else {
      specialKeys = [46, 8, 9, 27, 13, 110, 190];
    }

    // Allow: Ctrl+A,Ctrl+C,Ctrl+V, Command+A
    if (
      specialKeys.includes(e.keyCode) ||
      // Allow: Ctrl+A,Ctrl+C,Ctrl+Z,Ctrl+X Command+A
      ((e.keyCode === 65 ||
        e.keyCode === 67 ||
        e.keyCode === 90 ||
        e.keyCode === 88) &&
        (e.ctrlKey === true || e.metaKey === true)) ||
      // Allow: home, end, left, right, down, up
      (e.keyCode >= 35 && e.keyCode <= 40) ||
      // Allow F1 to F12 keys
      (e.keyCode >= 112 && e.keyCode <= 123)
    ) {
      // let it happen, don't do anything
      return;
    }
    // Ensure that it is a number and stop the keypress
    if (
      (e.shiftKey || e.keyCode < 48 || e.keyCode > 57) &&
      (e.keyCode < 96 || e.keyCode > 105)
    ) {
      e.preventDefault();
    }
  },

  integerNumberValidator: function (e) {
    // Allow: backspace, delete, tab, escape, enter and .
    const specialKeys = [46, 8, 9, 27, 13];

    // Allow: Ctrl+A,Ctrl+C,Ctrl+V, Command+A
    if (
      specialKeys.includes(e.keyCode) ||
      // Allow: Ctrl+A,Ctrl+C,Ctrl+Z,Ctrl+X Command+A
      ((e.keyCode === 65 ||
        e.keyCode === 67 ||
        e.keyCode === 90 ||
        e.keyCode === 88) &&
        (e.ctrlKey === true || e.metaKey === true)) ||
      // Allow: home, end, left, right, down, up
      (e.keyCode >= 35 && e.keyCode <= 40)
    ) {
      // let it happen, don't do anything
      return;
    }
    // Ensure that it is a number and stop the keypress
    if (
      (e.shiftKey || e.keyCode < 48 || e.keyCode > 57) &&
      (e.keyCode < 96 || e.keyCode > 105)
    ) {
      e.preventDefault();
    }
  },

  //   // Headers
  //   Authorization: `Bearer ${process.env.REACT_APP_AUTHORIZATION}`,
  //   x_auth_token: process.env.REACT_APP_X_AUTH_TOKEN,
  //   // default images placeholders
  //   globalPlaceholderImage: "/img/place-holder.jpg",
  //   collectionFeaturedImg: "/img/place-holder.jpg", //Correct
  //   userDefaultImg: "/img/place-holder.jpg", //Correct
  //   categoryDefaultImg: "/img/placeholder.png",

  //set user in local storage
  encryptUserData: function (data) {
    let userData = localStorage.getItem("encuse");
    if (userData && !data.accessToken) {
      let bytes = CryptoJS.AES.decrypt(userData, dataEncryptionKey);
      let originalData = bytes.toString(CryptoJS.enc.Utf8);
      originalData = JSON.parse(originalData);
      if (originalData && originalData.accessToken) {
        data.accessToken = originalData.accessToken;
      }
    }
    data = JSON.stringify(data);
    let encryptedUser = CryptoJS.AES.encrypt(
      data,
      dataEncryptionKey
    ).toString();
    localStorage.setItem("encuse", encryptedUser);
    return true;
  },

  //return required keys
  getUserKeys: function (keys = null) {
    let userData = localStorage.getItem("encuse");
    if (userData) {
      var bytes = CryptoJS.AES.decrypt(userData, dataEncryptionKey);
      var originalData = bytes.toString(CryptoJS.enc.Utf8);
      originalData = JSON.parse(originalData);
      let user = {};
      if (keys) {
        keys = keys.split(" ");
        for (let key in keys) {
          let keyV = keys[key];
          user[keyV] = originalData[keyV];
        }
      } else {
        user = originalData;
      }
      return user;
    }
    return {};
  },

  getUserKeysLimited: function (keys = null) {
    let userData = localStorage.getItem("encuse");
    if (userData) {
      var bytes = CryptoJS.AES.decrypt(userData, dataEncryptionKey);
      var originalData = bytes.toString(CryptoJS.enc.Utf8);
      originalData = JSON.parse(originalData);
      let user = {};
      if (keys) {
        keys = keys.split(" ");
        for (let key in keys) {
          let keyV = keys[key];
          if (keyV == "lastName" || keyV == "firstName") {
          } else {
            user[keyV] = originalData[keyV];
          }
        }
      } else {
        user = originalData;
      }

      return user;
    }
    return {};
  },

  //Object to query string
  objectToQueryString: function (body) {
    const qs = Object.keys(body)
      .map((key) => `${key}=${body[key]}`)
      .join("&");
    return qs;
  },
};
