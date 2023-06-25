import express from 'express';
import jwt from 'jsonwebtoken'
import { getCurrentUser } from '../../middleware/get-current-user';

const router = express.Router();

router.get('/api/users/currentuser', getCurrentUser, (req, res) => {
    const { currentUser } = req;
    res.status(200).send({ currentUser })
})

export { router as currentUserRouter }