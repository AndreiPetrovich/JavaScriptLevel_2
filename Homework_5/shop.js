const API_URL = '/goods.json';

const vue = new Vue({
  el: "#app",
  data: {
    goods: [],
    filtredGoods: [],
    search: '',
    cart: [],
    cartCount: 0,
    cartSum: 0,
    isVisibleCart: false,
  },
  methods: {
    fetch(error, success) {
            let xhr;
          
            if (window.XMLHttpRequest) {
              xhr = new XMLHttpRequest();
            } else if (window.ActiveXObject) { 
              xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }
          
            xhr.onreadystatechange = function () {
              if (xhr.readyState === 4) {
                if(xhr.status === 200) {
                  success(JSON.parse(xhr.responseText));
                } else if(xhr.status > 400) {
                  error('Ошибка');
                }
              }
            }
          
            xhr.open('GET', API_URL, true);
            xhr.send();
    },

    fetchPromise() {
            return new Promise((resolve, reject) => {
              this.fetch(reject, resolve)
            }) 
    },

    searchHandler() {
        if(this.search === '') {
          this.filtredGoods = this.goods;
        }
        const regexp = new RegExp(this.search, 'gi');
        this.filtredGoods = this.goods.filter((good) => regexp.test(good.title));
    },

    cartHandler() {
        this.isVisibleCart = !this.isVisibleCart;
    },

    addToCart(item) {
        this.cart.push(item);
        this.cartCount++;
        this.cartSum += item.price;
    },

    delFromCart(item) {
        let index = this.cart.findIndex(n => n.title === item.title);
        this.cart.splice(index, 1);
        this.cartCount--;
        this.cartSum -= item.price;
    },

  },
  mounted() {
    this.fetchPromise()
      .then(data => {
        this.goods = data;
        this.filtredGoods = data;
      })
      .catch(err => { 
        console.log(err);
      }) 
  }
})