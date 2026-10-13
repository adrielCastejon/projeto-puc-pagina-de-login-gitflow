# Salão de Beleza — API REST

API do recurso `servico`
 (id, nome, duracao, preco).
## Subir

Na pasta `sist-n2`:

```bash
docker compose up -d
npm install
npm start
```

O MySQL fica na porta **3307**. A API fica em `http://localhost:3000`.

## Rotas

| Operação | Método | URL | Status |
|---|---|---|---|
| Listar | GET | `/servico` | 200 |
| Cadastrar | POST | `/servico/create` | 201 |
| Um registro | GET | `/servico/1` | 200 |
| Atualizar | PUT | `/servico/1` | 202 |
| Excluir | DELETE | `/servico/1` | 202 |

Exemplo de cadastro:

```json
{
  "nome": "Corte feminino",
  "duracao": 45,
  "preco": 80.0
}
```
