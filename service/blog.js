'use strict';

module.exports = function (sequelize) {
    var Blog = sequelize.import("../model/blog");
    var jctPost = sequelize.import("../model/jctBlogPost");
    return {
        create: function (req, res) {
            var newBlog = {
                idUser: req.body.idUser,
                title: req.body.title
            };
            Blog.create(newBlog).then(function () {
                res.sendStatus(200);
            });
        },
        get: function (req, res) {
            Blog.findAll().then(function (blogs) {
                res.json(blogs);
            });
        },
        getID: function(req, res) {
            Blog.findById(req.params.id).then(function(blog) {
                res.json(blog);
            });
        },
        deleteID: function(req, res) {
            jctPost.destroy({
                where: {
                    idBlog: req.params.id //this will be your id that you want to delete
                }
            }).then(Blog.destroy({
                where: {
                    idUser: req.params.id //this will be your id that you want to delete
                }
            }).then(function() {
                res.json('Deleted successfully');
            }, function(err) {
                console.log(err);
            }));
        },
        updateID: function(req, res) {
            Blog.update(req.body, {
                    where: {
                        idUser: req.params.id
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
