let addToCartBtn = document.querySelector("#add-to-cart");
let noOfItems = document.querySelector("#no-of-items");
let cartItemsArray;
addToCartBtn.addEventListener("click", addToCart);

function addToCart() {
    if (loggedInUser != "guest") {
        cartDetails["username"] = loggedInUser;
        console.log(cartDetails);
        sendTocart(JSON.stringify(cartDetails));
        document.querySelector("#product-details").style.display = "none";
        body.style.overflowY = "auto";
        getCartDetails(loggedInUser)
    } else {
        alert("Login to add to cart");
    }
    // console.log(loggedInUser);
}

function getCartDetails(user) {
    console.log(user);
    fetch(`${base_url}/cart.php?user=${user}`, {
        method: "GET",
        mode: "cors",
        credentials: 'include',
    })
        .then(res => res.json())
        .then(data => {
            if (data) {
                //onsole.log(data.cart.length)
                noOfItems.innerHTML = data.cart.length;
                cartItemsArray = data.cart;
            }
        })
        .catch(error => console.log(error));

}

function sendTocart(product) {
    fetch(`${base_url}/cart.php`, {
        method: "POST",
        body: product,
        credentials: 'include'
    })
        .then(res => res.json())
        .then(data => {
            if(data.status==false){
                alert("Item is out of stock");
            }
        })
        .catch(error => console.log(error))
}


let cartPage = document.querySelector(".cart");

cartPage.addEventListener("click", openCartPage);

function openCartPage() {
    if (loggedInUser != "guest") {
        main.innerHTML = "";
        main.style.display = "flex";
        main.style.flexDirection="column"
        main.style.alignItems="center";
        main.style.gap="50px"
        main.style.paddingTop = "3%";
        main.style.paddingBottom="3%";
        main.style.height="fit-content";
        document.querySelector(".form-control").style.display = "none";
        document.querySelector("#search-btn").style.display = "none";
        document.querySelector(".navbar-nav").style.display = "none";
        document.querySelector("#search-btn").style.display = "none";
        document.querySelector("#logout-btn").style.display = "none";
        cartPage.innerHTML = "";
        let back = document.createElement("img");
        back.src = "./Assets/arrow.png";
        back.id = "back-home";
        cartPage.appendChild(back);
        cartPage.style.paddingLeft = "25px"
        cartPage.style.paddingTop = "5px"
        let yourCart = document.querySelector("#your-cart");
        yourCart.style.display = "flex";
        displayItems(cartItemsArray);
        cartPage.addEventListener("click", function () {
            location.reload();
        })

    } else {
        alert("Login for going to cart page");
    }

}

let total=0;

function EmptyCart(){
    let container = document.createElement("div");
    container.className = "cart-container";
    container.style.display="flex";
    container.style.alignItems="center";
    container.style.justifyContent="center";
    let noItems=document.createElement("h2");
    noItems.textContent="No Items Present";
    noItems.style.color="white";
    container.appendChild(noItems);
    main.appendChild(container);
    main.style.justifyContent="center";
}

