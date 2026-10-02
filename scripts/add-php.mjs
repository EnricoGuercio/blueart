// Solo per `build:aruba`: aggiunge a out/ le pagine PHP (Eventi/Blog) e il
// pannello di redazione, che stanno in php-app/ e NON in public/ proprio per
// non finire mai nell'output della demo statica (GitHub Pages li servirebbe
// come testo leggibile da chiunque). I contenuti iniziali (content/*.json,
// la stessa fonte che legge la demo) diventano out/seed/.
import { cpSync, copyFileSync, mkdirSync } from "node:fs";

const out = new URL("../out/", import.meta.url);
cpSync(new URL("../php-app/", import.meta.url), out, { recursive: true });
mkdirSync(new URL("seed/", out), { recursive: true });
for (const f of ["events.json", "blog.json"]) {
  copyFileSync(new URL(`../content/${f}`, import.meta.url), new URL(`seed/${f}`, out));
}
console.log("add-php: pagine PHP, pannello e contenuti iniziali copiati in out/");
