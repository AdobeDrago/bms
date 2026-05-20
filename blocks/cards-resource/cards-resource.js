// Section headings for each cards-resource instance (by order of appearance)
const SECTION_HEADINGS = [
  'Defining what\u2019s possible',
  'Looking for answers?',
];

export default function decorate(block) {
  // Determine which instance this is (0 = first, 1 = second)
  const allInstances = document.querySelectorAll('.cards-resource');
  const instanceIndex = Array.from(allInstances).indexOf(block);

  const rows = [...block.children];
  block.innerHTML = '';

  // Inject section heading above the block content
  const heading = document.createElement('div');
  heading.className = 'cards-resource-heading';
  const h2 = document.createElement('h2');
  h2.textContent = SECTION_HEADINGS[instanceIndex] || '';
  heading.append(h2);
  const hr = document.createElement('hr');
  heading.append(hr);
  block.append(heading);

  const grid = document.createElement('div');
  grid.className = `cards-resource-grid cards-resource-grid--${instanceIndex === 0 ? 'cta' : 'links'}`;

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
