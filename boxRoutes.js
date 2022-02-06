import express from 'express'
import { getBoxInfo,getBoxInfoFrontEnd,addBoxInfo,editBoxInfo} from './boxController.js'

const router = express.Router()

//Get API to return the entire information stored in the collection
router.route('/all').get(getBoxInfo)

//Get API to return the required data from the collection
router.route('/').get(getBoxInfoFrontEnd)

//Add API to add a new entry into the collection
router.route('/').post(addBoxInfo)

//Update API to update the existing entry  
router.route('/:id').patch(editBoxInfo)

export default router

