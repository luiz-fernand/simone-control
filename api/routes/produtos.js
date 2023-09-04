import express from 'express'
import {getProdutos, getProdutoById, getProdutoByCliente, getProdutoByStatus, addProduto, editProduto, delProduto, getProdutosOrd} from '../controllers/produto.js'

const router = express.Router()

router.get('/', getProdutos)
router.get('/asc', getProdutosOrd)
router.post('/', addProduto)
router.get('/:id', getProdutoById)
router.get('/cliente/:id', getProdutoByCliente)
router.get('/status/:status', getProdutoByStatus)
router.put('/:id', editProduto)
router.delete('/:id', delProduto)

export default router