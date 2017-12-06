import pg from 'pg';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';

const app = express();

let votes = {
  visualStudio: 0,
  sublimeText: 0
};

// view engine setup
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('pages/index', { votes });
});

app.post('/vote', (req, res) => {
  let vote = req.body.yourVote;
  if (vote === 'visualStudio') {
    votes.visualStudio = votes.visualStudio + 1;
  } else if (vote === 'sublimeText') {
    votes.sublimeText = votes.sublimeText + 1;
  } else {
    console.log(`Something went wrong: vote contains  ${vote}`);
  }
  res.redirect('/');
});

app.set('port', process.env.PORT || 7777);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT: ${server.address().port}`);
});

export default app;
