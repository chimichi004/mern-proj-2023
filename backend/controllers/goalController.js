const asyncHandler = require('express-async-handler');

// @access Private
// @desc Get goals
// @route GET /api/goals
const getGoals = asyncHandler(async (req, res) => {
    res.status(200).json({messsage: 'get goals'});
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
    res.status(200).json({messsage: 'Set goals'});
})

// @access Private
// @desc Update goal
// @route PUT /api/goal/:id
const updateGoal = asyncHandler(async (req, res) => {
    res.status(200).json({messsage: `Update goal ${req.params.id}`});
})

// @access Private
// @desc Delete goal
// @route DELETE /api/goal/:id
const deleteGoal= asyncHandler(async (req, res) => {
    res.status(200).json({messsage: `Delete goal ${req.params.id}`});
})


module.exports = {
    getGoals,setGoal,updateGoal,deleteGoal
}