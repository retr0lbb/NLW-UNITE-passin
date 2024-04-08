# pass.in - nlw

![image](https://github.com/retr0lbb/NLW-UNITE-passin/assets/85702153/e172aba8-af5f-4e61-aa30-0f1a2d2a5c14)

O pass.in é um sistema de **gerenciamento de participantes em eventos presenciais**.

A ferramenta permite que o organizador cadastre um evento e abra uma pagina de inscrição.

Os participantes podem emitir uma credencial para o evento por meio do app.

O systema fara um scan da credencial do participante para emitir a entrada do evento.

## Requisitos 

### Requisitos funcionais

- [✅] O organizador deve poder cadastrar um novo evento;
- [✅] O organizador deve poder visualizar dados de um evento;
- [✅] O organizador deve poder visualizar a lista de participantes;
- [✅] O participante deve poder se inscrever em um evento;
- [✅] O participante deve poder visualizar o seu cracha de inscrição;
- [✅] O participante deve poder realizar o check-in no evento;

### Regras de negocio

- [✅] O participante só pode se inscrever no evento 1 vez com um email.
- [✅] O participante só pode se increver em um evento com vagas disponiveis.
- [✅] O participante só pode realizar o checkin do evento 1 unica vez.
- [✅] O participante só pode realizar a inscrição do evento até um determinado tempo antes do evento.

### Requisitos não funcionais

- [✅] O check-in no evento sera realizado por meio de um QRCode.




## Como usar esse projeto?

### Pré requisitos:
- [Node](https://nodejs.org/en) LTS 18 ou superior
- [typescript](https://www.typescriptlang.org/download) opicional!

1. Clone esse repositório para sua maquina local clicando em download **OU** use o commando:
```bash
git clone https://github.com/retr0lbb/NLW-UNITE-passin.git
```

2. Execute o comando:
```bash
npm install
```

3. Inicie a aplicação com o comando:
```bash
npm run dev
```

Você pode verificar o banco de dados usando o comando `npm db:studio` e criar migrações usando `npm db:migrate`.

4. Você pode buildar o projeto para que ele rode usando o javascript com o comando:
```bash
npm run build
```

E para iniciar a aplicação no modo de produção use:
```bash
npm run start
```



- made by [@retr0lbb](https://github.com/retr0lbb)