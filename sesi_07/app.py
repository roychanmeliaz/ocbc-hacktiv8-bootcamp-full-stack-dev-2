from flask import Flask, render_template, escape, request
# from markupsafe import escape
from author_book import author_books
app = Flask(__name__)

@app.route('/movies/')
@app.route('/')
def hello_world():
    return '<h1>Hello, World!</h1><p>This is a root directory</p>'

@app.route('/<name>')
def hi(name):
    return f'Hi {escape(name)}!'

@app.route('/user/<username>')
def show_user_profile(username):    
    # show the user profile for that user    
    return f'User {escape(username)}'

@app.route('/post/<int:post_id>')
def show_post(post_id):    
    # show the post with the given id, the id is an integer    
    return f'Post {post_id}'
    
@app.route('/path/<path:subpath>')
def show_subpath(subpath):    
    # show the subpath after /path/    
    return f'Subpath {escape(subpath)}'

@app.route('/hello/')
@app.route('/hello/<int:name>')
def hello(name=None):    
    return render_template('hello.html', name=name)

@app.route('/books/<author_id>')
def books(author_id):
    return render_template('book.html',author_id=author_id, book_list = author_books[author_id])

@app.route('/author', methods=['GET', 'POST'])
def author():
    if 'author_id' in request.form:
        author_books[request.form['author_id']] = []
    return render_template('author.html', author_books=author_books)

if __name__ == '__main__':
    app.run(debug=True)
