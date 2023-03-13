# Web3-Movie-Browser-API

| Command | Description | Parameter(s) | Value |
| --- | --- | --- | --- |
| `/api/movies` | Returns all movies | n/a | n/a |
| `/api/movies/limit/num` | Returns the first num movies. num must be 1 - 200. | num | Number |
| `/api/movies/id` | Returns a single movie whose id matches the provided id. | id | Number |
| `/api/movies/tmdb/id` | Returns a single movie whose tmdb id matches the provided id. | id | Number |
| `/api/movies/year/min/max` | Returns all movies whose year is between the two supplied values. min must be larger than max. | min, max | Numbers |
| `/api/movies/ratings/min/max` | Returns all movies whose average rating is between the two supplied values. min must be larger than max. | min, max | Numbers |
| `/api/movies/title/text` | Returns movies whose title contains the provided text. Case insensitive. | text | String |
| `/api/movies/genre/name` | Returns movies that have a genre name that matches the provided value. Case insensitive. | name | String |
