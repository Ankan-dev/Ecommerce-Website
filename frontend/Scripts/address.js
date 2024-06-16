let firstname, lastname,CheckOutForm;

function checkOut(CheckOutBtn) {
  CheckOutBtn.addEventListener("click", function () {
    main.innerHTML = "";
    const form = document.createElement('form');
    form.id = "address-form";
    // Create Address heading
    const addressHeading = document.createElement('h2');
    addressHeading.textContent = 'Address';
    form.appendChild(addressHeading);

    // Create input fields with placeholders and IDs
    const createInputField = (placeholder, id,Name) => {
      const input = document.createElement('input');
      input.type = 'text';
      input.placeholder = placeholder;
      input.id = id;
      input.name=Name;
      form.appendChild(input);
      form.appendChild(document.createElement('br')); // Add a line break
    };

    createInputField('Building or House Number', 'buildingHouseNumber','house');
    createInputField('Area', 'area','area');
    createInputField('City or Village', 'cityVillage','city');
    createInputField('State', 'state','state');
    createInputField('Pincode', 'pincode','pin');

    // Create submit button
    const submitButton = document.createElement('button');
    //submitButton.type = 'submit';
    submitButton.textContent = 'Submit';
    submitButton.id = 'submitButton';
    form.appendChild(submitButton);

    // Append form to main
    main.appendChild(form);
    razorPay(submitButton)
  })
}

function addToOrders(){
  
 //console.log(CheckOutForm);

  fetch(`${base_url}/buyNow.php`, {
    method: "POST",
    body: CheckOutForm,
    credentials: 'include'
  })
  .then(res => res.json())
  .then(data => {
    if(data.status=="order is placed"){
      main.innerHTML="";
      let ordered=document.createElement("img");
      ordered.src="./Assets/ordered.png";
      ordered.id="ordered-image";
      let message=document.createElement("h1");
      message.textContent="Order Conformed";
      message.id="ordered-message";
      let countMessage=document.createElement("h6");
      countMessage.textContent="You will be redirected to home in 5 Seconds";
  

      main.append(ordered,message,countMessage);

      setTimeout(function(){
        location.reload();
      },5000);
    }
  })
  .catch(error => console.log(error));
}

function razorPay(submitbutton) {
  submitbutton.addEventListener("click", (e) => {
    e.preventDefault();
    let addressForm = document.querySelector("#address-form");
    CheckOutForm = new FormData(addressForm);
    CheckOutForm.append("username",loggedInUser);
    //console.log(checkOut);
    document.querySelector("#rzp-button1").click();
  })
  var options = {
    "key": "rzp_test_TmpUNQ8VaCsY6U", // Enter the Key ID generated from the Dashboard
    "amount": total*100,
    "currency": "INR",
    "name": "Ecommerce",
    "description": "Acme Corp",
    "prefill":
    {
      "FirstName": firstname,
      "LastName": lastname,
      "username": loggedInUser
    },
    "theme": {
        "color": "#212429"
    },
    config: {
      display: {
        blocks: {
          utib: { //name for Axis block
            name: "Pay using Axis Bank",
            instruments: [
              {
                method: "card",
                issuers: ["UTIB"]
              },
              {
                method: "netbanking",
                banks: ["UTIB"]
              },
              {
                method: "upi",
                flows: [ "qr"],
                apps: ["google_pay", "phonepe"]
              }
            ]
          },
          other: { //  name for other block
            name: "Other Payment modes",
            instruments: [
              {
                method: "card",
                issuers: ["ICIC"]
              },
              {
                method: 'netbanking',
              }
            ]
          }
        },
        hide: [

        ],
        sequence: ["block.utib", "block.other"],
        preferences: {
          show_default_blocks: false // Should Checkout show its default blocks?
        }
      }
    },
    "handler": function (response) {
      console.log(response.razorpay_payment_id);
      addToOrders();
    },
    "modal": {
      "ondismiss": function () {
        if (confirm("Are you sure, you want to close the form?")) {
          txt = "You pressed OK!";
          console.log("Checkout form closed by the user");
        } else {
          txt = "You pressed Cancel!";
          console.log("Complete the Payment")
        }
      }
    }
  };
  var rzp1 = new Razorpay(options);
  document.getElementById('rzp-button1').onclick = function (e) {
    rzp1.open();
    e.preventDefault();
  }
}