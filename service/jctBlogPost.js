'use strict';

module.exports = function (sequelize) {
    var JctBlogPost = sequelize.import("../model/jctBlogPost");
    return {
        create: function (req, res) {
            var newBlogPost = {
                idBlog: req.body.idBlog,
                idPost: req.body.idPost
            };
            JctBlogPost.create(newBlogPost).then(function () {
                res.sendStatus(200);
            });
        },
        deleteID: function(req, res) {
            JctBlogPost.destroy({
                where: {
                    idBlog: req.params.idblog, //this will be your id that you want to delete
                    idPost: req.params.idpost
                }
            }).then(function() {
                res.json('Deleted successfully');
            }, function(err) {
                console.log(err);
            });
        },
        get: function(req, res) {
    			JctBlogPost.findAll().then(function(prodcolors) {
    				res.json(prodcolors);
    			});
        },
        updateID: function(req, res) {
            JctBlogPost.update(req.body, {
                    where: {
                        idBlog: req.params.idblog,
                        idPost: req.params.idpost
                    }
                })
                .then(function(result) {
                    res.json('It was updated!');
                }, function(err) {
                    res.json(err);
                });
              },
              getID: function(req, res) {
                  JctBlogPost.findById(req.params.idblog).then(function(blogpost) {
                      res.json(blogpost);
                  });
        },
        getbothID: function(req, res) {
          JctBlogPost.find({
            where: {
              idBlog: req.params.idblog,
              idPost: req.params.idpost
            }
          }).then(function(userskill) {
            res.json(userskill);
          });
          }
    };
};
