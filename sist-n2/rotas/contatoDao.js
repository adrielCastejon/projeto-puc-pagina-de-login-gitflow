const express = require('express');
const router = express.Router();
const url = require('url');
const queryString = require('querystring');
const mysql = require('./mysql').pool;

router.get('/', (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({
        error: error,
        response: null
      });
    }
    conn.query(
      'SELECT * FROM contato',
      (error, resultado, fields) => {
        conn.release();
        if (error) {
          return res.status(500).send({
            error: error,
            response: null
          });
        }
        return res.status(200).send({ response: resultado });
      }
    );
  });
});

router.post('/create', (req, res, next) => {
  const { nome, fone, email } = req.body;
  const contato = { nome, fone, email };

  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({
        error: error,
        response: null
      });
    }
    conn.query(
      'INSERT INTO contato (nome, fone, email) VALUES (?, ?, ?)',
      [contato.nome, contato.fone, contato.email],
      (error, resultado, fields) => {
        conn.release();
        if (error) {
          return res.status(500).send({
            error: error,
            response: null
          });
        }
        return res.status(201).send({
          mensagem: 'Contato cadastrado com sucesso',
          'ID do contato cadastrado': resultado.insertedId
        });
      }
    );
  });
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id;

  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({
        error: error,
        response: null
      });
    }
    conn.query(
      'SELECT * FROM contato WHERE id = ?',
      [id],
      (error, resultado, fields) => {
        conn.release();
        if (error) {
          return res.status(500).send({
            error: error,
            response: null
          });
        }
        return res.status(200).send({ response: resultado });
      }
    );
  });
});

router.put('/:id', (req, res, next) => {
  const { nome, fone, email } = req.body;
  const contato = { nome, fone, email };

  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({
        error: error,
        response: null
      });
    }
    conn.query(
      'UPDATE contato SET nome = ?, fone = ?, email = ? WHERE id = ?',
      [contato.nome, contato.fone, contato.email, req.params.id],
      (error, resultado, fields) => {
        conn.release();
        if (error) {
          return res.status(500).send({
            error: error,
            response: null
          });
        }
        return res.status(202).send({
          mensagem: 'Contato atualizado com sucesso',
          response: resultado
        });
      }
    );
  });
});

router.delete('/:id', (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({
        error: error,
        response: null
      });
    }
    conn.query(
      'DELETE FROM contato WHERE id = ?',
      [req.params.id],
      (error, resultado, fields) => {
        conn.release();
        if (error) {
          return res.status(500).send({
            error: error,
            response: null
          });
        }
        return res.status(202).send({
          mensagem: 'Contato removido com sucesso',
          response: resultado
        });
      }
    );
  });
});

module.exports = router;
