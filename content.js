(() => {
if (window.__fakerBrContentScriptLoaded) {
  return;
}

window.__fakerBrContentScriptLoaded = true;

let lastContextField = null;

const fieldMatchers = {
  firstName: [
    /\bprimeiro.?nome\b/i,
    /\bnome.?inicial\b/i,
    /\bfirst.?name\b/i,
    /\bnombre\b/i
  ],
  lastName: [
    /\bsobrenome\b/i,
    /\bultimo.?nome\b/i,
    /\blast.?name\b/i,
    /\bapellido\b/i
  ],
  fullName: [
    /^nome$/i,
    /\bnome.?completo\b/i,
    /\bfull.?name\b/i,
    /\bnombre.?completo\b/i,
    /\bcontato\b/i,
    /\bresponsavel\b/i,
    /\bresponsable\b/i
  ],
  cpf: [
    /\bcpf\b/i,
    /\bdocumento.?pessoa/i
  ],
  cnpj: [
    /\bcnpj\b/i,
    /\bdocumento.?empresa/i
  ],
  companyName: [
    /\bempresa\b/i,
    /\bnome.?empresa\b/i,
    /\bnombre.?empresa\b/i,
    /\bnome.?fantasia\b/i,
    /\bfantasia\b/i,
    /\bcompany\b/i
  ],
  legalName: [
    /\brazao.?social\b/i,
    /\brazão.?social\b/i,
    /\blegal.?name\b/i,
    /\brazon.?social\b/i
  ],
  tradeName: [
    /\bnome.?fantasia\b/i,
    /\bfantasia\b/i,
    /\btrade.?name\b/i
  ],
  email: [
    /\be-?mail\b/i,
    /\bemail\b/i
  ],
  phone: [
    /\btelefone\b/i,
    /\bcelular\b/i,
    /\bphone\b/i,
    /\btelefono\b/i,
    /\bteléfono\b/i
  ],
  cep: [
    /\bcep\b/i,
    /\bpostal.?code\b/i,
    /\bzip\b/i,
    /\bcodigo.?postal\b/i,
    /\bcódigo.?postal\b/i
  ],
  zip: [
    /\bzip\b/i,
    /\bzip.?code\b/i,
    /\bpostal.?code\b/i,
    /\bcodigo.?postal\b/i,
    /\bcódigo.?postal\b/i
  ],
  street: [
    /\blogradouro\b/i,
    /\bendereco\b/i,
    /\bendereço\b/i,
    /\bdireccion\b/i,
    /\bdirección\b/i,
    /\brua\b/i,
    /\bstreet\b/i,
    /\baddress\b/i
  ],
  number: [
    /^numero$/i,
    /^número$/i,
    /\bnumero.?endereco\b/i,
    /\bnúmero.?endereço\b/i,
    /\bnumero.?direccion\b/i,
    /\bnúmero.?dirección\b/i,
    /\bnumber\b/i
  ],
  complement: [
    /\bcomplemento\b/i,
    /\bcomplement\b/i
  ],
  neighborhood: [
    /\bbairro\b/i,
    /\bneighborhood\b/i,
    /\bdistrict\b/i,
    /\bbarrio\b/i
  ],
  city: [
    /\bcidade\b/i,
    /\bmunicipio\b/i,
    /\bmunicípio\b/i,
    /\bcity\b/i,
    /\bciudad\b/i
  ],
  state: [
    /^uf$/i,
    /\bestado\b/i,
    /\bstate\b/i,
    /\bprovincia\b/i
  ],
  ibge: [
    /\bibge\b/i
  ],
  ddd: [
    /\bddd\b/i
  ]
};

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (!message?.type || !message?.payload) {
    return false;
  }

  if (message.type === "FILL_CONTEXT_FIELD") {
    const field = getContextField();
    if (!field || !message.payload.value) {
      sendResponse({ filledCount: 0 });
      return true;
    }

    setFieldValue(field, message.payload.value);
    sendResponse({ filledCount: 1 });
    return true;
  }

  if (!["FILL_PERSON", "FILL_COMPANY", "FILL_ADDRESS"].includes(message.type)) {
    return false;
  }

  const filledCount = fillFields(message.payload);
  sendResponse({ filledCount });
  return true;
});

