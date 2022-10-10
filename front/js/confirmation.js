//Déclaration des variables permettant de rechercher la commande client dans le serveur
let confirmation = window.location.href;
let orderId = new URL(confirmation);
let orderIdConfirmation = orderId.searchParams.get("orderId");
console.log(orderId);

let displayOrderId = document.querySelector("#orderId");
displayOrderId.innerText = orderIdConfirmation;
localStorage.clear();
