

let buttonAddCategory = document.querySelector('.add-category');
let categoryForm = document.querySelector('.category-form');
let showCategory = document.querySelector('.show-category');
let buttonView = document.querySelector('.button-view');

// Add Category
const inputName = document.querySelector('#name');
const description = document.querySelector('#description');
const saveButton = document.querySelector('#save');
const updateButton = document.querySelector('#update');
const table = document.querySelector('table');

let info = [
    { id: 1, name: "Drink", description: "test" },
    { id: 2, name: "Cake", description: "test" },
    { id: 3, name: "Fruit", description: "test" },
];

function saveStorage() {
    localStorage.setItem("info", JSON.stringify(info));
}

function getStorage() {
    if (JSON.parse(localStorage.getItem("info")) != null) {
        info = JSON.parse(localStorage.getItem("info"));
    }
}

function showForm() {
    resetInput()
    showCategory.classList.add('hide')
    categoryForm.classList.remove('hide')
    updateButton.classList.add('hide')
    saveButton.classList.remove('hide')

}
function viewCategory() {
    showCategory.classList.remove("hide")
    categoryForm.classList.add("hide")
}

function showCategories() {
    const tbody = document.querySelector('tbody');
    tbody.remove();
    let tBody = document.createElement('tbody');
    for (let index = 0; index < info.length; index++) {
        let tr = document.createElement('tr');
        let tdId = document.createElement('td');
        let tdName = document.createElement('td');
        let tdAction = document.createElement('td');

        let spanDelete = document.createElement('span');
        let spanEdit = document.createElement('span');
        let iDelete = document.createElement('i');
        let iEdit = document.createElement('i');

        tdId.textContent = info[index].id;
        tdName.textContent = info[index].name;

        iDelete.className = "ri-delete-bin-6-line";
        iEdit.className = "ri-pencil-fill";

        tdAction.appendChild(iDelete);
        tdAction.dataset.index = index
        tdAction.appendChild(iEdit);

        spanDelete.appendChild(iDelete);
        spanDelete.addEventListener('click', deleteCategory);
        spanEdit.appendChild(iEdit);
        spanEdit.addEventListener('click', editCategory);

        // AppendChild
        tr.appendChild(tdId);
        tr.appendChild(tdName);
        tr.appendChild(tdAction);
        tdAction.appendChild(spanDelete);
        tdAction.appendChild(spanEdit);
        tBody.appendChild(tr);
    }
    table.appendChild(tBody);

}
function deleteCategory(e) {
    const index = e.target.parentElement.parentElement.dataset.index
    info.splice(index, 1)
    saveStorage()
    getStorage()
    showCategories()

}
function resetInput() {
    inputName.value = ""
    description.value = ""
}

function update(e) {
    e.preventDefault()
    let index = localStorage.getItem("index")
    let category = {
        id: info[index].id,
        name: inputName.value,
        description: description.value
    }
    if (inputName.value != "" && description.value != "") {
        info.splice(index, 1, category);
        saveStorage();
        getStorage();
        showCategories();
        viewCategory();
    }

}
function editCategory(e) {
    const index = e.target.parentElement.parentElement.dataset.index;
    localStorage.setItem("index", index);
    showForm();
    inputName.value = info[index].name;
    description.value = info[index].description;
    saveButton.classList.add('hide');
    updateButton.classList.remove('hide');
    updateButton.addEventListener('click', update);
}

function addCategory(e) {
    e.preventDefault();
    let newCate = {
        id: info.length + 1,
        name: inputName.value,
        description: description.value
    };
    if (inputName.value != "" && description.value != "") {
        info.push(newCate);
        viewCategory();
        saveStorage();
        getStorage();
        showCategories();
    }
    

}

// Add EventListener
saveButton.addEventListener('click', addCategory)
buttonAddCategory.addEventListener('click', showForm)
buttonView.addEventListener('click', viewCategory);

// Call Function
// saveStorage()
getStorage();
showCategories();
// localStorage.clear()