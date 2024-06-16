let headerUsername = document.querySelector("#header-username");

headerUsername.addEventListener("click", () => {
    main.innerHTML = "";
    main.style.display = "flex";
    main.style.alignItems = "center";
    main.style.justifyContent = "center";
    main.style.flexDirection = "column";
    main.style.paddingTop = "20px";
    let welcome = document.createElement("h1");
    welcome.id = "welcome";
    welcome.textContent = `Hello ${loggedInUser}, here are your orders`;
    welcome.style.marginBottom = "50px"
    main.appendChild(welcome);

    fetch(`${base_url}/orderDetails.php?username=${loggedInUser}`)
        .then(res => res.json())
        .then(data => {
            if (data) {
                //console.log(data);
                if (data.orders.length > 0) {
                    data.orders.forEach(element => {
                        let orderContainer = document.createElement("div");
                        orderContainer.className = "order_container";
                        let ProductName = document.createElement("h6");
                        ProductName.textContent = element.product_name;
                        let productImage = document.createElement("img");
                        productImage.src = element.image;
                        productImage.id = "ordered-image";
                        let productPrice = document.createElement("h6");
                        productPrice.textContent = "₹" + element.price;
                        let Address = document.createElement("h6");
                        Address.textContent = "Address";
                        Address.id = "ordered-address"
                        let createdOn = document.createElement("h6");
                        createdOn.textContent = element.ardered_on;
                        orderContainer.append(productImage, ProductName, productPrice, Address, createdOn);


                        let addressContainer = document.createElement("div");
                        addressContainer.id = "address-container";
                        let addressHead = document.createElement("h2");
                        addressHead.textContent = "Your Address";
                        let addressContent = document.createElement("h6");
                        addressContent.textContent = element.address
                        let back = document.createElement("p");
                        back.textContent = "<< close Address";
                        back.id = "hide-address";
                        back.addEventListener("click", () => {
                            addressContainer.style.display = "none";
                        })
                        addressContainer.append(addressHead, addressContent, back)

                        main.append(orderContainer, addressContainer);
                        Address.addEventListener("click", () => {
                            addressContainer.style.display = "flex";
                        })
                    });
                } else {
                    let orderContainer = document.createElement("div");
                    orderContainer.id = "no_orders";
                    let noOrder=document.createElement("h4");
                    noOrder.textContent="No Orders are Present";
                    orderContainer.appendChild(noOrder);
                    main.appendChild(orderContainer);
                }

                let goToHome=document.createElement("h6");
                goToHome.id="go-to-home";
                goToHome.textContent="<< Back To Home";
                main.appendChild(goToHome);
                goToHome.addEventListener("click",()=>{
                    location.reload();
                })
            }
        })
        .catch(err => console.log(err));
})