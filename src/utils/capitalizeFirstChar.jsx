export function capitalizeFirstChar(name) {
  if (!name) return 'Unknown';
  return name.charAt(0).toUpperCase() + name.slice(1);
}
