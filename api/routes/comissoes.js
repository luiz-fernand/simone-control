import express from 'express'
import { getComissao, getComissaoById, getComissaoByStatus, addComissao, editComissao, delComissao } from '../controllers/comissao.js'

const router = express.Router()

router.get('/', getComissao)
router.get('/:id', getComissaoById)
router.get('/status/:status', getComissaoByStatus)
router.post('/', addComissao)
router.put('/:id', editComissao)
router.delete('/:id', delComissao)

export default router