

// writes text for new card
function addCard() {
  var ideaTitle = $("#idea-title").val();
  var ideaBody = $("#idea-body").val();
  var newIdea = new FreshIdea(ideaTitle, ideaBody);
  // FreshIdea(ideaTitle, ideaBody);
    console.log(newIdea);
  prependCard(newIdea);
};

function prependCard(idea) {
  $('.idea-stream').prepend(
    `<div class="idea-card">
      <div class="card-title-flex">
        <h2>${idea.title}</h2>
        <img src="icons/delete.svg" class="card-buttons" id="delete-button" />
      </div>
      <p>${idea.body}</p>
      <div class="card-quality-flex">
        <img src="icons/upvote.svg" class="card-buttons" id="upvote-button"/>
        <img src="icons/downvote.svg"  class="card-buttons" id="downvote-button" />
        <h3>quality: <span class="idea-quality">swill</span></h3>
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
$("#save-button").on('click', function(event) {
  event.preventDefault();
  evalInputs();
  // var newIdea = new FreshIdea(pram1, param2);

});

// delete button
$(document).on('click', "#delete-button", function() {
  $(this).parent('.idea-card').remove();
});

// buttons to toggle
$(document).on('click', "#upvote", function() {
  $(this).find('.idea-quality')
});

//object to store user created info
function FreshIdea(title, body) {
  this.title = title;
  this.body = body;
  this.status = "Swill";
}


// on click, grab the input values, and pass those into the consturcotr funciton as arguments
