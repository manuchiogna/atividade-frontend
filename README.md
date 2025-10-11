# 🚗 Neto & Felipe — Carros

**Projeto desenvolvido por Nelson Oliveira Neto e Felipe Mendes para a disciplina de Programação Front End do professor Cristiano Mendes Chagas na faculdade Unifan.**

Bem-vindo ao projeto **Neto & Felipe — Carros**, uma landing page completa para uma concessionária fictícia. O objetivo é apresentar estoque, estimular leads de financiamento e facilitar o contato com a loja em um único lugar. Este README traz orientações detalhadas sobre a estrutura, como executar o projeto e como estender o código existente. Aproveite! 😄

---

## 🧭 Sumário rápido
- [Visão geral](#-visão-geral)
- [Demonstração rápida](#-demonstração-rápida)
- [Estrutura do projeto](#-estrutura-do-projeto)
- [Como executar localmente](#-como-executar-localmente)
- [Funcionalidades em destaque](#-funcionalidades-em-destaque)
- [Documentação do código](#-documentação-do-código)
- [Customizações comuns](#-customizações-comuns)
- [Boas práticas e padrões](#-boas-práticas-e-padrões)
- [Próximos passos sugeridos](#-próximos-passos-sugeridos)

---

## 🌍 Visão geral
- **Tipo de projeto:** página estática com HTML, CSS e JavaScript vanilla.
- **Objetivo:** simular um site institucional de loja de veículos com busca filtrável de estoque, CTA para vendas, simulador de financiamento e formulário de contato.
- **Público-alvo:** vendedores de veículos que desejam demonstrar produtos e captar leads.

---

## 🎬 Demonstração rápida
Como este é um projeto estático, basta abrir o arquivo [`index.html`](index.html) diretamente no navegador para visualizar toda a aplicação. Para garantir o funcionamento dos recursos que utilizam JavaScript (busca e calculadora), recomenda-se rodar com um servidor HTTP simples (explicado abaixo).

---

## 🗂️ Estrutura do projeto
```
atividade-frontend/
├── index.html   # Estrutura base da landing page e componentes Bootstrap
├── style.css    # Estilos complementares e ajustes visuais personalizados
├── script.js    # Lógica de estoque, filtros, modais e calculadora de financiamento
└── README.md    # Documentação do projeto
```

### Principais seções da página
| Seção | Descrição |
| --- | --- |
| **Topbar e Navbar** | Links rápidos para WhatsApp, telefone, navegação interna e brand. |
| **Hero + Busca** | Banner inicial com formulário de filtros de estoque. |
| **Estoque em destaque** | Cards dinâmicos gerados a partir do array `ESTOQUE`. |
| **CTA “Quero vender”** | Chamada para avaliação do veículo via modal dedicado. |
| **Financiamento** | Passo a passo do financiamento. |
| **Calculadora de financiamento** | Simulador de parcelas usando a fórmula Price. |
| **Contato** | Formulário e mapa incorporado. |
| **Rodapé** | Direitos autorais dinâmicos e links institucionais. |

---

## 💻 Como executar localmente
1. **Clone ou baixe** este repositório.
2. Abra a pasta `atividade-frontend` no seu editor preferido.
3. Clique em >index.html
> 💡 **Dica:** abrir o arquivo diretamente (`file://`) também funciona, porém o servidor local garante que requisições relativas e fontes externas sejam carregadas sem restrições.

---

## ✨ Funcionalidades em destaque
- 🔍 **Busca filtrável de estoque** por palavra-chave, marca, câmbio, faixa de anos e teto de preço.
- 🃏 **Cards responsivos** que exibem preço, ano, quilometragem e ações rápidas (detalhes + WhatsApp).
- 💬 **Modal de detalhes** com informações adicionais e atalho para conversa no WhatsApp.
- 🪙 **Calculadora de financiamento** que calcula parcela, total financiado, juros totais e custo total.
- ✅ **Modais de contato** para vender veículo e formulário geral de contato.
- 📱 **Layout responsivo** via Bootstrap 5 e personalizações em `style.css`.

---

## 🧾 Documentação do código
A lógica da aplicação está concentrada em [`script.js`](script.js). A tabela abaixo resume os principais blocos e funções:

| Bloco/Função | Responsabilidade | Observações |
| --- | --- | --- |
| Auto-executável inicial | Preenche selects de ano (`anoMin`, `anoMax`) e o ano no rodapé. | Evita manutenção manual de listas de anos. |
| `ESTOQUE` | Array de objetos que representam os veículos disponíveis. | Pode ser estendido com novos campos; atenção às imagens externas. |
| `fmt` | Formata valores numéricos em reais sem casas decimais. | Usada em múltiplos locais para consistência. |
| `render` | Constrói o grid de cards de estoque, aplica paginação e atualiza contador. | Usa `PAGE` e `PAGE_SIZE` para controle de carregamento incremental. |
| `applyFilters` | Lê filtros do formulário, filtra o array `ESTOQUE`, ordena resultados e atualiza a tela. | Desliza suavemente para a seção de estoque ao aplicar filtros. |
| `verDetalhes` | Popula o modal de detalhes com dados do veículo selecionado. | Exposta via `window` para uso inline nos botões. |
| Listeners de UI | Atualizam range de preço, filtros, ordenação e botão “carregar mais”. | Garantem resposta imediata às interações do usuário. |
| `brl` | Formata valores em reais com casas decimais. | Usada principalmente na calculadora. |
| `calcPMT` | Implementa a fórmula da parcela fixa (Price). | Considera taxa zero como caso especial. |
| `calcular` | Controla a calculadora de financiamento e mostra resultados. | Inclui custos mensais opcionais no valor final. |
| Inicializações finais | `applyFilters()` + `calcular()` ao carregar a página. | Garante que a interface tenha dados logo no início. |

### Fluxo resumido do JavaScript
1. **Inicialização:** preenche selects de anos e contador do rodapé.
2. **Renderização inicial:** chama `applyFilters()` que, por padrão, mostra todos os veículos ordenados por ID.
3. **Interações do usuário:** formulários e botões atualizam o estado do grid sem recarregar a página.
4. **Modais:** acionados pelos botões de detalhes ou CTA “Quero vender”.
5. **Calculadora:** recalcula automaticamente ao alterar qualquer campo relevante.

---

## 🛠️ Customizações comuns
| Objetivo | Onde alterar | Dicas |
| --- | --- | --- |
| Adicionar um novo veículo ao estoque | Array `ESTOQUE` em [`script.js`](script.js) | Mantenha IDs únicos e forneça URLs de imagem válidas. |
| Alterar opções de marca ou câmbio | `<select>` correspondentes no [`index.html`](index.html) | Certifique-se de que as novas opções estejam refletidas nos dados. |
| Ajustar cores e estilos | [`style.css`](style.css) | Utilize variáveis CSS declaradas no `:root` para manter consistência. |
| Mudar textos institucionais | Conteúdo textual no [`index.html`](index.html) | Procure pelas seções comentadas para facilitar a navegação. |
| Ajustar parcelas padrão da calculadora | Função `calcular` e valores iniciais dos inputs em [`script.js`](script.js) | Atualize também os atributos `value` dos campos no HTML. |

---

## 📏 Boas práticas e padrões
- ✅ Utilize **Bootstrap 5.3** (já incluído via CDN) para componentes e grid responsivo.
- ♻️ Mantenha o código JavaScript modularizado por responsabilidades, seguindo as funções existentes.
- 🌐 Prefira imagens hospedadas em CDNs confiáveis para evitar erros de carregamento.
- 🧪 Ao adicionar regras JS, teste diferentes combinações de filtros para evitar inconsistências.

---
