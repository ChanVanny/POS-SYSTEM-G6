
let buttonAddCategory = document.querySelector('.add-category');
let categoryForm = document.querySelector('.category-form');
let showCategory= document.querySelector('.show-category');
let buttonView= document.querySelector('.button-view');

const Name = document.querySelector('#name');
const description = document.querySelector('#description');
const saveButton = document.querySelector('#save');
const tbody = document.querySelector('tbody');

let info = [
    {id: 1, name: "hello world"},
    {id: 2, name: "bro code"},
    {id: 3, name: "bro code"},
];

function saveStorage() {
    localStorage.setItem("info", JSON.stringify(info));
}

function getStorage() {
    if (JSON.parse(localStorage.getItem("info")) != null) {
        info = JSON.parse(localStorage.getItem("info"));
    }
}

function showElement(){
    showCategory.classList.add('hide')
    categoryForm.classList.remove('hide')
}
function viewCategory(){
    showCategory.classList.remove("hide")
    categoryForm.classList.add("hide")
}
let addButton = buttonAddCategory.addEventListener('click', showElement)
buttonView.addEventListener('click', viewCategory);

function showCategories(){
    for (const object of info) {
        let tr = document.createElement('tr');
        let tdId = document.createElement('td');
        let tdName = document.createElement('td');
        let tdAction = document.createElement('td');
    
        let spanDelete = document.createElement('span');
        let spanEdit = document.createElement('span');
        let iDelete = document.createElement('i');
        let iEdit = document.createElement('i');

        tdId.textContent = object.id;
        tdName.textContent = object.name;
    
        iDelete.className = "ri-delete-bin-6-line";
        iEdit.className = "ri-pencil-fill";
    
        tdAction.appendChild(iDelete);
        tdAction.appendChild(iEdit);
    
        spanDelete.appendChild(iDelete);
        spanEdit.appendChild(iEdit);
    
        tr.appendChild(tdId);
        tr.appendChild(tdName);
        tr.appendChild(tdAction);
        tdAction.appendChild(spanDelete);
        tdAction.appendChild(spanEdit);
        tbody.appendChild(tr);
        
    }
}




saveButton.addEventListener('click', (e) => {
    let newCate = {
        id: info.length + 1,
        name: Name.value
    };
    info.push(newCate);
    saveStorage();
});

getStorage();
showCategories();
// localStorage.clear()