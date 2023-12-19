let productstorage = JSON.parse(localStorage.getItem('datass'))

if (JSON.parse(localStorage.getItem("categories")) != null) {
    let categories = JSON.parse(localStorage.getItem("categories"));
 
}



let instock = document.querySelector('#stock1');
let Category = document.querySelector('#stock2');

instock.textContent =productstorage.length;
Category.textContent=categories.length;


