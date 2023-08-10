import express from 'express'
import {getVendaById, getVendasByDate, getVendasBySDate, addVenda, editVenda, delVenda} from '../controllers/venda.js'

const router = express.Router()

router.post('/', addVenda)
router.get('/:id', getVendaById)
router.get('/data/:data1-:data2', getVendasByDate)
router.get('/data/:data1', getVendasBySDate)
router.put('/:id', editVenda)
router.delete('/:id', delVenda)

export default router