class Validation {
  validateEmail(email) {
    var errorMessage = "";
    if (!email) {
      errorMessage = "Email is requered!";
    } else {
      const expression = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!expression.test(email.toLowerCase())) {
        errorMessage = "Email format is not valid, please try again!";
      }
    }
    return errorMessage;
  }

  validateNames(name, type) {
    var errorMessage = "";
    if (!name) {
      errorMessage = type + " name is requered!";
    } else if (!/^[a-zA-Z]+$/.test(name)) {
      errorMessage = type + " name must contain only letters!";
    }
    return errorMessage;
  }

  validatePassword(password) {
    var errorMessage = "";
    if (!password) {
      errorMessage = "Password is requered!";
    } else if (
      !/((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))/.test(
        password
      )
    ) {
      errorMessage = "Your password is week!";
    }
    return errorMessage;
  }

  validateAddress(address) {
    var errorMessage = "";
    if (!address) {
      errorMessage = "Please enter your address";
    }
    return errorMessage;
  }

  validateCity(city){
    var errorMessage = "";
    if (!city) {
      errorMessage = "Please enter your city";
    }
    return errorMessage;
  }

  validateState(state){
    var errorMessage = "";
    if (!state) {
      errorMessage = "Please enter your state";
    }
    return errorMessage;
  }

  validateCountry(country){
    var errorMessage = "";
    if (!country) {
      errorMessage = "Please select your country";
    }
    return errorMessage;
  }
}

export default new Validation();
