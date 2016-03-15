'use strict';

module.exports = function (sequelize) {
    var UserInfo = sequelize.import("../model/userInfo");
    return {
        create: function (req, res) {
            var newUserInfo = {
                idUser: req.body.idUser,
                email: req.body.email,
                cell: req.body.cell
            };
            UserInfo.create(newUserInfo).then(function () {
                res.send(200);
            });
        },
        get: function (req, res) {
            UserInfo.findAll().then(function (userInfos) {
                res.json(userInfos);
            });
        },
        updateID: function(req, res) {
            UserInfo.update(req.body, {
                    where: {
                        id: req.params.id
                    }
                })
                .then(function(result) {
                    res.json('It was updated!');
                }, function(err) {
                    res.json(err);
                });
        },
        getID: function(req, res) {
            UserInfo.findById(req.params.id).then(function(user) {
                res.json(user);
            });
        },
    };
};
