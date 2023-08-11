import { db } from "../db.js"

export const getProdutos = (_, res) => {
    const q = 'SELECT * FROM produto'

    db.query(q, (err, data) => {
        if(err) return res.json(err)
        return res.status(200).json(data)
    })
}

export const getProdutoById = (req, res) => {
    const q = 'SELECT * FROM produto WHERE `id` = ?'

    db.query(q, [req.params.id],(err, data) => {
        if(err) return res.json(err)
        return res.status(200).json(data)
    })
}

export const getProdutoByCliente = (req, res) => {
    const q = 'SELECT * FROM produto WHERE `cliente` = ?'

    db.query(q, [req.params.id],(err, data) => {
        if(err) return res.json(err)
        return res.status(200).json(data)
    })
}

export const getProdutoByStatus = (req, res) => {
    const q = 'SELECT * FROM produto WHERE `status` = ?'

    db.query(q, [req.params.status],(err, data) => {
        if(err) return res.json(err)
        return res.status(200).json(data)
    })
}

export const addProduto = (req, res) => {
    const q = 'INSERT INTO produto(`cliente`, `tipo`, `descricao`, `tamanho`, `valor`) VALUES(?)'

    const values = [
        req.body.cliente,
        req.body.tipo,
        req.body.descricao,
        req.body.tamanho,
        req.body.valor
    ]

    db.query(q, [values],(err) => {
        if(err) return res.json(err)
        return res.status(200).json('Produto ADICIONADO!')
    })
}

export const editProduto = (req, res) => {
    const q = 'UPDATE produto SET `tipo` = ?, `descricao` = ?, `tamanho` = ?, `valor` = ?, `status` = ? WHERE `id` = ?'

    const values = [
        req.body.tipo,
        req.body.descricao,
        req.body.tamanho,
        req.body.valor,
        req.body.status
    ]

    db.query(q, [...values, req.params.id],(err) => {
        if(err) return res.json(err)
        return res.status(200).json('Produto ATUALIZADO com sucesso!')
    })
}

export const delProduto = (req, res) => {
    const q = 'DELETE FROM produto WHERE `id` = ?'

    db.query(q, [req.params.id],(err) => {
        if(err) return res.json(err)
        return res.status(200).json('Produto DELETADO!')
    })
}