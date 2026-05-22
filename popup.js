const firstNames = [
  "Ana", "Beatriz", "Camila", "Fernanda", "Juliana", "Larissa", "Mariana", "Patricia",
  "Rafaela", "Sofia", "Bruno", "Caio", "Diego", "Eduardo", "Felipe", "Gabriel",
  "Henrique", "Lucas", "Marcelo", "Thiago"
];

const lastNames = [
  "Almeida", "Barbosa", "Cardoso", "Carvalho", "Costa", "Fernandes", "Ferreira",
  "Gomes", "Lima", "Martins", "Mendes", "Oliveira", "Pereira", "Ribeiro",
  "Rocha", "Rodrigues", "Santana", "Santos", "Silva", "Souza"
];

const companySegments = [
  "Tecnologia", "Comercio", "Servicos", "Logistica", "Consultoria", "Alimentos",
  "Engenharia", "Saude", "Educacao", "Transportes"
];

const companySuffixes = ["Ltda", "S.A.", "ME", "Eireli"];

const validCepSamples = [
  "01001000", "20040002", "30140071", "40010000", "70040900",
  "80010000", "88010000", "59010000", "66010000", "79002000"
];

const el = {
  firstName: document.querySelector("#firstName"),
  lastName: document.querySelector("#lastName"),
  fullName: document.querySelector("#fullName"),
  cpf: document.querySelector("#cpf"),
  tempEmail: document.querySelector("#tempEmail"),
  inboxList: document.querySelector("#inboxList"),
  companyName: document.querySelector("#companyName"),
  cnpj: document.querySelector("#cnpj"),
  lookupCnpj: document.querySelector("#lookupCnpj"),
  cnpjResult: document.querySelector("#cnpjResult"),
  cep: document.querySelector("#cep"),
  cepResult: document.querySelector("#cepResult"),
  status: document.querySelector("#status")
};

document.querySelector("#generatePerson").addEventListener("click", generatePerson);
document.querySelector("#generateCompany").addEventListener("click", generateCompany);
document.querySelector("#copyPerson").addEventListener("click", copyPerson);
document.querySelector("#copyCompany").addEventListener("click", copyCompany);
document.querySelector("#fillPerson").addEventListener("click", () => fillActivePage("FILL_PERSON", getPersonPayload()));
document.querySelector("#generateTempEmail").addEventListener("click", generateTempEmail);
document.querySelector("#copyTempEmail").addEventListener("click", copyTempEmail);
document.querySelector("#fillTempEmail").addEventListener("click", fillTempEmail);
document.querySelector("#refreshInbox").addEventListener("click", refreshInbox);
document.querySelector("#fillCompany").addEventListener("click", () => fillActivePage("FILL_COMPANY", getFakeCompanyPayload()));
document.querySelector("#useExampleCnpj").addEventListener("click", () => {
  el.lookupCnpj.value = "65347806000104";
  setStatus("CNPJ de exemplo carregado para consulta.");
});
document.querySelector("#fetchCnpj").addEventListener("click", fetchCnpj);
document.querySelector("#generateCep").addEventListener("click", generateCep);
document.querySelector("#fetchCep").addEventListener("click", fetchCep);

generatePerson();
generateCompany();
generateCep();
el.lookupCnpj.value = "65347806000104";
loadSavedTempEmail();

