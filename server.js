const express = require("express");
const app = express();
const path = require("path");

const mongoose = require("mongoose");

const Usuario = require("./models/Usuario");
const Transferencia = require("./models/Transferencia");

// ==========================
// CONFIGURAÇÕES
// ==========================

app.use(express.json());
app.use(express.static("public"));

// ==========================
// CONEXÃO MONGODB
// ==========================

mongoose.connect(
    "mongodb://carlosdante10_db_user:uv4VHd1TZMCzneMa@ac-cnsoigl-shard-00-00.6autl2r.mongodb.net:27017,ac-cnsoigl-shard-00-01.6autl2r.mongodb.net:27017,ac-cnsoigl-shard-00-02.6autl2r.mongodb.net:27017/banco?ssl=true&replicaSet=atlas-glqq49-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0",
    {
        serverSelectionTimeoutMS: 5000
    }
)
.then(() => {
    console.log("MongoDB conectado!");
})
.catch((err) => {
    console.log("Erro ao conectar MongoDB:");
    console.log(err);
});

// ==========================
// ROTA PRINCIPAL
// ==========================

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "login.html"));
});

// ==========================
// CADASTRO
// ==========================

app.post("/cadastro", async (req, res) => {

    try {

        const { nome, email, senha } = req.body;

        const usuarioExistente = await Usuario.findOne({ email });

        if (usuarioExistente) {

            return res.status(400).json({
                mensagem: "Email já cadastrado"
            });

        }

        const usuario = new Usuario({
            nome,
            email,
            senha,
            saldo: 1000
        });

        await usuario.save();

        res.json({
            mensagem: "Usuário cadastrado com sucesso!"
        });

    } catch (erro) {

        console.log(erro);

        res.status(500).json({
            mensagem: "Erro no servidor"
        });

    }

});

// ==========================
// LOGIN
// ==========================

app.post("/login", async (req, res) => {

    try {

        const { email, senha } = req.body;

        const usuario = await Usuario.findOne({
            email,
            senha
        });

        if (!usuario) {

            return res.status(401).json({
                mensagem: "Email ou senha incorretos"
            });

        }

        res.json({
            mensagem: "Login realizado com sucesso!",
            usuario
        });

    } catch (erro) {

        console.log(erro);

        res.status(500).json({
            mensagem: "Erro no servidor"
        });

    }

});

// ==========================
// TRANSFERÊNCIA
// ==========================

app.post("/transferir", async (req, res) => {

    try {

        let {
            remetenteId,
            destinatarioEmail,
            valor
        } = req.body;

        valor = Number(valor);

        if (valor <= 0) {

            return res.status(400).json({
                mensagem: "Valor inválido"
            });

        }

        const remetente = await Usuario.findById(remetenteId);

        const destinatario = await Usuario.findOne({
            email: destinatarioEmail
        });

        if (!remetente || !destinatario) {

            return res.status(404).json({
                mensagem: "Usuário não encontrado"
            });

        }

        if (remetente.email === destinatario.email) {

            return res.status(400).json({
                mensagem: "Não é possível transferir para você mesmo"
            });

        }

        if (Number(remetente.saldo) < valor) {

            return res.status(400).json({
                mensagem: "Saldo insuficiente"
            });

        }

        // Atualizar saldos

        remetente.saldo =
            Number(remetente.saldo) - valor;

        destinatario.saldo =
            Number(destinatario.saldo) + valor;

        // Salvar alterações

        await remetente.save();
        await destinatario.save();

        // Registrar transferência

        const transferencia = new Transferencia({

            remetente: remetente._id,
            destinatario: destinatario._id,
            valor

        });

        await transferencia.save();

        console.log("Transferência realizada!");

        res.json({
            mensagem: "Transferência realizada com sucesso!"
        });

    } catch (erro) {

        console.log(erro);

        res.status(500).json({
            mensagem: "Erro no servidor"
        });

    }

});

// ==========================
// SERVIDOR
// ==========================

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});