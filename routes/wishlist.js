const express = require('express')

const router = express.Router()
const {
  createItem,
  deleteItem,
  getAllItems,
  updateItem,
  getItem,
} = require('../controllers/jobs')

router.route('/').post(createItem).get(getAllItems)

router.route('/:id').get(getItem).delete(deleteItem).patch(updateItem)

module.exports = router
