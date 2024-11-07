const { getAll, create, getOne, remove, update, login, logged, setFavorites, } = require('../../controllers/user.controllers');
const express = require('express');
const credentials = require('../../middlewares/login.middlewares');
const hash = require('../../middlewares/hash.middlewares');
const { verifyJWT } = require('../../utils/verifyJWT');

const userRouter   = express.Router();

// Estaticas
userRouter.route('/')
    .get(verifyJWT, getAll)
    .post(hash, create);

userRouter.route('/login')
    .post(credentials, login)

userRouter.route('/me')
    .get(verifyJWT, logged)


// Semidinamicas
userRouter.route('/:id/favorites')
    .post(setFavorites)


// Dinamicas
userRouter.route('/:id')
    .get(verifyJWT, getOne)
    .delete(verifyJWT, remove)
    .put(verifyJWT, update);

module.exports = userRouter;