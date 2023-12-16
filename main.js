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
let input_quatity = document.querySelector('#quantity');

let onAdd = () => {
    // btn_dialog.lastElementChild.textContent = "Add Product";
    show(dialog_container);
}

function displayProduct(){
    card_pro.remove()
    card_pro = document.createElement('div');
    card_pro.classList.add('card-products');

    for (let index in datass) {

        let card = document.createElement('card');
        card.classList.add('card');
        card.dataset.index = index;
        // card.addEventListener('click',createCard);

        let h4 =document.createElement('h4');
        h4.classList.add('name-pro')
        let bold = document.createElement('b');
        bold.textContent=datass[index].name;

        let text_content = document.createElement('div');
        text_content.classList.add('text-content-card');

        let div = document.createElement('div');
        div.classList.add('quantity');

        let pp = document.createElement('p');
        let span =document.createElement('span');
        span.classList.add('quan');
        span.textContent='quantity :';

        let span_num =document.createElement('span');
        span_num.classList.add('num')
        span_num.textContent=datass[index].qauntity;

        let p =document.createElement('p');
        p.classList.add('price')
        p.textContent = datass[index].price + '$';


        let btn = document.createElement('button');
        btn.setAttribute('id','add-card');
        btn.textContent='View';


        let icon_delete = document.createElement('i');
        icon_delete.setAttribute('id','icon-delete');
        icon_delete.className='fa fa-trash';
        icon_delete.style.fontSize='25px';
        icon_delete.style.color='red';


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
        qauntity: input_quatity.value,
    };

    datass.push(data);

    saveLocalstorage();
    displayProduct();
    
    
}


// saveLocalstorage()
reload();

