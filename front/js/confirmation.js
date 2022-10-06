//Déclaration des variables permettant de rechercher la commande client dans le serveur
let confirmation = window.location.href;
let orderId = new URL(confirmation);
let orderIdConfirmation = orderId.searchParams.get("orderId");
console.log(orderId);

//Une fonction qui permet d'afficher le numéro de commande du client
function showConfiramtionId() {
  //Déclaration de la variable qui affichera le numéro de la commande
  let displayOrderId = document.querySelector("#orderId");
  displayOrderId.innerText = orderIdConfirmation;
}
//Appel de la fonction permettant d'afficher le numéro de commande
showConfiramtionId();
