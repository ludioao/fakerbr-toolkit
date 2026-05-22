const firstNames = [
  "Ana", "Beatriz", "Camila", "Fernanda", "Juliana", "Larissa", "Mariana", "Patricia",
  "Rafaela", "Sofia", "Bruno", "Caio", "Diego", "Eduardo", "Felipe", "Gabriel",
  "Henrique", "Lucas", "Marcelo", "Thiago"
];

const usFirstNames = [
  "Ava", "Charlotte", "Emma", "Harper", "Mia", "Olivia", "Sophia", "Amelia",
  "Benjamin", "Carter", "Elijah", "Ethan", "Henry", "James", "Liam", "Lucas",
  "Mason", "Noah", "Oliver", "William"
];

const lastNames = [
  "Almeida", "Barbosa", "Cardoso", "Carvalho", "Costa", "Fernandes", "Ferreira",
  "Gomes", "Lima", "Martins", "Mendes", "Oliveira", "Pereira", "Ribeiro",
  "Rocha", "Rodrigues", "Santana", "Santos", "Silva", "Souza"
];

const usLastNames = [
  "Anderson", "Brown", "Clark", "Davis", "Garcia", "Hall", "Johnson", "Jones",
  "Lewis", "Martin", "Miller", "Moore", "Robinson", "Smith", "Taylor", "Thomas",
  "Walker", "White", "Williams", "Wilson"
];

const companySegments = [
  "Tecnologia", "Comercio", "Servicos", "Logistica", "Consultoria", "Alimentos",
  "Engenharia", "Saude", "Educacao", "Transportes"
];

const usCompanySegments = [
  "Analytics", "Consulting", "Design", "Digital", "Foods", "Health", "Holdings",
  "Labs", "Logistics", "Media", "Retail", "Solutions", "Systems", "Ventures"
];

const companySuffixes = ["Ltda", "S.A.", "ME", "Eireli"];
const usCompanySuffixes = ["LLC", "Inc.", "Co.", "Group"];

const validCepSamples = [
  "01001000", "20040002", "30140071", "40010000", "70040900",
  "80010000", "88010000", "59010000", "66010000", "79002000"
];

const usZipSamples = [
  "10001", "11201", "20001", "30301", "33101", "60601", "73301", "80202",
  "90001", "94105", "98101", "02108", "85001", "97201", "15201"
];

const SETTINGS_STORAGE_KEY = "fakerBrSettings";

