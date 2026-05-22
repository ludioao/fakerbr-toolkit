const TEMP_MAIL_API_BASE = "https://api.mail.tm";
const TEMP_MAIL_STORAGE_KEY = "fakerBrTempMailAccount";

async function getSavedTempMailAccount() {
  const stored = await chrome.storage.local.get(TEMP_MAIL_STORAGE_KEY);
  return stored[TEMP_MAIL_STORAGE_KEY] || null;
}

async function saveTempMailAccount(account) {
  await chrome.storage.local.set({ [TEMP_MAIL_STORAGE_KEY]: account });
}

async function clearTempMailAccount() {
  await chrome.storage.local.remove(TEMP_MAIL_STORAGE_KEY);
}

async function ensureTempMailAccount() {
  const saved = await getSavedTempMailAccount();
  if (saved?.address && saved?.password) {
    if (saved.token) {
      return saved;
    }

    const token = await getTempMailToken(saved.address, saved.password);
    const account = { ...saved, token };
    await saveTempMailAccount(account);
    return account;
  }

  return createTempMailAccount();
}

async function createTempMailAccount() {
  const domain = await getTempMailDomain();
  let lastError = null;

  for (let attempt = 0; attempt < 4; attempt += 1) {
    const password = createTempMailPassword();
    const address = `${createTempMailLogin()}@${domain}`;

    try {
      const created = await tempMailRequest("/accounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address, password })
      });
      const token = await getTempMailToken(address, password);
      const account = {
        id: created.id,
        address,
        password,
        token,
        createdAt: created.createdAt || new Date().toISOString()
      };

      await saveTempMailAccount(account);
      return account;
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError || new Error("Nao foi possivel criar email temporario.");
}

async function getTempMailDomain() {
  const data = await tempMailRequest("/domains");
  const domains = data["hydra:member"] || [];
  const domain = domains.find((item) => item.isActive && !item.isPrivate) || domains[0];

  if (!domain?.domain) {
    throw new Error("Nenhum dominio Mail.tm disponivel.");
  }

  return domain.domain;
}

async function getTempMailToken(address, password) {
  const data = await tempMailRequest("/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ address, password })
  });

  if (!data.token) {
    throw new Error("Mail.tm nao retornou token.");
  }

  return data.token;
}

async function listTempMailMessages(account) {
  const activeAccount = account || await ensureTempMailAccount();
  const data = await authorizedTempMailRequest("/messages", activeAccount);

  return {
    account: activeAccount,
    messages: data["hydra:member"] || [],
    total: data["hydra:totalItems"] || 0
  };
}

async function readTempMailMessage(messageId, account) {
  const activeAccount = account || await ensureTempMailAccount();
  return authorizedTempMailRequest(`/messages/${encodeURIComponent(messageId)}`, activeAccount);
}

async function authorizedTempMailRequest(path, account, init = {}) {
  try {
    return await tempMailRequest(path, {
      ...init,
      headers: {
        ...(init.headers || {}),
        Authorization: `Bearer ${account.token}`
      }
    });
  } catch (error) {
    if (error.status !== 401 || !account.address || !account.password) {
      throw error;
    }

    const token = await getTempMailToken(account.address, account.password);
    const refreshedAccount = { ...account, token };
    await saveTempMailAccount(refreshedAccount);

    return tempMailRequest(path, {
      ...init,
      headers: {
        ...(init.headers || {}),
        Authorization: `Bearer ${token}`
      }
    });
  }
}

async function tempMailRequest(path, init = {}) {
  const response = await fetch(`${TEMP_MAIL_API_BASE}${path}`, init);
  if (!response.ok) {
    const message = await response.text().catch(() => "");
    const error = new Error(`Mail.tm retornou HTTP ${response.status}${message ? `: ${message}` : ""}`);
    error.status = response.status;
    throw error;
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

function createTempMailLogin() {
  const timestamp = Date.now().toString(36);
  const random = crypto.getRandomValues(new Uint32Array(1))[0].toString(36);
  return `fakerbr-${timestamp}-${random}`.toLowerCase();
}

function createTempMailPassword() {
  const bytes = crypto.getRandomValues(new Uint8Array(18));
  return Array.from(bytes, (byte) => byte.toString(36).padStart(2, "0")).join("").slice(0, 24);
}
