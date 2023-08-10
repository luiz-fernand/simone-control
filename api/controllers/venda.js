import { db } from "../db.js"

export const getVendaById = (req, res) => {
    const q = 'SELECT * FROM venda WHERE `id` = ?'

    db.query(q, [req.params.id],(err, data) => {
        if(err) return res.json(err)
        return res.status(200).json(data)
    })
}

export const getVendasByDate = (req, res) => {
    const q = 'SELECT * FROM venda WHERE `data` >= ? AND `data` <= ?'

    db.query(q, [req.params.data1, req.params.data2],(err, data) => {
        if(err) return res.json(err)
        return res.status(200).json(data)
    })
}

export const getVendasBySDate = (req, res) => {
    const q = 'SELECT * FROM venda WHERE `data` >= ?'

    db.query(q, [req.params.data1],(err, data) => {
        if(err) return res.json(err)
        return res.status(200).json(data)
    })
}

export const addVenda = (req, res) => {
    const q = 'INSERT INTO cliente(`descricao`, `produtos`, `data`, `valor-total`) VALUES(?)'

    const values = [
        req.body.descricao,
        req.body.produtos,
        req.body.data,
        req.body.valortotal
    ]

    db.query(q, [values],(err) => {
        if(err) return res.json(err)
        return res.status(200).json('Venda REGISTRADA!')
    })
}

export const editVenda = (req, res) => {
    const q = 'UPDATE venda SET `descricao` = ?, `produtos` = ?, `data` = ?, `valor-total` = ? WHERE `id` = ?'

    const values = [
        req.body.descricao,
        req.body.produtos,
        req.body.data,
        req.body.valortotal
    ]

    db.query(q, [...values, req.params.id],(err) => {
        if(err) return res.json(err)
        return res.status(200).json('Venda ATUALIZADA com sucesso!')
    })
}

export const delVenda = (req, res) => {
    const q = 'DELETE FROM venda WHERE `id` = ?'

    db.query(q, [req.params.id],(err) => {
        if(err) return res.json(err)
        return res.status(200).json('Venda DELETADA!')
    })
}