import {
  EMAIL_REGEX,
  LETTERS_ONLY,
  PASSWORD_MEDIUM,
  PASSWORD_STRONG,
  ZIPCODE_REGEX,
} from "./constants";

class Validation {
  validateEmail(email) {
    var errorMessage = "";
    if (!email) {
      errorMessage = "Please enter your email address.";
    } else if (!EMAIL_REGEX.test(email.toLowerCase())) {
      errorMessage = "Please enter a valid email address.";
    }
    return errorMessage;
  }

  validateNames(name, type) {
    var errorMessage = "";
    if (!name) {
      errorMessage = "Please enter your " + type + " name.";
    } else if (!LETTERS_ONLY.test(name)) {
      errorMessage = "Please enter your " + type + " name correctly.";
    }
    return errorMessage;
  }

  validatePassword(password, option) {
    var passwordStrength = this.determainPasswordStrength(password, option);
    switch (passwordStrength) {
      case "strong":
        return "Your password is strong";
      case "medium":
        return "Your password is medium strength.";
      case "weak":
        return "Your password is weak.";
      default:
        return "Please enter your password";
    }
  }

  determainPasswordStrength(password, option) {
    if (!password) {
      return "";
    } else if (option === 1 || PASSWORD_STRONG.test(password)) {
      return "strong";
    } else if (PASSWORD_MEDIUM.test(password)) {
      return "medium";
    }
    return "weak";
  }

  validateAddress(address) {
    var errorMessage = "";
    if (!address) {
      errorMessage = "Please enter your address";
    }
    return errorMessage;
  }

  validateCity(city) {
    var errorMessage = "";
    if (!city) {
      errorMessage = "Please enter your city";
    }
    return errorMessage;
  }

  validateCountry(country) {
    var errorMessage = "";
    if (country === 0) {
      errorMessage = "Please select your country";
    }
    return errorMessage;
  }

  validateZipCode(zipCode) {
    var errorMessage = "";
    if (!zipCode) {
      errorMessage = "Please enter your zip code";
    } else if (!ZIPCODE_REGEX.test(zipCode)) {
      errorMessage = "Please enter valid zip code";
    }
    return errorMessage;
  }

  validateProductInfo(name) {
    var errorMessage = "";
    if (!name) {
      errorMessage = "This field is required";
    }
    return errorMessage;
  }

  validateCategory(category) {
    var errorMessage = "";
    if (category === 0) {
      errorMessage = "Please choose category.";
    }
    return errorMessage;
  }

  validateImage(images) {
    console.log(images)
    var errorMessage = "";
    const minNumberOfImages = 3;
    if (images.length < minNumberOfImages) {
      errorMessage = "Please upload at least 3 photos of your item.";
    }
    return errorMessage;
  }
  validateProductDetails(data) {
    let keys = Object.keys(data);
    let errorMessages = keys.reduce((accumulator, value) => {
      return { ...accumulator, [value]: "" };
    }, {});
    let valid = true;
    for (var i = 0; i < keys.length; i++) {
      if (keys[i] === "productName")
        errorMessages.productName = this.validateProductInfo(data.productName);
      else if (keys[i] === "subcategory") {
        errorMessages.subcategory = this.validateCategory(data.subcategory);
      } else if (keys[i] === "description")
        errorMessages.description = this.validateProductInfo(data.description);
      else if (keys[i] === "pictures")
        errorMessages.pictures = this.validateImage(data.pictures);
    }
    if (
      Object.values(errorMessages).findIndex((object) => {
        return object !== "";
      }) !== -1
    )
      valid = false;
    return { errorMessages: errorMessages, valid: valid };
  }

  formValidation(data, option) {
    let keys = Object.keys(data);
    let errorMessages = keys.reduce((accumulator, value) => {
      return { ...accumulator, [value]: "" };
    }, {});
    let valid = true;
    for (var i = 0; i < keys.length; i++) {
      if (keys[i] === "email")
        errorMessages.email = this.validateEmail(data.email);
      else if (keys[i] === "password") {
        var passwordMessage = this.validatePassword(data.password, option);
        if (!passwordMessage.includes("strong"))
          errorMessages.password = passwordMessage;
      } else if (keys[i] === "lastName")
        errorMessages.lastName = this.validateNames(data.lastName, "last");
      else if (keys[i] === "firstName")
        errorMessages.firstName = this.validateNames(data.firstName, "first");
    }
    if (
      Object.values(errorMessages).findIndex((object) => {
        return object !== "";
      }) !== -1
    )
      valid = false;
    return { errorMessages: errorMessages, valid: valid };
  }

  locationValidation(location) {
    let keys = Object.keys(location);
    let errorMessages = keys.reduce((accumulator, value) => {
      return { ...accumulator, [value]: "" };
    }, {});
    let valid = true;
    for (var i = 0; i < keys.length; i++) {
      switch (keys[i]) {
        case "address":
          errorMessages.address = this.validateAddress(location.address);
          break;
        case "city":
          errorMessages.city = this.validateCity(location.city);
          break;
        case "zipCode":
          errorMessages.zipCode = this.validateZipCode(location.zipCode);
          break;
        case "countryId":
          errorMessages.country = this.validateCountry(location.countryId);
          break;
        default:
          break;
      }
    }
    if (
      Object.values(errorMessages).findIndex((object) => {
        return object !== "";
      }) !== -1
    )
      valid = false;
    return { errorMessages: errorMessages, valid: valid };
  }

  determineError(errorCode) {
    switch (errorCode) {
      case 1:
        return { email: "Email address not found" };
      case 2:
        return {
          email: "This email address is already taken. Please try another one.",
        };
      default:
        return;
    }
  }
}

export default new Validation();
