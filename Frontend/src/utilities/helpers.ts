export const formatDate = (date: string) => {
  const dateFromString = new Date(date);
  return new Intl.DateTimeFormat('sv-SE').format(dateFromString);
};

export const formatTime = (time?: string): string => time ?? '';
