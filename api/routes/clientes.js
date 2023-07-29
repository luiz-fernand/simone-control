import express from 'express'
import {getClientes, addCliente, editCliente, delCliente} from '../controllers/cliente.js'

const router = express.Router()

router.get("/", getClientes)
router.post('/', addCliente)
router.put('/:id', editCliente)
router.delete('/:id', delCliente)

export default router