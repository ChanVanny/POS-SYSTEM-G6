let dialog_container = document.querySelector('.dialog_container');
let table = document.querySelector('table');
let card_pro = document.querySelector('.card-products');

let btn_search = document.querySelector('#search');


let datass = [];

function saveLocalstorage() {
    localStorage.setItem('datass', JSON.stringify(datass));
}

function reload() {
    let productstorage = JSON.parse(localStorage.getItem('datass'))
    if (productstorage != null) {
        datass = productstorage;
        // addProduct();
    }

}
let input_id = document.querySelector('#id');
let input_name = document.querySelector('#name')
let input_price = document.querySelector('#price');
let input_quatity = document.querySelector('#quantity');
let input_category = document.querySelector('#category');

function displayProduct() {
    let table = document.querySelector('table');
    let tbody = document.querySelector('tbody');
    tbody.remove();
    let tbodys = document.createElement('tbody');

    for (let index in datass) {

        let tr = document.createElement('tr');
        tr.setAttribute('id', datass[index].category);
        tr.dataset.index = index;

        let tdId = document.createElement('td');
        let tdName = document.createElement('td');
        let tdCategory = document.createElement('td');
        let tdQuality = document.createElement('td');
        let tdPrice = document.createElement('td');
        let tdAction = document.createElement('td');

        let spanDelete = document.createElement('span');
        let spanEdit = document.createElement('span');
        let iDelete = document.createElement('i');
        iDelete.addEventListener('click',toDeletecard);
        let iEdit = document.createElement('i');

        tdId.textContent = datass[index].id;
        tdName.textContent = datass[index].name;
        tdCategory.textContent = datass[index].category;
        tdQuality.textContent = datass[index].qauntity;
        tdPrice.textContent = "price" + datass[index].price;

        iDelete.className = "ri-delete-bin-6-line";
        iEdit.className = "ri-pencil-fill";

        tdAction.appendChild(iDelete);
        tdAction.appendChild(iEdit);

        spanDelete.appendChild(iDelete);
        spanEdit.appendChild(iEdit);

        tr.appendChild(tdId);
        tr.appendChild(tdName);
        tr.appendChild(tdCategory);
        tr.appendChild(tdQuality);
        tr.appendChild(tdPrice);
        tr.appendChild(tdAction);

        tdAction.appendChild(spanDelete);
        tdAction.appendChild(spanEdit);

        tbodys.appendChild(tr);
    }
    table.appendChild(tbodys);


}



function addProduct() {
    data = {
        id: input_id.value,
        name: input_name.value,
        price: input_price.value,
        qauntity: input_quatity.value,
        category: input_category.value,
    };
    if (input_name.value != "" && input_price.value != "" && input_quatity.value != "" && input_category.value != "") {
        datass.push(data);
        saveLocalstorage();
        displayProduct();
    };
    saveLocalstorage();
    displayProduct();

}

let hide = (element) => {
    element.style.display = "none";
}

let show = (element) => {
    element.style.display = "block";
}


let onAdd = () => {
    // btn_dialog.lastElementChild.textContent = "Add Product";
    show(dialog_container);


}

function toDeletecard(e){
    let index = e.target.closest('tr').dataset.index;
    datass.splice(index, 1);
    saveLocalstorage();
    displayProduct();
}


// ==========cancel function==========
let cancel = () => {
    hide(dialog_container);
    // reload();
}


search.addEventListener('keyup', searchNameproduct);

function searchNameproduct(e){
    let namePro = e.target.value;
    let table = document.querySelector('table');
    let tables = table.lastElementChild.children;
    for (let tr of tables){
        let gotName = tr.children[1].textContent;
        if (gotName.indexOf(namePro) !== -1) {
            tr.style.display = '';
        } else {
            tr.style.display = 'none';
        }
    }    
}

reload();
displayProduct();
