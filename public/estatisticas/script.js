// Variáveis Globais de Estado do App
let totalGastoAcumulado = 1240.00;
let valoresCategorias = [450, 220, 180, 390]; // Ordem: [Alimentação, Transporte, Lazer, Contas]
const labelsCategorias = ['Alimentação', 'Transporte', 'Lazer', 'Contas'];

// --- 1. CONFIGURAÇÃO DO GRÁFICO DE PIZZA (DOUGHNUT) ---
const ctxCategory = document.getElementById('categoryChart').getContext('2d');
const graficoPizza = new Chart(ctxCategory, {
    type: 'doughnut',
    data: {
        labels: labelsCategorias,
        datasets: [{
            data: valoresCategorias,
            backgroundColor: ['#0d47a1', '#1565c0', '#1976d2', '#90caf9'],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { 
            legend: { position: 'right' } 
        }
    }
});

// --- 2. CONFIGURAÇÃO DO GRÁFICO DE LINHA (EVOLUÇÃO DO SALDO) ---
const ctxEvolution = document.getElementById('evolutionChart').getContext('2d');
new Chart(ctxEvolution, {
    type: 'line',
    data: {
        labels: ['Março', 'Abril', 'Maio', 'Junho'],
        datasets: [{
            data: [800, 1100, 950, 1260],
            borderColor: '#0d47a1',
            backgroundColor: 'rgba(13, 71, 161, 0.1)',
            fill: true,
            tension: 0.3,
            borderWidth: 2
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
            y: { beginAtZero: true, grid: { color: '#f0f0f0' } },
            x: { grid: { display: false } }
        }
    }
});

// --- 3. LOGICA PARA CAPTURAR E ADICIONAR NOVO GASTO ---
const formulario = document.getElementById('gastoForm');

formulario.addEventListener('submit', function(event) {
    event.preventDefault(); // Impede a página de recarregar no envio

    // Captura os valores dos campos
    const valorInput = document.getElementById('valorGasto');
    const categoriaInput = document.getElementById('categoriaGasto');
    
    const valor = parseFloat(valorInput.value);
    const categoriaSelecionada = categoriaInput.value;
    
    // Encontra o índice da categoria no array
    const indice = labelsCategorias.indexOf(categoriaSelecionada);

    if (indice !== -1 && !isNaN(valor)) {
        // Atualiza os dados do gráfico de Pizza
        valoresCategorias[indice] += valor;
        graficoPizza.update();

        // Atualiza o card de texto do "Total Gasto"
        totalGastoAcumulado += valor;
        const totalTexto = document.getElementById('totalGastoTexto');
        totalTexto.innerText = `- R$ ${totalGastoAcumulado.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

        // Reseta os campos do formulário para o próximo uso
        formulario.reset();
    }
});
