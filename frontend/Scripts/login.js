let loggedInUser="guest";

//logging in function

function loginFunction(e) {
    e.preventDefault();
    document.querySelector("body").style.overflowY = "auto";
    let Form = document.querySelector(".register-form");
    let Data = new FormData(Form);
    fetch(`${base_url}/login.php`, {
        method: "POST",
        body: Data,
        credentials: 'include'
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (data) {
                let user = data.user;
                if (user != null) {
                    loggedInUser=data.user;
                    getCartDetails(loggedInUser)
                    userAccount(user);
                }
            }
        })
        .catch(error => console.log(error));
}

//setting the username to the navbar after logging in

function userAccount(username) {
    let registerbtn = document.querySelector("#register-btn");
    registerbtn.style.display = "none";
    registerLoginContainer.style.display = "none";
    let loginDiv = document.querySelector("#login-div");
    loginDiv.style.display = "flex";
    let user = document.querySelector("#header-username");
    user.textContent = username;
}

//keeping the user logged in unless he/she is logging out

function loggedin() {
    fetch(`${base_url}/login.php?query=check_status`, {
        method: "GET",
        mode: "cors",
        credentials: 'include' ,
    })
        .then(res => res.json())
        .then(data => {
            if (data) {
                //console.log(loggedInUser);
                if(data.user!="guest"){
                    loggedInUser=data.user;
                    getCartDetails(loggedInUser)
                    userAccount(data.user);
                }
            }
        })
        .catch(error=>console.log(error))
}

//logout function


logoutbtn.addEventListener("click",logoutFunction);

function logoutFunction(){
    fetch(`${base_url}/login.php`,{
        method: "GET",
        mode: "cors",
        credentials: 'include' ,
    })
    .then(res=>res.json())
    .then(data=>{
        loggedInUser="guest";
        noOfItems.innerHTML="0";
        console.log(data.logout);
        userAccountLogout();
    })
    .catch(error=>console.log(error))
}

function userAccountLogout() {
    let registerbtn = document.querySelector("#register-btn");
    registerbtn.style.display = "block";
    let loginDiv = document.querySelector("#login-div");
    loginDiv.style.display = "none";
}

//console.log()