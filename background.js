importScripts("temp-mail.js");

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

const usZipSamples = [
  "10001", "11201", "20001", "30301", "33101", "60601", "73301", "80202",
  "90001", "94105", "98101", "02108", "85001", "97201", "15201"
];

const usStreetNames = [
  "Main", "Oak", "Pine", "Maple", "Cedar", "Elm", "Washington", "Lake",
  "Hill", "Park", "Sunset", "River", "Lincoln", "Madison", "Franklin"
];

const usStreetTypes = ["St", "Ave", "Blvd", "Rd", "Ln", "Dr", "Way", "Ct"];

const usAddressLocations = [
  { city: "New York", state: "NY", zip: "10001" },
  { city: "Brooklyn", state: "NY", zip: "11201" },
  { city: "Washington", state: "DC", zip: "20001" },
  { city: "Atlanta", state: "GA", zip: "30301" },
  { city: "Miami", state: "FL", zip: "33101" },
  { city: "Chicago", state: "IL", zip: "60601" },
  { city: "Austin", state: "TX", zip: "73301" },
  { city: "Denver", state: "CO", zip: "80202" },
  { city: "Los Angeles", state: "CA", zip: "90001" },
  { city: "San Francisco", state: "CA", zip: "94105" },
  { city: "Seattle", state: "WA", zip: "98101" },
  { city: "Boston", state: "MA", zip: "02108" },
  { city: "Phoenix", state: "AZ", zip: "85001" },
  { city: "Portland", state: "OR", zip: "97201" }
];

const SETTINGS_STORAGE_KEY = "fakerBrSettings";

const contextMenuTranslations = {
  "pt-BR": {
    fillPerson: "Preencher pessoa fake",
    fillCompany: "Preencher empresa fake",
    fillCpf: "Preencher este campo com CPF",
    fillCnpj: "Preencher este campo com CNPJ",
    fillZip: "Preencher este campo com ZIP Code",
    fillUsAddress: "Preencher endereço americano fake",
    fillEmail: "Preencher este campo com email temporario",
    lookupCnpj: "Consultar CNPJ selecionado e preencher",
    lookupCep: "Consultar CEP selecionado e preencher endereco"
  },
  en: {
    fillPerson: "Fill fake person",
    fillCompany: "Fill fake company",
    fillCpf: "Fill this field with CPF",
    fillCnpj: "Fill this field with CNPJ",
    fillZip: "Fill this field with ZIP Code",
    fillUsAddress: "Fill fake US address",
    fillEmail: "Fill this field with temporary email",
    lookupCnpj: "Look up selected CNPJ and fill",
    lookupCep: "Look up selected CEP and fill address"
  },
  es: {
    fillPerson: "Rellenar persona fake",
    fillCompany: "Rellenar empresa fake",
    fillCpf: "Rellenar este campo con CPF",
    fillCnpj: "Rellenar este campo con CNPJ",
    fillZip: "Rellenar este campo con ZIP Code",
    fillUsAddress: "Rellenar dirección americana fake",
    fillEmail: "Rellenar este campo con email temporal",
    lookupCnpj: "Consultar CNPJ seleccionado y rellenar",
    lookupCep: "Consultar CEP seleccionado y rellenar direccion"
  }
};

