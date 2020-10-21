const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

app.use('/public', express.static(__dirname + '/public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('./controllers/view-routes')(app);
require('./controllers/api-routes')(app);

// Syncing our database and logging a message to the user upon success
app.listen(PORT, function () {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
});

