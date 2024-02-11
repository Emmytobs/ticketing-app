import express from 'express';
import { getCurrentUser } from '@/common/middleware';

const router = express.Router();

router.get('/api/users/currentuser', getCurrentUser, (req, res) => {
    const { currentUser } = req;
    res.status(200).send({ currentUser })
})

export { router as currentUserRouter }