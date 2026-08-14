export function formatDate(value: string) {
  if (!value) return "";
  const [year, month] = value.split("-");
  const date = new Date(Number(year), Number(month) - 1);
  return date.toLocaleDateString("fr-FR", { month: "short", year: "numeric" });
}
