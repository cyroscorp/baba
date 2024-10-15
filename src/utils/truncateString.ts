export function truncateString(text: string, maxCharacter: number): string {
  const regex = new RegExp(`(.{${maxCharacter}}).+`);
  return text.replace(regex, '$1…');
}
