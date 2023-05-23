const asyncHandler = require('express-async-handler');
const Goal = require('../models/goalModel');
const User = require('../models/userModel');

// @access Private
// @desc Get goals
// @route GET /api/goals
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({ user: req.user.id});
    res.status(200).json(goals);
});

// @access Private
// @desc Set goal
// @route POST /api/goals
const setGoal = asyncHandler(async (req, res) => {
    if(!req.body.text){
        // res.status(400).json({message: 'Please add a text field'});
        res.status(400)
        throw new Error('Please add a text field')
    }

    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.idq
    })
    res.status(200).json(goal);
})

// @access Private
// @desc Update goal
// @route PUT /api/goal/:id
const updateGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id);
    
    if(!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    // const user = await User.findById(req.user.id)
    //Check for user
    if(!req.user){
        res.status(401)
        throw new Error('USer not found')
    }

    //Make sure the logged in user matches to goal user
    if(goal.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }


    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true,});

    res.status(200).json(updatedGoal);
})

// @access Private
// @desc Delete goal
// @route DELETE /api/goal/:id
const deleteGoal= asyncHandler(async (req, res) => {
     const goal = await Goal.findById(req.params.id);
    
    if(!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    // const user = await User.findById(req.user.id)
    //Check for user
    if(!req.user){
        res.status(401)
        throw new Error('USer not found')
    }

    //Make sure the logged in user matches to goal user
    if(goal.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    } 

    await goal.remove();

    res.status(200).json({id: req.params.id});
})


module.exports = {
    getGoals,setGoal,updateGoal,deleteGoal
}