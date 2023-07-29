import express from 'express'
import {getProdutos} from '../controllers/produto.js'

const router = express.Router()

router.get("/", getProdutos)

export default router