# Movie Sagas

## Description

_Duration: 2 Week Sprint_

For this project, I was tasked with taking a partially built movie list webapp and adding additional functionality and styling.  Starting work not from a blank slate but from some partially completed state was an interesting challenge and one that I'm sure is much more common in the actual workplace - taking stock of what routes were already built, what the SQL queries were actually getting, etc, was the first hurdle.  The webapp initially only displayed the movie list to client and nothing really more. Once I had a good understanding of what needed to be done, I added a details view for each movie, an edit function within that details view as well as a delete route, the ability to add new movies, a search query on the main page, and a genre filter on the main page.  The biggest challenge by far wasn't these functional pieces but getting Material UI to behave the way I wanted it to.  This was my first time using Material UI, and something like aligning inputs and buttons was much trickier for me than writing the SQL queries to filter by partial strings.  I'm fairly satisfied with the final product but will be digging much further into Material UI from here on out so it doesn't feel quite as much like I'm trying to wrangle a wild beast to get my app to look prettier.

### Prerequisites
- [Node.js](https://nodejs.org/en/)
- PostgreSQL

## Installation
1. Create a database named `saga_movies_weekend`,
2. The queries in the `database.sql` file are set up to create all the necessary tables and populate the needed data to allow the application to run correctly. The project is built on [Postgres](https://www.postgresql.org/download/), so you will need to make sure to have that installed. We recommend using Postico to run those queries as that was used to create the queries, 
3. Open up your editor of choice and run an `npm install`
4. Run `npm run server` in your terminal
5. Run `npm run client` in your terminal
6. The `npm run client` command will open up a new browser tab for you!

## Usage
1. A user may use the app to view details for a movie. They can do this by clicking on the movie image or the details button, or by directly navigating to the dedicated url for that details page.
2. From here, they can edit the movie by clicking the edit button. The edit functionality allows them to edit the image, movie title, genres, or description of the film. They can also delete the movie entirely from here.
3. On the home page, a user may filter the movie by genre, or enter a search term and use that to display only movies matching that search term and/or genre. The homepage will only display up to 10 movies at a time, and a user is notified that there are more movies not showed with a message at the bottom of the page.
4. A user may also add a new movie by clicking 'add movie', and entering an image, title, description, and genres.

## Built With
This version uses React, Redux, Express, MaterialUI, and PostgreSQL (a full list of dependencies can be found in `package.json`).

## Acknowledgement
Thanks to [Prime Digital Academy](www.primeacademy.io) who equipped and helped me to make this application a reality. (Thank your people)

## Support
If you have suggestions or issues, please email me at [smwade1115@gmail.com](smwade1115@gmail.com)