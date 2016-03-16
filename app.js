'use strict';

const
	Sequelize = require('sequelize');

let server;

const
	express = require('express'),
	app = express(),
	bodyParser = require('body-parser');

app
	.use(function(req, res, next) {
		console.log(req.method, req.url);
		next();
	})
	.use(bodyParser.json());

module.exports.close = function() {
	console.log('shutting down the server...');
	server.close();
};

// sequelize initialization //
const sequelize = new Sequelize('blog', 'root', 'admin', {
	host: 'localhost',
	dialect: 'mysql',
	pool: {
		max: 5,
		min: 0,
		idle: 10000
	},
	define: {
		timestamps: false,
	}
});
const userService = require("./service/user")(sequelize);
const userInfoService = require("./service/userinfo")(sequelize);
const postService = require("./service/post")(sequelize);
const blogService = require("./service/blog")(sequelize);
const blogPostService = require("./service/jctBlogPost")(sequelize);

//sync the model with the database
sequelize.sync().then(function(res) {
		app.route('/user')
			.get(userService.get)
			.post(userService.create)
		app.route('/user/:id')
			.get(userService.getID)
			.delete(userService.deleteID)
			.put(userService.updateID)
		app.route('/userinfo')
			.get(userInfoService.get)
			.post(userInfoService.create)
		app.route('/userinfo/:id')
			.put(userInfoService.updateID)
			.get(userInfoService.getID)
			.delete(userInfoService.deleteID)
		app.route('/post')
			.get(postService.get)
			.post(postService.create)
		app.route('/post/:id')
			.get(postService.getID)
			.delete(postService.deleteID)
			.put(postService.updateID)
		app.route('/blog')
			.get(blogService.get)
			.post(blogService.create)
		app.route('/blog/:id')
			.get(blogService.getID)
			.delete(blogService.deleteID)
			.put(blogService.updateID)
			app.route('/jctblogpost/')
			.get(blogPostService.get)
			.post(blogPostService.create)
		app.route('/jctblogpost/:idblog/')
			.get(blogPostService.getID)
			.put(blogPostService.updateID)
		app.route('/jctblogpost/:idblog/:idpost')
			.get(blogPostService.getbothID)
			.delete(blogPostService.deleteID)
			.put(blogPostService.updateID)
		server = app.listen(process.env.PORT || 1738, process.env.IP || "0.0.0.0", function() {
			var addr = server.address();
			console.log("Server listening at", addr.address + ":" + addr.port);
		});
	})
	.catch(function(e) {
		console.log('Error in sequelize.sync(): ' + e);
	});
