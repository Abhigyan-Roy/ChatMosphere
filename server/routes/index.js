const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/user_controller');
router.post('/create', userController.create);
router.post('/create-session', passport.authenticate('local'), userController.createSession);
router.get('/getUser', passport.checkAuthentication, userController.getCurrentUser);
router.get('/sign-out/:id', userController.destroySession);
router.get('/getusers/:id', userController.getAllUsers);
router.post('/sendmessage', userController.addMessage);
router.get('/getmessage', userController.getMessage);
module.exports = router;