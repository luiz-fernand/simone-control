import express from 'express'
import {getProdutos, getProdutoById, addProduto, editProduto, delProduto} from '../controllers/produto.js'

const router = express.Router()

router.get('/', getProdutos)
router.post('/', addProduto)
router.put('/:id', getProdutoById)
router.put('/:id', editProduto)
router.delete('/:id', delProduto)

export default router