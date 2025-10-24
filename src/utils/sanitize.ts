/**
 * Input Sanitization Utility
 * Protects against XSS attacks by sanitizing user input
 */

/**
 * Sanitizes text input by removing HTML tags and special characters
 * Use this for form inputs that should only contain plain text
 */
export function sanitizeInput(input: string): string {
  if (!input) return '';
  
  // Remove HTML tags
  let sanitized = input.replace(/<[^>]*>/g, '');
  
  // Remove script tags and their content
  sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  
  // Remove event handlers
  sanitized = sanitized.replace(/on\w+\s*=\s*["'][^"']*["']/gi, '');
  
  // Trim whitespace
  sanitized = sanitized.trim();
  
  return sanitized;
}

/**
 * Sanitizes HTML content while preserving safe tags
 * Use this for rich text content where some formatting is allowed
 * Note: For production, consider using DOMPurify on the client-side
 */
export function sanitizeHtml(html: string, allowedTags: string[] = ['p', 'br', 'strong', 'em', 'u', 'a']): string {
  if (!html) return '';
  
  // For server-side, we'll strip all HTML for safety
  // In a real app, you'd use DOMPurify.sanitize() on the client
  return sanitizeInput(html);
}

/**
 * Sanitizes email addresses
 */
export function sanitizeEmail(email: string): string {
  if (!email) return '';
  
  // Remove any HTML
  let sanitized = sanitizeInput(email);
  
  // Basic email validation pattern
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
  if (!emailPattern.test(sanitized)) {
    return '';
  }
  
  return sanitized.toLowerCase();
}

/**
 * Sanitizes phone numbers
 */
export function sanitizePhone(phone: string): string {
  if (!phone) return '';
  
  // Remove all non-numeric characters except + and spaces
  return phone.replace(/[^\d\s+()-]/g, '').trim();
}

/**
 * Sanitizes URLs
 */
export function sanitizeUrl(url: string): string {
  if (!url) return '';
  
  // Remove HTML
  let sanitized = sanitizeInput(url);
  
  // Only allow http, https, and mailto protocols
  const allowedProtocols = /^(https?:\/\/|mailto:)/i;
  
  if (!allowedProtocols.test(sanitized)) {
    // If no protocol, assume https
    if (!sanitized.includes('://')) {
      sanitized = 'https://' + sanitized;
    } else {
      // Disallow other protocols
      return '';
    }
  }
  
  try {
    // Validate URL format
    new URL(sanitized);
    return sanitized;
  } catch {
    return '';
  }
}

/**
 * Validates and sanitizes form data object
 */
export interface FormData {
  [key: string]: string | undefined;
}

export function sanitizeFormData(data: FormData): FormData {
  const sanitized: FormData = {};
  
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string') {
      // Apply appropriate sanitization based on field name
      if (key.toLowerCase().includes('email')) {
        sanitized[key] = sanitizeEmail(value);
      } else if (key.toLowerCase().includes('phone') || key.toLowerCase().includes('telepon')) {
        sanitized[key] = sanitizePhone(value);
      } else if (key.toLowerCase().includes('url') || key.toLowerCase().includes('website')) {
        sanitized[key] = sanitizeUrl(value);
      } else {
        sanitized[key] = sanitizeInput(value);
      }
    }
  }
  
  return sanitized;
}

/**
 * Validates required fields
 */
export function validateRequired(data: FormData, requiredFields: string[]): { valid: boolean; missing: string[] } {
  const missing: string[] = [];
  
  for (const field of requiredFields) {
    if (!data[field] || data[field]?.trim() === '') {
      missing.push(field);
    }
  }
  
  return {
    valid: missing.length === 0,
    missing
  };
}
