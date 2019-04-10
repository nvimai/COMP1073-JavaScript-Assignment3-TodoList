// Declare the variables to hold the elements
var addItemField = document.getElementById('addItem');
var unfinishedField = document.getElementById('unfinishedList');
var finishedField = document.getElementById('finishedList');
var addItemName = addItemField.querySelector('input');
var addItemSubmit = addItemField.querySelector('button');

// Focus to the text box
addItemName.focus();

// Add eventListner to the Add item button
addItemSubmit.addEventListener('click', function(){
  if(addItemName.value != '') {
    addItem(addItemName.value, false);
  }else {
    alert('The Item Nam could not be empty');
  }
});

// Create the item constructor
function Universal(isDone, name) {
  this.isDone = isDone;
  this.name = name;
}

// Create the displayIt function to display item on the list
Universal.prototype.displayIt = function() {
  // Create the article element to contain the Checkbox, text, delete and some more elements of an item
  var item = document.createElement('article');
  item.classList.add('item');
  
  // Create the input checkbox element
  var itemCheck = document.createElement('input');
  itemCheck.type = 'checkbox';
  itemCheck.classList = 'checkbox';

  // Create the text element for the item name
  var itemName = document.createElement('p');
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
    finishedField.prepend(item);
  } else {
    unfinishedField.prepend(item);
  }
}
// Render some examples
addItem('COMP1006 Lab 5', true);
addItem('COMP1073 Assignment 3', true);
addItem('Workout', false);

// Add an item into the universal list
function addItem(itemName, isDone = false) {
  // If the input is not empty then add an item into the list else display the alert
  if(itemName && itemName != '') {
    var item = new Universal(isDone, itemName);
    item.displayIt();
    playSound('added');
  }
}

// Eidt an item in side the universal list
function editItem(event) {
  let itemName = event.target;
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
  applyButton.addEventListener('click', function() {
    updateItem(event);
  });
}
// Update the item after user hit the apply button
function updateItem(event) {
  let itemName = event.target;
  let divItemName = itemName.parentNode.querySelector('div');
  // input text
  let editItemName = divItemName.querySelector('.editItemName');

  if(editItemName.value != '') {

    itemName.textContent = editItemName.value;
    // Invisibly the item name heading
    itemName.style.display = 'unset';
    // Visibly the edit div
    divItemName.style.display = 'none';
    // Play the sound when applied successfully
    playSound('applied');
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
    // Play the sound when deleted successfully
    playSound('deleted');
  }
  // checkbox is the element that was clicked
	if (event.target && event.target.nodeName === 'INPUT' && event.target.className === 'checkbox') {
    if(event.target.checked === true)
    {
      finishedField.prepend(event.target.parentNode);
      // Play the sound when done
      playSound('done');
    }
  }
  // heading is the element that was clicked
  if (event.target && event.target.className === 'itemName') {
    // Revoke the editItem function
    editItem(event);
	}
};
finishedField.onclick = function(event) {
	// delete button is the element that was clicked
	if (event.target && event.target.nodeName === 'BUTTON' && event.target.className === 'delete') {
		event.target.parentNode.parentNode.removeChild(event.target.parentNode);
    // Play the sound when deleted successfully
    playSound('deleted');
  }
  // checkbox is the element that was clicked
	if (event.target && event.target.nodeName === 'INPUT' && event.target.className === 'checkbox') {
    if(event.target.checked === false)
    {
      unfinishedField.prepend(event.target.parentNode);
      // Play the sound when incompleted
      playSound('unfinished');
    }
  }
  // heading is the element that was clicked
  if (event.target && event.target.className === 'itemName') {
    // Revoke the editItem function
    editItem(event);
	}
};

// Play audios
function playSound(type) {
  let audioFile;
  if(type){
    switch(type) {
      case 'added' : audioFile = 'audios/GlassPing.wav'; break;
      case 'deleted' : audioFile = 'audios/GunFire.wav'; break;
      case 'applied' : audioFile = 'audios/HornHonk.wav'; break;
      case 'unfinished' : audioFile = 'audios/ATone.wav'; break;
      case 'done' : audioFile = 'audios/Tada.wav'; break;
    }
    let sound = new Audio(audioFile); // buffers automatically when created
    var playPromise = sound.play();

  // Credit to https://developers.google.com/web/updates/2017/06/play-request-was-interrupted
  if (playPromise !== undefined) {
    playPromise.then(play => {
      // Automatic playback started!
    })
    .catch(error => {
      // Auto-play was prevented
    });
  }
  }
}