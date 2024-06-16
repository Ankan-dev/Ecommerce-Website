let carousel=document.querySelector(".carousel");
let allItems=document.querySelector("#items");
let main=document.querySelector("#main");
function getCategoryProducts(){
    //console.log("clicked: ",this);
    let cat =this;
    clickItem(cat);
    fetch(`${base_url}/filtered.php?category=${cat}`)
    .then(res=>res.json())
    .then(data=>{
        console.log(data);
        if(data){
            main.innerHTML='';
            let filterd=document.createElement("div");
            filterd.className="Desired-Items";
            main.append(filterd);
            let head=document.createElement("h5");
            head.textContent=cat;
            filterd.appendChild(head);
            let filterdData=document.createElement("div");
            filterdData.className="filtered-Data";
            filterd.appendChild(filterdData);
            data.product.forEach((elm)=>{
                let card =document.createElement("div");
                card.className="filter-data-contain";
                filterdData.appendChild(card);
                let imgContainer=document.createElement("div");
                imgContainer.className="filter-image-container";
                let imgsrc=document.createElement("img");
                imgsrc.src=elm.image;
                imgsrc.className="filter-image-src";
                imgContainer.appendChild(imgsrc);
                card.appendChild(imgContainer);
                let nameContainer=document.createElement("div");
                nameContainer.className="filter-name-container";
                nameContainer.textContent=elm.name;
                card.appendChild(nameContainer);

                card.addEventListener("click",viewDetails.bind(elm));
            })
        }
    }).catch(error=>console.log(error))
}

function clickItem(cat){
    let catagory=document.querySelectorAll(".navbar-nav li");
    catagory.forEach(elm=>{
        if(elm.textContent==cat){
            elm.style.backgroundColor="#fec107";
            elm.style.color="black";
            elm.style.paddingRight="10px"
            elm.style.paddingLeft="10px"
            elm.style.borderRadius="20px"
        }
        else{
            elm.style.backgroundColor="transparent";
            elm.style.color="white";
            elm.style.paddingRight="none"
            elm.style.paddingLeft="none"
            elm.style.borderRadius="none"
        }
    })
}