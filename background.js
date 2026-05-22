importScripts("temp-mail.js");

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

chrome.runtime.onInstalled.addListener(createContextMenus);
chrome.runtime.onStartup.addListener(createContextMenus);

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (!tab?.id) {
    return;
  }

  try {
    if (info.menuItemId === "faker-fill-person") {
      await fillActiveTab(tab.id, "FILL_PERSON", createPersonPayload());
      return;
    }

    if (info.menuItemId === "faker-fill-company") {
      await fillActiveTab(tab.id, "FILL_COMPANY", createCompanyPayload());
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

function createContextMenus() {
  chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({
      id: "faker-root",
      title: "Faker BR",
      contexts: ["page", "editable", "selection"]
    });

    chrome.contextMenus.create({
      id: "faker-fill-person",
      parentId: "faker-root",
      title: "Preencher pessoa fake",
      contexts: ["page", "editable"]
    });

    chrome.contextMenus.create({
      id: "faker-fill-company",
      parentId: "faker-root",
      title: "Preencher empresa fake",
      contexts: ["page", "editable"]
    });

    chrome.contextMenus.create({
      id: "faker-fill-field-cpf",
      parentId: "faker-root",
      title: "Preencher este campo com CPF",
      contexts: ["editable"]
    });

    chrome.contextMenus.create({
      id: "faker-fill-field-cnpj",
      parentId: "faker-root",
      title: "Preencher este campo com CNPJ",
      contexts: ["editable"]
    });

    chrome.contextMenus.create({
      id: "faker-fill-field-email",
      parentId: "faker-root",
      title: "Preencher este campo com email temporario",
      contexts: ["editable"]
    });

    chrome.contextMenus.create({
      id: "faker-lookup-cnpj",
      parentId: "faker-root",
      title: "Consultar CNPJ selecionado e preencher",
      contexts: ["selection"]
    });

    chrome.contextMenus.create({
      id: "faker-lookup-cep",
      parentId: "faker-root",
      title: "Consultar CEP selecionado e preencher endereço",
      contexts: ["selection"]
    });
  });
}

async function fillActiveTab(tabId, type, payload) {
  let response = await chrome.tabs.sendMessage(tabId, { type, payload }).catch(() => null);
  if (!response) {
    await chrome.scripting.executeScript({ target: { tabId }, files: ["content.js"] });
    response = await chrome.tabs.sendMessage(tabId, { type, payload });
  }

  return response;
}

function createPersonPayload() {
  const firstName = randomItem(firstNames);
  const lastName = `${randomItem(lastNames)} ${randomItem(lastNames)}`;

  return {
    firstName,
    lastName,
    fullName: `${firstName} ${lastName}`,
    cpf: formatCpf(createCpf())
  };
}

function createCompanyPayload() {
  const companyName = `${randomItem(lastNames)} ${randomItem(companySegments)} ${randomItem(companySuffixes)}`;

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
