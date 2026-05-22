# Faker BR Chrome Extension

Extensão Manifest V3 para gerar dados brasileiros de teste e preencher formulários na aba ativa.

## Recursos

- Gera CPF válido.
- Gera CNPJ válido.
- Gera nome, sobrenome e nome completo.
- Gera email temporário com Mail.tm.
- Lista mensagens recebidas na inbox temporária.
- Gera nome de empresa fake.
- Consulta CNPJ real pela BrasilAPI.
- Consulta endereço por CEP válido via ViaCEP.
- Tenta preencher automaticamente campos compatíveis na página aberta.
- Menu de clique direito para preencher pessoa, empresa, CPF, CNPJ, CNPJ selecionado e CEP selecionado.

## Como instalar no Chrome

1. Abra `chrome://extensions`.
2. Ative o "Modo do desenvolvedor".
3. Clique em "Carregar sem compactação".
4. Selecione esta pasta: `/Users/ludiooliveira/projects/side-projects/chrome-faker-br`.

## Como usar

Abra uma página com formulário, clique no ícone da extensão e use uma das ações:

- `Preencher página` em Pessoa para preencher nome, sobrenome, nome completo e CPF.
- `Gerar email temporário` para criar uma caixa Mail.tm, copiar o endereço, preencher email e atualizar a inbox.
- `Preencher página` em Empresa fake para preencher empresa e CNPJ gerados.
- `Buscar e preencher` em BrasilAPI CNPJ para buscar dados reais do CNPJ informado.
- `Buscar e preencher` em ViaCEP para preencher endereço a partir do CEP informado.
- Clique com o botão direito em uma página ou campo e use `Faker BR` para preencher sem abrir o popup.
- Selecione um CNPJ ou CEP na página, clique com o botão direito e use a opção de consulta correspondente.
- Clique com o botão direito em um campo editável e use `Preencher este campo com email temporario`.

## APIs usadas

- BrasilAPI para CNPJ.
- ViaCEP para endereços por CEP.
- Mail.tm para email temporário. A caixa temporária fica salva localmente no Chrome via `chrome.storage.local`.

Se nenhum campo for preenchido, recarregue a aba e tente novamente. Alguns sites bloqueiam scripts de extensões em páginas internas do navegador ou usam componentes que não expõem campos HTML comuns.
