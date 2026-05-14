const formulario = document.getElementById("formCadastro");

formulario.addEventListener("submit", async (e) => {

    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    try {

        const resposta = await fetch("/cadastro", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                nome,
                email,
                senha
            })

        });

        const dados = await resposta.json();

        alert(dados.mensagem);

    } catch (erro) {

        console.log(erro);

        alert("Erro ao cadastrar usuário");

    }

});