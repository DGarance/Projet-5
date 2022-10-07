// Une fonction asynchrone qui permet de récupérer toutes les informations produits depuis le back-end

async function getAllProducts() {
  let response = await fetch(`${BASE_URL}`, {
    method: "GET",
  });
  return response.json();
}

// Une fonction asynchrone qui retourne les informations du produits en utilisant son id
async function getProductById(id) {
  let response = await fetch(`${BASE_URL}/${id}`, {
    method: "GET",
  });
  return response.json();
}

// Une fonction qui prend en paramètre un objet produit et qui construit le code HTML du produit et le retourne
function buildProductToHtml(product) {
  // déclaration des variables et attributons de celle-ci permettant d'afficher le produit sur la page html index
  //
  let a = document.createElement("a");
  a.setAttribute("href", `./product.html?_id=${product._id}`);
  let article = document.createElement("article");
  //Image du produit
  let img = document.createElement("img");
  img.setAttribute("src", product.imageUrl);
  img.setAttribute("alt", product.altTxt);
  //Nom du produit
  let h3 = document.createElement("h3");
  h3.setAttribute("class", "productName");
  h3.textContent = product.name;
  //Description du produit
  let p = document.createElement("p");
  p.setAttribute("class", "productDescription");
  p.textContent = product.description;

  //Ajout des variables déclarées pour créer l'affichage des produits
  article.append(img, h3, p);
  a.append(article);

  // On retourne a pour avoir le résultat
  return a;
}

//Une fonction qui prend en paramètre le choix de couleur d'un produit
function buildOptionOfColor(color) {
  // déclaration de la variable qui affiche le choix des couleurs pour les produits
  let option = document.createElement("option");
  option.setAttribute("value", color);
  option.textContent = color;
  //on retourne option pour avoir le résultat
  return option;
}

//Une fonction qui prend en paramètre un produit choisi par le client et affiche les détails de celui-ci dans la page product
function buildDetailsOfProduct(product) {
  //Déclaration de chaque variable et attributions de celle-ci permettant d'afficher les détails du produits choisi par le client
  //Image du produit
  let img = document.createElement("img");
  img.setAttribute("src", product.imageUrl);
  img.setAttribute("alt", product.altTxt);
  //Affichage de l'image du produit
  let itemImg = document.querySelector("article div.item__img");
  itemImg.append(img);
  //Nom du produit
  let title = document.querySelector("#title");
  title.textContent = product.name;
  //Prix du produit
  let price = document.querySelector("#price");
  price.textContent = product.price;
  //Description du produit
  let description = document.querySelector("#description");
  description.textContent = product.description;
  //Choix des couleurs
  let colorSelect = document.querySelector("#colors");
  //Pour chaque couleur d'un produit, on a la possibilité de choisir la couleur que l'on souhaite
  for (let color of product.colors) {
    let option = buildOptionOfColor(color);
    colorSelect.append(option);
  }
}

//Une fonction qui vérifie que le client choisi une couleur pour le produit choisi
function checkColor(color) {
  //si couleur = à undefined ou couleur = à null ou couleur = ""
  if (color == undefined || color == null || color == "") {
    //alors la couleur non définie, nulle ou non remplie sera fausse
    return false;
  }
  //sinon on retourne la vraie valeur
  else {
    return true;
  }
}

// Une fonction pour afficher que les valeurs entières
function isInt(value) {
  return parseInt(value) == value;
}

