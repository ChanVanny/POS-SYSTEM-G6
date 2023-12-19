let productstorage = JSON.parse(localStorage.getItem('datass'))


let instock = document.querySelector('#stock1');
instock.textContent =productstorage.length;