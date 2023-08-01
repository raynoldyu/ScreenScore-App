import mysql from 'mysql';
import config from './config.js';
import fetch from 'node-fetch';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import response from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static(path.join(__dirname, "client/build")));


app.post('/api/loadUserSettings', (req, res) => {

	let connection = mysql.createConnection(config);
	let userID = req.body.userID;

	let sql = `SELECT mode FROM user WHERE userID = ?`;
	console.log(sql);
	let data = [userID];
	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		//let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();
});
 
app.post('/getMovies', (req, res) => {
	const connection = mysql.createConnection(config);
  
	const sql = 'SELECT id, name, year, quality FROM movies';
  
	connection.query(sql, (error, results) => {
		if (error) {
		console.error('Error retrieving movies from the database:', error);
		return res.status(500).json({ error: 'Failed to retrieve movies from the database' });
		}
	res.json(results);
	});
	connection.end();
});

app.post('/addReview', (req, res) => {
	let connection = mysql.createConnection(config);
	let { movieID, reviewTitle, reviewContent, reviewScore } = req.body;

	let sql = `INSERT INTO Review(movieID, reviewTitle, reviewContent, reviewScore) VALUES (?, ?, ?, ?)`;
	let data = [movieID, reviewTitle, reviewContent, reviewScore];
  
	connection.query(sql, data, (error, results) => {
	  if (error) {
		console.error('Error adding review to the database:', error);
		res.status(500).json({ error: 'Failed to add review to the database' });
		return;
	  }
  
	  res.json({ message: 'Review added successfully' });
	});
  
	connection.end();
  });  

  app.post('/api/search', (req, res) => {
	const { title, actor, director } = req.body;
  
	const conditions = [];
	const values = [];
  
	if (title) {
	  conditions.push('(movies.name = ?)');
	  values.push(title);
	}
  
	if (director) {
	  conditions.push('(CONCAT(directors.first_name, " ", directors.last_name) = ?)');
	  values.push(director);
	}
  
	if (actor) {
	  conditions.push('(CONCAT(actors.first_name, " ", actors.last_name) = ?)');
	  values.push(actor);
	}
  
	let query = `
	  SELECT
		movies.name AS title,
		CONCAT(directors.first_name, ' ', directors.last_name) AS director,
		GROUP_CONCAT(DISTINCT Review.reviewContent) AS reviews,
		AVG(Review.reviewScore) AS averageReviewScore
	  FROM
		movies
		LEFT JOIN movies_directors ON movies.id = movies_directors.movie_id
		LEFT JOIN directors ON movies_directors.director_id = directors.id
		LEFT JOIN Review ON movies.id = Review.movieID
		LEFT JOIN roles ON movies.id = roles.movie_id
		LEFT JOIN actors ON roles.actor_id = actors.id
	`;
  
	if (conditions.length > 0) {
	  const whereClause = conditions.join(' AND ');
	  query += `WHERE ${whereClause}`;
	}
  
	query += `
	  GROUP BY
		movies.id, directors.first_name, directors.last_name;
	`;
	
	  let connection = mysql.createConnection(config);
	  connection.query(query, values, (error, results) => {
		if (error) {
		  console.error('Error fetching search results:', error);
		  res.status(500).json({ error: 'Error fetching search results' });
		} else {
		  res.status(200).json(results);
		}
		connection.end();
	  });
	});
  

	app.get('/api/getRecommendationsByGenre', (req, res) => {
		const { title } = req.query;
	  
		if (!title) {
		  return res.status(400).json({ error: 'Movie title not provided' });
		}
		
		const query = `
		  SELECT
			movies.name AS title
		  FROM
			movies AS selected_movie
			LEFT JOIN movies_genres AS selected_movie_genres ON selected_movie.id = selected_movie_genres.movie_id
			LEFT JOIN movies_genres ON selected_movie_genres.genre = movies_genres.genre
			LEFT JOIN movies ON movies_genres.movie_id = movies.id
		  WHERE
			selected_movie.name = ?
			AND movies.name IS NOT NULL
			AND movies.name != ?
		  GROUP BY
			movies.id;
		`;
		
		const connection = mysql.createConnection(config);
		connection.query(query, [title, title], (error, results) => {
		  if (error) {
			console.error('Error fetching movie recommendations:', error);
			res.status(500).json({ error: 'Error fetching movie recommendations' });
		  } else {
			res.status(200).json(results);
		  }
		  connection.end();
		});
	  });
  
app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
//app.listen(port, '172.31.31.77'); //for the deployed version, specify the IP address of the server
