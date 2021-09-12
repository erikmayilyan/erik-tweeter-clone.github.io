$(document).ready(function() {
  $("#tweet-text").on("input", () => {
    const theCounter = $("#the-counter");
    const maxValue = 140;
    const remaining = maxValue - $("#tweet-text").val().length;
    console.log(remaining);
    let color = "";
    if (remaining < maxValue * 0) {
      color = 'red';
    } else {
      color = '#545149';
    }
    theCounter.text(remaining);
    console.log(color);
    theCounter.css('color', color);
  })
});