"""
This is the directors module and supports all the REST actions for the
directors data
"""

from flask import make_response, abort
from config import db
from models import Directors, DirectorsSchema, Movies   


def read_all():
    """
    This function responds to a request for /api/director
    with the complete lists of director
    :return:        json string of list of director
    """
    # Create the list of directors from our data
    directors = Directors.query.order_by(Directors.id).limit(100).all()

    # Serialize the data for the response
    directors_schema = DirectorsSchema(many=True)
    data = directors_schema.dump(directors)
    return data


def read_one(id):
    """
    This function responds to a request for /api/director/{director_id}
    with one matching director from directors
    :param director_id:   Id of director to find
    :return:            director matching id
    """
    # Get the director requested
    directors = (
        Directors.query.filter(Directors.id == id)
        .outerjoin(Movies)
        .one_or_none()
    )

    # Did we find a directors?
    if directors is not None:

        # Serialize the data for the response
        directors_schema = DirectorsSchema()
        data = directors_schema.dump(directors)
        return data

    # Otherwise, nope, didn't find that director
    else:
        abort(
            404,
            "Director not found for Id: {id}".format(id=id),
        )


def create(director):
    """
    This function creates a new director in the director structure
    based on the passed in director data
    :param director:  director to create in director structure
    :return:        201 on success, 406 on director exists
    """
    name = director.get("name")
    gender = director.get("gender")
    uid = director.get("uid")
    department = director.get("department")

    # validators
    if not(name and (gender or gender==0) and (uid or uid==0) and department):
        return "",400

    existing_person = (
        Directors.query
        .filter(Directors.uid == uid)
        .one_or_none()
    )

    # Can we insert this director?
    if existing_person is None:

        # Create a director instance using the schema and the passed in director
        schema = DirectorsSchema()
        new_person = schema.load(director, session=db.session)

        # Add the director to the database
        db.session.add(new_person)
        db.session.commit()

        # Serialize and return the newly created director in the response
        data = schema.dump(new_person)

        return data, 201

    # Otherwise, nope, director exists already
    else:
        abort(
            409,
            "Director uid {uid} exists already".format(
                uid=uid
            ),
        )


def update(id, director):
    """
    This function updates an existing director in the directors structure

    :param id:   Id of the director to update in the directors structure
    :param director:      director to update
    :return:            updated director structure
    """

    name = director.get("name")
    gender = director.get("gender")
    uid = director.get("uid")
    department = director.get("department")

    # validators
    if not(name and (gender or gender==0) and (uid or uid==0) and department):
        return "",400

    # Get the director requested from the db into session
    update_person = Directors.query.filter(
        Directors.id == id
    ).one_or_none()

    # Did we find an existing director?
    if update_person is not None:

        # turn the passed in director into a db object
        schema = DirectorsSchema()
        update = schema.load(director, session=db.session)

        # Set the id to the director we want to update
        update.id = update_person.id

        # merge the new object into the old and commit it to the db
        db.session.merge(update)
        db.session.commit()

        # return updated director in the response
        data = schema.dump(update_person)

        return data, 200

    # Otherwise, nope, didn't find that director
    else:
        abort(404, f"Director not found for Id: {id}")


def delete(id):
    """
    This function deletes a director from the directors structure

    :param id:   Id of the director to delete
    :return:            200 on successful delete, 404 if not found
    """
    # Get the director requested
    person = Directors.query.filter(Directors.id == id).one_or_none()

    # Did we find a director?
    if person is not None:
        db.session.delete(person)
        db.session.commit()
        return make_response(f"Director {id} deleted", 200)

    # Otherwise, nope, didn't find that director
    else:
        abort(404, f"Director not found for Id: {id}")


def count():
    """
    This function responds to a request for /api/director/countMovies
    with the complete lists of director
    :return:        json string of list of director with count and movies
                    removed sorted by highest count
    """
    # Create the list of directors from our data
    directors = Directors.query.order_by(Directors.id).all()

    # Serialize the data for the response
    directors_schema = DirectorsSchema(many=True)
    data = directors_schema.dump(directors)
    for sub in data:
        sub["count"]=len(sub["movies"])
        del sub["movies"]
    return sorted(data, key = lambda i: i['count'], reverse=True)

def nameFilter(name):
    """
    This function responds to a request for /api/director/nameFilter
    with the complete lists of director
    :return:        json string of list of director
    """
    # Create the list of directors from our data
    directors = Directors.query.order_by(Directors.id).filter(Directors.name.ilike('%'+name+'%')).limit(100).all()

    # Serialize the data for the response
    directors_schema = DirectorsSchema(many=True)
    data = directors_schema.dump(directors)
    return data
