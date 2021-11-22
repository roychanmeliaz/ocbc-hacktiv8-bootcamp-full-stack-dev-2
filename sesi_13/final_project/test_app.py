from app import connex_app
import directors
import movies
import unittest
import json

class FlaskTestCase(unittest.TestCase):
 
    # 1
    # test the response code of get directors api, should return 200
    def test_get_directors_response(self):
        connex_app.app.testing = True
        tester = connex_app.app.test_client(self)
        response = tester.get('/api/directors')
        self.assertEqual(response.status_code,200)

    # 2
    # test the response code of get single directors api, should return 200
    def test_get_directors_id_response(self):
        connex_app.app.testing = True
        tester = connex_app.app.test_client(self)
        response = tester.get('/api/directors/0')
        self.assertEqual(response.status_code,200)

    # 3
    # test the response code of get directors api 404 data, should return 404
    def test_get_directors_nonexistent_response(self):
        connex_app.app.testing = True
        tester = connex_app.app.test_client(self)
        response = tester.get('/api/directors/-1')
        self.assertEqual(response.status_code,404)

    # 4
    # test the response code of post directors existing api, should return 409 conflict
    def test_post_directors_conflict(self):
        mock_request_data = {
            'department': 'TEST DEPARTMENT',
            'gender': 2,
            'name': 'TEST NAME',
            'uid': 0
        }
        connex_app.app.testing = True
        tester = connex_app.app.test_client(self)
        response = tester.post('/api/directors', data=json.dumps(mock_request_data), headers={}, content_type="application/json")
        self.assertEqual(response.status_code,409)

    # 5
    # test the response code of put directors existing api, should return 200
    def test_put_directors(self):
        mock_request_data = {
            'department': 'TEST DEPARTMENT',
            'gender': 2,
            'name': 'TEST NAME',
            'uid': 0
        }
        connex_app.app.testing = True
        tester = connex_app.app.test_client(self)
        response = tester.put('/api/directors/0', data=json.dumps(mock_request_data), headers={}, content_type="application/json")
        self.assertEqual(response.status_code,200)

    # 6
    # test the response code of post directors with invalid fields, should return 400 bad request
    def test_post_directors_invalid(self):
        mock_request_data = {
            'department': 'TEST DEPARTMENT',
            'gender': 2,
            # name is missing
            'uid': 0
        }
        connex_app.app.testing = True
        tester = connex_app.app.test_client(self)
        response = tester.post('/api/directors', data=json.dumps(mock_request_data), headers={}, content_type="application/json")
        self.assertEqual(response.status_code,400)

    # 7
    # test the response type of get directors api, should return list
    def test_get_directors_type(self):
        self.assertIs(type(directors.read_all()),list)

    # 8
    # test the response type of get single directors api, should return dict
    def test_get_single_directors_type(self):
        self.assertIs(type(directors.read_one(0)),dict)

    # 9
    # test the response type of put directors api, should return tuple
    def test_put_directors_type(self):
        mock_request_data = {
            'department': 'TEST DEPARTMENT',
            'gender': 2,
            'name': 'TEST NAME',
            'uid': 0
        }
        self.assertIs(type(directors.update(0,mock_request_data)),tuple)


    # 10
    # test the response code of get movies api, should return 200 
    def test_get_movies_response(self):
        connex_app.app.testing = True
        tester = connex_app.app.test_client(self)
        response = tester.get('/api/movies')
        self.assertEqual(response.status_code,200)

    # 11
    # test the response code of get single movies api, should return 200
    def test_get_movies_id_response(self):
        connex_app.app.testing = True
        tester = connex_app.app.test_client(self)
        response = tester.get('/api/directors/0/movies/0')
        self.assertEqual(response.status_code,200)

    # 12
    # test the response code of get movies api 404 data, should return 404
    def test_get_movies_nonexistent_response(self):
        connex_app.app.testing = True
        tester = connex_app.app.test_client(self)
        response = tester.get('/api/directors/0/movies/-1')
        self.assertEqual(response.status_code,404)

    # 13
    # test the response code of post movies existing api, should return 409 conflict 
    def test_post_movies_conflict(self):
        mock_request_data = {
            'budget': 0,
            'original_title': 'TEST',
            'overview': 'TEST',
            'popularity': 220,
            'release_date': '2021-01-01',
            'revenue': 0,
            'tagline': 'TEST',
            'title': 'TEST',
            'uid': 0,
            'vote_average': 0.0,
            'vote_count': 0
        }
        connex_app.app.testing = True
        tester = connex_app.app.test_client(self)
        response = tester.post('/api/directors/0/movies', data=json.dumps(mock_request_data), headers={}, content_type="application/json")
        self.assertEqual(response.status_code,409)

    # 14
    # test the response code of put movies existing api, should return 200
    def test_put_movies(self):
        mock_request_data = {
            'budget': 0,
            'original_title': 'TEST',
            'overview': 'TEST',
            'popularity': 220,
            'release_date': '2021-01-01',
            'revenue': 0,
            'tagline': 'TEST',
            'title': 'TEST',
            'uid': 0,
            'vote_average': 0.0,
            'vote_count': 0
        }
        connex_app.app.testing = True
        tester = connex_app.app.test_client(self)
        response = tester.put('/api/directors/0/movies/0', data=json.dumps(mock_request_data), headers={}, content_type="application/json")
        self.assertEqual(response.status_code,200)

    # 15
    # test the response code of post movies with invalid fields, should return 400
    def test_post_movies_invalid(self):
        mock_request_data = {
            'budget': 0,
            'original_title': 'TEST',
            'overview': 'TEST',
            'popularity': 220,
            'release_date': '2021-01-01',
            'revenue': 0,
            'tagline': 'TEST',
            # title is missing
            'uid': 0,
            'vote_average': 0.0,
            'vote_count': 0
        }
        connex_app.app.testing = True
        tester = connex_app.app.test_client(self)
        response = tester.post('/api/directors/0/movies', data=json.dumps(mock_request_data), headers={}, content_type="application/json")
        self.assertEqual(response.status_code,400)

    # 16
    # test the response type of get movies api, should return list
    def test_get_movies_type(self):
        self.assertIs(type(movies.read_all()),list)

    # 17
    # test the response type of get movies api, should return dict
    def test_get_single_movies_type(self):
        self.assertIs(type(movies.read_one(0,0)),dict)

    # 18
    # test the response type of put movies api, should return tuple
    def test_put_movies_type(self):
        mock_request_data = {
            'budget': 0,
            'original_title': 'TEST',
            'overview': 'TEST',
            'popularity': 220,
            'release_date': '2021-01-01',
            'revenue': 0,
            'tagline': 'TEST',
            'title': 'TEST',
            'uid': 0,
            'vote_average': 0.0,
            'vote_count': 0
        }
        self.assertIs(type(movies.update(0,0,mock_request_data)),tuple)

if __name__ == '__main__':
    unittest.main()