//declarations


let register = document.querySelector("#register-btn");
let registerLoginContainer = document.querySelector("#register-login-container");
let logoutbtn=document.querySelector("#logout-btn");

//click event listener on register button

register.addEventListener("click", function () {
    registerLoginContainer.style.display = "flex";
    document.querySelector("body").style.overflow = "hidden";
    openRegister();
})


//swaping function to register card

function openRegister() {

    let registerLoginCard = document.querySelector("#register-login-card");
    registerLoginCard.innerHTML = "";
    registerLoginCard.style.height = "60%"
    let registerForm = document.createElement("form");
    registerForm.className = "register-form";
    registerLoginCard.append(registerForm);
    let registerHead = document.createElement("h2");
    registerHead.textContent = "Register";
    let first_name = document.createElement("input");
    first_name.type = "text";
    first_name.placeholder = "First name";
    first_name.className = "register-input";
    first_name.name="firstName";
    let last_name = document.createElement("input");
    last_name.type = "text";
    last_name.placeholder = "Last Name";
    last_name.className = "register-input";
    last_name.name="lastName";
    let user_name = document.createElement("input");
    user_name.type = "text";
    user_name.placeholder = "username";
    user_name.className = "register-input";
    user_name.id="username_id"
    user_name.name="userName";
    let error_message=document.createElement("p");
    error_message.textContent="username already taken";
    error_message.id="error-message";
    let password = document.createElement("input");
    password.type = "password";
    password.className = "register-input";
    password.placeholder = "Password";
    password.name="password";
    password.id="password_id";
    let submit_btn = document.createElement("button");
    submit_btn.id = "register-form-btn";
    submit_btn.textContent = "Register";
    submit_btn.style.height = "10%"
    let message = document.createElement("p");
    message.id = "not-login-registered";
    message.textContent = "Already have an account? ";
    let loginForward = document.createElement("span");
    loginForward.textContent = "Login";
    message.appendChild(loginForward);
    registerForm.append(registerHead, first_name, last_name, user_name,error_message, password, submit_btn, message);
    loginForward.addEventListener("click", openLogin);
    submit_btn.addEventListener("click",registerFunction);
}

//swaping function to login card

function openLogin() {

    let registerLoginCard = document.querySelector("#register-login-card");
    registerLoginCard.innerHTML = "";
    registerLoginCard.style.height = "45%"
    let registerForm = document.createElement("form");
    registerForm.className = "register-form";
    registerLoginCard.append(registerForm);
    let registerHead = document.createElement("h2");
    registerHead.textContent = "Login";
    let user_name = document.createElement("input");
    user_name.type = "text";
    user_name.placeholder = "username";
    user_name.className = "register-input";
    user_name.name = "username";
    let password = document.createElement("input");
    password.type = "password";
    password.name = "password";
    password.className = "register-input";
    password.placeholder = "Password";
    let submit_btn = document.createElement("button");
    submit_btn.id = "register-form-btn";
    submit_btn.textContent = "Login";
    submit_btn.style.height = "15%";
    submit_btn.type = "submit";
    let message = document.createElement("p");
    message.id = "not-login-registered";
    message.textContent = "Don't have an account? ";
    let registerForward = document.createElement("span");
    registerForward.textContent = "Register";
    message.appendChild(registerForward);
    registerForm.append(registerHead, user_name, password, submit_btn, message);
    registerForward.addEventListener("click", openRegister);
    submit_btn.addEventListener("click", loginFunction);
}
