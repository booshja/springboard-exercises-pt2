const express = require("express");
const router = new express.Router();
const Message = require("../models/message");
const User = require("../models/user");
const { ensureLoggedIn, ensureCorrectUser } = require("../middleware/auth");
const ExpressError = require("../expressError");

/** GET /:id - get detail of message.
*
* => {message: {id,
*               body,
*               sent_at,
*               read_at,
*               from_user: {username, first_name, last_name, phone},
*               to_user: {username, first_name, last_name, phone}}
*
* Make sure that the currently-logged-in users is either the to or from user.
*
* */
router.get("/:id", ensureLoggedIn, async(req,res,next)=>{
    try{
    const id = req.params.id;
    const message = await Message.get(id);
    const fromUser = await User.get(message.from_username);
    const toUser = await User.get(message.to_username);

    if(req.user.username !== fromUser.username || req.user.username !== toUser.username){
        return next(new ExpressError("Unauthorized", 403));
    }

    const fromUserObj = {username: fromUser.username, first_name: fromUser.first_name, last_name: fromUser.last_name, phone: fromUser.phone}
    const toUserObj = {username: toUser.username, first_name: toUser.first_name, last_name: toUser.last_name, phone: toUser.phone}

    return res.json({...message, from_user: fromUserObj, to_user: toUserObj});
    }catch(e){
        return next(e);
    }
});

/** POST / - post message.
*
* {to_username, body} =>
*   {message: {id, from_username, to_username, body, sent_at}}
*
* */
router.post("/", ensureLoggedIn, async(req,res,next)=>{
    try{
        const {toUsername, body} = req.body;
        const fromUser = await User.get(req.user.username);
        const toUser = await User.get(toUsername);

        const newMessage = await Message.create({fromUser.username, toUser.username, body});

        return res.json({newMessage});

    }catch(e){
        return next(e);
    }
});

/** POST/:id/read - mark message as read:
*
*  => {message: {id, read_at}}
*
* Make sure that the only the intended recipient can mark as read.
*
* */
router.post("/:id/read", ensureLoggedIn, async(req.res,next){
    try{
        const {id} = req.body;
        const message = await Message(id);

        if(message.to_username !== req.user.username){
            return next(new ExpressError("Unauthorized"));
        }

        const readMsg = await Message.markRead(id);
        return res.json({message});
    }catch(e){
        return next(e);
    }
});

module.exports = router;
