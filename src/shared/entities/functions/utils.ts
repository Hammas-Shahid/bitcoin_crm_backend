import { Raw } from 'typeorm';

export const removeSpecialCharsFromString = (value: string) => {
  if (!value) return;
  return value.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
};

export const rawQuerySearchInRemovedSpecCharsString = (value: string) => {
  value = value.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  return Raw(
    (alias) =>
      `LOWER(REGEXP_REPLACE(${alias}, '[^a-zA-Z0-9]', '', 'g')) ILIKE :searchTerm`,
    {
      searchTerm: `${value}`,
    },
  );
};
