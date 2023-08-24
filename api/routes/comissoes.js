import express from 'express'
import { getComissao, getComissaoById, getComissaoBySData, getComissaoByData, addComissao, editComissao, delComissao } from '../controllers/comissao.js'

const router = express.Router()

router.get('/', getComissao)
router.get('/:id', getComissaoById)
router.get('/data/:data1-:data2', getComissaoByData)
router.get('/data/:data1', getComissaoBySData)
router.post('/', addComissao)
router.put('/:id', editComissao)
router.delete('/:id', delComissao)

export default router