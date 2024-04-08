# pass.in - nlw

O pass.in é um sistema de **gerenciamento de participantes em eventos presenciais**.

A ferramenta permite que o organizador cadastre um evento e abra uma pagina de inscrição.

Os participantes podem emitir uma credencial para o evento por meio do app.

O systema fara um scan da credencial do participante para emitir a entrada do evento.

## Requisitos 

### Requisitos funcionais

- [] O organizador deve poder cadastrar um novo evento;
- [] O organizador deve poder visualizar dados de um evento;
- [] O organizador deve poder visualizar a lista de participantes;
- [] O participante deve poder se inscrever em um evento;
- [] O participante deve poder visualizar o seu cracha de inscrição;
- [] O participante deve poder realizar o check-in no evento;

### Regras de negocio

- [] O participante só pode se inscrever no evento 1 vez com um email.
- [] O participante só pode se increver em um evento com vagas disponiveis.
- [] O participante só pode realizar o checkin do evento 1 unica vez.
- [] O participante só pode realizar a inscrição do evento até um determinado tempo antes do evento.

### Requisitos não funcionais

- [] O check-in no evento sera realizado por meio de um QRCode.