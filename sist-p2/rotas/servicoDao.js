const express = require("express");
const router = express.Router();
const mysql = require("./mysql").pool;

router.get("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({
        error: error,
        response: null
      });
    }
    conn.query(
      "SELECT * FROM servico",
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

router.post("/create", (req, res, next) => {
  const { nome, duracao, preco } = req.body;
  const servico = { nome, duracao, preco };

  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({
        error: error,
        response: null
      });
    }
    conn.query(
      "INSERT INTO servico (nome, duracao, preco) VALUES (?, ?, ?)",
      [servico.nome, servico.duracao, servico.preco],
      (error, resultado, fields) => {
        conn.release();
        if (error) {
          return res.status(500).send({
            error: error,
            response: null
          });
        }
        return res.status(201).send({
          mensagem: "Serviço cadastrado com sucesso",
          "ID do serviço cadastrado": resultado.insertId
        });
      }
    );
  });
});

router.get("/:id", (req, res, next) => {
  const id = req.params.id;

  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({
        error: error,
        response: null
      });
    }
    conn.query(
      "SELECT * FROM servico WHERE id = ?",
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

router.put("/:id", (req, res, next) => {
  const { nome, duracao, preco } = req.body;
  const servico = { nome, duracao, preco };

  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({
        error: error,
        response: null
      });
    }
    conn.query(
      "UPDATE servico SET nome = ?, duracao = ?, preco = ? WHERE id = ?",
      [servico.nome, servico.duracao, servico.preco, req.params.id],
      (error, resultado, fields) => {
        conn.release();
        if (error) {
          return res.status(500).send({
            error: error,
            response: null
          });
        }
        return res.status(202).send({
          mensagem: "Serviço atualizado com sucesso",
          response: resultado
        });
      }
    );
  });
});

router.delete("/:id", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({
        error: error,
        response: null
      });
    }
    conn.query(
      "DELETE FROM servico WHERE id = ?",
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
          mensagem: "Serviço removido com sucesso",
          response: resultado
        });
      }
    );
  });
});

module.exports = router;
