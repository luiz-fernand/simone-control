import express from 'express'
import {getProdutos, getProdutoById, getProdutoByCliente, addProduto, editProduto, delProduto} from '../controllers/produto.js'

const router = express.Router()

router.get('/', getProdutos)
router.post('/', addProduto)
router.get('/:id', getProdutoById)
router.get('/cliente/:id', getProdutoByCliente)
router.put('/:id', editProduto)
router.delete('/:id', delProduto)

export default router