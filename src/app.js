import pg from 'pg';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';

const app = express();

let votes = {
  visualStudio: 0,
  sublimeText: 0
};

let client = new pg.Client('postgres://postgres@172.17.0.1:9000/postgres');

client.connect((error) => {
   if (error) throw error;

   client.query('SELECT number_of_votes FROM votes', (error, result) => {
    if (error) throw error;
    
    votes.visualStudio = result.rows[0].number_of_votes;
    votes.sublimeText  = result.rows[1].number_of_votes;
   })
})


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
    client.query(`UPDATE votes SET number_of_votes=${votes.visualStudio} WHERE option_name='visualStudio'`, (error, result) => {
      if (error) throw error;
    })
  } else if (vote === 'sublimeText') {
    votes.sublimeText = votes.sublimeText + 1;
    client.query(`UPDATE votes SET number_of_votes=${votes.sublimeText} WHERE option_name='sublimeText'`, (error, result) => {
      if (error) throw error;
    })
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