//Une fonction qui vérifie que la quantité saisit par l'utilisateur est bien un entier et se situe entre 1 et 100
function checkQuantity(quantity) {
  // si la quantité = undefined ou quantité = null ou quantité = ""  ou quantité inférieure à 1 ou quantité supérieure à 100 ou quantité n'est pas entier
  if (
    quantity == undefined ||
    quantity == null ||
    quantity == "" ||
    quantity < 1 ||
    quantity > 100 ||
    !isInt(quantity)
  ) {
    //la quantité non définie, nulle, non remplie, inférieure à 1, supérieure à 100, ou n'est pas un entier sera fausse

    return false;
  } else {
    //sinon on retourne une vraie valeur
    return true;
  }
}
//Une fonction permettant de récupérer les produits choisi par le client dans le localstorage
function getProductsFromCart() {
  //Déclaration de la variable permettant de récupérer les produits dans le localstorage
  let cartProducts = localStorage.getItem(CART_KEY);
  //sil il n'y a aucun produit dans le localstorage, on retourne un tableau vide
  if (!cartProducts) {
    return [];
  }
  //sinon on retourne les produits selectionnées par le client dans le localstorage
  else {
    return JSON.parse(cartProducts);
  }
}
//Une fonction permettant d'envoyer le produit choisi dans le panier
function addProductTocart(product, color, quantity) {
  //déclaration de la variable qui choisit le produit en fonction de son id, sa couleur et sa quantité
  let cartProduct = {
    id: product._id,
    color: color,
    quantity: parseInt(quantity),
  };
  //Déclaration de la variable permettabt de récupérer les produits dans le localstorage pour le panier
  let cartProducts = getProductsFromCart();
  let foundProduct = cartProducts.find(
    (x) => x.id == product._id && x.color == color
  );
  // Si on trouve le produit dans le localstorage, on y récupère la quantité saisit par le client
  if (foundProduct) {
    foundProduct.quantity = foundProduct.quantity + parseInt(quantity);
  }
  //Sinon on récupère le produit et on le met dans le panier
  else {
    cartProducts.push(cartProduct);
  }
  //on stocke les produits selectionnés dans le localstorage de la page panier
  localStorage.setItem(CART_KEY, JSON.stringify(cartProducts));
}

//Une fonction qui permet d'afficher les produits choisit par le client dans le panier
function buildCartProductToHtml(product, cartProduct) {
  // Déclaration de la variable de l'élément article qui contient le produit
  let productArticle = document.createElement("article");
  productArticle.classList.add("cart__item");
  productArticle.setAttribute("data-id", product._id);
  productArticle.setAttribute("data-color", cartProduct.color);
  // Déclaration de la variable de l'élément "div" qui contient l'image du produit
  let productDivImg = document.createElement("div");
  productDivImg.classList.add("cart__item__img");
  productArticle.append(productDivImg);
  // Déclaration de la variable de l'élément "img" qui récupère l'image du produit
  let productImg = document.createElement("img");
  productImg.setAttribute("src", product.imageUrl);
  productImg.setAttribute("alt", product.altTxt);
  productDivImg.append(productImg);
  // Déclaration de la variable de l'élément "div" qui contient le produit
  let productItemContent = document.createElement("div");
  productItemContent.classList.add("cart__item__content");
  productArticle.append(productItemContent);
  // Déclaration de la variable de l'élément "div" qui contient la description du produit
  let productItemDescription = document.createElement("div");
  productItemDescription.classList.add("cart__item__content__description");
  productItemContent.append(productItemDescription);
  // Déclaration de la variable de l'élément"h2" qui récupère le nom du produit
  let productTitle = document.createElement("h2");
  productTitle.textContent = product.name;
  productItemDescription.append(productTitle);
  // Déclaration de la variable de l'élément "p" qui récupère la couleur du produit
  let productColor = document.createElement("p");
  productColor.textContent = cartProduct.color;
  productItemDescription.append(productColor);
  // Déclaration de la variable de l'élément "p" qui récupère le prix du produit
  let productPrice = document.createElement("p");
  productPrice.textContent = product.price + " €";
  productItemDescription.append(productPrice);
  // Déclaration de la variable de l'élément article
  let productItemSettings = document.createElement("div");
  productItemSettings.classList.add("cart__item__content__settings");
  productItemContent.append(productItemSettings);
  // Déclaration de la variable de l'élément article
  let productItemSettingsQuantity = document.createElement("div");
  productItemSettingsQuantity.classList.add(
    "cart__item__content__settings__quantity"
  );
  productItemSettings.append(productItemSettingsQuantity);
  // Déclaration de la variable de l'élément article
  let productQuantity = document.createElement("p");
  productQuantity.textContent = "Qté : ";
  productItemSettingsQuantity.append(productQuantity);
  // Déclaration de la variable de l'élément article
  let productInputQuantity = document.createElement("input");
  productInputQuantity.classList.add("itemQuantity");
  productInputQuantity.setAttribute("type", "number");
  productInputQuantity.setAttribute("name", "itemQuantity");
  productInputQuantity.setAttribute("min", "1");
  productInputQuantity.setAttribute("max", "100");
  productInputQuantity.setAttribute("value", cartProduct.quantity);
  productItemSettingsQuantity.append(productInputQuantity);
  // déclaration de la variable de l'élément "div" qui contient les produits supprimés
  let productItemSettingsDelete = document.createElement("div");
  productItemSettingsDelete.classList.add(
    "cart__item__content__settings__delete"
  );
  productItemSettings.append(productItemSettingsDelete);
  let productDeleteItem = document.createElement("p");
  productDeleteItem.classList.add("deleteItem");
  productDeleteItem.textContent = "Supprimer";
  productItemSettings.append(productDeleteItem);

  return productArticle;
}

