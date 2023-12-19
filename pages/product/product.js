let dialog_container = document.querySelector('.dialog_container');
let table = document.querySelector('table');
let card_pro = document.querySelector('.card-products');
const addBtn= document.querySelector('.add-btn')
const editBtn= document.querySelector('.edit-btn')
let select = document.querySelector('#selected');
console.log(select)
let btn_search = document.querySelector('#search');


let datass = [];

function saveLocalstorage() {
    localStorage.setItem('datass', JSON.stringify(datass));
}

function reload() {
    let productstorage = JSON.parse(localStorage.getItem('datass'))
    if (productstorage!=null) {
        datass = productstorage;
    }

}
let input_id = document.querySelector('#id');
let input_name = document.querySelector('#name')
let input_price = document.querySelector('#price');
let input_quatity = document.querySelector('#quantity');
let input_category = document.querySelector('#category');

function displayProduct() {
    const tbody = document.querySelector('tbody');
    tbody.remove();
    let tbodys = document.createElement('tbody');
    if(datass.length){
        for (let index in datass) {
            let tr = document.createElement('tr');
            // tr.setAttribute('id', datass[index].category);
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
            iDelete.addEventListener('click',toDeletecardcategory)
            let iEdit = document.createElement('i');
            spanEdit.addEventListener('click', onEditProduct);
    
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
        iDelete.addEventListener('click', toDeletecard);
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
}

function addProduct() {
    const data = {
        id: input_id.value,
        name: input_name.value,
        price: input_price.value,
        qauntity: input_quatity.value,
        category: input_category.value,
    };
    if (input_name.value != "" && input_price.value != "" && input_quatity.value != "" && input_category.value != "") {
        datass.push(data);
        resetData()
    };
}

function resetInput(){
    input_id.value = ""
    input_name.value = ""
    input_price.value = ""
    input_quatity.value = ""
    input_category.value = ""
}

function updateProduct(){
    let index = localStorage.getItem('index') 
    let product = {
        id:input_id.value,
        name: input_name.value,
        price:input_price.value,
        qauntity: input_quatity.value,
        category: input_category.value,       
    }
    if(input_name.value != "" && input_price != "" && input_quatity.value != "" && input_category.value != ""){
        datass.splice(index, 1, product);
        resetData()
    }
}

function onEditProduct(e){
    const index = e.target.parentElement.parentElement.parentElement.dataset.index;
    localStorage.setItem("index", index);
    input_id.value = datass[index].id;
    input_name.value = datass[index].name;
    input_price.value = datass[index].price;
    input_quatity.value = datass[index].qauntity;
    input_category.value = datass[index].category;
    hide(addBtn)
    show(editBtn)
    show(dialog_container);
}
function resetData(){
    saveLocalstorage();
    displayProduct();
    resetInput()
    hide(dialog_container);
}

let hide = (element) => {
    element.style.display = "none";
}

let show = (element) => {
    element.style.display = "block";
}

let onAdd = () => {
    show(dialog_container);
    hide(editBtn)
    show(addBtn);
}

function toDeletecardcategory(e){
function toDeletecard(e) {
    let index = e.target.closest('tr').dataset.index;
    datass.splice(index, 1);
    saveLocalstorage();
    displayProduct();
}

// ==========cancel function==========
let cancel = () => {
    hide(dialog_container);
    resetInput()
}


search.addEventListener('keyup', searchNameproduct);
select.addEventListener('change', selectData);

function selectData(e) {
    let alloption = e.target.value;
    let tables = table.lastElementChild.children;
    for ( let opject of tables){
        let category = opject.id;
        if ( category === alloption) {
            opject.style.display = '';
        }
        else if (alloption === 'all' ){
            opject.style.display = '';
        }
        else {
            opject.style.display = 'none';
        }
    }
}

function searchNameproduct(e) {
    let namePro = e.target.value;
    let table = document.querySelector('table');
    let tables = table.lastElementChild.children;
    for (let tr of tables) {
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
