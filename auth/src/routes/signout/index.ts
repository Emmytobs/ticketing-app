import express from 'express';

const router = express.Router();

router.post('/api/users/signout', (req, res) => {
    // The cookie-session library knows to set the header that will clear the cookies on the client's browser
    req.session = null;

    res.status(200).json();
})

export { router as signOutRouter };