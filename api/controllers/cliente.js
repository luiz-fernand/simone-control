import { db } from "../db.js"

export const getClientes = (_, res) => {
    const q = 'SELECT * FROM cliente'

    db.query(q, (err, data) => {
        if(err) return res.json(err)
        return res.status(200).json(data)
    })
}

export const addCliente = (req, res) => {
    const q = 'INSERT INTO cliente(`nome`, `referencia`, `telefone`) VALUES(?)'

    const values = [
        req.body.nome,
        req.body.referencia,
        req.body.telefone
    ]

    db.query(q, [values],(err) => {
        if(err) return res.json(err)
        return res.status(200).json('Cliente ADICIONADO!')
    })
}

export const editCliente = (req, res) => {
    const q = 'UPDATE cliente SET `nome` = ?, `referencia` = ?, `telefone` = ? WHERE `id` = ?'

    const values = [
        req.body.nome,
        req.body.referencia,
        req.body.telefone
    ]

    db.query(q, [...values, req.params.id],(err) => {
        if(err) return res.json(err)
        return res.status(200).json('Cliente ATUALIZADO com sucesso!')
    })
}

export const delCliente = (req, res) => {
    const q = 'DELETE FROM cliente WHERE `id` = ?'

    db.query(q, [req.params.id],(err) => {
        if(err) return res.json(err)
        return res.status(200).json('Cliente DELETADO!')
    })
}