class Api {
    constructor(){
        this.url = "/goods.json";
    }

    fetch(error, success) {
        let xhr;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            xhr = new ActiveXObject();
        }

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    success(xhr.responseText);
                } else if (xhr.status > 400) {
                    error('Ошибка');
                }
            }
        }

        xhr.open('GET', this.url, true);
        xhr.send();
    }

    fetchPromise() {
        return new Promise((resolve, reject) => {
            this.fetch(reject,resolve)
        });
    }

    fromJSON(data) {
        return new Promise((resolve) => {
            resolve(JSON.parse(data));
        });
    }
}

class GoodsItem {
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }

    setBtnHandler() {
        let $buttons = document.querySelectorAll(".item-button");
        let $lastButton = $buttons[$buttons.length - 1];
        localStorage.clear();
        $lastButton.addEventListener('click', () => {this.addToCart()});
    }

    addToCart() {
        let cartData = JSON.parse(localStorage.getItem("CART")) || [];
        let flag = true;
        cartData.forEach((item) => {
            if (item.title == this.title) { 
                item.quantity += 1;
                flag = !flag;
            }
        });
        if (flag) cartData.push({"title": this.title, "price": this.price, "quantity": 1});
        localStorage.setItem("CART", JSON.stringify(cartData));
        console.log("В корзину добавлен товар: " + this.title);
    }

    getHtml() {
        return `<div class="product-item">
                <h3 class="item-title">${this.title}</h3>
                <img class="item-img" src="">
                <p class="item-cost">${this.price.toLocaleString('en')} $</p>
                <button class="item-button">Купить</button>
                </div>`;
    }

}

class GoodsList {
    constructor(container = '.product-list') {
        this.api = new Api();
        this.$goodsList = document.querySelector(container);
        this.goods = [];
        this.api.fetchPromise()
        .then((resp) => this.api.fromJSON(resp))
        .then((data) => { this.onFetchSuccess(data) })
        .catch((err) => { this.onFetchError(err) });
    }

    onFetchSuccess(data) {
        this.goods = data.map(({title, price}) => new GoodsItem(title, price));
        this.render();
    }

    onFetchError(err) {
        this.$goodsList.insertAdjacentHTML("beforeend", `<h3>${err}</h3>`);
    }

    render() {
        this.$goodsList.textContent = "";
        this.goods.forEach((good) => {
            this.$goodsList.insertAdjacentHTML("beforeend", good.getHtml());
            good.setBtnHandler();
        })
    }

}

class CartItem {
    constructor(title, price, quantity) {
        this.title = title;
        this.price = price;
        this.quantity = quantity;
    }

    setBtnHandler() {
        let $buttons = document.querySelectorAll(".cartItem-button");
        let $lastButton = $buttons[$buttons.length - 1];
        $lastButton.addEventListener('click', (e) => {this.delFromCart();
                                                    e.currentTarget.parentNode.children[2].innerText = "X" + (--this.quantity);
                                                    if (this.quantity < 1) e.currentTarget.parentNode.textContent = ""; 
                                                    });
    }

    delFromCart() {
        let cartData = JSON.parse(localStorage.getItem("CART")) || [];
        let flag = true
        cartData.forEach((item) => {
            if (item.title == this.title && item.quantity > 1) { 
                item.quantity -= 1;
                flag = !flag;
            }
        });
        if (flag) {  
            let index = cartData.findIndex(n => n.title === this.title);
            if (index > -1) {
                cartData.splice(index, 1);
            }
        }
        localStorage.setItem("CART", JSON.stringify(cartData));
        console.log("Из корзины удален товар:" + this.title);
    }

    getHtml() {
        return `<div class="cart-item">
                <h3>${this.title}</h3>
                <p>${this.price.toLocaleString('en')} $</p>
                <p>X${this.quantity}</p>
                <button class="cartItem-button">Удалить</button></div>`;
    }

}

class Cart {
    constructor(container = '.cart-list') {
        this.$cartList = document.querySelector(container);
        this.cart = [];
        this.totalPrice = 0;
        this.setBtnHandler();
    }

    setBtnHandler() {
        document.querySelector(".cart-button").addEventListener('click', () => {this.fetch(); this.render(); this.getSum()});
    }

    fetch() {
        let data = JSON.parse(localStorage.getItem("CART")) || [];
        this.cart = data.map(({title, price, quantity}) => new CartItem(title, price, quantity));
    }

    render() {
        this.$cartList.textContent = "";
        if (this.cart.length == 0) {this.$cartList.insertAdjacentHTML("beforeend", `<p>В корзине нет товаров</p?`)};
        this.cart.forEach((good) => {
            this.$cartList.insertAdjacentHTML("beforeend", good.getHtml());
            good.setBtnHandler();
        })
    }

    getSum() {
        this.totalPrice = 0;
        this.cart.forEach((good) => {
            this.totalPrice += good.quantity * good.price;
        })
        this.$cartList.insertAdjacentHTML("beforeend", `<hr><h3 class="total">Итог: ${this.totalPrice.toLocaleString('en') + ' $'}</h3>`);
    }

}

const goodslist = new GoodsList();
const cart = new Cart();