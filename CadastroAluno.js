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
    const campos = ["rua", "complemento", "bairro", "cidade", "uf"];
    campos.forEach((id) => (document.getElementById(id).value = ""));
  }
  
 function salvarDados() {
  const endereco = {
    cep: document.getElementById("cep").value,
    rua: document.getElementById("rua").value,
    complemento: document.getElementById("complemento").value,
    bairro: document.getElementById("bairro").value,
    cidade: document.getElementById("cidade").value,
    uf: document.getElementById("uf").value,
  };

  let lista = JSON.parse(localStorage.getItem("enderecos")) || [];
  lista.push(endereco);
  localStorage.setItem("enderecos", JSON.stringify(lista));

  alert("Endereço salvo com sucesso!");
  listarEnderecos();
}

function listarEnderecos() {
  const lista = JSON.parse(localStorage.getItem("enderecos")) || [];
  const div = document.getElementById("lista-enderecos");
  div.innerHTML = "";

  if (lista.length === 0) {
    div.innerHTML = "<p>Nenhum endereço salvo ainda.</p>";
    return;
  }

  lista.forEach((end, index) => {
    const bloco = document.createElement("div");
    bloco.innerHTML = `
      <strong>Endereço ${index + 1}</strong>
      CEP: ${end.cep}<br>
      Rua: ${end.rua}<br>
      Complemento: ${end.complemento}<br>
      Bairro: ${end.bairro}<br>
      Cidade: ${end.cidade} - ${end.uf}<br>
    `;
    div.appendChild(bloco);
  });
}

  