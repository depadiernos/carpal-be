const express = require("express");
const router = express.Router();
const ridesPut = require("./rides-put");
const ridesGet = require("./rides-get");
const ridesDelete = require("./rides-delete");
const ridesPost = require("./rides-post");

<<<<<<< HEAD
const rides = new Rides();

router.post("/", async (req, res, next) => {
    try {
        const requestBody = {            
            start_location_id: req.body.start_location_id,
            end_location_id: req.body.end_location_id,
            driver_id: req.user.id
        };

        res.status(201).json(await rides.add(requestBody));
    } catch (err) {
        next(err);
    }
});
=======
router.use("/", ridesPut);
router.use("/", ridesGet);
router.use("/", ridesDelete);
router.use("/", ridesPost);
>>>>>>> 7825201cf47c9b2502c2c53a2a85f40850d27c22

module.exports = router;