function displayItems(items) {
    console.log(items);
    if(items.length==0){
        EmptyCart() 
    }
    else{
        
        items.forEach(element => {
            let container = document.createElement("div");
            container.className = "cart-container";
            let image = document.createElement("img");
            image.className = "container-image";
            image.src = element.image;
            let Itemname = document.createElement("h5");
            Itemname.className = "cart-item-name";
            Itemname.textContent = element.name;
            let quantity = document.createElement("div");
            quantity.className = "quantity";
            let decrease = document.createElement("button");
            decrease.className = "decrease-button";
            decrease.id=`decrease${element.product_id}`
            decrease.textContent = "-"
            let displayBox = document.createElement("div");
            displayBox.className = "quantity-display";
            let quantityNumber=document.createElement("h6");
            quantityNumber.className="quantity-number";
            quantityNumber.id = `quantity-number-${element.product_id}`;
            quantityNumber.textContent=element.quantity;
            displayBox.appendChild(quantityNumber);
            let increase = document.createElement("button");
            increase.className = "increase-button";
            increase.id=`increase${element.product_id}`;
            increase.textContent = "+"
            quantity.append(decrease, displayBox, increase);
            let Totalprice = document.createElement("h5");
            Totalprice.textContent = "₹"+element.price;
            Totalprice.id=`total-price-elm-${element.product_id}`
            total+=parseFloat(element.price);
            let deleteBtn = document.createElement("button");
            deleteBtn.className = "dlt-btn";
            deleteBtn.textContent = "Delete";
            container.append(image, Itemname, quantity, Totalprice, deleteBtn);
            main.appendChild(container);
            deleteBtn.addEventListener("click",()=>deleteItem(element.username,element.  product_id,container,parseFloat(element.price)));
            //decrease.addEventListener("click",()=>decreaseQuantity(element.product_id,element.price));
            //increase.addEventListener("click",()=>increaseQuantity(element.product_id));
            increaseItem(element.product_id,element.price,document.querySelector(`#increase${element.product_id}`))
            decreaseItem(element.product_id,element.price,document.querySelector(`#decrease${element.product_id}`))
        });

        function increaseItem(product,price,id){
            id.addEventListener("click",()=>increaseQuantity(product,price)); 
            console.log(id);
        }

        function decreaseItem(product,price,id){
            id.addEventListener("click",()=>decreaseQuantity(product,price)); 
            console.log(id);
        }
        let totalPriceDisplay=document.createElement("div");
        totalPriceDisplay.id="total-price";
        let totalPrice=document.createElement("h2");
        totalPrice.id="final-price";
        totalPrice.textContent="Total Price : ₹"+total;
        totalPriceDisplay.appendChild(totalPrice);
        let checkoutContainer=document.createElement("div");
        checkoutContainer.id="checkout-container";
        let checkoutBtn=document.createElement("button");
        checkoutBtn.id="checkout-btn";
        checkoutBtn.textContent="check Out";
        checkoutContainer.appendChild(checkoutBtn);
        main.append(totalPriceDisplay,checkoutContainer);
        checkOut(checkoutBtn);
    }
    
}



function deleteItem(username,product,container,price){
    console.log("delete btn clicked");
    fetch(`${base_url}/cart.php?user=${username}&product_id=${product}`,{
        method: "DELETE",
        mode: "cors",
        credentials: 'include', 
    })
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        if(data){
            cartItemsArray = cartItemsArray.filter(item => item.product_id !== product);
        // Remove the item from the DOM
        container.remove();
        // Update the number of items in the cart
        noOfItems.innerHTML = cartItemsArray.length;
        total-=price
        document.querySelector("#final-price").textContent="Total Price : ₹"+total;
        if(cartItemsArray.length==0){
            EmptyCart();
            document.querySelector("#total-price").style.display="none";
            document.querySelector("#checkout-container").style.display="none";
        }
        }
    })
    .catch(error=>console.log(error));

}

function decreaseQuantity(product,price){
    fetch(`${base_url}/cart.php?product_id=${product}&opr=dec&username=${loggedInUser}`,{
        method: "PUT",
        mode: "cors",
        credentials: 'include', 
    })
    .then(res=>res.json())
    .then(data=>{
        if(data.update===true){
            document.querySelector(`#quantity-number-${product}`).textContent=data.quantity;
            document.querySelector(`#total-price-elm-${product}`).textContent=data.price;
            total-=parseFloat(price);
            document.querySelector("#final-price").textContent=`Total Price : ₹${total}`;
        }else{
            alert("Quantity is minumum. It can't be reduced further");
        }
    })
    .catch(err=>console.log(err));
}

function increaseQuantity(product,price){
    fetch(`${base_url}/cart.php?product_id=${product}&opr=inc&username=${loggedInUser}`,{
        method: "PUT",
        mode: "cors",
        credentials: 'include', 
    })
    .then(res=>res.json())
    .then(data=>{
        console.log(data);
        if(data.update===true){
            document.querySelector(`#quantity-number-${product}`).textContent=data.quantity;
            document.querySelector(`#total-price-elm-${product}`).textContent=data.price;
            total+=parseFloat(price);
            document.querySelector("#final-price").textContent=`Total Price : ₹${total}`;
        }else if(data.update==="exceeded"){
            alert("Not enough in stock");
        }else{
            alert("stock is empty");
        }
    })
    .catch(err=>console.log(err));
}