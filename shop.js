class Cart {
    constructor() {
        this.cart = [];
    }

    fetch() {
        return this.cart
    }
}

class Api {
    constructor(){

    }

    fetch(){
        return [
            {title : "Roadster", price : 50000},
            {title : "Model S", price : 79990},
            {title : "Model X", price : 99990},
            {title : "Model 3", price : 35000},
            {title : "Model Y", price : 40490},
        ];   
    }
}

class GoodsItem {
    constructor(title, price) {
        this.title = title;
        this.price = price
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
        if (this.api.fetch()[0][prop] != undefined && !isNaN(this.api.fetch()[0][prop])) {
            let sum = 0;
            this.api.fetch().forEach((item) => {
            sum += +item[prop]
            });
            return sum
        }
    }
}

class CartItem extends GoodsItem {
    constructor(title, price) {
        super(title, price)
    }

}

class CartList extends GoodsList{
    constructor() {
        super();
        this.api = new Cart();
        this.$cartList = document.querySelector(".cart-list");
        this.goods = [];
    }

    render() {
        this.$cartList.textContent = "";
        this.goods.forEach((good) => {
            this.$cartList.insertAdjacentHTML("beforeend", good.getHtml())
        });
    }

    addItem() {
        //добавить товар
    }

    delItem() {
        //удалить товар
    }

        //сумма товаров унаследована

}

const goodsList = new GoodsList();
const cartList = new CartList();
goodsList.fetchGoods();
goodsList.render();