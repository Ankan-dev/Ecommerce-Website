function requestCatagory(){
    fetch(`${base_url}/menu.php`,{
        method:"GET"
    })
    .then((res)=>res.json())
    .then((data)=>{
        if(data.categories){
            data.categories.forEach(element => {
                const nav=document.querySelector(".navbar-nav");
                const li = document.createElement('li');
                li.className="nav-item";
                li.textContent=element;
               li.addEventListener("click",getCategoryProducts.bind(element));
                nav.append(li);
            });
        }
        
        console.log(data);
    }).catch((err)=>{
        console.log(err);
    })
}