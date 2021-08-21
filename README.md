## Intro
Olá, esse app foi inicialmente desenvolvido como um projeto do curso da [Trybe](https://www.betrybe.com/).
Tive a oportunidade de trabalhar com:
 - [Edson Araujo](https://github.com/araujobarros)
 - [Leandro Lachini](https://github.com/leandroLachini)
 - [Lucas Nascimento](https://github.com/lucasmvnascimento)

## Contexto

A distribuidora de cervejas da dona Tereza está se informatizando! 🚀 Seu negócio, antes focado em um local específico da cidade, passou a receber uma quantidade massiva de encomendas de outros pontos, expandindo sua atuação, sobretudo via delivery. Isso tudo graças ao excelente preço das bebidas e atendimento da equipe de vendas.

Agora a distribuidora possui alguns pontos de venda na cidade para agilizar no atendimento dessas áreas. Cada ponto de venda, por sua vez, possui uma pessoa vendedora responsável.

Como seu antigo sistema, que era um conjunto de planilhas, já não atende a necessidade do negócio, pois gera muita manutenção, dona Tereza procurou a **sua equipe de pessoas desenvolvedoras** com uma ideia de aplicativo que pudesse agilizar a vida de sua equipe e das pessoas que compram seus produtos. O aplicativo precisa:

- Ter acesso via login: tanto clientes como pessoas vendedoras, assim como a própria dona Tereza, que administra o sistema, devem ter acesso ao aplicativo via login, porém para funções diferentes: (1) A pessoa cliente, que compra da lista de produtos; (2) A pessoa vendedora, que aprova, prepara e entrega; (3) A pessoa administradora, que gerencia quem usa o aplicativo;
- Fazer a comunicação entre clientes e pessoas vendedoras: a pessoa cliente faz o pedido via "carrinho de compras" e a pessoa vendedora aprova, prepara e envia esse pedido. Quando o produto é recebido por quem comprou, essa pessoa marca o pedido como "recebido". Ambos devem possuir detalhes sobre seus pedidos;
- Funcionar em tempo real: as telas de pedidos/detalhes do pedido devem ser atualizadas em tempo real, à medida que essas interações acontecem. Se a pessoa cliente faz o pedido, o mesmo deve aparecer para a pessoa vendedora em seu dash de pedidos sem que ela precise atualizar a página. A pessoa cliente, por sua vez, deve ter as informações sobre seu pedido também atualizadas em tempo real, ou seja, ter informações se o pedido está sendo preparado ou se já saiu pra entrega;

## Proposta Pessoal
Após entregar o projeto com o grupo, decidi refatorá-lo e adicionar algumas features:

- [x] Implementar o framework Next.js. - Utilizar as vantagens da desempenho da geração de páginas estáticas
- [x] Utilizar AWS RDS. - Aprender um pouco sobre os serviços da AWS
- [ ] Implementar o superset TypeScript. - Tipar cógido para facilitar na criação de código limpo e escalável
- [ ] Implementar os tests de unidade. - Para propiciar escalabilidade mais segura da aplicação.
- [ ] Implementar os tests de integração. - Também em prol da escalabilidade, mas garantindo o funcionamento em conjunto dos elementos.

## Live view
Você pode ver o resultado atual do app [aqui](https://delivery-app-d.herokuapp.com)

**Obs: existe uma incompatibilidade entre o next e a hook useStyle do Material UI que faz com que os components percam a estilização. Isso será consertado em breve**
## Como usar
Você precisa ter a versão 14+ do Node.js instalada na sua máquina. 

Crie um file `.env.local` apartir do `.env.local.example` que está no repositório e preencha com as informações exemplificadas.

Com npm:
  - `npm i`
  - `npm run db:init` 
  - `npm run dev`

Com yarn:
  - `yarn`
  - `yarn db:init`
  - `yarn dev`

Se você não tiver permissão para rodar o `db:init`, execute esse comando no seu terminal: `sudo chmod +x ./scripts/db-init.sh`

Pronto, a sua aplicação deve estar rodando em http://localhost:3000.