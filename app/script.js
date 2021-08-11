class Message {
  constructor (authorId, content, timeStamp) {
    this.authorId = authorId;
    this.content= content;
    this.timeStamp= timeStamp;
  }
}

function scrollToBottom () {
  const lastestMessage = $('#ChatBox');
  lastestMessage[0].scrollTop = lastestMessage[0].scrollHeight;
}

$(document).ready(function () {
  function ApiMessage() {
    const min = 2;
    const max = 10;
    let rand = Math.floor(Math.random() * max + min);
    $.ajax({url: 'https://cw-quotes.herokuapp.com/api/quotes/random', success: function (result) {
      let userMessage = $('<p id="OtherMessage"></p>');
      let message = result.result.text;
      let author = result.result.author;
      let now = Date(Date.now()).slice(0, 21);
      let newMessage = new Message(author, message, now);
      userMessage.text(newMessage.content + '\n-\n' + newMessage.authorId);
      $('#ChatBox').append(userMessage);
      scrollToBottom();
      setTimeout(ApiMessage, rand * 1000);
    }});
  }

  ApiMessage();

  $('#User-message').on('submit', function (event) {
    event.preventDefault();
    let $message = $(this).find('[name=LatestMessage]');
    let message=$message.val();
    let now = Date(Date.now());//Thu Jun 24 2021 13:52:52 GMT-0400 (Eastern Daylight Time)
    let newMessage = new Message(true, message, now);
    let userMessage = $('<p id="UserMessage"></p>');
    userMessage.text(newMessage.content);
    $('#ChatBox').append(userMessage);
    scrollToBottom();
    $('#User-message')[0].reset();
  });
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err))
  })
};