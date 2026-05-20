export default function decorate(block) {
  const rows = [...block.children];

  rows.forEach((row) => {
    row.classList.add('cards-featured-card');

    const cells = [...row.children];
    const imageCell = cells[0];
    const contentCell = cells[1];

    // Handle image or placeholder
    const pic = imageCell.querySelector('picture');
    const img = imageCell.querySelector('img');

    if (pic && img) {
      img.classList.add('cards-featured-card-image');
      row.prepend(img);
      imageCell.remove();
    } else {
      // No image — create placeholder
      const placeholder = document.createElement('div');
      placeholder.classList.add('cards-featured-card-placeholder');
      row.prepend(placeholder);
      imageCell.remove();
    }

    // Build overlay content
    if (contentCell) {
      contentCell.classList.add('cards-featured-card-content');

      // Find the link to make entire card clickable
      const link = contentCell.querySelector('a');
      if (link) {
        const cardLink = document.createElement('a');
        cardLink.href = link.href;
        cardLink.classList.add('cards-featured-card-link');
        cardLink.setAttribute('aria-label', link.textContent || '');

        // Wrap entire row content in the link
        while (row.firstChild) {
          cardLink.appendChild(row.firstChild);
        }
        row.appendChild(cardLink);

        // Remove the original paragraph with the link
        const linkParagraph = contentCell.querySelector('p');
        if (linkParagraph) linkParagraph.remove();
      }
    }
  });
}
