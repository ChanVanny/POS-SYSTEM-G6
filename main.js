let card_pro = document.querySelector('.card-products');
let dialog_container = document.querySelector('.dialog_container')
let sideba_center = document.querySelector('.side-bar-center');
// let btn_search = document.querySelector('#button-addon2');
let search_input = document.querySelector('.form-control');

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

        let card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('id', datass[index].category);
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
    // e.preventDefault();
    data = {
        id: input_id.value,
        name: input_name.value,
        price: input_price.value,
        qauntity: input_quantity.value,
        category: input_category.value,
    };

    if (input_name.value != "" && input_price.value != "") {
        datass.push(data);

        saveLocalstorage();
        displayProduct();
    }

    saveLocalstorage();
    displayProduct();
    // console.log(datass)

}

// =============todisplay===============

let cartss = JSON.parse(localStorage.getItem('datass'));


function saveCard() {
    localStorage.setItem('cartss', JSON.stringify(cartss));
}

let arraycart = [];
productstorage = JSON.parse(localStorage.getItem('datass'));
console.log(productstorage)
function displayCard(e) {




    let ul = document.querySelector('#order-list')

    let card_index = e.target.parentElement.dataset.index;
    let name_product = e.target.parentElement.children[0].children[0].textContent;
    let price_unique = e.target.parentElement.children[1].children[0].children[1].textContent;


    let li = document.createElement('li');
    li.classList.add('list');

    let span_name = document.createElement('span');
    span_name.setAttribute('id', 'detail');
    span_name.textContent =  name_product;

    let input_select = document.createElement('input');
    input_select.setAttribute('id', 'details');
    input_select.setAttribute('class', 'detail');
    input_select.type = 'number';
    input_select.value = 1;

    input_select.addEventListener('change',  getQuatities);

    // let qauntity =document.querySelector('#details')
    // console.log(qauntity)

    let span_price1 = document.createElement('span');
    span_price1.setAttribute('id', 'detail');
    span_price1.setAttribute('class', 'price');
    span_price1.textContent = "$" + price_unique;

    let span_price2 = document.createElement('span');
    span_price2.setAttribute('id', 'detail');
    span_price2.setAttribute('class', 'price');
    span_price2.textContent = "$" + price_unique;


    let icon_delete = document.createElement('i');
    icon_delete.setAttribute('id', 'icon-delete');
    icon_delete.className = 'fa fa-trash';


    icon_delete.style.fontSize = '25px';
    icon_delete.style.color = 'red';
    // stor_card.appendChild(ul);
    ul.appendChild(li);
    li.appendChild(span_name);
    li.appendChild(input_select);
    li.appendChild(span_price1);
    li.appendChild(span_price2);
    li.appendChild(icon_delete);
    
  

}

let tdtotalprice = document.querySelector('#total');
let totalprice = document.querySelector('.total-price');
let orderlist = document.querySelector('#order-list')



// function saveLocalstorage() {
//     localStorage.setItem('arraycard', JSON.stringify(arraycard));
// }

// function getTotal(){
    
//     let tototal =0;
//     for (let Element of orderlist){
//         // let costprice = Element.lastElementChild.textContent;
//         // let unitprice = costprice.replace("$", "");
//         // tototal +=parseInt(unitprice)
//         console.log(Element)
//     }
//     // total.textContent=tototal + "$";
// }

function getQuatities(e){
    let qualities = e.target.value;
    let tdtotal =e.target.nextElementSibling;
    // let tdtotal =e.target.closest('td').nextElementSibling;
    let unitprice = tdtotal.textContent.replace("$", ""); 
    tdtotalprice.textContent= 'Total: ' +parseInt(unitprice) * parseInt(qualities)+'$';

    // totalprice.textContent = tdtotal.replace('$','');
    // console.log(totalprice)

}

search_input.addEventListener('keyup',toSearchProduct);

function toSearchProduct(e) {
    let text = e.target.value;
    let pronames = document.querySelectorAll('.name-pro');

    for (let proname of pronames) {
        let name_pro = proname.children[0].textContent;
        console.log(proname.parentElement)
        if (name_pro.indexOf(text) !== -1){
            proname.parentElement.style.display = ""
        } else {
            proname.parentElement.style.display = "none"
        }
    }
}

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
saveCard()
reload();