const translations = {
  "pt-BR": {
    tagline: "Dados brasileiros e internacionais para testes rápidos.",
    languageLabel: "Idioma",
    dataLocaleLabel: "Dados",
    brazilData: "Brasil",
    usData: "Estados Unidos",
    personTitle: "Pessoa",
    generatePersonTitle: "Gerar pessoa",
    firstNameLabel: "Nome",
    lastNameLabel: "Sobrenome",
    fullNameLabel: "Nome completo",
    cpfLabel: "CPF",
    copyButton: "Copiar",
    fillPageButton: "Preencher página",
    tempEmailTitle: "Email temporário",
    refreshInboxTitle: "Atualizar inbox",
    emailLabel: "Email",
    tempEmailPlaceholder: "Gere uma caixa Mail.tm",
    generateTempEmailButton: "Gerar email temporário",
    noTempEmailActive: "Nenhum email temporário ativo.",
    companyTitle: "Empresa fake",
    generateCompanyTitle: "Gerar empresa",
    companyNameLabel: "Nome da empresa",
    cnpjLabel: "CNPJ",
    cnpjLookupLabel: "CNPJ para consulta",
    useExampleButton: "Usar exemplo",
    fetchAndFillButton: "Buscar e preencher",
    cepLabel: "CEP válido",
    generateCepButton: "Gerar CEP",
    usToolsTitle: "Estados Unidos",
    zipLabel: "ZIP Code",
    generateZipButton: "Gerar ZIP",
    createdBy: "Criado por",
    personGenerated: "Pessoa gerada.",
    companyGenerated: "Empresa fake gerada.",
    cepGenerated: "CEP válido carregado.",
    zipGenerated: "ZIP Code gerado.",
    copied: "Copiado para a área de transferência.",
    tempEmailCreating: "Criando email temporário no Mail.tm...",
    tempEmailCreated: "Email temporário criado.",
    tempEmailCreateError: "Não foi possível criar email temporário.",
    tempEmailRequired: "Gere um email temporário primeiro.",
    tempEmailLoadError: "Não foi possível carregar o email salvo.",
    inboxUpdating: "Atualizando inbox...",
    inboxUpdated: "{count} mensagem(ns) encontrada(s).",
    inboxUpdateError: "Não foi possível atualizar a inbox.",
    noMessages: "Nenhuma mensagem recebida ainda.",
    noSubject: "(sem assunto)",
    unknownSender: "remetente desconhecido",
    exampleCnpjLoaded: "CNPJ de exemplo carregado para consulta.",
    cnpjInvalid: "Informe um CNPJ com 14 dígitos.",
    brasilApiLoading: "Consultando BrasilAPI...",
    cnpjFilled: "CNPJ consultado e enviado para a página.",
    cnpjError: "Não foi possível consultar o CNPJ.",
    cepInvalid: "Informe um CEP com 8 dígitos.",
    viaCepLoading: "Consultando ViaCEP...",
    cepNotFound: "CEP não encontrado no ViaCEP.",
    addressFilled: "Endereço consultado e enviado para a página.",
    cepError: "Não foi possível consultar o CEP.",
    noActiveTab: "Nenhuma aba ativa encontrada.",
    fieldsFilled: "{count} campo(s) preenchido(s).",
    noCompatibleFields: "Nenhum campo compatível foi encontrado na página.",
    reloadPage: "Recarregue a página atual e tente preencher novamente.",
    nameCopyLabel: "Nome",
    cpfCopyLabel: "CPF",
    companyCopyLabel: "Empresa",
    cnpjCopyLabel: "CNPJ"
  },
  en: {
    tagline: "Brazilian and international test data, fast.",
    languageLabel: "Language",
    dataLocaleLabel: "Data",
    brazilData: "Brazil",
    usData: "United States",
    personTitle: "Person",
    generatePersonTitle: "Generate person",
    firstNameLabel: "First name",
    lastNameLabel: "Last name",
    fullNameLabel: "Full name",
    cpfLabel: "CPF",
    copyButton: "Copy",
    fillPageButton: "Fill page",
    tempEmailTitle: "Temporary email",
    refreshInboxTitle: "Refresh inbox",
    emailLabel: "Email",
    tempEmailPlaceholder: "Generate a Mail.tm inbox",
    generateTempEmailButton: "Generate temporary email",
    noTempEmailActive: "No active temporary email.",
    companyTitle: "Fake company",
    generateCompanyTitle: "Generate company",
    companyNameLabel: "Company name",
    cnpjLabel: "CNPJ",
    cnpjLookupLabel: "CNPJ lookup",
    useExampleButton: "Use example",
    fetchAndFillButton: "Fetch and fill",
    cepLabel: "Valid CEP",
    generateCepButton: "Generate CEP",
    usToolsTitle: "United States",
    zipLabel: "ZIP Code",
    generateZipButton: "Generate ZIP",
    createdBy: "Created by",
    personGenerated: "Person generated.",
    companyGenerated: "Fake company generated.",
    cepGenerated: "Valid CEP loaded.",
    zipGenerated: "ZIP Code generated.",
    copied: "Copied to clipboard.",
    tempEmailCreating: "Creating temporary email on Mail.tm...",
    tempEmailCreated: "Temporary email created.",
    tempEmailCreateError: "Could not create temporary email.",
    tempEmailRequired: "Generate a temporary email first.",
    tempEmailLoadError: "Could not load saved email.",
    inboxUpdating: "Refreshing inbox...",
    inboxUpdated: "{count} message(s) found.",
    inboxUpdateError: "Could not refresh inbox.",
    noMessages: "No messages received yet.",
    noSubject: "(no subject)",
    unknownSender: "unknown sender",
    exampleCnpjLoaded: "Example CNPJ loaded.",
    cnpjInvalid: "Enter a CNPJ with 14 digits.",
    brasilApiLoading: "Checking BrasilAPI...",
    cnpjFilled: "CNPJ fetched and sent to the page.",
    cnpjError: "Could not fetch CNPJ.",
    cepInvalid: "Enter a CEP with 8 digits.",
    viaCepLoading: "Checking ViaCEP...",
    cepNotFound: "CEP was not found in ViaCEP.",
    addressFilled: "Address fetched and sent to the page.",
    cepError: "Could not fetch CEP.",
    noActiveTab: "No active tab found.",
    fieldsFilled: "{count} field(s) filled.",
    noCompatibleFields: "No compatible field was found on the page.",
    reloadPage: "Reload the current page and try again.",
    nameCopyLabel: "Name",
    cpfCopyLabel: "CPF",
    companyCopyLabel: "Company",
    cnpjCopyLabel: "CNPJ"
  },
  es: {
    tagline: "Datos brasileños e internacionales para pruebas rápidas.",
    languageLabel: "Idioma",
    dataLocaleLabel: "Datos",
    brazilData: "Brasil",
    usData: "Estados Unidos",
    personTitle: "Persona",
    generatePersonTitle: "Generar persona",
    firstNameLabel: "Nombre",
    lastNameLabel: "Apellido",
    fullNameLabel: "Nombre completo",
    cpfLabel: "CPF",
    copyButton: "Copiar",
    fillPageButton: "Rellenar página",
    tempEmailTitle: "Email temporal",
    refreshInboxTitle: "Actualizar inbox",
    emailLabel: "Email",
    tempEmailPlaceholder: "Genera una casilla Mail.tm",
    generateTempEmailButton: "Generar email temporal",
    noTempEmailActive: "No hay email temporal activo.",
    companyTitle: "Empresa fake",
    generateCompanyTitle: "Generar empresa",
    companyNameLabel: "Nombre de empresa",
    cnpjLabel: "CNPJ",
    cnpjLookupLabel: "CNPJ para consulta",
    useExampleButton: "Usar ejemplo",
    fetchAndFillButton: "Buscar y rellenar",
    cepLabel: "CEP válido",
    generateCepButton: "Generar CEP",
    usToolsTitle: "Estados Unidos",
    zipLabel: "ZIP Code",
    generateZipButton: "Generar ZIP",
    createdBy: "Creado por",
    personGenerated: "Persona generada.",
    companyGenerated: "Empresa fake generada.",
    cepGenerated: "CEP válido cargado.",
    zipGenerated: "ZIP Code generado.",
    copied: "Copiado al portapapeles.",
    tempEmailCreating: "Creando email temporal en Mail.tm...",
    tempEmailCreated: "Email temporal creado.",
    tempEmailCreateError: "No se pudo crear el email temporal.",
    tempEmailRequired: "Genera un email temporal primero.",
    tempEmailLoadError: "No se pudo cargar el email guardado.",
    inboxUpdating: "Actualizando inbox...",
    inboxUpdated: "{count} mensaje(s) encontrado(s).",
    inboxUpdateError: "No se pudo actualizar la inbox.",
    noMessages: "Aún no hay mensajes recibidos.",
    noSubject: "(sin asunto)",
    unknownSender: "remitente desconocido",
    exampleCnpjLoaded: "CNPJ de ejemplo cargado.",
    cnpjInvalid: "Ingresa un CNPJ con 14 dígitos.",
    brasilApiLoading: "Consultando BrasilAPI...",
    cnpjFilled: "CNPJ consultado y enviado a la página.",
    cnpjError: "No se pudo consultar el CNPJ.",
    cepInvalid: "Ingresa un CEP con 8 dígitos.",
    viaCepLoading: "Consultando ViaCEP...",
    cepNotFound: "CEP no encontrado en ViaCEP.",
    addressFilled: "Dirección consultada y enviada a la página.",
    cepError: "No se pudo consultar el CEP.",
    noActiveTab: "No se encontró una pestaña activa.",
    fieldsFilled: "{count} campo(s) rellenado(s).",
    noCompatibleFields: "No se encontró ningún campo compatible en la página.",
    reloadPage: "Recarga la página actual e inténtalo de nuevo.",
    nameCopyLabel: "Nombre",
    cpfCopyLabel: "CPF",
    companyCopyLabel: "Empresa",
    cnpjCopyLabel: "CNPJ"
  }
};

