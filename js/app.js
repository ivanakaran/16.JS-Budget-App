let budgetInput = document.getElementById("budget-input");
let expenseInput = document.getElementById("expense-input");
let amountInput = document.getElementById("amount-input");

let budgetAmount = document.getElementById("budget-amount");
let expenseAmount = document.getElementById("expense-amount");
let balanceAmount = document.getElementById("balance-amount");

let budgetFeedback = document.querySelector(".budget-feedback");
let expenseFeedback = document.querySelector(".expense-feedback");

let budgetForm = document.getElementById("budget-form");
let expenseForm = document.getElementById("expense-form");

// ADD BUDGET FORM
function addBudget(e) {
  e.preventDefault();
  let budgetValue = budgetInput.value
  if (budgetValue === "" || budgetValue < 0) {
    budgetFeedback.style.display = "block";
    budgetFeedback.innerHTML = "Value Cannot be empty or negative!";
  } else {
    budgetAmount.innerHTML = parseInt(budgetInput.value);
    balanceAmount.innerHTML = parseInt(budgetInput.value) - parseInt(expenseAmount.innerText);
    balanceAmount.style.color = 'green';
    document.getElementById('balanceSign').style.color = 'green';
  }
  budgetInput.value = '';

};
budgetForm.addEventListener("submit", addBudget);

// ALERT VALUE HIDE ON CLICK
document.addEventListener("click", function () {
  budgetFeedback.style.display = "none";
  expenseFeedback.style.display = "none";
});

// CREATE TABLE
let list = document.querySelector(".list");
let table = document.createElement("table");
table.classList.add("table");
list.appendChild(table);
let tbody = document.createElement("tbody");
let tbody2 = document.createElement("tbody");
tbody.classList.add("w-100");
tbody.classList.add("pl-5");
table.appendChild(tbody);
tbody.innerHTML += `<tr><th> Expense Title</th>
<th class="pl-5 w-100">Expense Value</th><th></th></tr>`;
tbody.style.display = "none";

// ADD EXPENSE FORM
function addExpense(e) {
  e.preventDefault();
  if (expenseInput.value === "" || amountInput.value === "") {
    expenseFeedback.style.display = "block";
    expenseFeedback.innerHTML = "Value Cannot be empty";
  } else {
    expenseAmount.innerHTML = parseInt(amountInput.value) + parseInt(expenseAmount.innerText);
    balanceAmount.innerHTML = parseInt(budgetAmount.innerText) - parseInt(expenseAmount.innerText);
    tbody.innerHTML += `<tr class="text-danger font-weight-bold"><td>` + expenseInput.value + `</td> <td>` + amountInput.value + `</td>
        <td><i class="far fa-edit edit-icon"></i></td>
        <td><i class="far fa-trash-alt delete-icon"></i></td></tr>`;
    tbody.style.display = "block";
    expenseForm.reset();
    // DELETE BUTTON
    let deleteB = document.querySelectorAll('.delete-icon');
    function deleteIcon(e) {
      let deleteButton = e.currentTarget;
      let row = deleteButton.parentNode.parentNode;
      let value1 = row.getElementsByTagName('td')[1];
      let rowCount = table.rows.length;
      expenseAmount.innerHTML = parseInt(expenseAmount.innerText) - parseInt(value1.innerText);
      balanceAmount.innerHTML = parseInt(budgetAmount.innerText) - parseInt(expenseAmount.innerText);
      row.parentNode.removeChild(row);
      if (rowCount === 2) {
        console.log(e);
        tbody.style.display = "none";
      }
    }
    deleteB.forEach(function (element) {
      element.addEventListener('click', deleteIcon);
    });
    // EDIT BUTTON
    let edit = document.querySelectorAll('.edit-icon');
    function editIcon(e) {
      let editButton = e.currentTarget;
      let rowEdit = editButton.parentNode.parentNode;
      let value1 = rowEdit.getElementsByTagName('td')[0];
      let value2 = rowEdit.getElementsByTagName('td')[1];
      let rowCount = table.rows.length;
      amountInput.value = value2.innerText;
      expenseInput.value = value1.innerText;
      expenseAmount.innerHTML = parseInt(expenseAmount.innerText) - parseInt(value2.innerText);
      balanceAmount.innerHTML = parseInt(budgetAmount.innerText) - parseInt(expenseAmount.innerText);
      rowEdit.parentNode.removeChild(rowEdit);
      if (rowCount === 2) {
        console.log(e);
        tbody.style.display = "none";
      }
    }
    edit.forEach(function (element) {
      element.addEventListener('click', editIcon);
    });

  }
};

expenseForm.addEventListener("submit", addExpense);




