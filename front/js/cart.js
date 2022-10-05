//Une fonction asynchrone qui affiche le panier
async function displayAndManageCart() {
  //Déclaration de la variable qui permet de récupérer les produits dans le panier
  let cartProducts = getProductsFromCart();
  //On tri les produits et affiche les produits par id
  cartProducts.sort(function (a, b) {
    return a.id.localeCompare(b.id);
  });

  // si le panier est vide, alors on affiche pourle client un message confirmant que celui-ci est vide
  if (cartProducts.length === 0) {
    //déclaration de la variable affichant le message
    let titleCart = document.querySelector("h1");
    titleCart.textContent = "Votre panier est vide";
  }
  //Sinon on affiche les produits selectionnés par le client dans le panier
  else {
    //Déclaration de la variable affichant les produits dans le panier
    let cartItemSection = document.querySelector("#cart__items");
    //Pour chaque produit du panier
    for(let cartProduct of cartProducts){
        let product = await getProductById(cartProduct.id);
    let article = buildCartProductToHtml(product, cartProduct);
    cartItemSection.append(article)
    }
    
  }
}
displayAndManageCart();
