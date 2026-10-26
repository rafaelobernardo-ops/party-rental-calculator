// 1. Definição dos preços unitários//
const PRECOS = {
  kit: 25.00,
cadeira: 4.00,
toalha: 8.00
};

//2. função auxiliar para formatar números padrão moeda brasileira. ex 25,00//
function formatarMoeda(valor){
  return valor.toLocaleString( 'pt-BR', {minimFractionDigits: 2, maximFractionDigits: 2})
}

//3. função principal de cálculo//
function calcularTotal() {
  // 1. Obter quantidades informadas nos inputs( com tratamento, caso venham vazias ou naN)/
  const qtdKit = parseInt(document.getElementById('qtdKit').value) || 0;
  const qtdCadeira = parseInt(document.getElementById('qtdCadeira').value) || 0;
  const qtdToalha = parseInt(document.getElementById('qtdToalha').value) || 0;

  // 2. Calcular subtotais
  const subtotalKit = qtdKit * PRECOS.kit;
  const subtotalCadeira = qtdCadeira * PRECOS.cadeira;
  const subtotalToalha = qtdToalha * PRECOS.toalha;

  // 3. Atualizar no HTML (ajuste os IDs conforme o seu HTML)
  document.getElementById('subtotalKit').textContent = formatarMoeda(subtotalKit);
  document.getElementById('subtotalCadeira').textContent = formatarMoeda(subtotalCadeira);
  document.getElementById('subtotalToalha').textContent =  formatarMoeda(subtotalToalha);

  // 4. Calcular e atualizar total geral
  const totalGeral = subtotalKit + subtotalCadeira + subtotalToalha;
  document.getElementById('valorTotal').textContent =  formatarMoeda(totalGeral);

}
function enviarWhatsApp() {
    // 1. Obter as quantidades atuais
    const qtdKit = parseInt(document.getElementById('qtdKit').value) || 0;
    const qtdCadeira = parseInt(document.getElementById('qtdCadeira').value) || 0;
    const qtdToalha = parseInt(document.getElementById('qtdToalha').value) || 0;

    // Validação: Verificar se o usuário escolheu pelo menos um item
    if (qtdKit === 0 && qtdCadeira === 0 && qtdToalha === 0) {
        alert("Por favor, selecione ao menos um item antes de enviar o pedido.");
        return;
    }

    // 2. Obter o total geral que está na tela
    const totalGeral = document.getElementById('valorTotal').textContent;

    // 3. Montar a mensagem formatada para o WhatsApp
    let mensagem = "*Novo Pedido - FestEventos*\n\n*Itens solicitados:*\n";

    if (qtdKit > 0) {
        mensagem += `- ${qtdKit}x Kit Mesa + 4 Cadeiras\n`;
    }
    if (qtdCadeira > 0) {
        mensagem += `- ${qtdCadeira}x Cadeira Avulsa\n`;
    }
    if (qtdToalha > 0) {
        mensagem += `- ${qtdToalha}x Toalha de Mesa\n`;
    }

    mensagem += `\n*Total Geral:* R$ ${totalGeral}`;

    // Codificar a mensagem para o formato de URL
    const mensagemCodificada = encodeURIComponent(mensagem);

    // 4. Definir o número de destino (exemplo com DDI 55 e DDD do RJ)
    // Se usar o input da tela:
    let telefone = document.getElementById('telefoneCliente').value.replace(/\D/g, '');
    
    // Se quiser fixar o seu número, basta descomentar a linha abaixo e colocar o seu:
    // const telefone = "5521999999999"; 

    if (!telefone) {
        alert("Por favor, informe o número de WhatsApp.");
        return;
    }

    // 5. Abrir o link do WhatsApp
    const urlWhatsApp = `https://wa.me/55${telefone}?text=${mensagemCodificada}`;
    window.open(urlWhatsApp, '_blank');
}

  

  