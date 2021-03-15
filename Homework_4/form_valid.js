const form = document.forms.vForm,
    $name = form.elements.name,
    $mail = form.elements.email,
    $phone = form.elements.telephone,
    $status = document.querySelector('#form-status'),
    $errors = document.querySelectorAll('.error-text'),
    $input = document.querySelectorAll('.form-input'),
    nameRegExp = /^[A-Za-zА-Яа-я ]+$/;
    mailRegExp = /^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[ru]+$/;
    phoneRegExp = /^\+\d{1}\(\d{3}\)\d{3}-\d{4}$/;

const formValidator = function(e) {
    e.preventDefault();
    clearForm();
    let result1 = (validatorName($name, nameRegExp)) ? true : false;
    let result2 = (validatorMail($mail, mailRegExp)) ? true : false;
    let result3 = (validatorPhone($phone, phoneRegExp)) ? true : false;
    if (result1 && result2 && result3) {
        $status.style.color = "green";
        $status.innerText = "Введено верно";
        return true;
    } else {
        $status.style.color = "red";
        $status.innerText = "Ошибка";
        return false;
    }
};

const clearForm = () => {
    for (item of $input) {
        item.style.borderColor = "black";
    }
    for (item of $errors) {
        item.textContent = "";
    }
};

const validatorName = (input, regExp) => { 
    if (input.value == "") {
        input.style.borderColor = "red";
        $errors[0].textContent = "Поле не заполнено";
        return false;
    } else if (input.value.match(regExp)) { 
        input.style.borderColor = "balck";
        $errors[0].textContent = "";
        return true;
        } else {
        input.style.borderColor = "red";
        $errors[0].textContent = "Имя содержит только буквы и пробелы";
        return false;
    }
};

const validatorMail = (input, regExp) => { 
    if (input.value == "") {
        input.style.borderColor = "red";
        $errors[1].textContent = "Поле не заполнено";
        return false;
    } else if (input.value.match(regExp)) { 
        input.style.borderColor = "balck";
        $errors[1].textContent = "";
        return true;
        } else {
        input.style.borderColor = "red";
        $errors[1].textContent = "E-mail имеет вид mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru";
        return false;
    }
};

const validatorPhone = (input, regExp) => { 
    if (input.value == "" || input.value == "+7(000)000-0000") {
        input.style.borderColor = "red";
        $errors[2].textContent = "Поле не заполнено";
        return false;
    } else if (input.value.match(regExp)) { 
        input.style.borderColor = "black";
        $errors[2].textContent = "";
        return true;
        } else {
        input.style.borderColor = "red";
        $errors[2].textContent = "Телефон имеет вид +7(000)000-0000";
        return false;
    }
};