//Déclaration des variables permettant de rechercher les produits dans le serveur en utilisant leur ids
const params = new URLSearchParams(document.location.search);
const id = params.get("_id");


//Création d'une prommesse de fonction permettant d'éxécuter la fonction asynchrone et qui affichera le produit choisi par le client dans la page product
//Déclaration d'une variable permettant de récupérer le produit choisi par le client grâce à la fonction crée pour
let productPromise = getProductById(id);
productPromise.then(function (product) {
  buildDetailsOfProduct(product);
  // Déclaration d'une varriable permettant d'ajouter un produit choisi au panier
  let addToCart = document.querySelector("#addToCart");
  //Ajout d'un event click lorsque le client ajoute le produit au panier
  addToCart.addEventListener("click", (event) => {
    //déclaration des variables permettant de choisir la couleur du produit
    let colorSelect = document.querySelector("#colors");
    let color = colorSelect.options[colorSelect.selectedIndex].value;
    console.log(color);
    // Si le client ne choisi pas de couleur,alors on renvoie une alerte
    if (!checkColor(color)) {
      alert("Vous n'avez pas choisi la couleur de votre produit!");
      return;
    }
    //Déclaration des variables permmettant de choisir la quantité de produit
    let quantityInput = document.querySelector("#quantity");
    let quantity = quantityInput.value;
    console.log(quantity);
    //Si la quantité n'est pas entre 1 et 100 alors on renvoie une alerte
    if (!checkQuantity(quantity)) {
      alert(
        "La quantité de produit est comprise entre 1 et 100. Veuillez rentrez une valeur correcte!"
      );
      return;
    }
    //Une fois la couleur et la quantité choisi, alors le client peut ajouter son produit au panier
    addProductTocart(product, color, quantity);
    
  });
});
