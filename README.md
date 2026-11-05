## Como executar
 
É necessário utilizar dois terminais em simultâneo:
 
1. **Servidor (Backend):**
   ```bash
   node --watch server.js
   Executa em http://localhost:3000
 
cd client
npm run dev
# Executa em http://localhost:5173

### Resposta à Pergunta 3
**Quem bloqueou: o server ou o browser? Como é que sabes?**  
**Resposta:** Quem bloqueou o pedido foi o **browser**. Sabemos isto porque o servidor recebeu o pedido HTTP e respondeu normalmente (como é possível verificar nos logs do terminal do servidor). No entanto, como a resposta do servidor não continha o cabeçalho `Access-Control-Allow-Origin`, o browser aplicou a política de segurança Same-Origin Policy (SOP) e impediu que o código JavaScript da aplicação React acedesse aos dados devolvidos.
 
### Resposta à Pergunta 4
**Compara com a tua resposta 4 da Ficha 3. Quantos requests faz agora a app React ao abrir e ao filtrar? Onde vivem os dados, e onde é construído o HTML?**  
**Resposta:** Agora, a app React faz apenas **1 pedido HTTP** ao abrir a página (para obter os dados em JSON) e **0 pedidos** ao filtrar, pois a filtragem é feita inteiramente no cliente. Os dados vivem no servidor (base de dados/memória), mas são transferidos e mantidos no estado do React (`useState`). O HTML é agora construído no **browser (client-side rendering)** através dos componentes React, ao contrário da Ficha 3 onde o HTML vinha já construído pelo servidor.
