## API
 
| Método | URL | O que recebe (Body) | O que responde | Status Codes |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/cartas` | Nada | Array JSON com todas as cartas da coleção | `200 OK` |
| `POST` | `/api/cartas` | JSON `{ "name": "...", "type": "...", "attack": 0 }` | Objeto JSON da carta criada ou mensagem de erro | `201 Created` (sucesso) / `400 Bad Request` (falta nome ou tipo) |
 
## Perguntas da Ficha 5
 
**3. Quando acrescentas uma carta, o Network tab mostra dois requests para `/api/cartas`. Qual é o primeiro, quem o manda, e porque é que, antes do pacote `cors`, o `console.log` da rota POST nunca aparecia no terminal?**
O primeiro pedido é um `OPTIONS` (*preflight request*), enviado automaticamente pelo browser antes do `POST` para verificar se o servidor autoriza pedidos de outra origem (`localhost:5173`) com o cabeçalho `Content-Type: application/json`. Antes de instalar o pacote `cors`, o servidor não respondia adequadamente a este pedido `OPTIONS`, pelo que o browser bloqueava o pedido por segurança e nunca chegava a enviar o `POST`.
 
**4. Nas três versões da aula (só `setCards`, `POST` sem ficheiro, `POST` com `cartas.json`), onde vivia a carta nova, e o que a apagava?**
* **Só `setCards`:** A carta vivia apenas na memória do browser (estado do React) e desaparecia ao atualizar a página (`F5`).
* **`POST` sem ficheiro:** A carta vivia na memória RAM do servidor (no array `cards` do Node.js); resistia ao `F5` no browser, mas apagava-se ao reiniciar o servidor.
* **`POST` com `cartas.json`:** A carta passou a ser gravada em disco no ficheiro `cartas.json`, mantendo-se guardada mesmo depois de atualizar a página ou reiniciar o servidor (só se apaga editando ou eliminando o ficheiro).
