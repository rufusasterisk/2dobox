$("#save-button").on('click', function(event) {
  event.preventDefault();
  evalInputs();
});

$(".idea-stream").on('click', ".delete-button", function() {
  $(this).closest('.idea-card').remove();
});

$('#upvote-button').on('click', increaseSPG);

function FreshIdea(title, body) {
  this.title = title;
  this.body = body;
  this.status = "Swill";
  this.id = Date.now();
}

//functionality of increaseSPG is still not working properly
//Upvote/Downvote buttons do not behave the way they should
function increaseSPG() {
  var ideaQuality = $(this).closest('.idea-quality').text();
  if ($(this).siblings('.idea-quality').text() === "Swill") {
    $(this).siblings('.idea-quality').text('Plausible');
  } else if ($(this).siblings('siblings').text('Plausible')) {
    $(this).text('Genius');
  }
};

// writes text for new card
function addCard() {
  var ideaTitle = $("#idea-title").val();
  var ideaBody = $("#idea-body").val();
  var newIdea = new FreshIdea(ideaTitle, ideaBody);
  prependCard(newIdea);
  sendIdeaToStorage(newIdea);
};

function sendIdeaToStorage(object) {
  var uniqueIdeaId = object.id;
  localStorage.setItem(uniqueIdeaId, JSON.stringify(object));
}

function getIdeaFromStorage(object) {
  var uniqueIdeaId = object.id;
  localStorage.getItem(uniqueIdeaId, JSON.parse(object));
}

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
