### CONSUMING GOOGLE CALENDAR API


---

#### Visão Geral

Este projeto é uma aplicação Node.js desenvolvida para gerenciar eventos através da API do Google Calendar. Ele fornece endpoints para listar eventos futuros e criar novos eventos em um calendário específico do Google.

#### Pré-requisitos

Antes de executar a aplicação, certifique-se de ter:

- Node.js instalado em sua máquina.
- Projeto na Google Cloud Platform configurado com a API do Google Calendar ativada e credenciais da API (arquivo de chave de conta de serviço).

#### Instalação

1. Clone o repositório:

   ```
   git clone <https://github.com/thesant/google-calendar-api.git>
   ```

2. Instale as dependências:

   ```
   cd <google-calendar-api>
   npm install
   ```

3. Configure as variáveis de ambiente:

   Crie um arquivo `.env` na raiz do seu projeto de acordo com o .env-exemple


#### Executando a Aplicação

Para iniciar a aplicação, execute:

```
npm start
```

Isso iniciará a aplicação em `http://localhost:3333`.

#### Endpoints da API

1. **GET `/events`**

   Recupera uma lista de eventos futuros do Google Calendar especificado.

   - Parâmetros de Consulta:
     - Nenhum parâmetro obrigatório

   - Resposta:
     - `200 OK` com um array JSON de eventos.
     - `404 Not Found` se nenhum evento futuro for encontrado.

2. **POST `/createEvent`**

   Cria um novo evento no Google Calendar especificado.

   - Corpo da Requisição:
     - `summary`: Título do evento (obrigatório).
     - `location`: Localização do evento.
     - `description`: Descrição do evento.
     - `startDateTime`: Data e hora de início do evento no formato ISO.
     - `endDateTime`: Data e hora de término do evento no formato ISO.

   - Resposta:
     - `200 OK` com uma mensagem de sucesso se o evento for criado com sucesso.
     - `400 Bad Request` se houver parâmetros ausentes ou inválidos.

#### Exemplo de Uso

1. **Listando Eventos:**

   ```
   GET http://localhost:3333/events
   ```

   Exemplo de Resposta:
   ```
   {
     "events": [
       {
         "summary": "Reunião da Equipe",
         "location": "Escritório",
         "start": {
           "dateTime": "2024-06-30T10:00:00-03:00"
         },
         "end": {
           "dateTime": "2024-06-30T11:00:00-03:00"
         }
       },
       {
         "summary": "Almoço com Cliente",
         "location": "Restaurante",
         "start": {
           "dateTime": "2024-07-01T12:00:00-03:00"
         },
         "end": {
           "dateTime": "2024-07-01T13:00:00-03:00"
         }
       }
     ]
   }
   ```

2. **Criando um Evento:**

   ```
   POST http://localhost:3333/createEvent
   ```

   Corpo da Requisição:
   ```
   {
     "summary": "Chamada de Conferência",
     "location": "Online",
     "description": "Discutir marcos do projeto",
     "startDateTime": "2024-07-05T09:00:00-03:00",
     "endDateTime": "2024-07-05T10:00:00-03:00"
   }
   ```

   Exemplo de Resposta:
   ```
   Evento criado com sucesso!
   ```

#### Tratamento de Erros

- A aplicação trata erros como requisições inválidas à API ou falhas na criação de eventos. Os erros são retornados como respostas JSON com códigos de status apropriados.

#### Bibliotecas Utilizadas

- `fastify`: Framework web Node.js para roteamento e tratamento de requisições HTTP.
- `googleapis`: Biblioteca cliente da API do Google para Node.js, usada para interagir com a API do Google Calendar.

#### Notas

- Certifique-se de que o ID do Google Calendar e as credenciais estejam corretamente configurados nas variáveis de ambiente (`GOOGLE_CALENDAR_ID` e `GOOGLE_APPLICATION_CREDENTIALS`, respectivamente) antes de executar a aplicação.

---
