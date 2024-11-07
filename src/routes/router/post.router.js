const { getAll, create, getOne, remove, update } = require('../../controllers/post.controllers');
const express = require('express');
const { verifyJWT } = require('../../utils/verifyJWT');

const postRouter = express.Router();

postRouter.route('/')
    .get(getAll)
    .post(verifyJWT, create);

postRouter.route('/:id')
    .get(getOne)
    .delete(verifyJWT, remove)
    .put(verifyJWT, update);

module.exports = postRouter;