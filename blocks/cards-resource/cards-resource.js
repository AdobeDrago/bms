// Section headings for each cards-resource instance (by order of appearance)
const SECTION_HEADINGS = [
  'Defining what\u2019s possible',
  'Looking for answers?',
];

export default function decorate(block) {
  // Determine which instance this is (0 = Defining, 1 = Looking)
  const allInstances = document.querySelectorAll('.cards-resource');
  const instanceIndex = Array.from(allInstances).indexOf(block);
  const isCta = instanceIndex === 0;

  const rows = [...block.children];
  block.innerHTML = '';

  // Inject section heading above the block content
  const headingWrapper = document.createElement('div');
  headingWrapper.className = 'cards-resource-heading';

  const h2 = document.createElement('h2');
  h2.textContent = SECTION_HEADINGS[instanceIndex] || '';
  headingWrapper.appendChild(h2);

  const hr = document.createElement('hr');
  headingWrapper.appendChild(hr);
  block.appendChild(headingWrapper);

  // Build grid
  const grid = document.createElement('div');
  grid.className = `cards-resource-grid cards-resource-grid--${isCta ? 'cta' : 'links'}`;

  rows.forEach((row) => {
    const card = document.createElement('div');
    card.className = 'cards-resource-card';

    const cells = [...row.children];

    // Title (first cell — may contain h3 or plain text)
    if (cells[0]) {
      const titleDiv = document.createElement('div');
      titleDiv.className = 'cards-resource-title';
      // Ensure content is wrapped in h3 if it isn't already
      if (!cells[0].querySelector('h3')) {
        const h3 = document.createElement('h3');
        h3.innerHTML = cells[0].innerHTML.trim();
        titleDiv.appendChild(h3);
      } else {
        titleDiv.innerHTML = cells[0].innerHTML;
      }
      card.appendChild(titleDiv);
    }

    // Description (second cell)
    if (cells[1]) {
      const descDiv = document.createElement('div');
      descDiv.className = 'cards-resource-description';
      descDiv.innerHTML = cells[1].innerHTML;
      card.appendChild(descDiv);
    }

    // Remaining cells = link rows
    for (let i = 2; i < cells.length; i += 1) {
      const linkDiv = document.createElement('div');
      linkDiv.className = 'cards-resource-link';
      linkDiv.innerHTML = cells[i].innerHTML;
      card.appendChild(linkDiv);
    }

    grid.appendChild(card);
  });

  block.appendChild(grid);
}