document.addEventListener("contextmenu", (event) => {
  const field = event.target?.closest?.("input, textarea, select");
  lastContextField = field && isFillableField(field) ? field : null;
}, true);

function fillFields(payload) {
  const fields = getFillableFields();
  const usedFields = new Set();
  let count = 0;

  for (const [key, value] of Object.entries(payload)) {
    if (!value || !fieldMatchers[key]) {
      continue;
    }

    const field = fields.find((candidate) => !usedFields.has(candidate.element) && matchesField(candidate.text, fieldMatchers[key]));
    if (!field) {
      continue;
    }

    setFieldValue(field.element, value);
    usedFields.add(field.element);
    count += 1;
  }

  return count;
}

function getFillableFields() {
  return Array.from(document.querySelectorAll("input, textarea, select"))
    .filter(isFillableField)
    .map((element) => ({
      element,
      text: getFieldText(element)
    }));
}

function getContextField() {
  if (lastContextField && isFillableField(lastContextField)) {
    return lastContextField;
  }

  return isFillableField(document.activeElement) ? document.activeElement : null;
}

function isFillableField(element) {
  if (!(element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement || element instanceof HTMLSelectElement)) {
    return false;
  }

  if (element.disabled || element.readOnly) {
    return false;
  }

  if (element instanceof HTMLInputElement) {
    const unsupportedTypes = new Set(["button", "checkbox", "color", "file", "hidden", "image", "radio", "range", "reset", "submit"]);
    return !unsupportedTypes.has(element.type);
  }

  return true;
}

function getFieldText(element) {
  const parts = [
    element.id,
    element.name,
    element.getAttribute("autocomplete"),
    element.getAttribute("aria-label"),
    element.getAttribute("placeholder"),
    element.getAttribute("data-testid"),
    element.getAttribute("data-test"),
    getAssociatedLabel(element)
  ];

  return parts.filter(Boolean).join(" ");
}

function getAssociatedLabel(element) {
  const labels = [];

  if (element.id) {
    labels.push(...Array.from(document.querySelectorAll(`label[for="${CSS.escape(element.id)}"]`)));
  }

  const parentLabel = element.closest("label");
  if (parentLabel) {
    labels.push(parentLabel);
  }

  return labels.map((label) => label.textContent || "").join(" ");
}

function matchesField(text, matchers) {
  return matchers.some((matcher) => matcher.test(normalizeText(text)));
}

function normalizeText(text) {
  return String(text || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[_-]+/g, " ")
    .trim();
}

function setFieldValue(element, value) {
  const prototype = element instanceof HTMLTextAreaElement
    ? HTMLTextAreaElement.prototype
    : element instanceof HTMLSelectElement
      ? HTMLSelectElement.prototype
      : HTMLInputElement.prototype;

  const valueSetter = Object.getOwnPropertyDescriptor(prototype, "value")?.set;

  if (element instanceof HTMLSelectElement) {
    setSelectValue(element, value);
  } else if (valueSetter) {
    valueSetter.call(element, value);
  } else {
    element.value = value;
  }

  element.dispatchEvent(new Event("input", { bubbles: true }));
  element.dispatchEvent(new Event("change", { bubbles: true }));
}

function setSelectValue(element, value) {
  const normalizedValue = normalizeText(value).toLowerCase();
  const option = Array.from(element.options).find((candidate) => {
    const optionText = normalizeText(candidate.textContent).toLowerCase();
    const optionValue = normalizeText(candidate.value).toLowerCase();
    return optionText === normalizedValue || optionValue === normalizedValue;
  });

  if (option) {
    element.value = option.value;
    return;
  }

  element.value = value;
}
})();
