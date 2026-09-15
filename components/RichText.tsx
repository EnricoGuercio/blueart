export default function RichText({ body }: { body: string }) {
  const blocks = body.split("\n\n").map((b) => b.trim()).filter(Boolean);
  return (
    <div className="space-y-5 leading-relaxed text-[var(--color-fg-muted)]">
      {blocks.map((block, i) => {
        if (block.startsWith("### ")) {
          return (
            <h3 key={i} className="pt-2 text-xl font-semibold text-[var(--color-fg)]">
              {block.slice(4)}
            </h3>
          );
        }
        return <p key={i}>{block}</p>;
      })}
    </div>
  );
}
