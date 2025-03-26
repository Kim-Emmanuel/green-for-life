import DOMPurify from 'isomorphic-dompurify';

const ALLOWED_FILE_TYPES = {
  PUBLICATIONS: ['.pdf'],
  IMAGES: ['.jpg', '.jpeg', '.png', '.webp'],
};

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export function sanitizeHTML(content: string): string {
  return DOMPurify.sanitize(content, {
    ALLOWED_TAGS: [
      'p', 'br', 'b', 'i', 'em', 'strong', 'a', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'
    ],
    ALLOWED_ATTR: ['href', 'target', 'rel'],
  });
}

export function validateFileUpload(file: File, type: keyof typeof ALLOWED_FILE_TYPES): { valid: boolean; error?: string } {
  const extension = '.' + file.name.split('.').pop()?.toLowerCase();

  if (!extension || !ALLOWED_FILE_TYPES[type].includes(extension)) {
    return {
      valid: false,
      error: `Invalid file type. Allowed types: ${ALLOWED_FILE_TYPES[type].join(', ')}`
    };
  }

  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `File size exceeds ${MAX_FILE_SIZE / 1024 / 1024}MB limit`
    };
  }

  return { valid: true };
}