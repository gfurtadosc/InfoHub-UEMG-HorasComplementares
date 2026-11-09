/**
 * LÓGICA ESPECÍFICA DO SETOR — DESENVOLVIDO PELA EQUIPE DISCENTE
 * Disciplina: Programação 2 (Extensão BSI / UEMG Carangola)
 *
 * Página: Horas Complementares — Atividades Complementares de Graduação (ACG)
 * - Filtro da tabela comparativa por modalidade (botões).
 * - Contador do checklist de conferência do certificado (nada é salvo ou enviado).
 */

document.addEventListener('DOMContentLoaded', () => {
  initFiltroModalidades();
  initChecklistCertificado();
});

/**
 * Filtra as linhas da tabela comparativa de acordo com a modalidade escolhida.
 * Cada linha tem o atributo data-modalidade; o botão "Todas" mostra todas.
 */
function initFiltroModalidades() {
  const botoes = document.querySelectorAll('.acg-filter-btn');
  const linhas = document.querySelectorAll('.acg-table tbody tr[data-modalidade]');
  const status = document.getElementById('acg-filter-status');

  if (!botoes.length || !linhas.length) return;

  const aplicarFiltro = (botaoAtivo) => {
    const filtro = botaoAtivo.dataset.filter;
    let visiveis = 0;

    botoes.forEach((botao) => {
      botao.setAttribute('aria-pressed', String(botao === botaoAtivo));
    });

    linhas.forEach((linha) => {
      const mostrar = filtro === 'todas' || linha.dataset.modalidade === filtro;
      linha.hidden = !mostrar;
      if (mostrar) visiveis += 1;
    });

    if (status) {
      const rotulo = filtro === 'todas' ? 'todas as modalidades' : botaoAtivo.textContent.trim();
      status.textContent = `Mostrando ${visiveis} ${visiveis === 1 ? 'atividade' : 'atividades'} (${rotulo}).`;
    }
  };

  botoes.forEach((botao) => {
    botao.addEventListener('click', () => aplicarFiltro(botao));
  });

  const botaoInicial = document.querySelector('.acg-filter-btn[aria-pressed="true"]') || botoes[0];
  aplicarFiltro(botaoInicial);
}

/**
 * Atualiza o contador "X de 6 itens conferidos" do checklist do certificado.
 */
function initChecklistCertificado() {
  const itens = document.querySelectorAll('.acg-check');
  const status = document.getElementById('acg-checklist-status');

  if (!itens.length || !status) return;

  const atualizar = () => {
    const marcados = Array.from(itens).filter((item) => item.checked).length;
    const completo = marcados === itens.length;

    status.textContent = completo
      ? `Tudo certo: ${marcados} de ${itens.length} itens conferidos.`
      : `${marcados} de ${itens.length} itens conferidos`;
    status.classList.toggle('is-complete', completo);
  };

  itens.forEach((item) => item.addEventListener('change', atualizar));
  atualizar();
}
