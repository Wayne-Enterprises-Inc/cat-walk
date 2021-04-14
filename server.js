const express = require('express');

const app = express();


app.use(express.json());
//app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

const Port = 2287;
app.listen(Port, () => {
  console.log(`Listening on Port http://localhost:${Port}` )
})