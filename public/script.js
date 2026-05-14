const form = document.getElementById("formLogin");
const msg = document.getElementById("msg");
const loading = document.getElementById("loading");

form.addEventListener("submit", async function (e) {

    e.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    if (email === "" || senha === "") {

        msg.innerHTML = "Preencha todos os campos.";
        msg.style.color = "red";

        return;
    }

    msg.innerHTML = "";
    loading.style.display = "block";

    try {

        const resposta = await fetch("/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email,
                senha
            })

        });

        const dados = await resposta.json();

        loading.style.display = "none";

        msg.innerHTML = dados.mensagem;

        if (dados.usuario) {

            msg.style.color = "green";

            // Salvar usuário no navegador
            localStorage.setItem(
                "usuario",
                JSON.stringify(dados.usuario)
            );

            setTimeout(() => {

                window.location.replace("./inicio/index.html");

            }, 1900);

        } else {

            msg.style.color = "red";

        }

    } catch (erro) {

        console.log(erro);

        loading.style.display = "none";

        msg.innerHTML = "Erro no servidor.";
        msg.style.color = "red";

    }

});