import { db } from "../db.js"

export const getComissao = (_, res) => {
    const q = 'SELECT * FROM comissao'

    db.query(q, (err, data) => {
        if(err) return res.json(err)
        return res.status(200).json(data)
    })
}

export const getComissaoById = (req, res) => {
    const q = 'SELECT * FROM comissao WHERE `id` = ?'
    
    db.query(q, [req.params.id],(err, data) => {
        if(err) return res.json(err)
        return res.status(200).json(data)
})
}

export const getComissaoBySData = (req, res) => {
    const q = 'SELECT * FROM comissao WHERE `data` >= ?'

    db.query(q, [req.params.data1],(err, data) => {
        if(err) return res.json(err)
        return res.status(200).json(data)
    })
}

export const getComissaoByData = (req, res) => {
    const q = 'SELECT * FROM comissao WHERE `data` >= ? AND `data` <= ?'

    db.query(q, [req.params.data1, req.params.data2],(err, data) => {
        if(err) return res.json(err)
        return res.status(200).json(data)
    })
}

export const addComissao = (req, res) => {
    const q = 'INSERT INTO comissao(`cliente`, `descricao`, `produtos`, `data`, `hora`, `valor`) VALUES(?)'

    const values = [
        req.body.cliente,
        req.body.descricao,
        req.body.produtos,
        req.body.data,
        req.body.hora,
        req.body.valor
    ]

    db.query(q, [ values ],(err) => {
        if(err) return res.json(err)
        return res.status(200).json('Comissão REGISTRADA!')
    })
}

export const editComissao = (req, res) => {
    const q = 'UPDATE comissao SET `cliente` = ?, `descricao` = ?, `produtos` = ?, `data` = ?, `hora` = ?, `valor` = ? WHERE `id` = ?'

    const values = [
        req.body.cliente,
        req.body.descricao,
        req.body.produtos,
        req.body.data,
        req.body.hora,
        req.body.valor
    ]

    db.query(q, [...values, req.params.id],(err) => {
        if(err) return res.json(err)
        return res.status(200).json('Comissão ATUALIZADA com sucesso!')
    })
}

export const delComissao = (req, res) => {
    const q = 'DELETE FROM comissao WHERE `id` = ?'

    db.query(q, [req.params.id],(err) => {
        if(err) return res.json(err)
        return res.status(200).json('Comissão DELETADA!')
    })
}