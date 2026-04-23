const form = document.getElementById("formLogin");
const msg = document.getElementById("msg");
const loading = document.getElementById("loading");

form.addEventListener("submit", function(e){
e.preventDefault();

const cpf = document.getElementById("cpf").value;
const senha = document.getElementById("senha").value;

if(cpf === "" || senha === ""){
msg.innerHTML = "Preencha todos os campos.";
msg.style.color = "red";
return;
}

msg.innerHTML = "";
loading.style.display = "block";

setTimeout(() => {
loading.style.display = "none";
msg.innerHTML = "Login realizado com sucesso!";
msg.style.color = "green";
}, 1800);

});