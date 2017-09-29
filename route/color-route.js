'use strict';

const jsonParser = require('body-parser').json();
const colorRouter = (module.exports = new require('express').Router());
const randomColor = require('randomcolor');
const hexToHsl = require('hex-to-hsl');

const Color = require('../model/color.js');

colorRouter.post('/api/colors', jsonParser, (req, res, next) => {
  console.log('hit POST /api/colors');
  for (let i = 0; i < 10000; i++) {
    let hex = randomColor();
    let hsl = hexToHsl(hex);
    console.log(hsl);
    let hue = hsl[0];
    console.log(hue);
    let saturation = hsl[1];
    let lightness = hsl[2];
    new Color({
      name: hex,
      hsl: hsl,
      hue: hue,
      saturation: saturation,
      lightness: lightness,
    })
      .save()
      .then(color => res.json(color))
      .catch(next);
  }
});

colorRouter.get('/api/colors/:id', (req, res, next) => {
  console.log('hit GET /api/colors/:id');

  Color.findById(req.params.id)
    .then(color => res.json(color))
    .catch(next);
});

colorRouter.get('/api/colors', (req, res, next) => {
  console.log('hit /api/colors');

  let pageNumber = Number(req.query.page);
  if (!pageNumber || pageNumber < 1) pageNumber = 1;
  pageNumber--;

  Color.find({})
    .sort({ hue: 'asc' })
    .skip(pageNumber * 12)
    .limit(12)
    .then(colors => res.json(colors))
    .catch(next);
});

colorRouter.put('/api/colors/:id', jsonParser, (req, res, next) => {
  console.log('hit DELETE /api/colors/:id');

  Color.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
    .then(color => res.json(color))
    .catch(next);
});

colorRouter.delete('/api/colors/:id', (req, res, next) => {
  console.log('hit DELETE /api/colors/:id');

  Color.findByIdAndRemove(req.params.id)
    .then(() => res.sendStatus(204))
    .catch(next);
});
