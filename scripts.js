//on page load
var ideaArray = [];

$(document).ready(function() {
  getIdeaFromStorage();
});

//Listeners
$(document).on('mouseenter', '.delete-button', deleteHover);
$(document).on('mouseleave', '.delete-button', deleteUnhover);
$(document).on('mouseenter', '#upvote-button', upvoteHover);
$(document).on('mouseleave', '#upvote-button', upvoteUnhover);
$(document).on('mouseenter', '#downvote-button', downvoteHover);
$(document).on('mouseleave', '#downvote-button', downvoteUnhover);

$("#save-button").on('click', saveClick);
$("#idea-body, #idea-title").keyup(saveEnableTest);
$(".idea-stream").on('click', ".delete-button", removeCard);
$(".idea-stream").on('click', "#upvote-button", upvoteClick);
$(".idea-stream").on('click', "#downvote-button", downvoteClick);
$('.idea-stream').on('keyup', 'h2, p', textChanged);

function saveEnableTest() {
  if ($("#idea-title").val() !== "" && $("#idea-body").val() !== "") {
    $("#save-button").removeAttr("disabled");
  }
  else {
    $("#save-button").attr("disabled", "disabled");
  }
}

function saveClick(event) {
  event.preventDefault();
  addCard();
  resetInputs();
  saveEnableTest();
}

function removeCard() {
  $(this).closest('.idea-card').remove();
}

function upvoteClick() {
  var checkQualityStatus = $(this).closest('.card-quality-flex').find('.idea-quality').text();
  if (checkQualityStatus === 'swill') {
    $(this).closest('.card-quality-flex').find('.idea-quality').text('plausible');
  }
  else {
    $(this).closest('.card-quality-flex').find('.idea-quality').text('genius');
  }
}

function downvoteClick() {
  var checkQualityStatus = $(this).closest('.card-quality-flex').find('.idea-quality').text();
  if (checkQualityStatus === 'genius') {
    $(this).closest('.card-quality-flex').find('.idea-quality').text('plausible');
  }
  else {
    $(this).closest('.card-quality-flex').find('.idea-quality').text('swill');
  }
}

function FreshIdea(title, body) {
  this.title = title;
  this.body = body;
  this.status = "swill";
  this.id = Date.now();
}

function addCard() {
  var ideaTitle = $("#idea-title").val();
  var ideaBody = $("#idea-body").val();
  var newIdea = new FreshIdea(ideaTitle, ideaBody);
  prependCard(newIdea);
  ideaArray.push(newIdea);
  sendIdeaToStorage();
}

function sendIdeaToStorage() {
  localStorage.setItem("ideaArray", JSON.stringify(ideaArray));
}

function getIdeaFromStorage() {
  if (localStorage.getItem('ideaArray')) {
    ideaArray = JSON.parse(localStorage.getItem("ideaArray"));
    ideaArray.forEach(function(element) {
      prependCard(element);
    });
  }
}

function textChanged(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    this.blur();
  }
  var id = $(this).closest('.idea-card')[0].id;
  var title = $(this).closest('.idea-card').find('h2').text();
  var body = $(this).closest('.idea-card').find('p').text();
  updateCardText(id, title, body);
}

function updateCardText(id, title, body) {
  ideaArray.forEach(function(card) {
    if (card.id == id) {
      card.title = title;
      card.body = body;
    }
  });
  sendIdeaToStorage();
};

function prependCard(idea) {
  $('.idea-stream').prepend(
    `<div class="idea-card" id="${idea.id}">
      <div class="card-title-flex">
        <h2 contenteditable=true>${idea.title}</h2>
        <img src="icons/delete.svg" class="card-buttons delete-button" />
      </div>
      <p contenteditable=true>${idea.body}</p>
      <div class="card-quality-flex quality-spacing">
        <img src="icons/upvote.svg" class="card-buttons" id="upvote-button"/>
        <img src="icons/downvote.svg"  class="card-buttons" id="downvote-button" />
        <h3>quality: <span class="idea-quality">${idea.status}</span></h3>
      </div>
    </div>`
  );
}

function resetInputs() {
  $('#idea-title').val('');
  $('#idea-body').val('');
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
