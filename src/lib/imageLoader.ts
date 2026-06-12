// Custom next/image loader for static export under a base path.
// next/image does not prepend basePath to image srcs, so we do it here.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function imageLoader({ src }: { src: string; width: number }) {
  // External URLs are returned untouched; local public assets get the basePath.
  if (/^https?:\/\//.test(src)) return src;
  return `${basePath}${src}`;
}
