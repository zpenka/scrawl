1

* GET /notes route returns all notes
  * maybe limited to 100?
  * no other operations allowed on all notes

* GET /notes/:note returns a note by id
* POST /notes/:note inserts a note
* PUT /notes/:note updates a note
* DELETE /notes/:note deletes a note

* update test helper to have fixture method for less boilerplate

2

* Able to like and un-like notes
  * Add /notes/:note/like route which toggles 'liked' status of a note
  * Add ability to update like status on PUT /notes/:note route
