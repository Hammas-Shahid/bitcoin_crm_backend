import { Raw } from 'typeorm';

export const removeSpecialCharsFromString = (value: string) => {
  if (!value) return;
  return value.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
};

export const rawQuerySearchInRemovedSpecCharsString = (value: string) => {
  return Raw(
    (alias) =>
      `LOWER(REGEXP_REPLACE(${alias}, '[^a-zA-Z0-9]', '', 'g')) ILIKE :searchTerm`,
    {
      searchTerm: `${value}`,
    },
  );
};

export const rawQuerySearchInRemovedSpacesFromString = (value: string) => {
  value = value.replace(/\s/g, '').toLowerCase();
  return Raw(
    (alias) =>
      `LOWER(REGEXP_REPLACE(${alias}, ' ', '', 'g')) ILIKE :searchTerm`,
    {
      searchTerm: `${value}`,
    },
  );
};

export function convertEmptyStringsToNull<T extends object>(obj: T): T {
  const result: any = { ...obj };
  for (const key in result) {
    if (result.hasOwnProperty(key) && result[key] === '') {
      result[key] = null;
    }
  }
  return result;
}
