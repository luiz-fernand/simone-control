import express from 'express'
import {getVendas, getVendaById, addVenda, editVenda, delVenda} from '../controllers/venda.js'

const router = express.Router()

router.get('/', getVendas)
router.post('/', addVenda)
router.get('/:id', getVendaById)
router.put('/:id', editVenda)
router.delete('/:id', delVenda)

export default router