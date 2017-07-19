$("#save-button").on('click', function(event) {
  event.preventDefault();
  evalInputs();
});

$(".idea-stream").on('click', ".delete-button", function() {
  $(this).closest('.idea-card').remove();
  console.log(this);
});

// writes text for new card
function addCard() {
  var ideaTitle = $("#idea-title").val();
  var ideaBody = $("#idea-body").val();
  var newIdea = new FreshIdea(ideaTitle, ideaBody);
  // FreshIdea(ideaTitle, ideaBody);
    console.log(newIdea);
  prependCard(newIdea);
  // delete button

};

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
        <h3>quality: <span class="idea-quality">${this.status}</span></h3>
      </div>
    </div>`
  );

}

//input reset draft
function resetInputs() {
  $('#idea-title').val('');
  $('#idea-body').val('');
  $('#save-button')
};

// Creating cards as objects
// JQuery date.now
// When creating objects you can check the quality of the card

// checks to make sure cards have text

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

//save button --> creates new card


// delete button
$(document).on('click', "#delete-button", function() {
  $(this).closest('.idea-card').remove();
});



// $(document).on('click', "#upvote", function() {
//   $(this).find('.idea-quality').toggle
function increaseSPG() {
  var ideaQuality = $('.idea-quality').text();
  if ($('.idea-quality').text('Swill')) {
    $('.idea-quality').text('Plausible');
  } else if ($('.idea-quality').text('Plausible')) {
    $('.idea-quality').text('Genius');
  }
};

$('#upvote-button').on('click', increaseSPG);



// function upvoteDisplay() {
//   $('.idea-quality').text();
// });

  // if swill then plausible
  // if plausible then genius
  // if genius button will be off
  // jQuery .text similar to a .val()

// buttons to toggle
// $(document).on('click', "#upvote", function() {
//   $(this).find('.idea-quality')


//object to store user created info
function FreshIdea(title, body) {
  this.title = title;
  this.body = body;
  this.status = "Swill";
  this.id = Date.now();
}
