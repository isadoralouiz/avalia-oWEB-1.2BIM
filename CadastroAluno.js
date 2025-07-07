document.addEventListener("DOMContentLoaded", () => {
  const cepInput = document.getElementById("cep");

  cepInput.addEventListener("input", () => {
    const cep = cepInput.value.replace(/\D/g, "");
    if (cep.length === 8) {
      buscarCep(cep);
    } else {
      limparCampos();
    }
  });
});

function buscarCep(cep) {
  const url = `https://viacep.com.br/ws/${cep}/json/`;

  fetch(url)
    .then((res) => res.json())
    .then((dados) => {
      if (dados.erro) {
        alert("CEP não encontrado!");
        limparCampos();
        return;
      }
      document.getElementById("cep").value = dados.cep || ";";
      document.getElementById("rua").value = dados.logradouro || "";
      document.getElementById("complemento").value = dados.complemento || "";
      document.getElementById("bairro").value = dados.bairro || "";
      document.getElementById("cidade").value = dados.localidade || "";
      document.getElementById("uf").value = dados.uf || "";
    })
    .catch(() => {
      alert("Erro ao buscar o CEP.");
      limparCampos();
    });
}

function limparCampos() {
  const campos = [
    "rua",
    "numero",
    "complemento",
    "bairro",
    "cidade",
    "uf",
  ];
  campos.forEach((id) => (document.getElementById(id).value = ""));
}


function salvarDados() {
  const endereco = {
    nome: document.getElementById("nome").value,
    email: document.getElementById("email").value,
    cep: document.getElementById("cep").value,
    rua: document.getElementById("rua").value,
    numero: document.getElementById("numero").value,
    complemento: document.getElementById("complemento").value,
    bairro: document.getElementById("bairro").value,
    cidade: document.getElementById("cidade").value,
    uf: document.getElementById("uf").value,
  };

  let lista = JSON.parse(localStorage.getItem("endereco")) || [];
  lista.push(endereco);
  localStorage.setItem("endereco", JSON.stringify(lista));

  alert("Endereço salvo com sucesso!");

  const div = document.getElementById("enderecos");
  div.innerHTML = "";

  if (lista.length === 0) {
    div.innerHTML = "<p>Nenhum endereço salvo ainda.</p>";
    return;
  }

  lista.forEach((end, index) => {
    const bloco = document.createElement("div");
    bloco.innerHTML = `
      ${end.nome}<br>
      ${end.email}<br>
      ${end.rua}, ${end.numero}<br>
      ${end.bairro}, ${end.cidade} - ${end.uf} <br>
      CEP: ${end.cep}<br>
    `;
    div.appendChild(bloco);
  });
}
