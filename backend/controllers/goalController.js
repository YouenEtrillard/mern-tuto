const asyncHandler = require('express-async-handler');

const Goal = require("../models/goalModel");
const User = require("../models/userModel");

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });

  res.status(200).json(goals)
});

// @desc    Set goal
// @route   POST /api/goals
// @access  Private
const setGoal = asyncHandler(async (req, res) => {
  if(!req.body.text) {
    res.status(400)
    throw new Error("please add a text field");
  }

  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  })

  res.status(201).json(goal)
});

// @desc    Edit goal
// @route   PUT /api/goals/:id
// @access  Private
const editGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Erro('User not found');
  }

  // Make sure the logged in user matches the goal's user
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorised");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedGoal);
});

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Erro('User not found');
  }

  // Make sure the logged in user matches the goal's user
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorised");
  }

  await goal.remove();

  res.status(200).json({id: req.params.id});
});

module.exports = {
  getGoals,
  setGoal,
  editGoal,
  deleteGoal
};
