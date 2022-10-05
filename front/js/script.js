//Déclaration d'une variable permettant de récupérer tous les produits grâce à la fonction crée pour
let productsPromise = getAllProducts();
//Création d'une prommesse de fonction permettant d'éxécuter la fonction asynchrone et qui affichera tous les produits sur la page d'accueil
productsPromise.then(function (products) {
  let items = document.querySelector("#items");
  for (let product of products) {
    let productHtml = buildProductToHtml(product);
    items.append(productHtml);
  }
});
