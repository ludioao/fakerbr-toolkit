# Faker BR

Faker BR é uma extensão Manifest V3 para Google Chrome que gera dados brasileiros de teste e ajuda a preencher formulários durante desenvolvimento, QA, suporte e homologação.

Ela gera CPF, CNPJ, nomes, empresas, email temporário, endereço americano fake, ZIP Code dos EUA, consulta CNPJ na BrasilAPI e busca endereço por CEP no ViaCEP.

Criado por [Lúdio Oliveira](https://github.com/ludioao).

## Recursos

- Gerar CPF válido.
- Gerar CNPJ válido.
- Gerar nome, sobrenome e nome completo.
- Gerar nomes brasileiros ou americanos.
- Gerar nome de empresa fake.
- Gerar endereço americano fake.
- Gerar ZIP Code dos Estados Unidos.
- Gerar email temporário com Mail.tm.
- Copiar dados gerados para a área de transferência.
- Ver mensagens recebidas na inbox temporária.
- Consultar CNPJ real pela BrasilAPI.
- Consultar endereço por CEP válido via ViaCEP.
- Preencher campos compatíveis na página ativa.
- Usar menu de clique direito para preencher campos sem abrir o popup.
- Consultar CNPJ ou CEP selecionado na página pelo menu de contexto.
- Interface em Português, Inglês e Espanhol.
- Metadados de extensão localizados para `pt_BR`, `en` e `es`.

## Como usar

1. Abra uma página com formulário.
2. Clique no ícone da extensão Faker BR.
3. Gere os dados desejados.
4. Use os botões de copiar ou preencher página.

Use o seletor `Idioma` para mudar a interface entre Português, Inglês e Espanhol.

Use o seletor `Dados` para alternar entre dados do Brasil e dos Estados Unidos. Ao selecionar Estados Unidos, a extensão passa a gerar nomes e empresas em formato americano.

Também é possível clicar com o botão direito em uma página, seleção de texto ou campo editável e usar o menu `Faker BR`.

## Menu de Clique Direito

O menu de contexto inclui:

- Preencher pessoa fake.
- Preencher empresa fake.
- Preencher este campo com CPF.
- Preencher este campo com CNPJ.
- Preencher este campo com ZIP Code.
- Preencher endereço americano fake.
- Preencher este campo com email temporário.
- Consultar CNPJ selecionado e preencher.
- Consultar CEP selecionado e preencher endereço.

## APIs Externas

A extensão usa APIs públicas apenas quando o usuário executa uma ação relacionada:

- [BrasilAPI](https://brasilapi.com.br/) para consulta de CNPJ.
- [ViaCEP](https://viacep.com.br/) para consulta de endereço por CEP.
- [Mail.tm](https://mail.tm/) para criação de email temporário e leitura da inbox.

## Privacidade

Faker BR não possui servidor próprio e não envia dados para o autor da extensão.

Dados enviados a terceiros:

- CNPJ informado ou selecionado é enviado para a BrasilAPI.
- CEP informado ou selecionado é enviado para o ViaCEP.
- Email temporário, senha técnica da caixa temporária e token são usados com a API Mail.tm.

Dados armazenados localmente:

- A conta temporária do Mail.tm é salva no `chrome.storage.local` para manter a inbox disponível ao reabrir o popup.

A extensão não coleta analytics, não rastreia navegação e não vende dados.

## Permissões do Chrome

- `activeTab`: permite interagir com a aba ativa após ação do usuário.
- `scripting`: injeta o script de preenchimento quando necessário.
- `contextMenus`: adiciona opções no menu de clique direito.
- `clipboardWrite`: copia dados gerados para a área de transferência.
- `storage`: salva localmente a conta temporária do Mail.tm.

Host permissions:

- `https://api.mail.tm/*`
- `https://brasilapi.com.br/*`
- `https://viacep.com.br/*`

## Instalação Local

1. Abra `chrome://extensions`.
2. Ative o "Modo do desenvolvedor".
3. Clique em "Carregar sem compactação".
4. Selecione a pasta do projeto.
5. Recarregue a extensão após alterações no código.

## Publicação na Chrome Web Store

Antes de enviar para revisão:

- Confirme que `manifest.json` está com a versão correta.
- Gere um arquivo `.zip` contendo os arquivos da extensão.
- Inclua os ícones em `icons/`.
- Prepare screenshots da extensão em uso.
- Prepare uma descrição curta e uma descrição completa.
- Publique uma política de privacidade, especialmente por causa das integrações com BrasilAPI, ViaCEP e Mail.tm.

Arquivos necessários no pacote:

- `manifest.json`
- `background.js`
- `content.js`
- `popup.html`
- `popup.css`
- `popup.js`
- `temp-mail.js`
- `_locales/pt_BR/messages.json`
- `_locales/en/messages.json`
- `_locales/es/messages.json`
- `icons/icon-16.png`
- `icons/icon-32.png`
- `icons/icon-48.png`
- `icons/icon-128.png`

Não é necessário incluir `README.md` no pacote da loja, mas ele pode ficar no repositório.

## Texto Sugerido Para a Loja

Descrição curta:

```text
Gere CPF, CNPJ, nomes, empresas, email temporário, endereço americano, ZIP Code dos EUA e preencha formulários.
```

Descrição completa:

```text
Faker BR ajuda desenvolvedores, testers e equipes de suporte a preencher formulários com dados brasileiros e internacionais de teste.

Com a extensão, você pode gerar CPF, CNPJ, nome completo, nome de empresa, email temporário, nomes americanos, endereço americano fake e ZIP Code dos Estados Unidos. Também é possível consultar dados reais de CNPJ pela BrasilAPI e preencher endereço a partir de um CEP válido usando ViaCEP.

A interface está disponível em Português, Inglês e Espanhol.

O preenchimento pode ser feito pelo popup da extensão ou pelo menu de clique direito em campos editáveis, páginas e textos selecionados.

A extensão não coleta analytics, não possui servidor próprio e não envia dados para o autor. As consultas externas são feitas diretamente para BrasilAPI, ViaCEP e Mail.tm quando acionadas pelo usuário.
```

## Desenvolvimento

Este projeto não usa build step. A extensão roda diretamente com HTML, CSS e JavaScript.

Validações úteis:

```bash
node --check popup.js
node --check content.js
node --check background.js
node --check temp-mail.js
node -e "JSON.parse(require('fs').readFileSync('manifest.json', 'utf8')); console.log('manifest ok')"
```

## Empacotar

Na raiz do projeto, crie um zip com os arquivos da extensão:

```bash
zip -r faker-br.zip manifest.json background.js content.js popup.html popup.css popup.js temp-mail.js icons _locales
```

Envie `faker-br.zip` no Chrome Web Store Developer Dashboard.

## Limitações

- Alguns sites usam componentes customizados que não expõem campos HTML comuns.
- Páginas internas do Chrome não permitem injeção de scripts de extensão.
- Emails temporários dependem da disponibilidade do Mail.tm.
- Consultas de CNPJ e CEP dependem da disponibilidade da BrasilAPI e do ViaCEP.
