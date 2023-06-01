import express from 'express';

import passport from "passport";
import initializingPassport, {isAuthenticated} from "../passportConfig.js";

const router = express.Router();
initializingPassport(passport)

router.route('/').get( (req, res) => {
    res.json({ message: 'Authenticated' });
});

export default router;