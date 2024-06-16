let featured=document.querySelector("#featured-card-section");

function requestFeatured(){
    fetch(`${base_url}/featured.php`,{
        method:"GET"
    })
    .then((res)=>res.json())
    .then((data)=>{
            console.log(data);
            data.product.forEach((elm)=>{
                let card = document.createElement("div");
                card.className="card";
                featured.append(card);
                let image=document.createElement("div");
                image.className="item-image";
                let name=document.createElement("div");
                name.className="item-name";
                name.textContent=elm.name;
                card.appendChild(image);
                card.appendChild(name);
                let img=document.createElement("img");
                img.className="img-src";
                img.src=elm.image;
                image.appendChild(img);
                card.addEventListener("click",viewDetails.bind(elm));
            })
    }).catch((err)=>{
        console.log(err);
    })
}