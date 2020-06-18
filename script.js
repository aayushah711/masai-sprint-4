function loginUser(){
    event.preventDefault()
    console.log("logging in")
    var users = localStorage.getItem("users")
    users = JSON.parse(users)
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value

    if (users[email]){
        if (users[email]["password"] === password){
            localStorage.setItem("current-user", email)
            location.href = "dashboard.html"
        }
        else {
            alert("Incorrect password")
        }
    }
    else {
        alert("Incorrect email or password!")
    }

}

function displaySignedup(){
    var card = document.querySelector(".card-body")
    var div = document.createElement("div")
    div.setAttribute("class","alert alert-success")
    div.setAttribute("role","alert")
    div.innerText = "Signup Successful! "
    var a = document.createElement("a")
    a.setAttribute("href","login.html")
    a.setAttribute("class","text-warning")
    a.textContent = "Click here to login!"
    div.append(a)
    card.append(div)
}

function createUser(){
    var user = {}
    user.firstName = document.getElementById("firstName").value 
    user.lastName = document.getElementById("lastName").value 
    user.email = document.getElementById("email").value
    user.password = document.getElementById("password").value
    user.balance = {}
    user.expenses = {}
    user.incomes = {}
    return user
}

function signupUser(){
    console.log("signing up")
    var users = localStorage.getItem("users")
    users = JSON.parse(users)
    if (users){
        console.log("users exist")
        if (users[document.getElementById("email").value]){
            alert("This email already exists! Please try again!")
            return
        }
    }
    else {
        console.log("users don't exist")
        users = {}
    }
    var user = createUser()
    console.log(user.email)
    users[user.email] = user
    localStorage.setItem("users",JSON.stringify(users))
    displaySignedup()
}

function checkPassword(){
    event.preventDefault()
    var password = document.getElementById("password").value
    var confirmPassword = document.getElementById("confirmPassword").value
    if (password === confirmPassword && password != ""){
        signupUser()
    }
    else{
        alert("Password does not match!")
    }
}
