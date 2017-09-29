'use strict';

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI);

let server;
const app = express();

app.use(cors());

app.use(require('../route/color-route.js'));

app.use((err, req, res, next) => {
  res.sendStatus(500);
});

const serverControl = (module.exports = {});

serverControl.start = () => {
  return new Promise(resolve => {
    server = app.listen(process.env.PORT, () => {
      console.log('server up', process.env.PORT);
      server.isOn = true;
      resolve();
    });
  });
};

serverControl.stop = () => {
  return new Promise(resolve => {
    server.close(() => {
      console.log('server down');
      server.isOn = false;
      resolve();
    });
  });
};
