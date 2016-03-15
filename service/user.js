'use strict';

module.exports = function(sequelize) {
    var User = sequelize.import("../model/user");
    var UserInfo = sequelize.import("../model/userInfo");

    return {
        create: function(req, res) {
            var newUser = {
                nameLast: req.body.nameLast,
                nameFirst: req.body.nameFirst,
                username: req.body.username
            };
            User.create(newUser).then(function() {
                res.send(200);
            });
        },
        get: function(req, res) {
            User.findAll().then(function(users) {
                res.json(users);
            });
        },

        getID: function(req, res) {
            User.findById(req.params.id).then(function(user) {
                res.json(user);
            });
        },

        deleteID: function(req, res) {
            UserInfo.destroy({
                where: {
                    idUser: req.params.id //this will be your id that you want to delete
                }
            }).then(User.destroy({
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
            User.update(req.body, {
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
