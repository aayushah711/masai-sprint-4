var currentUser = localStorage.getItem("current-user")
if (currentUser){
    var users = JSON.parse(localStorage.getItem("users"))
    var user = users[currentUser] 
}
else {
    alert("Please login!")
    location.href = "login.html"
}

function updateDayExpenses(){
    var dayExpenses = document.querySelector("#dayExpenses")
    dayExpenses.textContent = new Date().toDateString() + " : ₹" + user.balance
    console.log("updating date...")
}

function addExpense(){
    console.log("Adding expense")
    var expense = {}
    expense.amount = document.querySelector("#amount").value
    expense.date = document.querySelector("#date").value
    console.log(expense.date)
    expense.category = document.querySelector("#category").value
    expense.notes = document.querySelector("#notes").value
    
    if (user.expenses[expense.date]){
        console.log("expenses exist")
    }
    else {
        console.log("expenses don't exist")
        user.expenses[expense.date] = {}
    }

    user.expenses[expense.date][expense.date.length] = expense
    users[currentUser] = user

    localStorage.setItem("users",JSON.stringify(users))
}

window.onload = function(){
    updateDayExpenses()
}
