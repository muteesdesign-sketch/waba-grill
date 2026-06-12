// Prefixes a public asset path with the configured base path.
// next/image and next/link apply the base path automatically, but raw
// elements like <video>/<source> need it applied manually.
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const asset = (path: string) => `${basePath}${path}`;
