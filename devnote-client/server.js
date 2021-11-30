const express = require('express');
const path = require('path');
const app = express();
app.use(express.static('./dist/devnote-client'));
app.get('/*', function (req, res) {
    res.sendFile('index.html', {root: 'dist/devnote-client/'})
});
app.listen(process.env.PORT || 8080);
