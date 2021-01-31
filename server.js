const express = require('express');
const PORT = 5000;
const app = express();

app.use(express.static('src'));

app.get('/', (request, response) => {
  response.sendFile(path.resolve(__dirname, 'src/index.html'));
});

app.listen(PORT, () => {
  console.log(`Your app is listening on port ${PORT}`);
});

// cara 2
// var express = require('express');
// var serveStatic = require('serve-static');
// app = express();

// app.use(serveStatic(__dirname + "/src"));
// var port = process.env.PORT || 5000;
// app.listen(port);
// console.log('server started '+ port);