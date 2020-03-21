const express = require("express");
const router = express.Router();
const { verifyToken, validateUserToken } = require("../Middleware/auth");
const { Users } = require("../Classes/Users");
const { UserDetails } = require("../Classes/UserDetails");

const users = new Users();
const audioLikes = new UserDetails("audio", "users_audio_likes");
const audioDislikes = new UserDetails("audio", "users_audio_dislikes");
const hobby = new UserDetails("hobbies", "users_hobbies");

router.put(
    "/update",
    verifyToken(),
    validateUserToken(),
    async (req, res, next) => {
        try {
            const userBody = {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: req.body.password,
                is_driver: req.body.is_driver,
                phone_number: req.body.phone_number,
                zip_code: req.body.zip_code,
                is_disabled: req.body.is_disabled,
                bio: req.body.bio,
                profile_picture: req.body.profile_picture
            };
            let user;

            //if user profile has changed, update it, if not skip
            if (!req.user === userBody) {
                user = await users.update(req.user.id, userBody);
            } else {
                user = req.user;
            }
            const audioLikesArr = req.body.audioLikes;
            const audioDislikesArr = req.body.audioDislikes;
            const hobbiesArr = req.body.hobbies;

            const audioLikesResult = await audioLikes.add(
                req.user.id,
                audioLikesArr
            );
            const audioDislikesResult = await audioDislikes.add(
                req.user.id,
                audioDislikesArr
            );
            const hobbiesResult = await hobby.add(req.user.id, hobbiesArr);
            
            res.json({
                ...user,
                audioLikes: audioLikesResult,
                audioDislikes: audioDislikesResult,
                hobbies: hobbiesResult
            });
        } catch (err) {
            next(err);
        }
    }
);

router.delete(
    "/delete",
    verifyToken(),
    validateUserToken(),
    async (req, res, next) => {
        try {
            const user_id = req.user.id;
            res.json(await users.delete(user_id));
        } catch (err) {
            next(err);
        }
    }
);

module.exports = router;
