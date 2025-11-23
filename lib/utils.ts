// lib/utils.ts
export function isValidUrl(str: string) {
  try {
    const url = new URL(str);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export function randomCode(length = 6) {
  let res = "";
  for (let i = 0; i < length; i++) {
    res += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
  }
  return res;
}

export async function genUniqueCode(prisma, tries = 8) {
  for (let i = 0; i < tries; i++) {
    const len = 6 + Math.floor(Math.random() * 3); // 6-8
    const code = randomCode(len);
    const exists = await prisma.link.findUnique({ where: { code } });
    if (!exists) return code;
  }
  throw new Error("Unable to generate unique code");
}
