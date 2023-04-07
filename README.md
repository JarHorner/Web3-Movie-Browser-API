# Web3-Movie-Browser-API

| Command | Description | Parameter(s) | Value | Link |
| --- | --- | --- | --- | --- |
| `/api/movies` | Returns all movies | n/a | n/a | https://web3-moviebrowserapi.glitch.me/api/movies |
| `/api/movies/limit/num` | Returns the first num movies. num must be 1 - 200. | num | Number | https://web3-moviebrowserapi.glitch.me/api/movies/limit/5 |
| `/api/movies/id` | Returns a single movie whose id matches the provided id. | id | Number | https://web3-moviebrowserapi.glitch.me/api/movies/13 |
| `/api/movies/tmdb/id` | Returns a single movie whose tmdb id matches the provided id. | id | Number | https://web3-moviebrowserapi.glitch.me/api/movies/tmdb/1091 |
| `/api/movies/year/min/max` | Returns all movies whose year is between the two supplied values. min must be larger than max. | min, max | Numbers | https://web3-moviebrowserapi.glitch.me/api/movies/year/1999/2000 |
| `/api/movies/ratings/min/max` | Returns all movies whose average rating is between the two supplied values. min must be larger than max. | min, max | Numbers | https://web3-moviebrowserapi.glitch.me/api/movies/ratings/8/9 |
| `/api/movies/title/text` | Returns movies whose title contains the provided text. Case insensitive. | text | String | https://web3-moviebrowserapi.glitch.me/api/movies/title/kill |
| `/api/movies/genre/name` | Returns movies that have a genre name that matches the provided value. Case insensitive. | name | String | https://web3-moviebrowserapi.glitch.me/api/movies/genre/war |
