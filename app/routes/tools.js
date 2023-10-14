const express = require('express');
const router = express.Router();
const checkOrigin = require('../middleware/origin');
const { getTools, createTool, getToolById, updateToolById, deleteToolById, getToolByName, updateToolByName, deleteToolByName, } = require('../controlles/tools');

router.get('/', getTools); 
router.post('/', createTool); 
router.get('/:nombre', getToolByName); 
router.patch('/:nombre', updateToolByName); 
router.delete('/:nombre', deleteToolByName); 

module.exports = router;
