"""
This is the movies module and supports all the REST actions for the
movies data
"""

from flask import make_response, abort
from config import db
from models import Directors, Movies, MoviesSchema


def read_all():
    """
    This function responds to a request for /api/director/movies
    with the complete list of movies, sorted by movie id

    :return:                json list of all movies for all movies
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
    /api/directors/{director_id}/movies/{movie_id}
    with one matching movie for the associated director

    :param director_id:       Id of director the movie is related to
    :param movie_id:         Id of the movie
    :return:                json string of movie contents
    """
    # Query the database for the movie
    movie = (
        Movies.query.join(Directors, Directors.id == Movies.director_id)
        .filter(Directors.id == director_id)
        .filter(Movies.id == movie_id)
        .one_or_none()
    )

    # Was a movie found?
    if movie is not None:
        movie_schema = MoviesSchema()
        data = movie_schema.dump(movie)
        return data

    # Otherwise, nope, didn't find that movie
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
    This function updates an existing movie related to the passed in
    director id.

    :param director_id:       Id of the director the movie is related to
    :param movie_id:         Id of the movie to update
    :param movie:            The JSON containing the movie data
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

    # Did we find an existing movie?
    if update_movie is not None:

        # turn the passed in movie into a db object
        schema = MoviesSchema()
        update = schema.load(movie, session=db.session)

        # Set the id's to the movie we want to update
        update.director_id = update_movie.director_id
        update.id = update_movie.id

        # merge the new object into the old and commit it to the db
        db.session.merge(update)
        db.session.commit()

        # return updated movie in the response
        data = schema.dump(update_movie)

        return data, 200

    # Otherwise, nope, didn't find that movie
    else:
        abort(404, f"Movie not found for Id: {movie_id}")


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

    # did we find a movie?
    if movie is not None:
        db.session.delete(movie)
        db.session.commit()
        return make_response(
            "Movie {movie_id} deleted".format(movie_id=movie_id), 200
        )

    # Otherwise, nope, didn't find that movie
    else:
        abort(404, f"Movie not found for Id: {movie_id}")

def budgetFilter(budget):
    """
    This function responds to a request for /api/movies/budgetFilter/
    with the complete list of movies, sorted by movie budget

    :return:                json list of all movies for all directors
    """
    # Query the database for all the movies
    movies = Movies.query.order_by(db.asc(Movies.budget)).filter(Movies.budget>=budget).limit(100).all()

    # Serialize the list of movies from our data
    movies_schema = MoviesSchema(many=True)
    data = movies_schema.dump(movies)
    return data

def voteFilter(vote_average):
    """
    This function responds to a request for /api/movies/voteFilter
    with the complete list of movies, sorted by movie vote_average

    :return:                json list of all movies for all directors
    """
    # Query the database for all the movies
    movies = Movies.query.order_by(db.asc(Movies.vote_average)).filter(Movies.vote_average>=vote_average).limit(100).all()

    # Serialize the list of movies from our data
    movies_schema = MoviesSchema(many=True)
    data = movies_schema.dump(movies)
    return data

def revenueFilter(revenue):
    """
    This function responds to a request for /api/movies/revenueFilter
    with the complete list of movies, sorted by movie revenue

    :return:                json list of all movies for all directors
    """
    # Query the database for all the movies
    movies = Movies.query.order_by(db.asc(Movies.revenue)).filter(Movies.revenue>=revenue).limit(100).all()

    # Serialize the list of movies from our data
    movies_schema = MoviesSchema(many=True)
    data = movies_schema.dump(movies)
    return data

def popularityFilter(popularity):
    """
    This function responds to a request for /api/movies/popularityFilter
    with the complete list of movies, sorted by movie popularity

    :return:                json list of all movies for all directors
    """
    # Query the database for all the movies
    movies = Movies.query.order_by(db.asc(Movies.popularity)).filter(Movies.popularity>=popularity).limit(100).all()

    # Serialize the list of movies from our data
    movies_schema = MoviesSchema(many=True)
    data = movies_schema.dump(movies)
    return data

def voteCountFilter(vote_count):
    """
    This function responds to a request for /api/movies/voteCountFilter
    with the complete list of movies, sorted by movie vote_count

    :return:                json list of all movies for all directors
    """
    # Query the database for all the movies
    movies = Movies.query.order_by(db.asc(Movies.vote_count)).filter(Movies.vote_count>=vote_count).limit(100).all()

    # Serialize the list of movies from our data
    movies_schema = MoviesSchema(many=True)
    data = movies_schema.dump(movies)
    return data

def titleFilter(title):
    """
    This function responds to a request for /api/movies/titleFilter
    with the complete list of movies, sorted by movie id

    :return:                json list of all movies for all directors
    """
    # Query the database for all the movies
    movies = Movies.query.order_by(db.asc(Movies.id)).filter(Movies.title.ilike('%'+title+'%')).limit(100).all()

    # Serialize the list of movies from our data
    movies_schema = MoviesSchema(many=True)
    data = movies_schema.dump(movies)
    return data
