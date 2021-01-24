const express = require('express');
try {
const parserTools = require ("./client/src/Parser.js");
}catch (error){
  console.error (error);

}finally {
  console.log(typeof parserTools.Parser);
}
// 
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});


app.post('/api/world', (req, res) => {
  console.log(req.body);
  
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}. But I want to give you something back:`,
  );
});

app.listen(port, () => console.log(`Listening on port ${port}`));
