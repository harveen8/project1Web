let loginCheck =document.getElementById("loginCheck");
loginCheck.onclick=getallAdmin;
let logInInfo =document.getElementById("logIn");
let loop =document.getElementById("loop");

let editBody= document.getElementById("editBody");
editBody.style.display="none";
let userName =document.getElementById("userName");
let passWord =document.getElementById("passWord");

let itemName =document.getElementById("itemName");
let isle =document.getElementById("isle");
let price =document.getElementById("price");
let quantity =document.getElementById("quantity");
let addItem=document.getElementById("addItem");
addItem.onclick= addItemFunction;

let newUsername = document.getElementById("newUsername");
let newPassword = document.getElementById("newPassword");
let addAdmin = document.getElementById("addAdmin");
addAdmin.onclick =addNewAdminFunction;

let removeUsername= document.getElementById("removeUsername");
let removeAdmin =document.getElementById("removeAdmin");
removeAdmin.onclick =removeAdminFunction;

let logout = document.getElementById("logout");
logout.onclick = logouts;

function validateUserName(response){
    let p=false;
    for(let i = 0; i < response.length; i++){
        if(userName.value==response[i].username){
            if(passWord.value==response[i].password){
                logInInfo.style.display="none";
                editBody.style.display="block";
                loop.innerHTML="";
                adminTable();
                p=true;
            }else{
                p=true;
                passWord.value="";
                window.alert("Incorrect Password, try again!");
            }
        }
    }
    if(!p){
        passWord.value="";
        window.alert("Incorrect Credentials, try again!");
    }
}

async function getallAdmin(){
    let response = await fetch("http://localhost:9000/grocerystore/admin/all");
    response = await response.json();
    validateUserName(response);
}
async function adminTable(){
    let response = await fetch("http://localhost:9000/grocerystore/admin/all");
    response = await response.json();
    tables(response);
}
function tables(response){
    let userTable= document.getElementById("usernameTable");
    userTable.innerHTML="";
    for(let i = 0; i < response.length; i++){
        let newrow= document.createElement("div");
        newrow.setAttribute("class", "user");
        newrow.innerHTML=response[i].username;
        userTable.appendChild(newrow);
        userTable.appendChild(document.createElement("br"));
    }
} 

function logouts(){
    userName.innerHTML="";
    passWord.innerHTML-"";
    editBody.style.display="none";
    logInInfo.style.display="flex";
    loop.innerHTML="Log In Admin";
}
async function addItemFunction(){
    let inputItem = {
        item_name: itemName.value,
        isle: isle.value,
        price: price.value,
        quantity: quantity.value
    }
    let response = await fetch("http://localhost:9000/grocerystore/admin/add/item", {
        method:'POST',
        mode:'cors',
        headers: {
            'Content-Type': 'application/json'
          },
        body:JSON.stringify(inputItem)
    });
    let confirmItem = document.getElementById("confirmItem");
    confirmItem.innerHTML= "Item name: "+ itemName.value +" on isle: " +isle.value 
    +" with price: $" + price.value.toString(2) + " with quantity: " +quantity.value
    +" has been added to the store";
    itemName.value="";
    isle.value="";
    price.value="";
    quantity.value="";
}

async function removeAdminFunction(){
    let removeperson= {
       username: removeUsername.value,
       password: ""
    }

    let response = await fetch("http://localhost:9000/grocerystore/admin/remove", {
        method:'POST',
        mode:'cors',
        headers: {
            'Content-Type': 'application/json'
          },
        body:JSON.stringify(removeperson)
    });
    let confirmAdminRemove = document.getElementById("confirmAdminRemoved");
    confirmAdminRemove.innerHTML= "You removed "+ removeUsername.value;
    if(removeUsername.value==userName.value){
        editBody.style.display="none";
        logInInfo.style.display="flex";
    }
   removeUsername.value="";
   adminTable();
}

async function addNewAdminFunction(){
    let inputAdmin = {
        username: newUsername.value,
        password: newPassword.value
    }
    let response = await fetch("http://localhost:9000/grocerystore/admin/add", {
        method:'POST',
        mode:'cors',
        headers: {
            'Content-Type': 'application/json'
          },
        body:JSON.stringify(inputAdmin)
    });
    let confirmAdmin = document.getElementById("confirmAdmin");
    confirmAdmin.innerHTML= "New user with Username: "+ newUsername.value;
    newUsername.value="";
    newPassword.value="";
    adminTable();
}


