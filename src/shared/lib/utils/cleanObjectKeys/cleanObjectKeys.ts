export function cleanObjectKeys(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(cleanObjectKeys);
  }

  if (obj !== null && typeof obj === 'object') {
    const cleaned: any = {};
    for (const key in obj) {
      const cleanKey = key.trim();
      cleaned[cleanKey] = cleanObjectKeys(obj[key]);
    }
    return cleaned;
  }

  return obj;
}
