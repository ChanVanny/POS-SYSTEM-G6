let card_pro = document.querySelector('.card-products');
let dialog_container = document.querySelector('.dialog_container')
let sideba_center = document.querySelector('.side-bar-center');
let datass = [];


// ========== Hide function=========
let hide = (element) => {
    element.style.display = "none";
}

let show = (element) => {
    element.style.display = "block";
}

function saveLocalstorage() {
    localStorage.setItem('datass', JSON.stringify(datass));
}

function reload() {
    let productstorage = JSON.parse(localStorage.getItem('datass'))
    if (productstorage != null) {
        datass = productstorage;
        addProduct();
    }

}
let input_id = document.querySelector('#id');
let input_name = document.querySelector('#name')
let input_price = document.querySelector('#price');
let input_quantity = document.querySelector('#quantity');
let input_category = document.querySelector('#category');

let onAdd = () => {
    // btn_dialog.lastElementChild.textContent = "Add Product";
    show(dialog_container);
}

function displayProduct() {
    card_pro.remove()
    card_pro = document.createElement('div');
    card_pro.classList.add('card-products');

    for (let index in datass) {

        let card = document.createElement('card');
        card.classList.add('card');
        card.dataset.index = index;
        // card.addEventListener('click',createCard);

        let h4 = document.createElement('h4');
        h4.classList.add('name-pro')
        let bold = document.createElement('b');
        bold.textContent = datass[index].name;

        let text_content = document.createElement('div');
        text_content.classList.add('text-content-card');

        let div = document.createElement('div');
        div.classList.add('quantity');

        let pp = document.createElement('p');
        let span = document.createElement('span');
        span.classList.add('quan');
        span.textContent = 'quantity :';

        let span_num = document.createElement('span');
        span_num.classList.add('num')
        span_num.textContent = datass[index].qauntity;

        let p = document.createElement('p');
        p.classList.add('price')
        p.textContent = datass[index].price + '$';


        let btn = document.createElement('button');
        btn.setAttribute('id', 'add-card');
        btn.textContent = 'View';

        btn.addEventListener('click', displayCard);

        let icon_delete = document.createElement('i');
        icon_delete.setAttribute('id', 'icon-delete');
        icon_delete.className = 'fa fa-trash';
        icon_delete.style.fontSize = '25px';
        icon_delete.style.color = 'red';

        icon_delete.addEventListener('click', delect);


        card_pro.appendChild(card);
        card.appendChild(h4);
        h4.appendChild(bold)
        card.appendChild(text_content);
        text_content.appendChild(div);
        div.appendChild(pp)
        pp.appendChild(span)
        pp.appendChild(span_num)
        div.appendChild(p)
        card.appendChild(btn)
        card.appendChild(icon_delete)
    }
    sideba_center.appendChild(card_pro);

}


function delect(e) {
    let index = e.target.closest('.card').dataset.index;
    datass.splice(index, 1);
    saveLocalstorage();
    displayProduct();
}


// =========== Cancel function ==========
let cancel = () => {
    hide(dialog_container);
    // reload();
}


function addProduct() {

    data = {
        id: input_id.value,
        name: input_name.value,
        price: input_price.value,
        qauntity: input_quantity.value,
        category: input_category.value,
    };

    datass.push(data);

    saveLocalstorage();
    displayProduct();

    console.log(datass)

}

// =============todisplay===============
function displayCard(e) {

    console.log(e.target.parentElement);
    let name_product = e.target.parentElement.children[0].children[0].textContent;
    let price_unique = e.target.parentElement.children[1].children[0].children[1].textContent;

    let ul = document.querySelector('#order-list')

    let li = document.createElement('li');
    li.classList.add('list');

    // let span_id =document.createElement('span');
    // span_id.setAttribute('id', 'detail');

    let span_name = document.createElement('span');
    span_name.setAttribute('id', 'detail');
    span_name.textContent = name_product;

    let input_select = document.createElement('input');
    input_select.setAttribute('id', 'detail');
    input_select.setAttribute('class', 'detail');
    input_select.type = 'number';
    input_select.value = 1;

    let span_price = document.createElement('span');
    span_price.setAttribute('id', 'detail');
    span_price.setAttribute('class', 'price');
    span_price.textContent = price_unique;


    let icon_delete = document.createElement('i');
    icon_delete.setAttribute('id', 'icon-delete');
    icon_delete.className = 'fa fa-trash';
    icon_delete.style.fontSize = '25px';
    icon_delete.style.color = 'red';
    // stor_card.appendChild(ul);
    ul.appendChild(li);
    li.appendChild(span_name);
    li.appendChild(input_select);
    li.appendChild(span_price)
    li.appendChild(icon_delete)

}

// saveLocalstorage()
reload();

