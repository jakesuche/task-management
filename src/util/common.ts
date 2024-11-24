export function cn(...classes: (string | undefined | null | boolean)[]) {
  return classes.filter(Boolean).join(' ')
}

export const generateRandomId = () => {
  return Math.floor(1000 + Math.random() * 900)
}
