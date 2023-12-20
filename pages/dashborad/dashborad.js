let productstorage = JSON.parse(localStorage.getItem('datass'))

if (JSON.parse(localStorage.getItem("categories")) != null) {
    categories = JSON.parse(localStorage.getItem("categories"));
 
}

let cartstorage = JSON.parse(localStorage.getItem('arraycart'));


let arr = [];

function tosave(){
    localStorage.setItem('arr',JSON.stringify(arr));
}

function toreload(){
    let tol = JSON.parse(localStorage.getItem('arr'));
    product();
}


let tbody = document.querySelector('tbody');

function productsell(){

    for (let index in arr){
        let tr = document.createElement('tr');
        let th1 = document.createElement('th');
        let th2 = document.createElement('th');
        let th3 = document.createElement('th');
        let th4 = document.createElement('th');
        let th5 = document.createElement('th');
    
        th1.textContent=cartstorage[index].id;
        th2.textContent=cartstorage[index].name;
        th4.textContent=cartstorage[index].price;
        th5.textContent=cartstorage[index].qauntity;

        tr.appendChild(th1)
        tr.appendChild(th2)
        tr.appendChild(th3)
        tr.appendChild(th4)
        tr.appendChild(th5)
        tbody.appendChild(tr)
        
    }

}

function product(){
    for (let index of cartstorage){
        arr.push(index);
        tosave()
        productsell()
    }
}


let instock = document.querySelector('#stock1');
let Category = document.querySelector('#stock2');
let sold_out = document.querySelector('#stock3')


instock.textContent =productstorage.length;
Category.textContent=categories.length;

toreload()