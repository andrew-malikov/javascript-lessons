const PASSWORD_PATTERN = /^[\d\w\-\_\.!@#$%^&*;'"]{1,32}$/;
const EMAIL_PATTERN = /^[\w\d_\-\.]+@[\w\d\.]+$/;

function Form() {
    let form = document.createElement('form');

    let name = new Username("Name");
    let password = new ComplexPassword();
    let email = new Email("Email");
    let messageTheme = new MessageTheme("Theme");
    let message = new Message("Message");
    let submit = new Submit("Submit", () => {
        let invalideElement = getInvalideElement();
        if(invalideElement !== undefined) {
            invalideElement.focus();
            return false;
        }
        else form.submit();
    });
    let reset = new Reset("Reset");

    form.appendChild(name.component());
    form.appendChild(password.component());
    form.appendChild(email.component());
    form.appendChild(messageTheme.component());
    form.appendChild(message.component());
    form.appendChild(submit.component());
    form.appendChild(reset.component());

    let getInvalideElement = function () {
        if (!name.validate())
            return name.input();
        if (!password.validate())
            return password.input();
        if (!email.validate())
            return email.input();
        if (!messageTheme.validate())
            return messageTheme.input();
        if (!message.validate())
            return message.input();
    }

    this.component = function () {
        return form;
    }
};

function Label(name) {
    let label = document.createElement('p');

    label.innerHTML = name;

    return label;
};

function Username(labelContent) {
    let component = document.createElement('div');

    let label = new Label(labelContent);
    let username = document.createElement('input');

    component.appendChild(label);
    component.appendChild(username);

    this.validate = function () {
        return username.value.length > 0;
    };

    this.component = function () {
        return component;
    };

    this.input = function() {
        return username;
    }
};

function Password(labelContent) {
    let component = document.createElement('div');

    let label = new Label(labelContent);
    let password = document.createElement('input');

    password.type = 'password';

    component.appendChild(label);
    component.appendChild(password);

    this.validate = function () {
        if (password.value.search(PASSWORD_PATTERN) === -1)
            return false;
        return true;
    };

    this.value = function () {
        return password.value;
    };

    this.component = function () {
        return component;
    };

    this.input = function() {
        return password;
    }
};

function ComplexPassword() {
    let component = document.createElement('div');

    let password = new Password("Password");
    let confirmPassword = new Password("Confirm password");

    component.appendChild(password.component());
    component.appendChild(confirmPassword.component());

    this.validate = function () {
        return password.validate() && password.value() === confirmPassword.value();
    };

    this.component = function () {
        return component;
    };

    this.input = function() {
        return password.input();
    }
};

function Email(componentName) {
    let component = document.createElement('div');

    let label = new Label(componentName);
    let email = document.createElement('input');

    email.type = 'email';

    component.appendChild(label);
    component.appendChild(email);

    this.validate = function () {
        if (email.value.search(EMAIL_PATTERN) === -1)
            return false;
        return true;
    };

    this.component = function (params) {
        return component;
    };

    this.input = function() {
        return email;
    }
};

function MessageTheme(componentName) {
    let component = document.createElement('div');

    let label = new Label(componentName);
    let theme = document.createElement('input');

    component.appendChild(label);
    component.appendChild(theme);

    this.validate = function () {
        return theme.value.length > 0;
    }

    this.component = function () {
        return component;
    }

    this.input = function() {
        return theme;
    }
};

function Message(componentName) {
    let component = document.createElement('div');

    let label = new Label(componentName);
    let message = document.createElement('textarea');

    component.appendChild(label);
    component.appendChild(message);

    this.validate = function () {
        return message.value.length >= 100;
    };

    this.component = function () {
        return component;
    };

    this.input = function() {
        return message;
    }
};

function Submit(label, validateFunction) {
    let submit = document.createElement('button');

    submit.type = 'submit';
    submit.innerHTML = label;
    submit.onclick = function() {
        return validateFunction();
    };

    this.component = function () {
        return submit;
    };
}

function Reset(label) {
    let reset = document.createElement('button');

    reset.type = 'reset';
    reset.innerHTML = label;

    this.component = function () {
        return reset;
    };
};

let form = new Form();
document.body.appendChild(form.component());