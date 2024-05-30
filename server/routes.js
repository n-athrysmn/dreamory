import express from 'express'
import { create, deleteById, editById, fetchAll, fetchById, fetchFiltered } from './controllers.js'

const router = express.Router()

router.post('/create', create)
router.get('/get-all', fetchAll)
router.get('/get-status', fetchFiltered)
router.get('/get-event/:id', fetchById)
router.put('/edit-event/:id', editById)
router.delete('/delete-event/:id', deleteById)

export default router