function randomItem(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function randomDigit() {
  return Math.floor(Math.random() * 10);
}

function onlyDigits(value) {
  return String(value || "").replace(/\D/g, "");
}

function formatCpf(value) {
  const digits = onlyDigits(value).padStart(11, "0").slice(0, 11);
  return digits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

function formatCnpj(value) {
  const digits = onlyDigits(value).padStart(14, "0").slice(0, 14);
  return digits.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
}

function formatCep(value) {
  const digits = onlyDigits(value);
  if (digits.length !== 8) {
    return value || "";
  }

  return digits.replace(/(\d{5})(\d{3})/, "$1-$2");
}

function createCpf() {
  let digits = Array.from({ length: 9 }, randomDigit);
  while (digits.every((digit) => digit === digits[0])) {
    digits = Array.from({ length: 9 }, randomDigit);
  }
  digits.push(createCpfDigit(digits, 10));
  digits.push(createCpfDigit(digits, 11));
  return digits.join("");
}

function createCpfDigit(digits, weightStart) {
  const sum = digits.reduce((total, digit, index) => total + digit * (weightStart - index), 0);
  const rest = (sum * 10) % 11;
  return rest === 10 ? 0 : rest;
}

function createCnpj() {
  let digits = Array.from({ length: 12 }, randomDigit);
  while (digits.every((digit) => digit === digits[0])) {
    digits = Array.from({ length: 12 }, randomDigit);
  }
  digits.push(createCnpjDigit(digits, [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]));
  digits.push(createCnpjDigit(digits, [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]));
  return digits.join("");
}

function createCnpjDigit(digits, weights) {
  const sum = digits.reduce((total, digit, index) => total + digit * weights[index], 0);
  const rest = sum % 11;
  return rest < 2 ? 0 : 11 - rest;
}

function generatePerson() {
  const firstName = randomItem(firstNames);
  const lastName = `${randomItem(lastNames)} ${randomItem(lastNames)}`;
  el.firstName.value = firstName;
  el.lastName.value = lastName;
  el.fullName.value = `${firstName} ${lastName}`;
  el.cpf.value = formatCpf(createCpf());
  setStatus("Pessoa gerada.");
}

function generateCompany() {
  const name = `${randomItem(lastNames)} ${randomItem(companySegments)} ${randomItem(companySuffixes)}`;
  el.companyName.value = name;
  el.cnpj.value = formatCnpj(createCnpj());
  setStatus("Empresa fake gerada.");
}

function generateCep() {
  el.cep.value = randomItem(validCepSamples);
  setStatus("CEP válido carregado.");
}

function getPersonPayload() {
  return {
    firstName: el.firstName.value,
    lastName: el.lastName.value,
    fullName: el.fullName.value,
    cpf: el.cpf.value,
    email: el.tempEmail.value
  };
}

function getFakeCompanyPayload() {
  return {
    cnpj: el.cnpj.value,
    companyName: el.companyName.value,
    legalName: el.companyName.value,
    tradeName: el.companyName.value
  };
}

async function copyPerson() {
  await copyText([
    `Nome: ${el.fullName.value}`,
    `CPF: ${el.cpf.value}`
  ].join("\n"));
}

async function copyCompany() {
  await copyText([
    `Empresa: ${el.companyName.value}`,
    `CNPJ: ${el.cnpj.value}`
  ].join("\n"));
}

async function copyText(text) {
  await navigator.clipboard.writeText(text);
  setStatus("Copiado para a área de transferência.");
}

async function generateTempEmail() {
  setBusy(true);
  setStatus("Criando email temporário no Mail.tm...");

  try {
    const account = await createTempMailAccount();
    el.tempEmail.value = account.address;
    await refreshInbox(account);
    setStatus("Email temporário criado.");
  } catch (error) {
    setStatus(error.message || "Não foi possível criar email temporário.", true);
  } finally {
    setBusy(false);
  }
}

async function copyTempEmail() {
  if (!el.tempEmail.value) {
    setStatus("Gere um email temporário primeiro.", true);
    return;
  }

  await copyText(el.tempEmail.value);
}

async function fillTempEmail() {
  if (!el.tempEmail.value) {
    setStatus("Gere um email temporário primeiro.", true);
    return;
  }

  await fillActivePage("FILL_PERSON", { email: el.tempEmail.value });
}

async function loadSavedTempEmail() {
  if (typeof chrome === "undefined" || !chrome.storage?.local) {
    return;
  }

  try {
    const account = await getSavedTempMailAccount();
    if (!account?.address) {
      return;
    }

    el.tempEmail.value = account.address;
    await refreshInbox(account, { silent: true });
  } catch (error) {
    el.inboxList.textContent = "Não foi possível carregar o email salvo.";
  }
}

async function refreshInbox(account = null, options = {}) {
  if (!el.tempEmail.value && !account) {
    el.inboxList.textContent = "Gere um email temporário primeiro.";
    if (!options.silent) {
      setStatus("Gere um email temporário primeiro.", true);
    }
    return;
  }

  setBusy(true);
  if (!options.silent) {
    setStatus("Atualizando inbox...");
  }

  try {
    const result = await listTempMailMessages(account);
    el.tempEmail.value = result.account.address;
    renderInboxMessages(result.messages);
    if (!options.silent) {
      setStatus(`${result.total} mensagem(ns) encontrada(s).`);
    }
  } catch (error) {
    el.inboxList.textContent = "Não foi possível atualizar a inbox.";
    if (!options.silent) {
      setStatus(error.message || "Não foi possível atualizar a inbox.", true);
    }
  } finally {
    setBusy(false);
  }
}

function renderInboxMessages(messages) {
  el.inboxList.textContent = "";

  if (!messages.length) {
    el.inboxList.textContent = "Nenhuma mensagem recebida ainda.";
    return;
  }

  const fragment = document.createDocumentFragment();
  messages.forEach((message) => {
    const item = document.createElement("article");
    item.className = "message";

    const subject = document.createElement("strong");
    subject.textContent = message.subject || "(sem assunto)";

    const meta = document.createElement("span");
    meta.textContent = message.from?.address || "remetente desconhecido";

    const intro = document.createElement("span");
    intro.textContent = message.intro || "";

    item.append(subject, meta, intro);
    fragment.append(item);
  });

  el.inboxList.append(fragment);
}

async function fetchCnpj() {
  const cnpj = onlyDigits(el.lookupCnpj.value);
  if (cnpj.length !== 14) {
    setStatus("Informe um CNPJ com 14 dígitos.", true);
    return;
  }

  setBusy(true);
  setStatus("Consultando BrasilAPI...");

  try {
    const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`);
    if (!response.ok) {
      throw new Error(`BrasilAPI retornou HTTP ${response.status}`);
    }

    const data = await response.json();
    const payload = normalizeBrasilApiCompany(data);
    el.cnpjResult.value = `${payload.legalName || payload.companyName} - ${payload.city || ""}/${payload.state || ""}`;
    await fillActivePage("FILL_COMPANY", payload);
    setStatus("CNPJ consultado e enviado para a página.");
  } catch (error) {
    setStatus(error.message || "Não foi possível consultar o CNPJ.", true);
  } finally {
    setBusy(false);
  }
}

async function fetchCep() {
  const cep = onlyDigits(el.cep.value);
  if (cep.length !== 8) {
    setStatus("Informe um CEP com 8 dígitos.", true);
    return;
  }

  setBusy(true);
  setStatus("Consultando ViaCEP...");

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    if (!response.ok) {
      throw new Error(`ViaCEP retornou HTTP ${response.status}`);
    }

    const data = await response.json();
    if (data.erro) {
      throw new Error("CEP não encontrado no ViaCEP.");
    }

    const payload = normalizeViaCepAddress(data);
    el.cepResult.value = `${payload.street}, ${payload.neighborhood} - ${payload.city}/${payload.state}`;
    await fillActivePage("FILL_ADDRESS", payload);
    setStatus("Endereço consultado e enviado para a página.");
  } catch (error) {
    setStatus(error.message || "Não foi possível consultar o CEP.", true);
  } finally {
    setBusy(false);
  }
}

function normalizeBrasilApiCompany(data) {
  const street = [data.descricao_tipo_de_logradouro, data.logradouro]
    .filter(Boolean)
    .join(" ");

  return {
    cnpj: formatCnpj(data.cnpj),
    companyName: data.nome_fantasia || data.razao_social || "",
    legalName: data.razao_social || "",
    tradeName: data.nome_fantasia || "",
    email: data.email || "",
    phone: data.ddd_telefone_1 || data.telefone || "",
    cep: formatCep(data.cep),
    street,
    number: data.numero || "",
    complement: data.complemento || "",
    neighborhood: data.bairro || "",
    city: data.municipio || "",
    state: data.uf || ""
  };
}

function normalizeViaCepAddress(data) {
  return {
    cep: data.cep || "",
    street: data.logradouro || "",
    complement: data.complemento || "",
    neighborhood: data.bairro || "",
    city: data.localidade || "",
    state: data.uf || "",
    ibge: data.ibge || "",
    ddd: data.ddd || ""
  };
}

async function fillActivePage(type, payload) {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id) {
    setStatus("Nenhuma aba ativa encontrada.", true);
    return;
  }

  try {
    let response = await chrome.tabs.sendMessage(tab.id, { type, payload }).catch(() => null);
    if (!response) {
      await chrome.scripting.executeScript({ target: { tabId: tab.id }, files: ["content.js"] });
      response = await chrome.tabs.sendMessage(tab.id, { type, payload });
    }

    if (response?.filledCount > 0) {
      setStatus(`${response.filledCount} campo(s) preenchido(s).`);
      return;
    }

    setStatus("Nenhum campo compatível foi encontrado na página.", true);
  } catch (error) {
    setStatus("Recarregue a página atual e tente preencher novamente.", true);
  }
}

function setBusy(isBusy) {
  document.querySelectorAll("button").forEach((button) => {
    button.disabled = isBusy;
  });
}

function setStatus(message, isError = false) {
  el.status.textContent = message;
  el.status.classList.toggle("error", isError);
}
