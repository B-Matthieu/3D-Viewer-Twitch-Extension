// Twitch Extension Helper
Twitch.ext.onAuthorized((auth) => {
  document.getElementById("message").innerText =
    "Hello, " + auth.channelId + "!";
});

Twitch.ext.onContext((context) => {
  console.log("Extension context:", context);
});