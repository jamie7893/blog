'use strict';

module.exports = function (sequelize) {
    var Post = sequelize.import("../model/post");
    var jctPost = sequelize.import("../model/jctBlogPost");
    return {
        create: function (req, res) {
            var newPost = {
                title: req.body.title,
                subtitle: req.body.subtitle,
                body: req.body.body
            };
            Post.create(newPost).then(function () {
                res.send(200);
            });
        },
        get: function (req, res) {
            Post.findAll().then(function (posts) {
                res.json(posts);
            });
        },
        getID: function(req, res) {
            Post.findById(req.params.id).then(function(post) {
                res.json(post);
            });
          },
        deleteID: function(req, res) {
            jctPost.destroy({
                where: {
                    idPost: req.params.id //this will be your id that you want to delete
                }
            }).then(Post.destroy({
                where: {
                    id: req.params.id //this will be your id that you want to delete
                }
            }).then(function() {
                res.json('Deleted successfully');
            }, function(err) {
                console.log(err);
            }));
        },
        updateID: function(req, res) {
            Post.update(req.body, {
                    where: {
                        id: req.params.id
                    }
                })
                .then(function(result) {
                    res.json('It was updated!');
                }, function(err) {
                    res.json(err);
                });
        }
    };
};
