const express= require('express');
const router= express.Router();
const quoteContoller= require('../controller/quoteController');
router.post('/',quoteContoller.createQuote);
router.get('/',quoteContoller.getAllQuotes);
router.get('/:id',quoteContoller.getQuote);
router.patch('/:id/likes',quoteContoller.updateLike);
router.patch('/:id/flags',quoteContoller.updateFlag);



module.exports=router;