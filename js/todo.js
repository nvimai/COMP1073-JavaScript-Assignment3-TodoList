// Declare the variables to hold the elements
var addItemField = document.getElementById('addItem');
var unfinishedField = document.getElementById('unfinisedList');
var finishedField = document.getElementById('finisedList');
var addItemName = addItemField.querySelector('input');
var addItemSubmit = addItemField.querySelector('button');

// Focus to the text box
addItemName.focus();

// Create the item list
var universalList = new Array();

// Add eventListner to the Add item button
addItemSubmit.addEventListener('click', addItem);

// Create the item constructor
function Universal(isDone, name) {
  this.isDone = isDone;
  this.name = name;
}

// Create the displayIt function to display item on the list
Universal.prototype.displayIt = function() {
  // Create the article element to contain the Checkbox, heading, delete and some more elements of an item
  var item = document.createElement('article');
  item.classList.add('item');
  
  // Create the input checkbox element
  var itemCheck = document.createElement('input');
  itemCheck.type = 'checkbox';
  itemCheck.classList = 'checkbox';

  // Create the heading element for the item name
  var itemName = document.createElement('h3');
  itemName.classList.add('itemName');

  // Create div to handle the edit item name group
  var editDiv = document.createElement('div');

  // Create the input text for item name editting
  var editItemName = document.createElement('input');
  editItemName.classList.add('editItemName');
  editItemName.type = 'text';

  // Create the apply button to apply the item name changed
  var applyEditItemName = document.createElement('button');
  applyEditItemName.classList.add('apply');
  applyEditItemName.textContent = 'Apply';

  // Append 2 above element into the div and hide it
  editDiv.appendChild(editItemName);
  editDiv.appendChild(applyEditItemName);
  editDiv.style.display = 'none';
  
  // Create the delete item button
  var itemDelete = document.createElement('button');
  itemDelete.classList.add('delete');
  itemDelete.textContent = 'Delete';  
  
  // Set the content of item name element from the property name
  itemName.textContent = this.name;
  // Set the input checkbox element from property isDone
  itemCheck.checked = (this.isDone === true) ? true : false;

  item.appendChild(itemCheck);
  item.appendChild(itemName);
  item.appendChild(editDiv);
  item.appendChild(itemDelete);
  if(this.isDone === true) {
    finishedField.appendChild(item);
  } else {
    unfinishedField.appendChild(item);
  }
}

// Add an item into the universal list
function addItem() {
  // If the input is not empty then add an item into the list else display the alert
  if(addItemName.value != '') {
    var item = new Universal(false, addItemName.value);
    item.displayIt();
  } else {
    alert('Please type the item name');
  }
  addItemName.focus();
}

var eventItem;
// Eidt an item in side the universal list
function editItem() {
  let itemName = eventItem.target;
  let divItemName = itemName.parentNode.querySelector('div');
  // input text
  let editItemName = divItemName.querySelector('.editItemName');
  let applyButton = divItemName.querySelector('.apply');
  
  editItemName.value = itemName.textContent;
  // Invisibly the item name heading
  itemName.style.display = 'none';
  // Visibly the edit item name div
  divItemName.style.display = 'unset';

  editItemName.focus();
  applyButton.addEventListener('click', updateItem);
}
// Update the item after user hit the apply button
function updateItem() {
  let itemName = eventItem.target;
  let divItemName = itemName.parentNode.querySelector('div');
  // input text
  let editItemName = divItemName.querySelector('.editItemName');

  if(editItemName.value != '') {

    itemName.textContent = editItemName.value;
    // Invisibly the item name heading
    itemName.style.display = 'unset';
    // Visibly the edit div
    divItemName.style.display = 'none';
    // item.displayIt();
  } else {
    alert('Please type the item name');
    editItemName.focus();
  }
}

// Take an item off the list
unfinishedField.onclick = function(event) {
	//delete button is the element that was clicked
	if (event.target && event.target.nodeName === 'BUTTON' && event.target.className === 'delete') {
		event.target.parentNode.parentNode.removeChild(event.target.parentNode);
  }
  // checkbox is the element that was clicked
	if (event.target && event.target.nodeName === 'INPUT' && event.target.className === 'checkbox') {
    if(event.target.checked === true)
    {
      finishedField.appendChild(event.target.parentNode);
    }
  }
  if (event.target && event.target.className === 'itemName') {
    // User a variable to handle the event
    eventItem = event;
    // Revoke the editItem function
    editItem();
	}
};
finishedField.onclick = function(event) {
	// delete button is the element that was clicked
	if (event.target && event.target.nodeName === 'BUTTON' && event.target.className === 'delete') {
		event.target.parentNode.parentNode.removeChild(event.target.parentNode);
  }
  // checkbox is the element that was clicked
	if (event.target && event.target.nodeName === 'INPUT' && event.target.className === 'checkbox') {
    if(event.target.checked === false)
    {
      unfinishedField.appendChild(event.target.parentNode);
    }
  }
  
  if (event.target && event.target.className === 'itemName') {
    // User a variable to handle the event
    eventItem = event;
    // Revoke the editItem function
    editItem();
	}
};