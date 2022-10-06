// Une fonction asynchrone qui affiche le panier
async function displayAndManageCart() {
  //Déclaration de la variable qui permet de récupérer les produits dans le panier avec la fonction correspondante
  let cartProducts = getProductsFromCart();
  // On trie les produits par id trier les produits par id pour afficher les produits
  cartProducts.sort(function (a, b) {
    return a.id.localeCompare(b.id);
  });
  // si le panier est vide, alors on affiche pour le client un message confirmant que celui-ci est bien vide
  if (cartProducts.length === 0) {
    //Déclaration de la vairable contenant le message
    let titleCart = document.querySelector("h1");
    titleCart.textContent = "Votre panier est vide";
  }
  //Sinon on affiche les produits selectionnés par le client dans le panier
  else {
    //Déclaration de la variable affichant les produits dans le panier
    let cartItemSection = document.getElementById("cart__items");
    for (let cartProduct of cartProducts) {
      let product = await getProductById(cartProduct.id);
      let article = buildCartProductToHtml(product, cartProduct);
      cartItemSection.append(article);
      //Déclaration de la variable permettant de changer la quantité du produit
      let inputQuantity = article.querySelector(".itemQuantity");
      // Ajout d'un event change, pour ajouter ou réduire dynamiquement la quantité d'un produit déjà dans le panier
      inputQuantity.addEventListener("change", function (e) {
        //Déclaration de la variable contenant la nouvelle quantité du produit
        let newQuantity = e.target.value;
        // si la valeur saisie par le client est incorrecte, alors on renvoit un message d'erreur
        if (!checkQuantity(newQuantity)) {
          alert("La valeur saisie n'est pas correcte ");
          inputQuantity.value = cartProduct.quantity;
        }
        // Sinon on ajoute ou on réduit dynamiquement la quantité du produit selectionné
        else {
          cartProduct.quantity = newQuantity;
          modifyCartProductQuantityFromCart(
            cartProduct.id,
            cartProduct.color,
            newQuantity
          );
          // On recalcule ensuite la quantité totale et le prix total lorsque la nouvelle quantité est ajoutée avec la fonction correspondante
          calculateTotalQuantityAndPrice();
        }
      });
      //Ajout d'un event click permettant de confirmer la suppression d'un produit dans le panier
      let deleteItem = article.querySelector(".deleteItem");
      deleteItem.addEventListener("click", function (event) {
        // Ajout d'une alerte demandant au client s'il veut supprimer le produit de son panier
        let response = confirm(
          "Etes-vous sûr de vouloir supprimer ce produit?"
        );
        // si le client confirme, alors Le produitdisparait du panier.
        if (response) {
          //Appel de la fonction qui supprime le produit selectionné
          deleteCartProductFromCart(article);
          // Appel de la fonction qui recalcule le total du panier
          calculateTotalQuantityAndPrice();
        }
      });
    }
    // Appel de la fonction qui recalcule le total du panier
    calculateTotalQuantityAndPrice();

    //Définition des variables permettant de créer le formulaire de commande du client
    let form = document.querySelector("form");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      // Définition des variables pour le prénom du client
      let firstNameValue = document.querySelector("#firstName").value;
      let firstNameRegex = /^[A-Za-z éèêëàâîïôöûü-]+$/;
      let pfirstNameErrorMsg = document.querySelector("#firstNameErrorMsg");
      let firstNameErrorMsg = "Champ invalide! Veuillez vérifier votre saisie";
      // Définition des variables pour le nom du client
      let lastNameValue = document.querySelector("#lastName").value;
      let lastNameRegex = /^[A-Za-z éèêëàâîïôöûü-]+$/;
      let plastNameErrorMsg = document.querySelector("#lastNameErrorMsg");
      let lastNameErrorMsg = "Champ invalide! Veuillez vérifier votre saisie";
      // Définition des variables pour l'adresse du client
      let addressValue = document.querySelector("#address").value;
      let addressRegex = /^[a-zA-Z0-9\s,'-]+$/;
      let paddressErrorMsg = document.querySelector("#addressErrorMsg");
      let addressErrorMsg = "Champ invalide! Veuillez vérifier votre saisie";
      // Définition des variables pour la ville du client
      let cityValue = document.querySelector("#city").value;
      let cityRegex = /^[A-Za-z éèêëàâîïôöûü-]+$/;
      let pcityErrorMsg = document.querySelector("#cityErrorMsg");
      let cityErrorMsg = "Champ invalide! Veuillez vérifier votre saisie";
      // Définition des variables pour l'adresse mail du client
      let emailValue = document.querySelector("#email").value;
      let emailRegex = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
      let pemailErrorMsg = document.querySelector("#emailErrorMsg");
      let emailErrorMsg =
        "Champ invalide! Veuillez renseigner une adresse mail valide.";
      if (
        checkContactInput(
          firstNameValue,
          firstNameRegex,
          pfirstNameErrorMsg,
          firstNameErrorMsg
        ) &&
        checkContactInput(
          lastNameValue,
          lastNameRegex,
          plastNameErrorMsg,
          lastNameErrorMsg
        ) &&
        checkContactInput(
          addressValue,
          addressRegex,
          paddressErrorMsg,
          addressErrorMsg
        ) &&
        checkContactInput(cityValue, cityRegex, pcityErrorMsg, cityErrorMsg) &&
        checkContactInput(emailValue, emailRegex, pemailErrorMsg, emailErrorMsg)
      ) {
        //déclaration de la variable permettant de récupérer toutes les informations de contact du client
        let contact = {
          firstName: firstNameValue,
          lastName: lastNameValue,
          address: addressValue,
          city: cityValue,
          email: emailValue,
        };
        //déclaration de la variable permettant de trouver tous les produits dans le panier grâce à leur ids en appelant la fonction correspondante
        let productIds = findCartProductIdsFromCart();
        //déclaration de la variable permettant d'envoyer le formulaire de commande en appelant la fonction correspondante
        let orderPromise = order(contact, productIds);
        orderPromise.then(function (orderResponse) {
          console.log(orderResponse);
          //Envoie des informations formulaire et des produits dans le panier sur la page de confirmation de commande
          window.location.href = `confirmation.html?orderId=${orderResponse.orderId}`;
        });
      }
    });
  }
}
//Appel de la fonction pour afficher le panier
displayAndManageCart();
