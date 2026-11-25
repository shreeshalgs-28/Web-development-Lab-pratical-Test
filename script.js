const nameInput = document.getElementById("nameInput");
const amountInput = document.getElementById("amountInput");
const categoryInput = document.getElementById("categoryInput");
const addBtn = document.getElementById("addBtn");
const errorBox = document.getElementById("errorBox");
const filterSelect = document.getElementById("filterSelect");
const totalAmount = document.getElementById("totalAmount");
const listBox = document.getElementById("listBox");

let expenses = [];

addBtn.addEventListener("click", function () {
  const name = nameInput.value.trim();
  const amount = Number(amountInput.value);
  const category = categoryInput.value;

  if (name === "") {
    errorBox.textContent = "Please enter an expense name.";
    return;
  }
  if (!amountInput.value || isNaN(amount) || amount <= 0) {
    errorBox.textContent = "Please enter a valid positive amount.";
    return;
  }
  if (category === "") {
    errorBox.textContent = "Please select a category.";
    return;
  }

  errorBox.textContent = "";

  expenses.push({
    id: Date.now(),
    name: name,
    amount: amount,
    category: category
  });

  nameInput.value = "";
  amountInput.value = "";
  categoryInput.value = "";
  nameInput.focus();

  renderUI();
});

filterSelect.addEventListener("change", renderUI);

function deleteExpense(id) {
  expenses = expenses.filter(function (item) {
    return item.id !== id;
  });
  renderUI();
}

function renderUI() {
  const selectedCategory = filterSelect.value;

  const filtered =
    selectedCategory === "All"
      ? expenses
      : expenses.filter(function (item) {
          return item.category === selectedCategory;
        });

  listBox.innerHTML = "";

  if (filtered.length === 0) {
    const empty = document.createElement("div");
    empty.className = "empty-msg";
    empty.textContent = "No expenses to display.";
    listBox.appendChild(empty);
  } else {
    filtered.forEach(function (item) {
      const row = document.createElement("div");
      row.className = "row";

      const leftInfo = document.createElement("div");
      leftInfo.className = "left-info";

      const itemName = document.createElement("span");
      itemName.className = "item-name";
      itemName.textContent = item.name;

      const itemCat = document.createElement("span");
      itemCat.className = "item-cat";
      itemCat.textContent = item.category;

      leftInfo.appendChild(itemName);
      leftInfo.appendChild(itemCat);

      const rightInfo = document.createElement("div");
      rightInfo.className = "right-info";

      const itemAmt = document.createElement("span");
      itemAmt.className = "item-amt";
      itemAmt.textContent = "₹" + item.amount;

      const delBtn = document.createElement("button");
      delBtn.type = "button";
      delBtn.className = "del-btn";
      delBtn.textContent = "Delete";
      delBtn.addEventListener("click", function () {
        deleteExpense(item.id);
      });

      rightInfo.appendChild(itemAmt);
      rightInfo.appendChild(delBtn);

      row.appendChild(leftInfo);
      row.appendChild(rightInfo);

      listBox.appendChild(row);
    });
  }

  let total = 0;
  expenses.forEach(function (item) {
    total += item.amount;
  });
  totalAmount.textContent = total;
}

renderUI();