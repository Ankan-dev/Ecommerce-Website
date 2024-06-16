
function registerFunction(e){
   e.preventDefault();
    let Form = document.querySelector(".register-form");
    let Data= new FormData(Form);
    console.log(Data);
    fetch(`${base_url}/register.php`,{
        method:"POST",
        body: Data,
        credentials: 'include'
    })
    .then(res=>res.json())
    .then(data=>{
        if(data){
            if(data.status==false){
                let error=document.querySelector("#error-message");
                error.style.display="block";
                let username=document.querySelector("#username_id");
                username.style.color="red";
                username.style.borderColor="red";
                let password =document.querySelector("#password_id");
                password.style.marginTop="0px"
            }else{
                registerLoginContainer.style.display = "none";
                alert("you have been registered");                
            }
        }
    })
    .catch(error=>console.log(error));
}

