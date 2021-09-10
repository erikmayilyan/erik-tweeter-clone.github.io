const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const renderTweets = function(tweets) {
  const container = $("#tweets");
  container.empty();
  // loops through tweets
  for (let i = 0; i < tweets.length; i++) {
    // create variable for each tweet from the createTweetElement function
    const tweet = createTweetElement(tweets[i]);
    // takes return value and appends it to the tweets container
    $('#tweets').prepend(tweet);
  }
}

const createTweetElement = function (tweet) {
  const time = timeago.format(tweet.created_at); 
  const tweetElement = `<article class="firstArticle">
                          <div class="thehead">
                            <div class="tweet-img">
                              <div class="avatar-container">
                                <img alt="${tweet.user.avatars}" src="${tweet.user.avatars}" />
                              </div>
                              <p class="nameUser">${tweet.user.name}</p>
                            </div>
                            <div class="at">${tweet.user.handle}</div>
                          </div>
                          <p class="theText">
                          ${tweet.content.text}
                          </p>
                          <div class="line-container">
                            <div class="line">
                            </div>
                          </div>
                          <div class="ending">
                            <p class="theDate">${time}</p>
                            <div class="tweet-icons">
                              <i class="fas fa-flag custom-css"></i>
                              <i class="fas fa-share custom-css"></i>
                              <i class="fas fa-heart custom-css"></i>
                            </div>
                          </div>
                        </article>`;
  return tweetElement;
}

renderTweets(data);

$("form").on("submit", function (event) {
  let theArea = $("textarea").val();
  event.preventDefault();
  if(theArea.length === 0) {
    $(".error-message").show();
    $(".error-message").text("The text area cannot be Empty! Please, add some content!");
  } 
  if (theArea.length > 140) {
    $(".error-message").show();
    $(".error-message").text("The input is too long!! Please, make you content shorter!");
  }
  if (theArea.length > 0 && theArea.length <= 140) {
    const data = $(this).serialize();
    $.post("/tweets", data)
      .then(() => {
        loadTweets();
        $("textarea").val("");
        $("#tweet-text").trigger("input");
      })
      .catch(error => { console.log(error) })
  }
});

const loadTweets = function () {
  $.ajax("/tweets", { method: 'GET' }).then(function (data) {
    console.log(data);
    renderTweets(data);
  });
}
