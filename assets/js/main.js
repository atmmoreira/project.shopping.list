const itemForm = document.getElementById('itemForm');
const inputTextItem = document.getElementById('inputTextItem');
const itemList = document.getElementById('itemList');
const btnClear = document.getElementById('btnClearItem');
const inputTextFilter = document.getElementById('inputTextFilter');
const hrLine = document.getElementById('hrLine');

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

  // SetAttribute
  spanDelete.setAttribute('role', 'button');

  // Append Elements
  li.appendChild(firstDiv);
  secondDiv.appendChild(document.createTextNode(newItem));
  firstDiv.appendChild(secondDiv);
  spanDelete.appendChild(iconDelete);
  li.appendChild(spanDelete);

  // Add li to the DOM
  itemList.appendChild(li);
  checkUI();

  // Clear Value Input Field
  inputTextItem.value = '';
}

function createElement(element, className) {
  const elementItem = document.createElement(element);
  elementItem.className = className;
  return elementItem;
}

function removeItem(e) {
  if (e.target.classList.contains('btnDelete')) {
    if (confirm('Tem certeza que deseja excluir?')) {
      e.target.parentElement.parentElement.remove();
    }
  }
  checkUI();
}

function clearItems() {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
  checkUI();
}

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

//  Add Eventlistener
itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
btnClear.addEventListener('click', clearItems);

// Invocate Functions
checkUI();