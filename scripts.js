//on page load
displayIdeaArray(getArrayFromStorage());

//Listeners

//hover listeners
$(document).on('mouseenter', '.delete-button', deleteHover);
$(document).on('mouseleave', '.delete-button', deleteUnhover);
$(document).on('mouseenter', '#upvote-button', upvoteHover);
$(document).on('mouseleave', '#upvote-button', upvoteUnhover);
$(document).on('mouseenter', '#downvote-button', downvoteHover);
$(document).on('mouseleave', '#downvote-button', downvoteUnhover);

//element listeners
$("#save-button").on('click', saveClick);
$("#idea-body, #idea-title").keyup(saveEnableTest);
$(".idea-stream").on('click', ".delete-button", removeCard);
$(".idea-stream").on('click', "#upvote-button", upvoteClick);
$(".idea-stream").on('click', "#downvote-button", downvoteClick);
$('.idea-stream').on('keyup', 'h2, p', textChanged);
$('#search-bar').on('input', searchStorageArray);
$(".idea-stream").on('click', '.complete-btn', completeClick);

//listener functions
function saveClick(event) {
  event.preventDefault();
  addCard();
  resetInputs();
  saveEnableTest();
}

function saveEnableTest() {
  if ($("#idea-title").val() !== "" && $("#idea-body").val() !== "") {
    $("#save-button").removeAttr("disabled");
  }
  else {
    $("#save-button").attr("disabled", "disabled");
  }
}

function removeCard() {
  var cardID = $(this).closest('.idea-card').attr('id');
  $(this).closest('.idea-card').remove();
  var ideaArray = getArrayFromStorage();
  ideaArray.forEach(function(card, index) {
    if (card.id == cardID) {
      ideaArray.splice(index, 1);
    }
  });
  sendIdeaToStorage(ideaArray);
}

function upvoteClick(){
  var cardID = $(this).closest('.idea-card').attr('id')
  var currentPriority = parseInt($(this).closest('.idea-card').data('priority'));
  if (currentPriority < 4){
    currentPriority ++;
  }
  updateCardQuality(cardID, currentPriority);
}

function downvoteClick(){
  var cardID = $(this).closest('.idea-card').attr('id')
  var currentPriority = parseInt($(this).closest('.idea-card').data('priority'));
  if (currentPriority > 0){
    currentPriority --;
  }
  updateCardQuality(cardID, currentPriority);
}

function searchStorageArray(){
  var searchArray = getArrayFromStorage();
  var searchString = $(this).val().toLowerCase();
  var searchResults = searchArray.filter(function(card){
    return (card.body.toLowerCase().includes(searchString) || card.title.toLowerCase().includes(searchString));
  });
  displayIdeaArray(searchResults);
}

function textChanged(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    this.blur();
  }
  var id = $(this).closest('.idea-card').attr('id');
  var title = $(this).closest('.idea-card').find('h2').text();
  var body = $(this).closest('.idea-card').find('p').text();
  updateCardText(id, title, body);
}

function completeClick(){
  var cardID = $(this).closest('.idea-card').attr('id');
  var ideaArray = getArrayFromStorage();
  ideaArray.forEach(function(card){
    if (card.id == cardID){
      card.complete = !card.complete;
    }
  });
  sendIdeaToStorage(ideaArray);
  displayIdeaArray(getArrayFromStorage());
}

//internal functions
function updateCardQuality(cardID, newQuality){
  var ideaArray = getArrayFromStorage();
  ideaArray.forEach(function(card) {
    if (card.id == cardID) {
      card.status = newQuality;
    }
  });
  sendIdeaToStorage(ideaArray);
  displayIdeaArray(getArrayFromStorage());
}

function addCard() {
  var ideaTitle = $("#idea-title").val();
  var ideaBody = $("#idea-body").val();
  var newIdea = new FreshIdea(ideaTitle, ideaBody);
  ideaArray = getArrayFromStorage();
  ideaArray.push(newIdea);
  sendIdeaToStorage(ideaArray);
  displayIdeaArray(getArrayFromStorage());
}

function resetInputs() {
  $('#idea-title').val('');
  $('#idea-body').val('');
}

function getArrayFromStorage(){
  var ideaArray = JSON.parse(localStorage.getItem("ideaArray"));
  if (ideaArray == null) {
    ideaArray = [];
  }
  return ideaArray;
}

function FreshIdea(title, body) {
  this.title = title;
  this.body = body;
  this.status = 2;
  this.id = Date.now();
  this.complete = false;
}

function sendIdeaToStorage(ideaArray) {
  localStorage.setItem("ideaArray", JSON.stringify(ideaArray));
}

function displayIdeaArray(ideaArray) {
  $('.idea-stream').empty();
  ideaArray = filterCompletedCards(ideaArray);
  ideaArray.forEach(function(element) {
    parseData(element);
  });
}

function filterCompletedCards(rawArray){
  var filteredArray = rawArray.filter(function(card){
    return !card.complete;
  })
  if (filteredArray == null){
    filteredArray = [];
  }
  return filteredArray;
}

function parseData(card){
  var priorityText = translateCardPriority(card.status);
  var classList = "idea-card";
  if (card.complete){
    classList = "idea-card completed"
  }
  prependCard(card, priorityText, classList);
}

function updateCardText(id, title, body) {
  var ideaArray = getArrayFromStorage();
  ideaArray.forEach(function(card) {
    if (card.id == id) {
      card.title = title;
      card.body = body;
    }
  });
  sendIdeaToStorage(ideaArray);
};

function translateCardPriority(number){
  var priorityList = ['None', 'Low', 'Normal', 'High', 'Critical'];
  return priorityList[number];
}

function prependCard(idea, priorityText, classList) {
  $('.idea-stream').prepend(
    `<div class="${classList}" data-priority="${idea.status}"" id="${idea.id}">
      <div class="card-title-flex">
        <h2 contenteditable=true>${idea.title}</h2>
        <img src="icons/delete.svg" class="card-buttons delete-button" />
      </div>
      <p contenteditable=true>${idea.body}</p>
      <div class="card-quality-flex quality-spacing">
        <img src="icons/upvote.svg" class="card-buttons" id="upvote-button"/>
        <img src="icons/downvote.svg"  class="card-buttons" id="downvote-button" />
        <h3>quality: <span class="idea-quality">${priorityText}</span></h3>
      </div>
      <button class="complete-btn" type="button" name="button">Task Complete</button>
    </div>`
  );
}

//hover functions
function deleteHover() {
  $(this).attr('src', 'icons/delete-hover.svg');
}

function deleteUnhover() {
  $(this).attr('src', 'icons/delete.svg');
}

function upvoteHover() {
  $(this).attr('src', 'icons/upvote-hover.svg');
}

function upvoteUnhover() {
  $(this).attr('src', 'icons/upvote.svg');
}

function downvoteHover() {
  $(this).attr('src', 'icons/downvote-hover.svg');
}

function downvoteUnhover() {
  $(this).attr('src', 'icons/downvote.svg');
}
