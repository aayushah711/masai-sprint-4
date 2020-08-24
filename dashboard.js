var currentUser = localStorage.getItem('current-user');
if (currentUser) {
	var users = JSON.parse(localStorage.getItem('users'));
	var user = users[currentUser];
} else {
	alert('Please login!');
	location.href = 'login.html';
}

function updateData() {
	var balance = 0;
	var expenses = 0;
	if (user['balance']) {
		let balances = user['balance'];

		for (let key in balances) {
			balance += balances[key]['balance'];
			expenses += balances[key]['expenses'];
		}
	} else {
		var expenses = 0;
		var balance = 0;
	}

	var expensesProgress = document.querySelector('#expensesProgress');
	expensesProgress.textContent = 'Expenses ₹' + expenses;

	var balanceProgress = document.querySelector('#balanceProgress');
	var balanceCard = document.querySelector('#balanceCard');
	var balanceNav = document.querySelector('#balanceNav');
	console.log(balanceNav);

	if (balance < 0) {
		balanceProgress.textContent = 'Balance: -₹' + -balance;
		balanceProgress.setAttribute('class', 'text-danger');
		balanceCard.textContent = '-₹' + -balance;
		balanceNav.textContent = '-₹' + -balance;
		balanceNav.setAttribute('class', 'my-0 text-danger');
	} else {
		balanceProgress.textContent = 'Balance ₹' + balance;
		balanceCard.textContent = '₹' + balance;
		balanceNav.textContent = '₹' + balance;
	}

	var expensesCard = document.querySelector('#expensesCard');
	expensesCard.textContent = '₹' + expenses;

	expensesProgress.parentElement.nextElementSibling.firstElementChild.style = 'width: ' + expenses / 2000 * 100 + '%';
}

window.onload = function() {
	updateData();
};
