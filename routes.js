const express = require('express');
const { getBootcamps, getBootcamp, createBootcamp, updateBootcamp, deleteBootcamp } = require('../controllers/bootcamps');
const router = express.Router();

// Bind server entry points to 'bootcamps.js' file routes to controller functions for each route.

router
      .route('/')
          .get(getBootcamps)
          .post(createBootcamp);

router
      .route('/:id')
          .put(updateBootcamp)
          .delete(deleteBootcamp)
          .get(getBootcamp);

module.exports = router;
