class Api {
    constructor(){

    }

    fetch(){
        return [
            { "title": "Coat", "price": 450 },
            { "title": "Shirt", "price": 150 },
            { "title": "Socks", "price": 50 },
            { "title": "Jacket", "price": 350 },
            { "title": "Shoes", "price": 250 }
        ];
    }
}

class GoodsItem {
    constructor(title, price) {
        this.title = title;
        this.price = price
    }

    
    addToCart() {
        //добавить товар в корзину
    }

    getHtml() {
        return `<div class="product-item"><h3 class="item-title">${this.title}</h3><img class="item-img" src="">
                <p class="item-cost">${this.price.toLocaleString('en')} $</p><button class="item-button">Купить</button></div>`
    }
}

class GoodsList {
    constructor() {
        this.api = new Api();
        this.$goodsList = document.querySelector(".product-list");
        this.goods = [];
    }

    fetchGoods() {
        this.goods = this.api.fetch().map(({title, price}) => new GoodsItem(title, price));
    }

    render() {
        this.$goodsList.textContent = "";
        this.goods.forEach((good) => {
            this.$goodsList.insertAdjacentHTML("beforeend", good.getHtml())
        })
    }

    getSum(prop = "price") {    //сумма всех товаров (или сумма скидок, купонов, кэшбэков)
        let sum = 0;
        this.goods.forEach((item) => {
        sum += +item[prop];
        });
        return sum
    }
}

class CartItem {
    constructor(title, price, quantity) {
        
    }

    delFromCart() {
        //удалить товар
    }

}

class Cart {
    constructor() {

    }

}

const goodsList = new GoodsList();
const cartList = new Cart();
goodsList.fetchGoods();
goodsList.render();
console.log(goodsList.getSum());
