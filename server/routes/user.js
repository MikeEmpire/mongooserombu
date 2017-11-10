import express  from 'express';
import user_api from '../api/user_api';

const passport = require("../config/passport");

const router  = express.Router();

router.get('/', user_api.renderLogin);
router.get('/signout', user_api.signOutUser);
router.post('/login', passport.authenticate("local"), user_api.loginUser);
router.post('/signup', user_api.signUpUser);

module.exports = router;
