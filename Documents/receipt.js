window.onload = apiGetCart;
let dateElement= document.getElementById("dateElement");
let date = new Date();
dateElement.innerHTML=(date.getMonth()+1)+"/"+date.getDate()+"/"+date.getFullYear();

let timeElement =document.getElementById("timeElement");
timeElement.innerHTML= date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();

let tableAdder = document.getElementById("tableAdder");

async function apiGetCartItem(theItem){
    let response = await fetch("http://localhost:9000/grocerystore/cart/items/"+theItem);
    response = await response.json();
    return response;
 }

 async function apiGetCart(){
    let response = await fetch("http://localhost:9000/grocerystore/cart");
    response = await response.json();
    loadCart(response);
}
async function emptyCart(){
    let response = await fetch("http://localhost:9000/grocerystore/cart/empty");
    response = await response.json();
}
async function loadCart(response){
    let tableAdder= document.getElementById("tableAdder");
    let currentTotal =0;
    for(let i = 0; i < response.length; i++){
      let service = document.createElement("tr");
      service.setAttribute("class","service");

      let itemNameCol = document.createElement("td");
      itemNameCol.setAttribute("class","tableitem");
      let itemName = document.createElement("p");
      itemName.setAttribute("class","itemtext");
      itemName.innerHTML=response[i].item_name;
      itemNameCol.appendChild(itemName);

      let itemPriceCol = document.createElement("td");
      itemPriceCol.setAttribute("class","tableitem");
      let itemPrice = document.createElement("p");
      itemPrice.setAttribute("class","itemtext");
      itemPrice.innerHTML="$" +response[i].price.toFixed(2);
      itemPriceCol.appendChild(itemPrice);


      let itemQuantityCol = document.createElement("td");
      itemQuantityCol.setAttribute("class","tableitem");
      let itemQuantity = document.createElement("p");
      itemQuantity.setAttribute("class","itemtext");
      itemQuantity.innerHTML=response[i].quantity;
      itemQuantityCol.appendChild(itemQuantity);

      let itemTotalCol = document.createElement("td");
      itemTotalCol.setAttribute("class","tableitem");
      let itemTotal = document.createElement("p");
      itemTotal.setAttribute("class","itemtext");
      itemTotal.innerHTML="$" +((response[i].quantity)*(response[i].price)).toFixed(2);
      currentTotal+=(response[i].quantity)*(response[i].price);
      itemTotalCol.appendChild(itemTotal);

      service.appendChild(itemNameCol);
      service.appendChild(itemPriceCol);
      service.appendChild(itemQuantityCol);
      service.appendChild(itemTotalCol);
      tableAdder.appendChild(service);

    }
  let withoutTax = document.getElementById("withoutTax");
  withoutTax.innerHTML= "$ "+ currentTotal;
  let tax= document.getElementById("tax");
  tax.innerHTML="$ "+ (currentTotal*.07).toFixed(2);
  let grandTotal= document.getElementById("grandTotal");
  grandTotal.innerHTML="$ "+((currentTotal*.07)+currentTotal).toFixed(2);
 emptyCart();
}