export default async function decorate(block) {
  const rows = [...block.children];
  if (rows.length < 2) return;

  // First row is the heading
  const headingRow = rows[0];
  headingRow.classList.add('news-cards-heading');

  // Remaining rows are cards
  const cardRows = rows.slice(1);

  // Split into featured (first 3) and secondary (rest)
  const featured = cardRows.slice(0, 3);
  const secondary = cardRows.slice(3);

  // Create featured grid container
  const featuredGrid = document.createElement('div');
  featuredGrid.classList.add('news-cards-featured');
  featured.forEach((card) => {
    card.classList.add('news-cards-card');
    featuredGrid.appendChild(card);
  });

  // Create secondary grid container
  const secondaryGrid = document.createElement('div');
  secondaryGrid.classList.add('news-cards-secondary');
  secondary.forEach((card) => {
    card.classList.add('news-cards-card');
    secondaryGrid.appendChild(card);
  });

  // Reconstruct block
  block.innerHTML = '';
  block.appendChild(headingRow);
  block.appendChild(featuredGrid);
  if (secondary.length > 0) {
    block.appendChild(secondaryGrid);
  }

  // Make entire card clickable
  block.querySelectorAll('.news-cards-card').forEach((card) => {
    const link = card.querySelector('a');
    if (link) {
      card.style.cursor = 'pointer';
      card.addEventListener('click', (e) => {
        if (e.target.tagName !== 'A') {
          link.click();
        }
      });
    }
  });
}
