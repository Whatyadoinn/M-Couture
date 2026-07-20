import DOMPurify from "dompurify";

// ── Input Sanitization ──────────────────────────────────────────────────────

/**
 * Sanitize a string to prevent XSS attacks.
 * Strips ALL HTML tags and attributes.
 */
export function sanitize(input) {
  if (typeof input !== "string") return "";
  return DOMPurify.sanitize(input, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] }).trim();
}

/**
 * Sanitize an entire form object.
 */
export function sanitizeForm(formData) {
  const clean = {};
  for (const [key, value] of Object.entries(formData)) {
    clean[key] = sanitize(value);
  }
  return clean;
}

// ── Validation ──────────────────────────────────────────────────────────────

const EMAIL_RE = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PHONE_RE = /^\+?[1-9]\d{6,14}$/;
const NAME_RE = /^[\p{L}\p{M}\s'.,-]{2,80}$/u;

export function isValidEmail(email) {
  return EMAIL_RE.test(email);
}

export function isValidPhone(phone) {
  return PHONE_RE.test(phone.replace(/[\s()-]/g, ""));
}

export function isValidName(name) {
  return NAME_RE.test(name);
}

export function validatePassword(password) {
  const errors = [];
  if (password.length < 8) errors.push("At least 8 characters");
  if (!/[A-Z]/.test(password)) errors.push("One uppercase letter");
  if (!/[a-z]/.test(password)) errors.push("One lowercase letter");
  if (!/\d/.test(password)) errors.push("One number");
  return { valid: errors.length === 0, errors };
}

// ── Rate Limiting ───────────────────────────────────────────────────────────

const rateLimitStore = new Map();

/**
 * Client-side rate limiter.
 * @param {string} key – unique action key (e.g. "contact-form")
 * @param {number} maxAttempts – max attempts in the window
 * @param {number} windowMs – time window in milliseconds
 * @returns {{ allowed: boolean, remaining: number, resetIn: number }}
 */
export function rateLimit(key, maxAttempts = 3, windowMs = 3600000) {
  const now = Date.now();
  let entry = rateLimitStore.get(key);

  if (!entry || now - entry.windowStart > windowMs) {
    entry = { windowStart: now, attempts: 0 };
    rateLimitStore.set(key, entry);
  }

  entry.attempts += 1;
  const remaining = Math.max(0, maxAttempts - entry.attempts);
  const resetIn = Math.max(0, entry.windowStart + windowMs - now);

  return {
    allowed: entry.attempts <= maxAttempts,
    remaining,
    resetIn,
  };
}

// ── Price Formatting ────────────────────────────────────────────────────────

export function formatPrice(price) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}