chrome.runtime.onInstalled.addListener(createContextMenus);
chrome.runtime.onStartup.addListener(createContextMenus);
chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === "local" && changes[SETTINGS_STORAGE_KEY]) {
    createContextMenus();
  }
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (!tab?.id) {
    return;
  }

  try {
    if (info.menuItemId === "faker-fill-person") {
      await fillActiveTab(tab.id, "FILL_PERSON", await createPersonPayload());
      return;
    }

    if (info.menuItemId === "faker-fill-company") {
      await fillActiveTab(tab.id, "FILL_COMPANY", await createCompanyPayload());
      return;
    }

    if (info.menuItemId === "faker-fill-field-cpf") {
      await fillActiveTab(tab.id, "FILL_CONTEXT_FIELD", { value: formatCpf(createCpf()) });
      return;
    }

    if (info.menuItemId === "faker-fill-field-cnpj") {
      await fillActiveTab(tab.id, "FILL_CONTEXT_FIELD", { value: formatCnpj(createCnpj()) });
      return;
    }

    if (info.menuItemId === "faker-fill-field-zip") {
      await fillActiveTab(tab.id, "FILL_CONTEXT_FIELD", { value: createUsZip() });
      return;
    }

    if (info.menuItemId === "faker-fill-us-address") {
      await fillActiveTab(tab.id, "FILL_ADDRESS", createUsAddress());
      return;
    }

    if (info.menuItemId === "faker-fill-field-email") {
      const account = await ensureTempMailAccount();
      await fillActiveTab(tab.id, "FILL_CONTEXT_FIELD", { value: account.address });
      return;
    }

    if (info.menuItemId === "faker-lookup-cnpj") {
      const cnpj = onlyDigits(info.selectionText);
      if (cnpj.length === 14) {
        const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`);
        const data = await response.json();
        await fillActiveTab(tab.id, "FILL_COMPANY", normalizeBrasilApiCompany(data));
      }
      return;
    }

    if (info.menuItemId === "faker-lookup-cep") {
      const cep = onlyDigits(info.selectionText);
      if (cep.length === 8) {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        if (!data.erro) {
          await fillActiveTab(tab.id, "FILL_ADDRESS", normalizeViaCepAddress(data));
        }
      }
    }
  } catch (error) {
    console.warn("Faker BR context menu action failed:", error);
  }
});

async function createContextMenus() {
  const settings = await getSettings();
  const copy = contextMenuTranslations[settings.language] || contextMenuTranslations["pt-BR"];

  chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({
      id: "faker-root",
      title: "Faker BR",
      contexts: ["page", "editable", "selection"]
    });

    chrome.contextMenus.create({
      id: "faker-fill-person",
      parentId: "faker-root",
      title: copy.fillPerson,
      contexts: ["page", "editable"]
    });

    chrome.contextMenus.create({
      id: "faker-fill-company",
      parentId: "faker-root",
      title: copy.fillCompany,
      contexts: ["page", "editable"]
    });

    chrome.contextMenus.create({
      id: "faker-fill-field-cpf",
      parentId: "faker-root",
      title: copy.fillCpf,
      contexts: ["editable"]
    });

    chrome.contextMenus.create({
      id: "faker-fill-field-cnpj",
      parentId: "faker-root",
      title: copy.fillCnpj,
      contexts: ["editable"]
    });

    chrome.contextMenus.create({
      id: "faker-fill-field-zip",
      parentId: "faker-root",
      title: copy.fillZip,
      contexts: ["editable"]
    });

    chrome.contextMenus.create({
      id: "faker-fill-us-address",
      parentId: "faker-root",
      title: copy.fillUsAddress,
      contexts: ["page", "editable"]
    });

    chrome.contextMenus.create({
      id: "faker-fill-field-email",
      parentId: "faker-root",
      title: copy.fillEmail,
      contexts: ["editable"]
    });

    chrome.contextMenus.create({
      id: "faker-lookup-cnpj",
      parentId: "faker-root",
      title: copy.lookupCnpj,
      contexts: ["selection"]
    });

    chrome.contextMenus.create({
      id: "faker-lookup-cep",
      parentId: "faker-root",
      title: copy.lookupCep,
      contexts: ["selection"]
    });
  });
}

async function getSettings() {
  const stored = await chrome.storage.local.get(SETTINGS_STORAGE_KEY).catch(() => ({}));
  const settings = stored[SETTINGS_STORAGE_KEY] || {};

  return {
    language: contextMenuTranslations[settings.language] ? settings.language : "pt-BR",
    dataLocale: settings.dataLocale === "US" ? "US" : "BR"
  };
}

async function fillActiveTab(tabId, type, payload) {
  let response = await chrome.tabs.sendMessage(tabId, { type, payload }).catch(() => null);
  if (!response) {
    await chrome.scripting.executeScript({ target: { tabId }, files: ["content.js"] });
    response = await chrome.tabs.sendMessage(tabId, { type, payload });
  }

  return response;
}

async function createPersonPayload() {
  const settings = await getSettings();
  const firstName = randomItem(settings.dataLocale === "US" ? usFirstNames : firstNames);
  const lastName = settings.dataLocale === "US"
    ? randomItem(usLastNames)
    : `${randomItem(lastNames)} ${randomItem(lastNames)}`;

  return {
    firstName,
    lastName,
    fullName: `${firstName} ${lastName}`,
    cpf: formatCpf(createCpf())
  };
}

async function createCompanyPayload() {
  const settings = await getSettings();
  const companyName = settings.dataLocale === "US"
    ? `${randomItem(usLastNames)} ${randomItem(usCompanySegments)} ${randomItem(usCompanySuffixes)}`
    : `${randomItem(lastNames)} ${randomItem(companySegments)} ${randomItem(companySuffixes)}`;

  return {
    cnpj: formatCnpj(createCnpj()),
    companyName,
    legalName: companyName,
    tradeName: companyName
  };
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

function createUsZip() {
  if (Math.random() > 0.2) {
    return randomItem(usZipSamples);
  }

  return `${randomItem(usZipSamples)}-${String(Math.floor(Math.random() * 10000)).padStart(4, "0")}`;
}

function createUsAddress() {
  const location = randomItem(usAddressLocations);
  const zip = Math.random() > 0.25 ? location.zip : createUsZip();

  return {
    number: String(Math.floor(Math.random() * 8999) + 100),
    street: `${randomItem(usStreetNames)} ${randomItem(usStreetTypes)}`,
    city: location.city,
    state: location.state,
    cep: zip,
    zip
  };
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
