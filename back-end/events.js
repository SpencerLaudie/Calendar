const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

const users = require("./users.js");
const User = users.model;
const validUser = users.valid;

const eventSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  title: String,
  date: {
    type: Date,
    default: Date.now
  },
});

const Event = mongoose.model('Event', eventSchema);

router.post("/", validUser, async (req, res) => {
  console.log(req.body);
  const event = new Event({
    user: req.user,
    title: req.body.title,
    date: req.body.date
  });
  try {
    await event.save();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.get("/", validUser, async (req, res) => {
  console.log(req);
  try {
    let events = await Event.find({
      user: req.user
    }).populate('user');
    console.log(event);
    return res.send(events);
  } catch (error) {
    return res.sendStatus(500);
  }
});

module.exports = {
  model: Event,
  routes: router,
}
