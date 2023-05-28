const router = require('express').Router();

const {

    create,
    update,
    deleteItem,
    viewbyid,
    view,
    nameWiseData,
    categoryWiseData

} = require('../controller/item.ctrl')


router.post("/insert", create);
router.put('/update/:id', update);
router.delete('/delete/:id', deleteItem);
router.get('/viewById/:id', viewbyid);
router.get("/view", view);
router.get("/nameWise", nameWiseData);
router.get('/categoryWise', categoryWiseData);


module.exports = router;