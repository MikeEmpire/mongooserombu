import express         from 'express';
import application_api from '../api/application_api';

const router  = express.Router();

router.get('/', application_api.renderIndex);
router.get('/about', application_api.renderAbout);
router.get('/contact', application_api.renderContact);
router.get('/portfolio', application_api.renderPortfolio);

module.exports = router;
