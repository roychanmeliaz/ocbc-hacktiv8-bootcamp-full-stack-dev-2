"""
This is the people module and supports all the REST actions for the
people data
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
    directors = Directors.query.order_by(Directors.id).all()

    # Serialize the data for the response
    directors_schema = DirectorsSchema(many=True)
    data = directors_schema.dump(directors)
    return data


def read_one(id):
    """
    This function responds to a request for /api/director/{person_id}
    with one matching person from director
    :param person_id:   Id of person to find
    :return:            person matching id
    """
    # Get the person requested
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

    # Otherwise, nope, didn't find that person
    else:
        abort(
            404,
            "Person not found for Id: {id}".format(id=id),
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

    existing_person = (
        Directors.query.filter(Directors.name == name)
        .filter(Directors.gender == gender)
        .filter(Directors.uid == uid)
        .filter(Directors.department == department)
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
            "Director {name} exists already".format(
                name=name
            ),
        )


def update(id, director):
    """
    This function updates an existing director in the people structure

    :param id:   Id of the director to update in the people structure
    :param director:      director to update
    :return:            updated director structure
    """
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
    This function deletes a person from the people structure

    :param id:   Id of the person to delete
    :return:            200 on successful delete, 404 if not found
    """
    # Get the person requested
    person = Directors.query.filter(Directors.id == id).one_or_none()

    # Did we find a person?
    if person is not None:
        db.session.delete(person)
        db.session.commit()
        return make_response(f"Director {id} deleted", 200)

    # Otherwise, nope, didn't find that person
    else:
        abort(404, f"Director not found for Id: {id}")














#  OLD

# def update(person_id, person):
#     """
#     This function updates an existing person in the people structure
#     Throws an error if a person with the name we want to update to
#     already exists in the database.
#     :param person_id:   Id of the person to update in the people structure
#     :param person:      person to update
#     :return:            updated person structure
#     """
#     # Get the person requested from the db into session
#     update_person = Person.query.filter(
#         Person.person_id == person_id
#     ).one_or_none()

#     # Try to find an existing person with the same name as the update
#     fname = person.get("fname")
#     lname = person.get("lname")

#     existing_person = (
#         Person.query.filter(Person.fname == fname)
#         .filter(Person.lname == lname)
#         .one_or_none()
#     )

#     # Are we trying to find a person that does not exist?
#     if update_person is None:
#         abort(
#             404,
#             "Person not found for Id: {person_id}".format(person_id=person_id),
#         )

#     # Would our update create a duplicate of another person already existing?
#     elif (
#         existing_person is not None and existing_person.person_id != person_id
#     ):
#         abort(
#             409,
#             "Person {fname} {lname} exists already".format(
#                 fname=fname, lname=lname
#             ),
#         )

#     # Otherwise go ahead and update!
#     else:

#         # turn the passed in person into a db object
#         schema = PersonSchema()
#         update = schema.load(person, session=db.session)

#         # Set the id to the person we want to update
#         update.person_id = update_person.person_id

#         # merge the new object into the old and commit it to the db
#         db.session.merge(update)
#         db.session.commit()

#         # return updated person in the response
#         data = schema.dump(update_person)

#         return data, 200


# def delete(person_id):
#     """
#     This function deletes a person from the people structure
#     :param person_id:   Id of the person to delete
#     :return:            200 on successful delete, 404 if not found
#     """
#     # Get the person requested
#     person = Person.query.filter(Person.person_id == person_id).one_or_none()

#     # Did we find a person?
#     if person is not None:
#         db.session.delete(person)
#         db.session.commit()
#         return make_response(
#             "Person {person_id} deleted".format(person_id=person_id), 200
#         )

#     # Otherwise, nope, didn't find that person
#     else:
#         abort(
#             404,
#             "Person not found for Id: {person_id}".format(person_id=person_id),
#         )



