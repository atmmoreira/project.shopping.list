const itemForm = document.getElementById('itemForm');
const inputTextItem = document.getElementById('inputTextItem');
const itemList = document.getElementById('itemList');
const btnClear = document.getElementById('btnClearItem');
const inputTextFilter = document.getElementById('inputTextFilter');
const hrLine = document.getElementById('hrLine');
const btnAddItem = document.getElementById('btnAddItem');
let isEditMode = false;

// Display items to the DOM
function displayItems() {
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.forEach((item) => addItemToDOM(item));
  // Check items in DOM
  checkUI();
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
  // Check for edit mode
  if (isEditMode) {
    const itemToEdit = itemList.querySelector('.item-list-selected');

    removeItemFromStorage(itemToEdit.textContent);
    itemToEdit.classList.remove('item-list-selected');
    itemToEdit.remove();
    isEditMode = false;
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
  const spanEdit = createElement('span', 'text-warning mx-1');
  const iconDelete = createElement('i', 'btnDelete fa-regular fa-trash-can');
  const iconEdit = createElement('i', 'btnEdit fa-regular fa-pen-to-square');

  // SetAttribute
  spanDelete.setAttribute('role', 'button');
  spanEdit.setAttribute('role', 'button');

  // Append Elements
  li.appendChild(firstDiv);
  secondDiv.appendChild(document.createTextNode(item));
  firstDiv.appendChild(secondDiv);
  spanDelete.appendChild(iconDelete);
  spanEdit.appendChild(iconEdit);
  li.appendChild(spanEdit);
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
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
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
  return itemsFromStorage;
}
// On Click Item to the DOM
function onClickItem(e) {
  if (e.target.classList.contains('btnDelete')) {
    removeItem(e.target.parentElement.parentElement);
  } else {
    setItemToEdit(e.target.parentElement.parentElement);
  }
}
// Edit item to the DOM
function setItemToEdit(item) {
  isEditMode = true;
  itemList.querySelectorAll('li').forEach(i => i.classList.remove('item-list-selected'))

  item.classList.add('item-list-selected');
  btnAddItem.classList.add('btn-success');
  btnAddItem.innerHTML = 'Edit Item';
  inputTextItem.value = item.textContent;
}
// Remove Item to the DOM
function removeItem(item) {
  if (confirm('Tem certeza que deseja excluir este item?')) {
    // Remove item from DOM
    item.remove();
    // Remove Item from localStorage
    removeItemFromStorage(item.textContent);
    // Check UI Elements
    checkUI();
  }
}
// Remove Item From Storage
function removeItemFromStorage(item) {
  let itemsFromStorage = getItemsFromStorage();
  // Filter out item to be removed
  itemsFromStorage = itemsFromStorage.filter((i) => i !== item);
  // Re-set to localStorage
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}
// Clear Items
function clearItems() {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
  // Clear from localStorage
  localStorage.removeItem('items');
  // Check elements in the DOM
  checkUI();
}
// Check UI Elements
function checkUI() {
  // Make sure the input field value its empty
  inputTextItem.value = '';
  // Get Elements from the DOM
  const itemsUI = document.querySelectorAll('li');
  // Verify the UI
  if (itemsUI.length === 0) {
    inputTextFilter.className = 'd-none';
    hrLine.className = 'd-none';
    btnClear.className = 'd-none';
  } else {
    inputTextFilter.className = 'd-block form-control';
    hrLine.className = 'd-block';
    btnClear.className = 'd-block btn btn-warning mb-3 w-100';
  }
  // Return the old value from btn
  btnAddItem.innerHTML = 'Add Item';
  btnAddItem.classList.remove('btn-success');
  // Change the status to edit mode to false
  isEditMode = false;
}
// Filter Items to the DOM
function filterItems(e) {
  const itemsUI = document.querySelectorAll('li');
  const text = e.target.value.toLowerCase();

  itemsUI.forEach((item) => {
    const itemName = item.firstElementChild.innerText.toLowerCase();

    if (itemName.indexOf(text) != -1) {
      item.className =
        'list-group-item d-flex justify-content-between align-items-start';
    } else {
      item.className = 'd-none';
    }
  });
}
// Initialize App
function init() {
  //  Add Event Listener
  itemForm.addEventListener('submit', onAddItemSubmit);
  itemList.addEventListener('click', onClickItem);
  btnClear.addEventListener('click', clearItems);
  inputTextFilter.addEventListener('input', filterItems);
  document.addEventListener('DOMContentLoaded', displayItems);

  // Invocate Functions
  checkUI();
}
init();
