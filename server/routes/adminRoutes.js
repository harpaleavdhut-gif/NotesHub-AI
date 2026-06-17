const express = require("express");

const User = require("../models/User");

const Note = require("../models/Note");

const authMiddleware =
    require("../middleware/authMiddleware");

const adminMiddleware =
    require("../middleware/adminMiddleware");

const router = express.Router();


// GET ALL USERS

router.get(

    "/users",

    authMiddleware,

    adminMiddleware,

    async(req, res) => {

        const users =
            await User.find();

        res.json(users);

    }

);


// GET ALL NOTES

router.get(

    "/notes",

    authMiddleware,

    adminMiddleware,

    async(req, res) => {

        const notes =
            await Note.find();

        res.json(notes);

    }

);


// DELETE USER

router.delete(

    "/users/:id",

    authMiddleware,

    adminMiddleware,

    async(req, res) => {

        await User.findByIdAndDelete(
            req.params.id
        );

        res.json({
            message: "User Deleted",
        });

    }

);


// DELETE NOTE

router.delete(

    "/notes/:id",

    authMiddleware,

    adminMiddleware,

    async(req, res) => {

        await Note.findByIdAndDelete(
            req.params.id
        );

        res.json({
            message: "Note Deleted",
        });

    }

);

module.exports = router;