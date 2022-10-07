# Favorite Movies and Series App

This app fetches a list of movies, which a user can scroll through, while choosing whether to Add to favorites or Delete altogether. 

The entry point is the homepage that greets a user with basic navigation instructions. 

## Visiting "Movies"
When one clicks on movies, the application GETS data from the movies endpoint, then loads a new page presenting a viewer with Movie cards, where there's "Add to Favorites" and "Delete Movie" option under each one.

If one clicks to "Add to Favorites", the movie's favorite status is set to true in the json database via a PATCH operation. 
On the other hand, if the action is "Delete Movie," the movie is deleted from the database via a DELETE operation, and then the page's re-rendered with the new list of movies. 

On this page, there's also a "View Favorite Movies" button. Clicking on it reveals a list of favorited movies, and if there's none, a message advises the user to navigate back to Movies page using the "View All Movies" button at the top of the page. 

Still on the Favorites page, one can perform the a Movie deletion operation or Removing a movie from favorites - both actions that trigger a re-render. 

## Visiting "Add a Favorite Movie"
Clicking this link leads a user to a form allowing a user to key in details of a new movie to POST to the database. 

In the form, a user can specify the movie title, year of release, and whether or not its a favorite title. The form lacks a method to add a poster image since this would require fetching an external API. However, in order to cover for that, the application holds a dummy image. 