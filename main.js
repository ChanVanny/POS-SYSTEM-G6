let username = document.querySelector('#username');
let password = document.querySelector('#pw');
let inputBox = document.querySelector('#login');

let accs = [
    {username:"user", password:"2024"},
    {username:"vanny", password:"1010"},
]

// login function
function login(){
    let name = username.value;
    let pw = password.value;
    let isTrue = false
    
    for( let acc of accs){
        if(acc.username == name && acc.password == pw){
            isTrue = true
        }
    }
    if(isTrue){
        window.location.href = "/pages/order/order.html"
    }
    else{
        alert('Your password is not correct!')
    }
}
inputBox.addEventListener('click', login);
