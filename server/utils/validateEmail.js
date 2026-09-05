import dns from "node:dns/promises";
import disposableDomains from "disposable-email-domains" with { type: "json" };

const disposableSet = new Set(disposableDomains.map((d) => d.toLowerCase()));

// A reasonably strict RFC-5322-ish check — good enough to reject typos like
// "abc@gmail" or "abc@@x.com" without rejecting valid edge-case addresses.
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

/**
 * Validates that an email is well-formed, not from a known disposable/burner
 * domain (mailinator, guerrillamail, temp-mail, etc.), and that its domain
 * actually has mail servers configured (MX record) — the cheapest real
 * signal that an address could ever receive mail.
 *
 * Returns { valid: boolean, reason?: string }
 */
export const validateEmail = async (email) => {
  if (!email || typeof email !== "string") {
    return { valid: false, reason: "Email is required" };
  }

  const trimmed = email.trim().toLowerCase();

  if (!EMAIL_REGEX.test(trimmed)) {
    return { valid: false, reason: "Enter a valid email address" };
  }

  const domain = trimmed.split("@")[1];

  if (disposableSet.has(domain)) {
    return {
      valid: false,
      reason: "Temporary/disposable email addresses are not allowed. Please use a real email.",
    };
  }

  try {
    const mxRecords = await dns.resolveMx(domain);
    if (!mxRecords || mxRecords.length === 0) {
      return { valid: false, reason: "This email domain can't receive mail" };
    }
  } catch {
    // NXDOMAIN / no MX record at all → domain can't receive email
    return { valid: false, reason: "This email domain doesn't exist" };
  }

  return { valid: true };
};
