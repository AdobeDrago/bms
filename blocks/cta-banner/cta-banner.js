export default async function decorate(block) {
  const rows = [...block.children];
  // First row is the heading row, remaining rows are cards
  const headingRow = rows[0];
  const cardRows = rows.slice(1);

  // Create a cards container for the grid layout
  const cardsContainer = document.createElement('div');
  cardsContainer.classList.add('cta-banner-cards');

  cardRows.forEach((row) => {
    const card = document.createElement('div');
    card.classList.add('cta-banner-card');
    const cells = [...row.children];
    // cell 0 = image, cell 1 = text content
    cells.forEach((cell) => {
      card.append(cell);
    });
    cardsContainer.append(card);
    row.remove();
  });

  block.append(cardsContainer);
}
