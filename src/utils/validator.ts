const notEmptyValidator = (value: string) => {
  return value.trim() !== "";
};

const extractHost = (input: string): string => {
  const trimmed = input.trim();
  const withoutScheme = trimmed.replace(/^[a-zA-Z][a-zA-Z0-9+\-.]*:\/\//, "");
  return withoutScheme.split("/")[0];
};

const isValidIRI = (input: string): boolean => {
  const host = extractHost(input);

  // Domainstruktur: mindestens ein Punkt, beliebige Subdomains
  const domainRegex = /^[a-z0-9-]+(\.[a-z0-9-]+)+$/i;
  if (!domainRegex.test(host)) return false;

  // TLD muss ≥ 2 Zeichen sein
  const parts = host.split(".");
  if (parts[parts.length - 1].length < 2) return false;

  // https:// ergänzen, wenn kein Schema
  const withScheme = input.match(/^[a-zA-Z][a-zA-Z0-9+\-.]*:/)
    ? input
    : "https://" + input;

  try {
    const parsed = new URL(withScheme);
    return ["http:", "https:"].includes(parsed.protocol);
  } catch {
    return false;
  }
};

const ensureValidIRI = (input: string): string | null => {
  if (!isValidIRI(input)) return null;

  const withScheme = input.match(/^[a-zA-Z][a-zA-Z0-9+\-.]*:/)
    ? input.trim()
    : "https://" + input.trim();

  try {
    return new URL(withScheme).href;
  } catch {
    return null;  }
};

export { ensureValidIRI, isValidIRI, notEmptyValidator };
