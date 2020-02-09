/* Notice how we have used this file to store all the sensitive information that our app uses.
This is to improve the security of our application. In practice, we would add this file to our .gitignore file. */
module.exports ={
	google: {
		clientID: '273042849908-3qkc2s9eddsu3cooprvq4o254hf20c3a.apps.googleusercontent.com',
		clientSecret: '3GFgX-BZhjZjcAwdHTcgmCwO'
	},
	mongoDB: {
		dbURI: 'mongodb+srv://Admin:T3723ZpvkrjDqXVD@cluster0-7334j.mongodb.net/test?retryWrites=true&w=majority'
	},
	session: {
		cookieKey: 'hyperion!125345342534'
	}
}