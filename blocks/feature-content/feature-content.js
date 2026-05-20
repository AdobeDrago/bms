export default async function decorate(block) {
  const rows = [...block.children];

  // Create a grid container
  const grid = document.createElement('div');
  grid.className = 'fc-grid';

  // Row 1: Image card (has picture + link)
  if (rows[0]) {
    const cells = [...rows[0].children];
    const card = document.createElement('div');
    card.className = 'fc-card fc-card-image';

    // Get the picture element
    const picture = rows[0].querySelector('picture');
    const link = rows[0].querySelector('a');

    if (picture && link) {
      const anchor = document.createElement('a');
      anchor.href = link.href;
      anchor.title = link.title || '';
      anchor.style.display = 'block';
      anchor.style.width = '100%';
      anchor.style.height = '100%';
      anchor.append(picture);
      card.append(anchor);
    } else if (picture) {
      card.append(picture);
    }

    grid.append(card);
  }

  // Row 2: Text card (has headings + CTA)
  if (rows[1]) {
    const card = document.createElement('div');
    card.className = 'fc-card fc-card-text';

    const cells = [...rows[1].children];
    const contentCell = cells[0];

    if (contentCell) {
      // Move all content from the cell into the card
      [...contentCell.children].forEach((child) => {
        // Style CTA links
        const link = child.querySelector('a');
        if (link && child.tagName === 'P') {
          link.className = 'fc-cta';
          card.append(link);
        } else {
          card.append(child);
        }
      });
    }

    grid.append(card);
  }

  // Clear original content and replace with grid
  block.textContent = '';
  block.append(grid);
}
