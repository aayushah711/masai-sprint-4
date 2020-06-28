"use strict";

var BASE_URL = "expenses.html"
var activeDate

function getActiveDate() {
    var params = new URLSearchParams(document.location.search)
    activeDate = params.get("activeDate")
    if (activeDate === null){
        activeDate = new Date()
    }
    else {
        activeDate = new Date(activeDate)
    }
}

var totalExpenseForDay = 0 // Initialised total expenses for the day with 0
var currentUser = localStorage.getItem("current-user")
if (currentUser){ // If current user is available: fetch its data
    var users = JSON.parse(localStorage.getItem("users"))
    var user = users[currentUser] 
}
else { // Else ask to login
    alert("Please login!")
    location.href = "login.html"
}

// On load display : 
// 1. expense cards 
// 2. total expenses for the day in rupees on the gray navbar
window.onload = function(){
    getActiveDate()
    expenseCards()
    updateDayExpenses()
}

function expenseCards(){
    var expenseCards = document.querySelector("#expenseCards")
    expenseCards.innerHTML = ""
    // var activeDate = "2020-06-18" // Add logic here
    var expensesForDay = user.expenses[activeDate.toDateString()]
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

function userBalance(){
    // var activeDate = "2020-06-18" // Add logic here
    console.log(activeDate)
    if (user.balance[activeDate.toDateString()]){
        user.balance[activeDate.toDateString()]["expenses"] = totalExpenseForDay
    }
    else {
        console.log("balances don't exist")
        user.balance[activeDate.toDateString()] = {
            "date": activeDate.toDateString(),
            "expenses": totalExpenseForDay,
            "incomes": 0,
        }
    }
    user.balance[activeDate.toDateString()]["balance"] = Number(user.balance[activeDate.toDateString()]["incomes"]) - Number(user.balance[activeDate.toDateString()]["expenses"])
    localStorage.setItem("users",JSON.stringify(users))
}

// returns a tag with required attributes & content (Eg. div tag with class="card")
function createTag(tag,attributes,content){
    var tag = document.createElement(tag)
    for (var key in attributes){
        tag.setAttribute(key,attributes[key])
    }
    tag.textContent = content
    return tag
}

// updates the gray navbar with total expenses for the day in rupees
function updateDayExpenses(){
    var dayExpenses = document.querySelector("#dayExpenses")
    dayExpenses.textContent = activeDate.toDateString() + " : ₹" + totalExpenseForDay
    console.log("updating date...")
}

// Go to the previous day page
function prevDayExpense(){
    activeDate.setDate(activeDate.getDate()-1)
    refreshPage()
}

// Go to the next day page
function nextDayExpense(){
    activeDate.setDate(activeDate.getDate()+1)
    refreshPage()
}

function refreshPage(){
    var params = new URLSearchParams();
    params.set("activeDate",activeDate.toDateString())
    location = BASE_URL+"?"+params
}

// // Gives a string for today's date in the format yyyy-mm-dd (Eg. "2020-06-18")
// function todaysDate(date=new Date()) {
//     var d = new Date(date),
//         month = '' + (d.getMonth() + 1),
//         day = '' + d.getDate(),
//         year = d.getFullYear();

//     if (month.length < 2) 
//         month = '0' + month;
//     if (day.length < 2) 
//         day = '0' + day;

//     return [year, month, day].join('-');
// }

// Enables user to add a new expense item & stores that data
function addExpense(){
    console.log("Adding expense")
    var expense = {}
    expense.amount = document.querySelector("#amount").value
    expense.date = new Date(document.querySelector("#date").value)
    expense.date = expense.date.toDateString()
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