//Une fonction asynchrone qui permet de calculer la quantité totale et le prix total du panier
async function calculateTotalQuantityAndPrice() {
  //récupération de la quantité totale du panier
  //Déclaration de la variable qui récupère les produits dans le panier
  let cartProducts = getProductsFromCart();
  //Déclaration de la variable permettant de définir la quantité totale dans le panier
  let totalQuantity = 0;
  //Déclaration de la variable permettant de définir lle prix total dans le panier
  let totalPrice = 0;
  //On calcule le total de la quantité et du prix des produits dans le panier
  for (let cartProduct of cartProducts) {
    totalQuantity = totalQuantity + cartProduct.quantity;

    let product = await getProductById(cartProduct.id);
    totalPrice = totalPrice + product.price * cartProduct.quantity;
    //On affiche la quantité totale de produits dans le panier
    let totalCartProduct = document.querySelector("#totalQuantity");
    totalCartProduct.textContent = totalQuantity;
    //On affiche le prix total de produits dans le panier
    let totalProductPrice = document.querySelector("#totalPrice");
    totalProductPrice.textContent = totalPrice;
  }
}
// Une fonction qui permet de modifier la quantité de produits directement dans le panier
function modifyCartProductQuantityFromCart(productId, color, newQuantity) {
  //Déclaration de la variable qui récupère les produit qui sont dans le panier
  let cartProducts = getProductsFromCart();
  //Déclaration de la variable permettant de trouver les produits dans le panier grâce à leur id et leur couleur
  let foundProduct = cartProducts.find(
    (x) => x.id == productId && x.color == color
  );
  foundProduct.quantity = parseInt(newQuantity);
  localStorage.setItem(CART_KEY, JSON.stringify(cartProducts));
}

//Une fonction qui permet de supprimer un produit dans le panier
function deleteCartProductFromCart(article) {
  // déclaration de la variable permettant de choisir un produit en fonction de son id
  let id = article.dataset.id;
  // déclaration de la variable permettant de choisir un produit en fonction de sa couleur
  let color = article.dataset.color;
  //Déclaration de la variable qui récupère les produit qui sont dans le panier
  let cartProducts = getProductsFromCart();
  // déclaration de la variable permettant de filtrer les produits du panier en fonction de leur id et leur couleur
  let cartProductFiltered = cartProducts.filter(
    (x) => x.id != id && x.color != color
  );

  localStorage.setItem(CART_KEY, JSON.stringify(cartProductFiltered));
  //Suppression du produit selectionné par le client
  article.remove();
}

// Une fonction qui permet de vérifier toutes les informations du client pour effectuer sa commande
function checkContactInput(value, regex, pError, msgError) {
  //si les informations remplies par le client ne correspondent pas au REGEX définis, alors ça renvoie un message d'erreur
  if (!regex.test(value)) {
    pError.textContent = msgError;
    return false;
  }
  //sinon le formulaire d'informations rempli par le client est correct
  else {
     pError.textContent = "";

     return true;
  }
}

//Une fonction qui retourne le tableau des ids qui se trouvent dans le panier
function findCartProductIdsFromCart() {
  //déclaration de la variable contenant le tableau des ids
  let productIds = [];
  //Déclaration de la variable qui récupère les produit qui sont dans le panier
  let cartProducts = getProductsFromCart();
  //
  for (let p = 0; p < cartProducts.length; p++) {
    productIds.push(cartProducts[p].id);
  }
  return productIds;
}

//Une fonction asynchrone permettant d'envoyer les informations clients pour effectuer la commande
async function order(contact, productIds) {
  //déclaration de la variable qui récupère les informations client et les produits dans le panier
  let formPost = {
    contact: contact,
    products: productIds,
  };
  //déclaration de la variable permettant de récupérer la commande et l'envoyer sur la page de confirmation
  let response = await fetch(`${BASE_URL}/order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formPost),
  });
  return response.json();
}
