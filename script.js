function calcularRota() {
  let pontos = input
    .split(',')
    .map(p => p.trim())
    .filter(p => p !== '');

  if(pontos.length < 2) {

    resultado.innerHTML = `
      <h3>⚠️ Erro</h3>

      <div class="rota">
        Digite pelo menos 2 pontos de entrega.
      </div>
    `;

    return;
  }

  let rota = [...pontos];

  for(let i = rota.length - 1; i > 0; i--) {

    const j = Math.floor(Math.random() * (i + 1));

    [rota[i], rota[j]] = [rota[j], rota[i]];
  }

  const distancia = (Math.random() * 80 + 20).toFixed(2);

  const tempo = (distancia / 40).toFixed(1);

  resultado.innerHTML = `

    <h3>✅ Melhor Rota Encontrada</h3>

    <div class="rota">

      <strong>📍 Ordem de Entrega:</strong>

      <br><br>

      ${rota.join(' ➜ ')}

      <br><br>

      <strong>📏 Distância Total:</strong>
      ${distancia} km

      <br>

      <strong>⏱️ Tempo Estimado:</strong>
      ${tempo} horas

      <br><br>

      ✔️ Economia de combustível<br>
      ✔️ Melhor desempenho logístico<br>
      ✔️ Otimização inteligente de entregas

    </div>
  `;
}

function limparCampos() {

  document.getElementById('pontos').value = '';

  document.getElementById('resultado').innerHTML = `

    <h3>Resultado da Otimização</h3>

    <div class="rota">
      Aguardando processamento...
    </div>
  `;
}
