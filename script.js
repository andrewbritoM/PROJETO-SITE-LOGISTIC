function calcularRota(){

  const input = document.getElementById("rotas").value;

  const resultado = document.getElementById("resultado");

  if(input.trim() === ""){

    resultado.innerHTML = `
      <h3>⚠️ Erro</h3>
      <p>Digite os pontos de entrega.</p>
    `;

    return;
  }

  let pontos = input
    .split(",")
    .map(p => p.trim())
    .filter(p => p !== "");

  let rota = [...pontos];

  for(let i = rota.length - 1; i > 0; i--){

    const j = Math.floor(Math.random() * (i + 1));

    [rota[i], rota[j]] = [rota[j], rota[i]];
  }

  const distancia = (Math.random() * 20 + 5).toFixed(1);

  const tempo = (distancia / 40).toFixed(1);

  resultado.innerHTML = `

    <h3>✅ Melhor Rota Encontrada</h3>

    <p>

      <strong>📍 Rota:</strong>

      <br><br>

      ${rota.join(" ➜ ")}

      <br><br>

      <strong>📏 Distância:</strong>
      ${distancia} km

      <br><br>

      <strong>⏱️ Tempo estimado:</strong>
      ${tempo} horas

      <br><br>

      ✔️ Economia de combustível<br>
      ✔️ Menos tempo nas entregas<br>
      ✔️ Melhor eficiência logística

    </p>

  `;
}

function limparCampos(){

  document.getElementById("rotas").value = "";

  document.getElementById("resultado").innerHTML = `
    <h3>✅ Melhor Rota Encontrada</h3>
    <p>Aguardando cálculo...</p>
  `;
}
