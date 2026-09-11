/**
 * Raccourcit un texte sur une limite de mot, sans jamais dépasser `maxLength`
 * caractères (points de suspension compris). Pensé pour les `<meta name="description">`,
 * que les moteurs tronquent autour de 160 caractères.
 */
export function truncateAtWord(text: string, maxLength = 160): string {
  if (text.length <= maxLength) return text;

  const slice = text.slice(0, maxLength - 1);
  const lastSpace = slice.lastIndexOf(" ");
  const cut = lastSpace > 0 ? slice.slice(0, lastSpace) : slice;

  return `${cut.replace(/[\s,;:.!?…]+$/, "")}…`;
}
