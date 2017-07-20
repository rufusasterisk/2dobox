var ideaArray = [];

$("#save-button").on('click', function(event) {
  event.preventDefault();
  evalInputs();
});

$(".idea-stream").on('click', ".delete-button", function() {
  $(this).closest('.idea-card').remove();
});

$('.idea-stream').on('click', $('#upvote-button'), increaseSPG);

function FreshIdea(title, body, status) {
  this.title = title;
  this.body = body;
  this.status = status || "Swill";
  this.id = Date.now();
}

//functionality of increaseSPG is still not working properly
//Upvote/Downvote buttons do not behave the way they should
function increaseSPG() {
  // grab a generated card that corresponds to the button the user is clicking
  var uniqueCard = $(this).children('.idea-card').children('id');
  console.log("idea-card: ", uniqueCard);
  console.log("this: ", $(this));
  // get id of generated card
  console.log("id: ", $(uniqueCard.id));
  // change the text of just that cards button states
  var ideaQuality = $(this).closest('.idea-quality').text();



  // console.log("ideaQuality: ", $(this.closest.id));
  // if ($(this).siblings('.idea-quality').text() === "Swill") {
  //   $(this).siblings('.idea-quality').text('Plausible');
  // } else if ($(this).siblings('siblings').text('Plausible')) {
  //   $(this).text('Genius');
  // }


};

// writes text for new card
function addCard() {
  var ideaTitle = $("#idea-title").val();
  var ideaBody = $("#idea-body").val();
  var ideaStatus = "Swill"
  var newIdea = new FreshIdea(ideaTitle, ideaBody, ideaStatus);
  prependCard(newIdea);
  ideaArray.push(newIdea);
  sendIdeaToStorage();
};

function sendIdeaToStorage() {
  localStorage.setItem("ideaArray", JSON.stringify(ideaArray));
}

function getIdeaFromStorage() {
  if (localStorage.getItem('ideaArray')) {
    var storedCards = JSON.parse(localStorage.getItem("ideaArray"));
    storedCards.forEach(function(element) {
      prependCard(element);
    });
  } else {
    alert('You do not have any of your shit in here');
  }
}

// ideaArray.forEach(function(element) {
//
// })
//
// var rebuildCard = ideaArray.forEach(function(element) {
//   rebuildCard(element.title, element.body, element.status, element.id)
// });
// var cardFromStorage = rebuildCard(title, body, status, id);
// // rebuildCard(storedCards);
// // function to rebuild the card after pulling it from array
// // unsure about syntax and where exatly to call this
// function RebuildCard(title, body, status, id) {
//   this.title = title;
//   this.body = body;
//   this.status = status;
//   this.id = id;
// }

$(document).ready(function() {
  getIdeaFromStorage();
});

function prependCard(idea) {
  $('.idea-stream').prepend(
    `<div class="idea-card" id="${idea.id}">
      <div class="card-title-flex">
        <h2>${idea.title}</h2>
        <img src="icons/delete.svg" class="card-buttons delete-button" />
      </div>
      <p>${idea.body}</p>
      <div class="card-quality-flex">
        <img src="icons/upvote.svg" class="card-buttons" id="upvote-button"/>
        <img src="icons/downvote.svg"  class="card-buttons" id="downvote-button" />
        <span class="idea-quality">quality: ${this.status}</span>
      </div>
    </div>`
  );
};

function resetInputs() {
  $('#idea-title').val('');
  $('#idea-body').val('');
  $('#save-button')
};

function evalInputs() {
  var ideaTitle = $("#idea-title").val();
  var ideaBody = $("#idea-body").val();
  if (!ideaTitle) {
    return alert("Please enter a title.");
  } else if (!ideaBody) {
    return alert ("Please enter something in the body.");
  } else {
    addCard();
    resetInputs();
  }
};

$(document).on('click', ".delete-button", function() {
  $(this).closest('.idea-card').remove();
});

$(document).on('mouseenter', '.delete-button', function() {
  $(this).attr('src', 'icons/delete-hover.svg');
});

$(document).on('mouseleave', '.delete-button', function() {
  $(this).attr('src', 'icons/delete.svg');
});

$(document).on('mouseenter', '#upvote-button', function() {
  $(this).attr('src', 'icons/upvote-hover.svg');
});

$(document).on('mouseleave', '#upvote-button', function() {
  $(this).attr('src', 'icons/upvote.svg');
});

$(document).on('mouseenter', '#downvote-button', function() {
  $(this).attr('src', 'icons/downvote-hover.svg');
});

$(document).on('mouseleave', '#downvote-button', function() {
  $(this).attr('src', 'icons/downvote.svg');
});
