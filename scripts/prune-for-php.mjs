// Build per Aruba: Eventi e Blog sono pagine PHP, quindi si tolgono le
// versioni statiche generate da Next (altrimenti index.html della cartella
// potrebbe avere la precedenza sulla regola di .htaccess).
import { rmSync } from "node:fs";
for (const d of ["blog", "eventi"]) {
  rmSync(new URL(`../out/${d}/`, import.meta.url), { recursive: true, force: true });
}
console.log("prune-for-php: rimosse out/blog e out/eventi statiche");
