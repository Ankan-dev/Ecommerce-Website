let recnt=document.querySelector("#new-card-section");

function requestNewProduct(){

    fetch(`${base_url}/recent.php`,{
        method:"GET"
    }).then(res=>res.json())
    .then(data=>{
        console.log(data);
        if(data){
            data.Recent.forEach((elm)=>{
                let card = document.createElement("div");
                card.className="recent-card";
                recnt.append(card);
                let imgContainer=document.createElement("div");
                imgContainer.id="img-container";
                card.appendChild(imgContainer);
                let nameContainer=document.createElement("div");
                nameContainer.id="name-container";
                nameContainer.textContent=elm.name;
                card.appendChild(nameContainer);
                let imgSrc=document.createElement("img");
                imgSrc.id="img-src";
                imgSrc.src=elm.image;
                imgContainer.append(imgSrc);
                card.addEventListener("click",viewDetails.bind(elm));
            })
        }
    }).catch((error)=>{
        console.log(error);
    })
}