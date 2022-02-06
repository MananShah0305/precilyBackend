import boxModel from './boxModel.js'

//Get API to return the entire information stored in the collection
export const getBoxInfo = (req, res) => {
    boxModel.find()
        .then(result => {
            res.send({
                status: 'success',
                boxes: result
            })
        })
        .catch(err => console.log(err))
}

//Get API to return the required data from the collection
export const getBoxInfoFrontEnd = async (req, res) => {
    const box1Doc = await boxModel.findOne({ name: 'box1' }, { boxInfo: { $slice: 1 } })
    const box2Doc = await boxModel.findOne({ name: 'box2' }, { boxInfo: { $slice: 1 } })
    const box3Doc = await boxModel.findOne({ name: 'box3' }, { boxInfo: { $slice: 1 } })
    res.status(200).json({ box1Doc: box1Doc, box2Doc: box2Doc, box3Doc: box3Doc })

}

//Add API to add a new entry into the collection
export const addBoxInfo = (req, res) => {
    boxModel.findOneAndUpdate({ name: req.body.name }, {
        $push: {
            boxInfo: {
                $each: [{
                    content: req.body.content,
                    image: req.body.image,
                    timestamp: req.body.timestamp
                }],
                $position: 0
            }
        }
    })
        .then(() => {
            return res.status(200).json({ message: `${req.body.name.toUpperCase()} added successfully`, status: 'success' })
        })
        .catch(err => console.log(err))
}

//Update API to update the existing entry
export const editBoxInfo = (req, res) => {
    boxModel.findOneAndUpdate({ name: req.body.name, 'boxInfo._id': req.body.id }, {
        $set: {
            'boxInfo.$': {
                content: req.body.content,
                image: req.body.image,
                timestamp: new Date()
            }
        }
    })
        .then(() => {
            console.log('Success')
            return res.status(200).json({ message: `Box ${req.body._id} updated successfully`, status: 'success' })
        })
        .catch(err => console.log(err))

}