let currentLanguage = "pt-BR";
let currentDataLocale = "BR";

const el = {
  html: document.documentElement,
  language: document.querySelector("#language"),
  dataLocale: document.querySelector("#dataLocale"),
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
  usZip: document.querySelector("#usZip"),
  cepResult: document.querySelector("#cepResult"),
  status: document.querySelector("#status")
};

el.language.addEventListener("change", handleLanguageChange);
el.dataLocale.addEventListener("change", handleDataLocaleChange);
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
  setStatus(t("exampleCnpjLoaded"));
});
document.querySelector("#fetchCnpj").addEventListener("click", fetchCnpj);
document.querySelector("#generateCep").addEventListener("click", generateCep);
document.querySelector("#fetchCep").addEventListener("click", fetchCep);
document.querySelector("#generateUsZip").addEventListener("click", generateUsZip);
document.querySelector("#fillUsZip").addEventListener("click", () => fillActivePage("FILL_ADDRESS", { cep: el.usZip.value, zip: el.usZip.value }));

init();

async function init() {
  await loadSettings();
  applyI18n();
  generatePerson();
  generateCompany();
  generateCep();
  generateUsZip();
  el.lookupCnpj.value = "65347806000104";
  loadSavedTempEmail();
}

async function loadSettings() {
  if (typeof chrome === "undefined" || !chrome.storage?.local) {
    return;
  }

  const stored = await chrome.storage.local.get(SETTINGS_STORAGE_KEY).catch(() => ({}));
  const settings = stored[SETTINGS_STORAGE_KEY] || {};
  currentLanguage = translations[settings.language] ? settings.language : "pt-BR";
  currentDataLocale = settings.dataLocale === "US" ? "US" : "BR";
  el.language.value = currentLanguage;
  el.dataLocale.value = currentDataLocale;
}

