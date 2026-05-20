export default function decorate(block) {
  const rows = [...block.children];
  block.innerHTML = '';

  const grid = document.createElement('div');
  grid.className = 'cards-resource-grid';

  rows.forEach((row) => {
    const card = document.createElement('div');
    card.className = 'cards-resource-card';

    const cells = [...row.children];

    // First div = title (h3)
    if (cells[0]) {
      const titleDiv = document.createElement('div');
      titleDiv.className = 'cards-resource-title';
      titleDiv.innerHTML = cells[0].innerHTML;
      card.append(titleDiv);
    }

    // Second div = description
    if (cells[1]) {
      const descDiv = document.createElement('div');
      descDiv.className = 'cards-resource-description';
      descDiv.innerHTML = cells[1].innerHTML;
      card.append(descDiv);
    }

    // Remaining divs = links
    for (let i = 2; i < cells.length; i += 1) {
      const linkDiv = document.createElement('div');
      linkDiv.className = 'cards-resource-link';
      linkDiv.innerHTML = cells[i].innerHTML;
      card.append(linkDiv);
    }

    grid.append(card);
  });

  block.append(grid);
}
