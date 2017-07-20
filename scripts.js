var ideaArray = [];

$(document).ready(function() {
  getIdeaFromStorage();
  $("#save-button").attr("disabled", "disabled");
});

$("#idea-body, idea-title").keyup(function() {
  if (($("#idea-title").val() !== "") && ($("#idea-body").val() !== "")) {
    $("#save-button").removeAttr("disabled");
  }
});

$("#save-button").on('click', function(event) {
  event.preventDefault();
  evalInputs();
  $("#save-button").attr("disabled", "disabled");
});

$(".idea-stream").on('click', ".delete-button", function() {
  $(this).closest('.idea-card').remove();
});

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

$(".idea-stream").on('click', "#upvote-button", function() {
  var checkQualityStatus = $(this).closest('.card-quality-flex').find('.idea-quality').text();
  if (checkQualityStatus === 'swill') {
    $(this).closest('.card-quality-flex').find('.idea-quality').text('plausible');
  } else {$(this).closest('.card-quality-flex').find('.idea-quality').text('genius');
  }
});

$(".idea-stream").on('click', "#downvote-button", function() {
  var checkQualityStatus = $(this).closest('.card-quality-flex').find('.idea-quality').text();
  if (checkQualityStatus === 'genius') {
    $(this).closest('.card-quality-flex').find('.idea-quality').text('plausible');
  } else {$(this).closest('.card-quality-flex').find('.idea-quality').text('swill');
  }
});

function FreshIdea(title, body, status) {
  this.title = title;
  this.body = body;
  this.status = "swill";
  this.id = Date.now();
}

function addCard() {
  var newIdea = new FreshIdea($("#idea-title").val(), $("#idea-body").val(), "swill");
  prependCard(newIdea);
  ideaArray.push(newIdea);
  sendIdeaToStorage();
};

function sendIdeaToStorage() {
  localStorage.setItem("ideaArray", JSON.stringify(ideaArray));
}

function getIdeaFromStorage() {
  if (localStorage.getItem('ideaArray')) {
    ideaArray = JSON.parse(localStorage.getItem("ideaArray"));
    ideaArray.forEach(function(element) {
      prependCard(element);
    });
  } else {
    alert('You do not have any of your shit in here');
  }
}

function prependCard(idea) {
  $('.idea-stream').prepend(
    `<div class="idea-card" id="${idea.id}">
      <div class="card-title-flex">
        <h2>${idea.title}</h2>
        <img src="icons/delete.svg" class="card-buttons delete-button" />
      </div>
      <p>${idea.body}</p>
      <div class="card-quality-flex quality-spacing">
        <img src="icons/upvote.svg" class="card-buttons" id="upvote-button"/>
        <img src="icons/downvote.svg"  class="card-buttons" id="downvote-button" />
        <h3>quality: <span class="idea-quality">${idea.status}</span></h3>
      </div>
    </div>`
  );
};

function resetInputs() {
  $('#idea-title').val('');
  $('#idea-body').val('');
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
