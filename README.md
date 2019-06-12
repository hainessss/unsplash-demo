## overview ##

Project is an express server that serves a static React frontend.  

The application exposes the Unpslash image search api. 

In addition, the server exposes the following endpoints

/photos - images to show on first load

/photos/search - query for images base on a search term

/spellcheck - simple input spellcheck.  I decided to have the spellcheck on the backend so I did not have to serve
up an english dictionary with my react app.

The spellcheck works by pruning all non-letter characters from the search term with a regex replace. Then if the term is not an english word it loops through the letters of the word looking for vowels.  If it finds a vowel it replaces it with all the other vowels hoping to make a valid word. If a valid word is not made, the process is repeated for each new word generated; this time starting at the very next letter of the last replaced vowel. 

On the front-end, I used styled components in conjuction with a UI library that I built/am building.  The library is built with styled components so it is easily extensible.  

To handle the search logic. I used observables from the rxjs library.  Each time a search term change is triggerd, the change is broadcasted to the AsyncSearchStream located at `client/utils/async-search`. The stream then debounces the input by 500ms, filters search terms that are below 3 characters long, and removes inputs that are same as the last input. The stream then maps the term to a spellcheck suggestion from the `/spellcheck` endpoint and then to a unsplash query from the `/photos/search` endpoint. 

TODO:
* there are lots of obscure words in english.  would be better to index suggestions based on frequency of use.
* when searching for such obscure words often times there are only a handful of results and they are not displayed correctly/aesthetically 
* add tests
* add more error handling

hosted at:
https://unpslash-demo.herokuapp.com/

Time spent:
8 hrs