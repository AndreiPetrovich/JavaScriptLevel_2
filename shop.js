const products = [
    {title : "Roadster", cost : 50000},
    {title : "Model S", cost : 79990},
    {title : "Model X", cost : 99990},
    {title : "Model 3", cost : 35000},
    {title : "Model Y", cost : 40490}
];
const $productList = document.querySelector(".product-list");   //я бы применил jquery но мы её еще не проходили
const renderProdictItem = ({title, cost}) => {
    return `<div class="product-item"><h3 class="item-title">${title}</h3><img class="item-img" src="#">
            <p class="item-cost">${cost.toLocaleString('en')} $</p><button class="item-button">Купить</button></div>`;
}
const renderProductList = (list = products) => {
    let productList = list.map(item => renderProdictItem(item)).join(""); //можно заполнить productList с помощью цикла for (item of products) {}
    $productList.insertAdjacentHTML("beforeend", productList);            //и запятой тоже не будет, но будет больше кода
}
renderProductList();