const itemForm = document.getElementById('itemForm');
const inputTextItem = document.getElementById('inputTextItem');
const itemList = document.getElementById('itemList');
const btnClear = document.getElementById('btnClearItem');

// Add Item
function addItem(e) {
  e.preventDefault();

  // NewItem
  const newItem = inputTextItem.value;

  // Validate Input
  if (newItem.trim() === '') {
    alert('Por favor, adicione um item');
    return;
  }

  // Create Elements
  const li = createElement('li', 'list-group-item d-flex justify-content-between align-items-start');
  const firstDiv = createElement('div', 'ms-2 me-auto');
  const secondDiv = createElement('div', 'fw-bold');
  const spanDelete = createElement('span', 'text-danger');
  const iconDelete = createElement('i', 'btnDelete fa-regular fa-trash-can');

  // Append Elements
  li.appendChild(firstDiv);
  secondDiv.appendChild(document.createTextNode(newItem));
  firstDiv.appendChild(secondDiv);
  spanDelete.appendChild(iconDelete);
  li.appendChild(spanDelete);
  itemList.appendChild(li);

  // Clear Value Input Field
  inputTextItem.value = '';
}

function createElement(element, className) {
  const elementItem = document.createElement(element);
  elementItem.className = className;
  return elementItem;
}

function removeItem(e) {
  if (e.target.parentElement.classList.contains('btnDelete')) {
    e.target.parentElement.parentElement.remove();
  }
}

function clearItems() {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
}

//  Add Eventlistener
itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
btnClear.addEventListener('click', clearItems);
