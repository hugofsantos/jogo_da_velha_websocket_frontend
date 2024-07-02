# Jogo da Velha - Frontend

Este é o frontend para um [jogo da velha multiplayer](https://github.com/hugofsantos/jogo_da_velha_websocket) desenvolvido em Rust. A comunicação entre o servidor e os clientes é realizada via HTTP e WebSocket. 

## Funcionalidades

- Suporte a partidas multiplayer;
- Comunicação em tempo real utilizando WebSocket;
- Gerenciamento de estado do jogo.

## Como Executar o Projeto Localmente ▶️

Para executar este projeto localmente, siga estas etapas:

1. Tenha o [backend feito em Rust](https://github.com/hugofsantos/jogo_da_velha_websocket) executando em sua máquina (as instruções de como executar o backend está em seu repositório);

2. Baixe este projeto em `.zip` ou clone-o em sua máquina;

3. Após extrair (se tiver sido baixado em `.zip`), navegue até a pasta do projeto;

4. Acesso Local via servidor de arquivos

   Devido às restrições de importação de arquivos usando o protocolo `file://`, é necessário executar o projeto por meio de um servidor local. Uma das maneiras de fazer isso é utilizando **nodejs** com `http-server`:

   * Instale o `http-server` usando **NPM** (é necessário tê-lo instalado em sua máquina)

     ```bash
     npm install -g http-server 
     ```

   * Execute o `http-server` no diretório do projeto:

     ```bash
     http-server . --port 3000 # Modifique a porta se quiser
     ```

   

   Após isso, o *frontend* estará disponível localmente na porta especificada (por exemplo, `http://localhost:3000` no caso de ter sido instanciado na porta 3000).

   É possível simular vários jogadores executando o `http-server` em portas diferentes.

   > **OBS1**: Você pode optar por qualquer outra ferramenta de servidor de arquivos que preferir, como parcel, lite-server, entre outros. Basta instalar a ferramenta desejada e executar o projeto a partir do diretório clonado.
   >
   > **OBS2:** Caso você utilize *Visual Studio Code*, você pode instalar a extensão *Live Server* e clicar com o botão direito no arquivo "index.html" do projeto e clicar na opção de abrir com o *Live Server*.