async function saveSettings() {
  if (typeof chrome === "undefined" || !chrome.storage?.local) {
    return;
  }

  await chrome.storage.local.set({
    [SETTINGS_STORAGE_KEY]: {
      language: currentLanguage,
      dataLocale: currentDataLocale
    }
  }).catch(() => {});
}

function handleLanguageChange() {
  currentLanguage = translations[el.language.value] ? el.language.value : "pt-BR";
  applyI18n();
  saveSettings();
}

function handleDataLocaleChange() {
  currentDataLocale = el.dataLocale.value === "US" ? "US" : "BR";
  generatePerson();
  generateCompany();
  saveSettings();
}

function t(key, params = {}) {
  const template = translations[currentLanguage]?.[key] || translations["pt-BR"][key] || key;
  return Object.entries(params).reduce((value, [param, replacement]) => {
    return value.replaceAll(`{${param}}`, String(replacement));
  }, template);
}

function applyI18n() {
  el.html.lang = currentLanguage;

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    node.setAttribute("placeholder", t(node.dataset.i18nPlaceholder));
  });

  document.querySelectorAll("[data-i18n-title]").forEach((node) => {
    node.setAttribute("title", t(node.dataset.i18nTitle));
  });
}

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

function formatUsZip(value) {
  const digits = onlyDigits(value);
  if (digits.length <= 5) {
    return digits.padStart(5, "0").slice(0, 5);
  }

  return `${digits.slice(0, 5)}-${digits.slice(5, 9)}`;
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
  const firstName = randomItem(currentDataLocale === "US" ? usFirstNames : firstNames);
  const lastName = currentDataLocale === "US"
    ? randomItem(usLastNames)
    : `${randomItem(lastNames)} ${randomItem(lastNames)}`;
  el.firstName.value = firstName;
  el.lastName.value = lastName;
  el.fullName.value = `${firstName} ${lastName}`;
  el.cpf.value = formatCpf(createCpf());
  setStatus(t("personGenerated"));
}

function generateCompany() {
  const name = currentDataLocale === "US"
    ? `${randomItem(usLastNames)} ${randomItem(usCompanySegments)} ${randomItem(usCompanySuffixes)}`
    : `${randomItem(lastNames)} ${randomItem(companySegments)} ${randomItem(companySuffixes)}`;
  el.companyName.value = name;
  el.cnpj.value = formatCnpj(createCnpj());
  setStatus(t("companyGenerated"));
}

function generateCep() {
  el.cep.value = randomItem(validCepSamples);
  setStatus(t("cepGenerated"));
}

function generateUsZip() {
  el.usZip.value = Math.random() > 0.2
    ? randomItem(usZipSamples)
    : formatUsZip(`${randomItem(usZipSamples)}${String(Math.floor(Math.random() * 10000)).padStart(4, "0")}`);
  setStatus(t("zipGenerated"));
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
    `${t("nameCopyLabel")}: ${el.fullName.value}`,
    `${t("cpfCopyLabel")}: ${el.cpf.value}`
  ].join("\n"));
}

async function copyCompany() {
  await copyText([
    `${t("companyCopyLabel")}: ${el.companyName.value}`,
    `${t("cnpjCopyLabel")}: ${el.cnpj.value}`
  ].join("\n"));
}

