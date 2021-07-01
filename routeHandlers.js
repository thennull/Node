const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/errorResponse');

// @desc Get all bootcamps
// @route GET /api/v1/bootcamps
// @access Public

exports.getBootcamps = async function (req, res, next) {
  try {
    let bootcamps = await Bootcamp.find();
    res.status(200).json({success:true,data:bootcamps});
  } catch(error) {
    res.status(400).json({success: false, data: error.message});
  }
};


// @desc Get an ${id} bootcamp
// @route GET /api/v1/bootcamps/:id
// @access Public

exports.getBootcamp = async function (req, res, next) {
  try {
    let bootcamp = await Bootcamp.findById(req.params.id);
    if(!bootcamp){
      return next(new ErrorResponse(`Bootcamp not found with ID of: ${req.params.id}`, 404));
    }
    res.status(200).json({success:true,data:bootcamp});
  }catch(error) {
    next(new ErrorResponse(`Bootcamp not found with ID of: ${req.params.id}`, 404));
  }
};


// @desc Create a new bootcamp
// @route POST /api/v1/bootcamps
// @access Private/Logged

exports.createBootcamp = async function (req, res, next) {
  try {
    let insertion = await Bootcamp.create(req.body);
    res.status(201).json({success: true, data: insertion });
  } catch(error){
    res.status(400).json({success: false, error: error.message});
  }
};


// @desc Update a bootcamp
// @route PUT /api/v1/bootcamps/:id
// @access Private/Logged

exports.updateBootcamp = async function (req, res, next) {
  let bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if(!bootcamp){
    return res.status(400).json({ success: false, data: 'Not Found'});
  }

  res.status(200).json({ success: true, data: bootcamp });
};


// @desc Delete a bootcamp
// @route DELETE /api/v1/bootcamps/:id
// @access Private/Logged

exports.deleteBootcamp = async function (req, res, next) {
  let bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

  if(!bootcamp){
    return res.status(400).json({ success: false, data: 'Not Found'});
  }

  res.status(200).json({ success: true, data: {} });
};
