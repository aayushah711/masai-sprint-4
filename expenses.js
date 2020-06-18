var totalExpenseForDay = 0
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
    dayExpenses.textContent = new Date().toDateString() + " : ₹" + totalExpenseForDay
    console.log("updating date...")
}

function userBalance(){
    var date = "2020-06-18" // Add logic here
    if (user.balance[date]){
        user.balance[date]["expenses"] = totalExpenseForDay
    }
    else {
        console.log("balances don't exist")
        user.balance[date] = {
            "date": date,
            "expenses": totalExpenseForDay,
            "incomes": 0,
        }
    }
    user.balance[date]["balance"] = Number(user.balance[date]["incomes"]) - Number(user.balance[date]["expenses"])
    localStorage.setItem("users",JSON.stringify(users))
}

function expenseCards(){
    var expenseCards = document.querySelector("#expenseCards")
    var date = "2020-06-18" // Add logic here
    var expensesForDay = user.expenses[date]
    if (expensesForDay){
        for (var i=0;i<expensesForDay.length;i++){
            var expense = expensesForDay[i]
            var card = createCard(expense.amount,expense.category,expense.notes)
            totalExpenseForDay += Number(expense.amount)
            expenseCards.append(card)
        }
    }

    userBalance()

    
    function createCard(amount,category,notes){
        var h5 = createTag("h5",{"class":"mt-0"},category)
        var mediaBody = createTag("div",{"class":"media-body"})
        mediaBody.append(h5,notes)
        var media = createTag("div", {"class":"media"})
        var pic = createTag("i",{"class":"fas fa-arrow-right mr-3"})
        media.append(pic,mediaBody)
        var col10 = createTag("div", {"class":"col-10"})
        col10.append(media)
        var h4 = createTag("h4",{"class":"text-danger"},"₹"+amount)
        var col2 = createTag("div", {"class":"col-2 d-flex justify-content-center align-items-top"})
        col2.append(h4)
        var row = createTag("div", {"class":"row m-0"})
        row.append(col10,col2)
        var cardBody = createTag("div", {"class":"card-body"})
        cardBody.append(row)
        var card = createTag("div", {"class":"card m-2"})
        card.append(cardBody)
        return card
    }
}

function createTag(tag,attributes,content){
    var tag = document.createElement(tag)
    for (key in attributes){
        tag.setAttribute(key,attributes[key])
    }
    tag.textContent = content
    return tag
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
        user.expenses[expense.date] = []
    }

    console.log(expense.date.length)
    user.expenses[expense.date].push(expense)
    users[currentUser] = user

    localStorage.setItem("users",JSON.stringify(users))
    location.href = "expenses.html"
}

window.onload = function(){
    expenseCards()
    updateDayExpenses()
}
