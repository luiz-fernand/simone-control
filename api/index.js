import express from 'express'
import cors from 'cors'
import prodRoutes from './routes/produtos.js'
import clieRoutes from './routes/clientes.js'
import vendRoutes from './routes/vendas.js'

const app = express()

app.use(express.json())
app.use(cors())

app.use("/clientes", clieRoutes)
app.use("/produtos", prodRoutes)
app.use("/vendas", vendRoutes)

app.listen(8800)