async function copyText(text) {
  await navigator.clipboard.writeText(text);
  setStatus(t("copied"));
}

async function generateTempEmail() {
  setBusy(true);
  setStatus(t("tempEmailCreating"));

  try {
    const account = await createTempMailAccount();
    el.tempEmail.value = account.address;
    await refreshInbox(account);
    setStatus(t("tempEmailCreated"));
  } catch (error) {
    setStatus(error.message || t("tempEmailCreateError"), true);
  } finally {
    setBusy(false);
  }
}

async function copyTempEmail() {
  if (!el.tempEmail.value) {
    setStatus(t("tempEmailRequired"), true);
    return;
  }

  await copyText(el.tempEmail.value);
}

async function fillTempEmail() {
  if (!el.tempEmail.value) {
    setStatus(t("tempEmailRequired"), true);
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
    el.inboxList.textContent = t("tempEmailLoadError");
  }
}

async function refreshInbox(account = null, options = {}) {
  if (!el.tempEmail.value && !account) {
    el.inboxList.textContent = t("tempEmailRequired");
    if (!options.silent) {
      setStatus(t("tempEmailRequired"), true);
    }
    return;
  }

  setBusy(true);
  if (!options.silent) {
    setStatus(t("inboxUpdating"));
  }

  try {
    const result = await listTempMailMessages(account);
    el.tempEmail.value = result.account.address;
    renderInboxMessages(result.messages);
    if (!options.silent) {
      setStatus(t("inboxUpdated", { count: result.total }));
    }
  } catch (error) {
    el.inboxList.textContent = t("inboxUpdateError");
    if (!options.silent) {
      setStatus(error.message || t("inboxUpdateError"), true);
    }
  } finally {
    setBusy(false);
  }
}

function renderInboxMessages(messages) {
  el.inboxList.textContent = "";

  if (!messages.length) {
    el.inboxList.textContent = t("noMessages");
    return;
  }

  const fragment = document.createDocumentFragment();
  messages.forEach((message) => {
    const item = document.createElement("article");
    item.className = "message";

    const subject = document.createElement("strong");
    subject.textContent = message.subject || t("noSubject");

    const meta = document.createElement("span");
    meta.textContent = message.from?.address || t("unknownSender");

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
    setStatus(t("cnpjInvalid"), true);
    return;
  }

  setBusy(true);
  setStatus(t("brasilApiLoading"));

  try {
    const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`);
    if (!response.ok) {
      throw new Error(`BrasilAPI retornou HTTP ${response.status}`);
    }

    const data = await response.json();
    const payload = normalizeBrasilApiCompany(data);
    el.cnpjResult.value = `${payload.legalName || payload.companyName} - ${payload.city || ""}/${payload.state || ""}`;
    await fillActivePage("FILL_COMPANY", payload);
    setStatus(t("cnpjFilled"));
  } catch (error) {
    setStatus(error.message || t("cnpjError"), true);
  } finally {
    setBusy(false);
  }
}

async function fetchCep() {
  const cep = onlyDigits(el.cep.value);
  if (cep.length !== 8) {
    setStatus(t("cepInvalid"), true);
    return;
  }

  setBusy(true);
  setStatus(t("viaCepLoading"));

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    if (!response.ok) {
      throw new Error(`ViaCEP retornou HTTP ${response.status}`);
    }

    const data = await response.json();
    if (data.erro) {
      throw new Error(t("cepNotFound"));
    }

    const payload = normalizeViaCepAddress(data);
    el.cepResult.value = `${payload.street}, ${payload.neighborhood} - ${payload.city}/${payload.state}`;
    await fillActivePage("FILL_ADDRESS", payload);
    setStatus(t("addressFilled"));
  } catch (error) {
    setStatus(error.message || t("cepError"), true);
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
    setStatus(t("noActiveTab"), true);
    return;
  }

  try {
    let response = await chrome.tabs.sendMessage(tab.id, { type, payload }).catch(() => null);
    if (!response) {
      await chrome.scripting.executeScript({ target: { tabId: tab.id }, files: ["content.js"] });
      response = await chrome.tabs.sendMessage(tab.id, { type, payload });
    }

    if (response?.filledCount > 0) {
      setStatus(t("fieldsFilled", { count: response.filledCount }));
      return;
    }

    setStatus(t("noCompatibleFields"), true);
  } catch (error) {
    setStatus(t("reloadPage"), true);
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
