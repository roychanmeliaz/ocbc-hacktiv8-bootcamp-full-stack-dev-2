"""
This is the people module and supports all the REST actions for the
people data
"""

from flask import make_response, abort
from config import db
from models import Directors, Movies, MoviesSchema


def read_all():
    """
    This function responds to a request for /api/people/movies
    with the complete list of movies, sorted by note timestamp

    :return:                json list of all movies for all people
    """
    # Query the database for all the movies
    movies = Movies.query.order_by(db.asc(Movies.id)).limit(100).all()

    # Serialize the list of movies from our data
    movies_schema = MoviesSchema(many=True)
    data = movies_schema.dump(movies)
    return data


def read_one(director_id, movie_id):
    """
    This function responds to a request for
    /api/people/{director_id}/movies/{movie_id}
    with one matching note for the associated person

    :param director_id:       Id of person the note is related to
    :param movie_id:         Id of the note
    :return:                json string of note contents
    """
    # Query the database for the note
    movie = (
        Movies.query.join(Directors, Directors.id == Movies.director_id)
        .filter(Directors.id == director_id)
        .filter(Movies.id == movie_id)
        .one_or_none()
    )

    # Was a note found?
    if movie is not None:
        movie_schema = MoviesSchema()
        data = movie_schema.dump(movie)
        return data

    # Otherwise, nope, didn't find that note
    else:
        abort(404, f"Movie not found for Id: {movie_id}")


def create(director_id, movie):
    """
    This function creates a new movie related to the passed in director id.

    :param director_id:       Id of the director the movie is related to
    :param movie:            The JSON containing the movie data
    :return:                201 on success
    """

    uid = movie.get("uid")
    title = movie.get("title")

    # validators
    if not((uid or uid==0) and title):
        return "",400

    existing_movie = (
        Movies.query.filter(Movies.uid == uid)
        .one_or_none()
    )

    # get the parent director
    director = Directors.query.filter(Directors.id == director_id).one_or_none()

    # Was a director found?
    if director is None:
        abort(404, f"Director not found for Id: {director_id}")

    if existing_movie:
        abort(
            409,
            "Movie id {uid} exists already".format(
                uid=uid
            ),
        )

    # Create a movie schema instance
    schema = MoviesSchema()
    new_movie = schema.load(movie, session=db.session)

    # Add the movie to the director and database
    director.movies.append(new_movie)
    db.session.commit()

    # Serialize and return the newly created movie in the response
    data = schema.dump(new_movie)

    return data, 201


def update(director_id, movie_id, movie):
    """
    This function updates an existing note related to the passed in
    person id.

    :param director_id:       Id of the person the note is related to
    :param movie_id:         Id of the note to update
    :param movie:            The JSON containing the note data
    :return:                200 on success
    """

    uid = movie.get("uid")
    title = movie.get("title")

    # validators
    if not((uid or uid==0) and title):
        return "",400

    update_movie = (
        Movies.query.filter(Directors.id == director_id)
        .filter(Movies.id == movie_id)
        .one_or_none()
    )

    # Did we find an existing note?
    if update_movie is not None:

        # turn the passed in note into a db object
        schema = MoviesSchema()
        update = schema.load(movie, session=db.session)

        # Set the id's to the note we want to update
        update.director_id = update_movie.director_id
        update.id = update_movie.id

        # merge the new object into the old and commit it to the db
        db.session.merge(update)
        db.session.commit()

        # return updated note in the response
        data = schema.dump(update_movie)

        return data, 200

    # Otherwise, nope, didn't find that note
    else:
        abort(404, f"Note not found for Id: {movie_id}")


def delete(director_id, movie_id):
    """
    This function deletes a movie from the movie structure

    :param director_id:   Id of the director the movie is related to
    :param movie_id:     Id of the movie to delete
    :return:            200 on successful delete, 404 if not found
    """
    # Get the movie requested
    movie = (
        Movies.query.filter(Directors.id == director_id)
        .filter(Movies.id == movie_id)
        .one_or_none()
    )

    # did we find a note?
    if movie is not None:
        db.session.delete(movie)
        db.session.commit()
        return make_response(
            "Movie {movie_id} deleted".format(movie_id=movie_id), 200
        )

    # Otherwise, nope, didn't find that note
    else:
        abort(404, f"Movie not found for Id: {movie_id}")

def budgetFilter(budget):
    """
    This function responds to a request for /api/people/movies
    with the complete list of movies, sorted by note timestamp

    :return:                json list of all movies for all people
    """
    # Query the database for all the movies
    movies = Movies.query.order_by(db.asc(Movies.budget)).filter(Movies.budget>=budget).limit(100).all()

    # Serialize the list of movies from our data
    movies_schema = MoviesSchema(many=True)
    data = movies_schema.dump(movies)
    return data
