const itemForm = document.getElementById('itemForm');
const inputTextItem = document.getElementById('inputTextItem');
const itemList = document.getElementById('itemList');
const btnClear = document.getElementById('btnClearItem');
const inputTextFilter = document.getElementById('inputTextFilter');
const hrLine = document.getElementById('hrLine');

// Display items to the DOM
function displayItems(){
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.forEach(item => addItemToDOM(item));
}
// Add Item
function onAddItemSubmit(e) {
  e.preventDefault();
  // NewItem
  const newItem = inputTextItem.value;
  // Validate Input
  if (newItem.trim() === '') {
    alert('Por favor, adicione um item');
    return;
  }
  // Add item to the DOM
  addItemToDOM(newItem);
  // Add item to localStorage
  addItemToStorage(newItem);
  // Check items in DOM
  checkUI();
  // Clear Value Input Field
  inputTextItem.value = '';
}
// Add Item to the DOM
function addItemToDOM(item) {
  // Create Elements
  const li = createElement('li', 'list-group-item d-flex justify-content-between align-items-start');
  const firstDiv = createElement('div', 'ms-2 me-auto');
  const secondDiv = createElement('div', 'fw-bold');
  const spanDelete = createElement('span', 'text-danger');
  const iconDelete = createElement('i', 'btnDelete fa-regular fa-trash-can');

  // SetAttribute
  spanDelete.setAttribute('role', 'button');

  // Append Elements
  li.appendChild(firstDiv);
  secondDiv.appendChild(document.createTextNode(item));
  firstDiv.appendChild(secondDiv);
  spanDelete.appendChild(iconDelete);
  li.appendChild(spanDelete);

  // Add li to the DOM
  itemList.appendChild(li);
}
// Add item to localStorage
function addItemToStorage(item) {
  const itemsFromStorage = getItemsFromStorage();
  // Add new items to array
  itemsFromStorage.push(item);
  // Convert to JSON string and set to localStorage
  localStorage.setItem('items', JSON.stringify(itemsFromStorage))
}
// Create Element
function createElement(element, className) {
  const elementItem = document.createElement(element);
  elementItem.className = className;
  return elementItem;
}
// Get Items from localStorage
function getItemsFromStorage() {
  let itemsFromStorage;
  // Verify items on localStorage
  if (localStorage.getItem('items') === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem('items'));
  }
  return itemsFromStorage
}
// Remove Item to the DOM
function removeItem(e) {
  if (e.target.classList.contains('btnDelete')) {
    if (confirm('Tem certeza que deseja excluir?')) {
      e.target.parentElement.parentElement.remove();
    }
  }
  checkUI();
}
// Clear Items
function clearItems() {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
  checkUI();
}
// Check UI Elements
function checkUI() {
  const itemsUI = document.querySelectorAll('li');
  if (itemsUI.length === 0) {
    inputTextFilter.className = 'd-none';
    hrLine.className = 'd-none';
    btnClear.className = 'd-none';
  } else {
    inputTextFilter.className = 'd-block form-control';
    hrLine.className = 'd-block';
    btnClear.className = 'd-block btn btn-warning mb-3 w-100';
  }
}
// Filter Items to the DOM
function filterItems(e) {
  const itemsUI = document.querySelectorAll('li');
  const text = e.target.value.toLowerCase();

  itemsUI.forEach(item => {
    const itemName = item.firstElementChild.innerText.toLowerCase();

    if (itemName.indexOf(text) != -1) {
      item.className = 'list-group-item d-flex justify-content-between align-items-start';
    } else {
      item.className = 'd-none';
    }
  })
}
// Initialize App
function init() {
  //  Add Event Listener
  itemForm.addEventListener('submit', onAddItemSubmit);
  itemList.addEventListener('click', removeItem);
  btnClear.addEventListener('click', clearItems);
  inputTextFilter.addEventListener('input', filterItems);
  document.addEventListener('DOMContentLoaded', displayItems);

  // Invocate Functions
  checkUI();
}
init();