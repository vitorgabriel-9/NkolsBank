console.log("TRANSFERIR.JS CARREGOU");

const formTransferencia = document.getElementById("formTransferencia");

const msg = document.getElementById("msg");

const saldoTexto = document.getElementById("saldo");

// Pegar usuário salvo no login
const usuario = JSON.parse(
    localStorage.getItem("usuario")
);

// Mostrar saldo na tela
if (usuario) {

    saldoTexto.innerHTML =
        `Saldo na conta: R$ ${usuario.saldo}`;

}

formTransferencia.addEventListener("submit", async (e) => {

    e.preventDefault();

    const destinatarioEmail =
        document.getElementById("toUser").value;

    const valor = Number(
        document.getElementById("valor").value
    );

    if (!usuario) {

        msg.innerHTML = "Usuário não está logado.";
        msg.style.color = "red";

        return;

    }

    try {

        const resposta = await fetch("/transferir", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                remetenteId: usuario._id,

                destinatarioEmail,

                valor

            })

        });

        const dados = await resposta.json();

        msg.innerHTML = dados.mensagem;

        // Atualizar saldo na tela
        if (resposta.ok) {

            msg.style.color = "green";

            usuario.saldo -= valor;

            localStorage.setItem(
                "usuario",
                JSON.stringify(usuario)
            );

            saldoTexto.innerHTML =
                `Saldo na conta: R$ ${usuario.saldo}`;

        } else {

            msg.style.color = "red";

        }

    } catch (erro) {

        console.log(erro);

        msg.innerHTML = "Erro na transferência.";
        msg.style.color = "red";

    }

});