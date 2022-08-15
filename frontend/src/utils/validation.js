import {EMAIL_REGEX, LETTERS_ONLY, PASSWORD_MEDIUM, PASSWORD_STRONG} from "./constants";

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
            case 'strong':
                return "Your password is strong";
            case 'medium':
                return "Your password is medium strength.";
            case 'weak':
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

    formValidation(data, option) {
        let keys = Object.keys(data);
        let errorMessages = keys.reduce((accumulator, value) => {
            return {...accumulator, [value]: ''}
        }, {});
        let valid = true;
        for (var i = 0; i < keys.length; i++) {
            if (keys[i] === 'email') errorMessages.email = this.validateEmail(data.email);
            else if (keys[i] === 'password') {
                var passwordMessage = this.validatePassword(data.password, option);
                if (!passwordMessage.includes('strong')) errorMessages.password = passwordMessage;
            } else if (keys[i] === 'lastName') errorMessages.lastName = this.validateNames(data.lastName, "last");
            else if(keys[i] === 'firstName') errorMessages.firstName = this.validateNames(data.firstName,"first");
        }
        if (Object.values(errorMessages).findIndex(object => {
            return object !== "";
        }) !== -1) valid = false;
        return {errorMessages:errorMessages,valid:valid};
    }
}

export default new Validation();
