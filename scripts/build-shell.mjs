// Dopo `next build`: estrae da out/index.html il "guscio" del sito (CSS,
// font, favicon, header, footer) in out/inc/shell-*.html. Le pagine PHP
// (Eventi/Blog e pannello) li includono, così hanno esattamente lo stesso
// aspetto e lo stesso menu del resto del sito, qualunque sia il nome hash
// del CSS generato da Next a ogni build.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";

const out = new URL("../out/", import.meta.url);
const html = readFileSync(new URL("index.html", out), "utf8");

const head = html.slice(html.indexOf("<head>"), html.indexOf("</head>"));
const pick = (re) => [...head.matchAll(re)].map((m) => m[0]);

const parts = [
  ...pick(/<meta name="viewport"[^>]*>/g),
  ...pick(/<link rel="stylesheet"[^>]*>/g),
  ...pick(/<link rel="icon"[^>]*>/g),
  ...pick(/<style>[\s\S]*?<\/style>/g), // @font-face con basePath già applicato
];
if (!parts.some((p) => p.includes("stylesheet")) || !parts.some((p) => p.includes("@font-face"))) {
  throw new Error("build-shell: CSS o font non trovati in out/index.html");
}

const cut = (tag) => {
  const a = html.indexOf(`<${tag}`);
  const b = html.indexOf(`</${tag}>`) + tag.length + 3;
  if (a < 0 || b < a) throw new Error(`build-shell: <${tag}> non trovato`);
  return html.slice(a, b);
};

if (!existsSync(new URL("inc/", out))) mkdirSync(new URL("inc/", out), { recursive: true });
writeFileSync(new URL("inc/shell-head.html", out), parts.join("\n"));
writeFileSync(new URL("inc/shell-header.html", out), cut("header"));
writeFileSync(new URL("inc/shell-footer.html", out), cut("footer"));
console.log("build-shell: guscio PHP generato in out/inc/");
