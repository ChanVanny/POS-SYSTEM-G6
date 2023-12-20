let card_pro = document.querySelector('.card-products');
let dialog_container = document.querySelector('.dialog_container')
let sideba_center = document.querySelector('.side-bar-center');
let search_input = document.querySelector('.form-control');
let box_store = document.querySelector('.on-detail');
let tdtotalprice = document.querySelector('#total');

let datass = [];
let arraycart = [];

// ========== Hide function=========
let hide = (element) => {
    element.style.display = "none";
}

let show = (element) => {
    element.style.display = "block";
}

function saveLocalstorage() {
    localStorage.setItem('datass', JSON.stringify(datass));
    localStorage.setItem('arraycart', JSON.stringify(arraycart));
}

function reload() {
    let productstorage = JSON.parse(localStorage.getItem('datass'))
    let cartstorage = JSON.parse(localStorage.getItem('arraycart'))
    if (productstorage != null) {
        datass = productstorage;
    }
    if (cartstorage != null) {
        arraycart = cartstorage;
    }
}
let input_id = document.querySelector('#id');
let input_name = document.querySelector('#name')
let input_price = document.querySelector('#price');
let input_quantity = document.querySelector('#quantity');
let input_category = document.querySelector('#category');

let onAdd = () => {
    show(dialog_container);
}

function displayProduct() {
    card_pro.remove()
    card_pro = document.createElement('div');
    card_pro.classList.add('card-products');

    for (let index in datass) {

        let card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('id', datass[index].category);
        card.dataset.index = index;

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
        btn.textContent = 'Order';

        btn.addEventListener('click', Card);

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
        const actionBtn = document.createElement('div')
        actionBtn.classList.add("actionBtn")
        actionBtn.appendChild(btn)
        actionBtn.appendChild(icon_delete)
        card.appendChild(actionBtn)
        // card.appendChild(icon_delete)
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
}

// =============todisplay===============

function save() {
    localStorage.setItem('arraycart', JSON.stringify(arraycart));
}

let ul = document.querySelector('#order-list')
function cartdetail() {
    const orderlist = document.querySelector('#order-list');
    orderlist.remove()
    ul = document.createElement('ul');
    ul.setAttribute('id', 'order-list');
    for (let i in arraycart) {
        let li = document.createElement('li');
        li.classList.add('list');
        li.dataset.index = i

        let span_name = document.createElement('span');
        span_name.setAttribute('id', 'detail');
        span_name.textContent = arraycart[i].name;

        let input_select = document.createElement('input');
        input_select.setAttribute('id', 'details');
        input_select.setAttribute('class', 'detail');
        input_select.type = 'number';
        input_select.min = 1
        input_select.value = Math.floor(arraycart[i].total / arraycart[i].price);
        input_select.addEventListener('change', getQuatities);

        let span_price1 = document.createElement('span');
        span_price1.setAttribute('id', 'detail');
        span_price1.setAttribute('class', 'price');
        span_price1.textContent = "$" + arraycart[i].price;

        let span_price2 = document.createElement('span');
        span_price2.setAttribute('id', 'detail');
        span_price2.setAttribute('class', 'price');
        span_price2.textContent = "$" + arraycart[i].total;

        let icon_deletes = document.createElement('i');
        icon_deletes.setAttribute('id', 'icon-delete');
        icon_deletes.className = 'fa fa-trash';
        icon_deletes.style.fontSize = '25px';
        icon_deletes.style.color = 'red';

        icon_deletes.addEventListener('click', deleteDetail);

        ul.appendChild(li);
        li.appendChild(span_name);
        li.appendChild(input_select);
        li.appendChild(span_price1);
        li.appendChild(span_price2);
        li.appendChild(icon_deletes);
    }
    box_store.appendChild(ul);
}

function Card(e) {
    let card_index = e.target.parentElement.parentElement.dataset.index;
    let name_product = datass[card_index].name;
    let card_qauntity = datass[card_index].qauntity

    let item = {
        id: card_index,
        name: name_product,
        price: parseInt(datass[card_index].price),
        qauntity: card_qauntity,
        total: parseInt(datass[card_index].price),
    }
    const index = arraycart.findIndex((element) => element.id === item.id)
    if (index == -1) {
        arraycart.push(item)
    }
    else {
        arraycart[index].total += parseInt(datass[index].price)
    }
    save();
    reload()
    cartdetail();
    getTotal()
}

function getTotal() {
    let totalprice = document.querySelector('.total-price');
    let tototal = 0;
    let arrs = box_store.children[2].children;
    for (let cart of arraycart) {
        tototal += parseInt(cart.total)
    }
    totalprice.textContent = tototal + "$";
}

function getQuatities(e) {
    const index = e.target.parentElement.dataset.index
    let quantity = e.target.value;
    arraycart[index].total = arraycart[index].price * quantity
    saveLocalstorage()
    cartdetail()
    getTotal();
}
function deleteDetail(e) {
    e.target.closest('li').remove();
    const index = e.target.parentElement.dataset.index
    arraycart.splice(index, 1)
    save()
    getTotal()
};
search_input.addEventListener('keyup', toSearchProduct);

function toSearchProduct(e) {
    let text = e.target.value;
    let pronames = document.querySelectorAll('.name-pro');

    for (let proname of pronames) {
        let name_pro = proname.children[0].textContent;
        if (name_pro.indexOf(text) !== -1) {
            proname.parentElement.style.display = ""
        } else {
            proname.parentElement.style.display = "none"
        }
    }
}

// =======select opject==============

function filterOpjects(name) {
    let pronames = document.querySelectorAll('.name-pro');
    for (let proname of pronames) {
        let category = proname.parentElement.id;
        if (category === name) {
            proname.parentElement.style.display = '';
        } else if (name === 'all') {
            proname.parentElement.style.display = '';
        }
        else {
            proname.parentElement.style.display = 'none';
        }
    }
}

let categories = [
    { id: 1, name: "Drink", description: "test" },
    { id: 2, name: "Cookie", description: "test" },
    { id: 3, name: "Fruit", description: "test" },
];
if (localStorage.getItem("categories") != null) {
    categories = JSON.parse(localStorage.getItem("categories"));
}
localStorage.setItem('categories', JSON.stringify(categories))

let btns = document.querySelector('.btncategory');
for (let x of categories) {

    let btnn = document.createElement('button')
    btnn.classList.add('btn');
    btnn.textContent = x.name
    btnn.setAttribute("onclick", "filterOpjects('" + x.name.toLowerCase() + "')");
    btns.appendChild(btnn)
}

reload();
displayProduct()
getTotal();
cartdetail()


