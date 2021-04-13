// Dependencies
const express = require('express');

// Configure & Run the http server
const app = express();

app.use(express.static(__dirname, { dotfiles: 'allow' } ));

app.listen(80, () => {
  console.log('HTTP server running on port 80');
});

This API can be used to get Card details on a token. https://docs.firstdata.com/org/gateway/docs/api#account-info-lookup