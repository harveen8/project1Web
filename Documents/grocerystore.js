
let produce = document.getElementById("produce");
produce.addEventListener("click", producer);
let bakery = document.getElementById("bakery");
bakery.addEventListener("click", baker);
let meat = document.getElementById("meat");
meat.addEventListener("click", meater);
let dairy = document.getElementById("dairy");
dairy.addEventListener("click", dairyer);
let convenience = document.getElementById("convenience");
convenience.addEventListener("click", conveniencer);

let names = document.getElementById("names");
names.addEventListener("mousedown", changingFunction);
names.addEventListener("change", changingFunction);
let edits= document.getElementById("edits");
edits.addEventListener("mousedown", cartVisibility);
let isle = document.getElementById("isle");
let price = document.getElementById("price");
let quantity =document.getElementById("quantity");

let adder= document.getElementById("adder");
adder.addEventListener("click", addItemToCart);

let sendEdit=document.getElementById("sendEdit");
sendEdit.addEventListener("click", removeItemFromCart);


let cartName=document.getElementById("cartName");
let cartIsle=document.getElementById("cartIsle");
let cartPrice=document.getElementById("cartPrice");
let cartQuantity=document.getElementById("cartQuantity");

let bodyVisisble = document.getElementById("bodyContainer");
let cartEditHidden =document.getElementById("cartEditHidden");
cartEditHidden.style.display="none";

let editName=document.getElementById("editName");
editName.addEventListener("mousedown", changingFunction2);
editName.addEventListener("change", changingFunction2);
let editQuantity=document.getElementById("editQuantity");


function producer(){
    apiGetIsleItems("produce");
   
}
function baker(){
    apiGetIsleItems("bakery");
}
function meater(){
    apiGetIsleItems("meat");
}
function dairyer(){
    apiGetIsleItems("dairy");
}
function conveniencer(){
    apiGetIsleItems("convenience");
}

function addVisibility(x){
        bodyVisisble.style.display = "block"; 
}
function cartVisibility(){
    if (cartEditHidden.style.display === "none") {
        cartEditHidden.style.display = "block";
      } else {
        cartEditHidden.style.display = "none";
      }
      apiGetCart2();

}
async function apiGetIsleItems(isle){
    let response = await fetch("http://localhost:9000/grocerystore/"+isle);
    response = await response.json();
    getIsleItems(response);
}

async function apiGetItem(theItem){
    let response = await fetch("http://localhost:9000/grocerystore/items/"+theItem);
    response = await response.json();
    return response;
 }
 async function apiGetCartItem(theItem){
    let response = await fetch("http://localhost:9000/grocerystore/cart/items/"+theItem);
    response = await response.json();
    return response;
 }

async function getIsleItems(response){ 
    addVisibility(this);
    isle.innerHTML="";
    names.innerHTML="";
    quantity.setAttribute("value","0");
    let isleName=document.createElement("option");
    isleName.text=response[0].isle;
    price.setAttribute("value", response[0].price.toFixed(2).toString());
    isle.appendChild(isleName);

    for(let i = 0; i < response.length; i++){
        let itemNames= document.createElement("option");
        itemNames.innerHTML=response[i].item_name;
        names.appendChild(itemNames); 
    }
    apiGetCart();
}

async function changingFunction(x){
   var y=  x.target.value;
    let p= await apiGetItem(y);
    price.innerHTML="";
    var option1 = document.createElement("option");
    option1.innerHTML = p.price.toFixed(2);
    price.appendChild(option1);
    quantity.setAttribute("max", (p.quantity));
}

async function changingFunction2(x){
    var y=  x.target.value;
    let p= await apiGetCartItem(y);
    editQuantity.innerHTML="0";
    console.log("max=" + p.quantity);
    editQuantity.setAttribute("max", p.quantity);
}

async function addItemToCart(){
    let inputItem = {
        item_name:names.value,
        isle:  isle.value,
        price:  price.value,
        quantity:quantity.value
    }
    let response = await fetch("http://localhost:9000/grocerystore/cart/add", {
        method:'POST',
        mode:'cors',
        headers: {
            'Content-Type': 'application/json'
          },
        body:JSON.stringify(inputItem)
    });
    apiGetIsleItems(isle.value);
}
async function removeItemFromCart(){
    let inputtedValue= await apiGetCartItem(editName.value); 
    let inputItem = {
        item_name: editName.value,
        isle: inputtedValue.isle,
        price: inputtedValue.price,
        quantity: editQuantity.value
    }
    let response = await fetch("http://localhost:9000/grocerystore/cart/remove", {
        method:'POST',
        mode:'cors',
        headers: {
            'Content-Type': 'application/json'
          },
        body:JSON.stringify(inputItem)
    });
    apiGetCart();
    cartVisibility();
}
async function apiGetCart(){
    console.log("button clicked");
    let response = await fetch("http://localhost:9000/grocerystore/cart");
    response = await response.json();
    loadCart(response);
}
async function apiGetCart2(){
    console.log("button clicked");
    let r = await fetch("http://localhost:9000/grocerystore/cart");
    r = await r.json();
    forEditCart(r);
}
async function forEditCart(r){
    editName.innerHTML="";
    editQuantity.innerHTML="0";
    for(let i = 0; i < r.length; i++){
        let nameIn=document.createElement("option");
        nameIn.setAttribute("class", "label");
        nameIn.innerHTML=r[i].item_name;
        editName.appendChild(nameIn);
    }
}
async function loadCart(response){
    cartName.innerHTML = "";
    cartPrice.innerHTML = "";
    cartIsle.innerHTML = "";
    cartQuantity.innerHTML = "";
    for(let i = 0; i < response.length; i++){

        let addedItemName= document.createElement("div");
        addedItemName.setAttribute("class", "rows");
        addedItemName.innerHTML=response[i].item_name;
        cartName.appendChild(addedItemName);

        let addedItemIsle= document.createElement("div");
        addedItemIsle.setAttribute("class", "rows");
        addedItemIsle.innerHTML=response[i].isle;
        cartIsle.appendChild(addedItemIsle);

        let addedItemPrice= document.createElement("div");
        addedItemPrice.setAttribute("class", "rows");
        addedItemPrice.innerHTML=response[i].price.toFixed(2);
        cartPrice.appendChild(addedItemPrice);

        let addedItemQuantity= document.createElement("div");
        addedItemQuantity.setAttribute("class", "rows");
        addedItemQuantity.innerHTML=response[i].quantity;
        cartQuantity.appendChild(addedItemQuantity);

    }
}

