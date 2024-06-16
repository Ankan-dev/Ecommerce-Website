let body=document.querySelector("body");
let image=document.createElement("img");
let cartDetails;
image.id="clicked-image";
function viewDetails(){
    let cart=document.querySelector("#product-details");
    cart.style.display="flex";
   body.style.overflow="hidden";
   let details=this;
   cartDetails=this;
   console.log(details);
    document.querySelector("#name-of-product").textContent=details.name;
    document.querySelector("#Desciption-of-product").textContent=details.description;
    document.querySelector("#prices-of-product").textContent="₹"+details.price;
    let imgContainer=document.querySelector("#image-part");
    image.src=details.image;    
    imgContainer.append(image);
    fetch(`${base_url}/inventory.php?id=${details.id}`)
    .then(res=>res.json())
    .then(data=>{
        console.log(data);
        if(data){
            let left =parseInt(data.stock);
            console.log(left);
            let stockData=document.querySelector("#product-left");
            if(left>10){
                stockData.textContent="In stock";
                stockData.style.color="Green";
                stockData.style.marginLeft="40px"
                stockData.style.marginTop="10px"

            }else if(left==0){
                stockData.textContent="Out of stock";
                stockData.style.color="red";
                stockData.style.marginLeft="40px"
                stockData.style.marginTop="10px"
            }else{
                stockData.textContent=`Only ${left} are left`;
                stockData.style.color="orange";
                stockData.style.marginLeft="40px"
                stockData.style.marginTop="10px"
            }
        }
    })
    .catch(error=>console.log(error))
}

document.querySelector("#go-back").addEventListener("click",()=>{
    let cart=document.querySelector("#product-details");
    cart.style.display="none";
    body.style.overflowY="auto";
})