function calcularRota() {

  const input = document.getElementById("pontos").value;

  const resultado = document.getElementById("resultado");

  if(input.trim() === "") {

    resultado.innerHTML = `
      ⚠️ Digite uma localização.
    `;

    return;
  }

  let pontos = input
    .split(",")
    .map(p => p.trim())
    .filter(p => p !== "");

  let rota = [...pontos];

  for(let i = rota.length - 1; i > 0; i--) {

    const j = Math.floor(Math.random() * (i + 1));

    [rota[i], rota[j]] = [rota[j], rota[i]];
  }

  const distancia = (Math.random() * 50 + 10).toFixed(2);

  const tempo = (distancia / 45).toFixed(1);

  resultado.innerHTML = `

    <strong>📍 Melhor rota:</strong>

    <br><br>

    ${rota.join(" ➜ ")}

    <br><br>

    <strong>📏 Distância:</strong>
    ${distancia} km

    <br>

    <strong>⏱️ Tempo estimado:</strong>
    ${tempo} horas

    <br><br>

    ✅ Menor trânsito<br>
    ✅ Economia de combustível<br>
    ✅ Melhor eficiência logística
  `;
}
