const item = require('../models/item.model');

//create new item
exports.create = async (req, res) => {
    try {

        const data = await new item({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category
        })

        //save data
        const result = await data.save()


        res.status(201).json({
            message: "Item created successfully",
            status: 201,
            data: result
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong",
            status: 500,
            error: error.message
        })
    }
}


//update item 
exports.update = async (req, res) => {
    try {

        const data = await item.findOne({ _id: req.params.id })

        if (data) {

            //update item
            const result = await item.findByIdAndUpdate({ _id: req.params.id }, {
                $set: {
                    name: req.body.name,
                    description: req.body.description,
                    price: req.body.price,
                    category: req.body.category
                }
            }, {
                new: true,
                useFindAndModify: false
            })

            console.log("result", result);

            res.status(200).json({
                message: "Item update successfully",
                status: 200
            })


        } else {
            res.status(404).json({
                message: "Data not found",
                status: 404
            })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong",
            status: 500,
            error: error.message
        })
    }
}


//delete item
exports.deleteItem = async (req, res) => {
    try {

        const data = await item.findOne({ _id: req.params.id })

        if (data) {

            //delete item
            const result = await item.findOneAndDelete({ _id: req.params.id })

            res.status(200).json({
                message: "Item delete successfully",
                status: 200
            })

        } else {
            res.status(404).json({
                message: "Item delete successfully",
                status: 404
            })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong",
            status: 500,
            error: error.message
        })
    }
}


//view by id item
exports.viewbyid = async (req, res) => {
    try {

        //view by id item
        const data = await item.findById({ _id: req.params.id })

        if (data) {

            res.status(200).json({
                message: "Item view successfully",
                status: 200,
                data: data
            })

        } else {
            res.status(404).json({
                message: "Data not found",
                status: 404
            })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong",
            status: 500,
            error: error.message
        })
    }
}


//view all item
exports.view = async (req, res) => {
    try {

        const data = await item.find({}).sort({ createdAt: -1 });

        if (data[0]) {
            res.status(200).json({
                message: "Data get successfully",
                status: 200,
                data: data
            })
        } else {
            res.status(404).json({
                message: "Data not found",
                status: 404
            })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong",
            status: 500,
            error: error.message
        })
    }
}



//name wise filtering and sorting
exports.nameWiseData = async (req, res) => {
    try {

        const limitData = req.query.limitData

        const page = req.query.page

        const name = req.query.name

        const data = await item.find({ name: { $regex: `^${name}`, $options: 'i' } }).limit(limitData);

        if (data) {
            res.status(200).json({
                message: "Data get successfully",
                status: 200,
                data: data
            })
        } else {
            res.status(404).json({
                message: 'Data not found',
                status: 404
            })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong",
            status: 500,
            error: error.message
        })
    }
}



//category wise filtering and sorting
exports.categoryWiseData = async (req, res) => {
    try {

        const limitData = req.query.limitData

        const page = req.query.page

        const category = req.query.category

        const data = await item.find({ category: { $regex: `^${category}`, $options: 'i' } }).limit(limitData);


        if (data) {
            res.status(200).json({
                message: "Data get successfully",
                status: 200,
                data: data
            })
        } else {
            res.status(404).json({
                message: 'Data not found',
                status: 404
            })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong",
            status: 500,
            error: error.message
        })
    }
}