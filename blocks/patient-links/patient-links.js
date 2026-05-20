export default async function decorate(block) {
  // Block has two rows:
  // Row 1: heading
  // Row 2: three cells (columns) with title, description, and links
  const rows = [...block.children];
  if (rows.length < 2) return;

  // The heading row is fine as-is
  // The columns row needs no restructuring since EDS preserves inner cells
}
