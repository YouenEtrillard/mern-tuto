// @desc    Get goals
// @route   GET /api/goals

const { json } = require("express/lib/response");

// @access  Private
const getGoals = (req, res) => {
  res.status(200).json({message: 'Get goals'})
};

// @desc    Set goal
// @route   POST /api/goals
// @access  Private
const setGoal = (req, res) => {
  if(!req.body.text) {
    res.status(400)
    throw new Error("please add a text field");
  }
  res.status(201).json({message: 'Create goals'})
};

// @desc    Edit goal
// @route   PUT /api/goals/:id
// @access  Private
const editGoal = (req, res) => {
  res.status(200).json({message: `Edit goal ${req.params.id}`})
};

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = (req, res) => {
  res.status(200).json({message: `Delete goal ${req.params.id}`})
};

module.exports = {
  getGoals,
  setGoal,
  editGoal,
  deleteGoal
};
