// Map of card link slugs/keywords to local images in /drafts/images/
const CARD_IMAGE_MAP = [
  { match: 'financial-results|quarterly|earnings', src: '/drafts/images/q4-earnings-vile-purple.jpg', alt: '2026 first quarter financial results' },
  { match: 'book|beta-thalassemia', src: '/drafts/images/Book_Hero_1920x1080.jpg', alt: "Book's story" },
  { match: 'champions-in-care', src: '/drafts/images/BMS2545_CIC_WOG_30_WEB_1395x786.jpg', alt: 'Champions in care' },
  { match: 'pulmonary-fibrosis|jean-michel', src: '/drafts/images/jm-hero-mobile.jpg', alt: 'Living with idiopathic pulmonary fibrosis' },
  { match: 'devens|biopharmaceutical-manufacturing', src: '/drafts/images/devens-article-mobile.jpg', alt: 'Inside Devens' },
  { match: 'scientific-media', src: null, alt: 'Scientific media resources' }, // text card, no image
  { match: 'annual-report', src: '/drafts/images/annual-report-vertical.jpg', alt: '2025 Annual Report' },
];

function getImageForCard(href, title) {
  const combined = (href + ' ' + title).toLowerCase();
  for (const entry of CARD_IMAGE_MAP) {
    if (new RegExp(entry.match).test(combined)) {
      return { src: entry.src, alt: entry.alt };
    }
  }
  return null;
}

export default function decorate(block) {
  const rows = [...block.children];

  rows.forEach((row) => {
    row.classList.add('cards-featured-card');

    const cells = [...row.children];
    const imageCell = cells[0];
    const contentCell = cells[1];

    // Find link and title for image lookup
    const link = contentCell ? contentCell.querySelector('a') : null;
    const h3 = contentCell ? contentCell.querySelector('h3') : null;
    const href = link ? link.href : '';
    const title = h3 ? h3.textContent : '';

    // Determine image source
    let imgEl = imageCell ? imageCell.querySelector('img') : null;
    if (!imgEl) {
      // Try to find a matching image from our map
      const mapped = getImageForCard(href, title);
      if (mapped && mapped.src) {
        imgEl = document.createElement('img');
        imgEl.src = mapped.src;
        imgEl.alt = mapped.alt;
      }
    }

    // Remove original cells, rebuild as card
    row.innerHTML = '';

    if (imgEl) {
      imgEl.classList.add('cards-featured-card-image');
      row.appendChild(imgEl);
    } else {
      const placeholder = document.createElement('div');
      placeholder.classList.add('cards-featured-card-placeholder');
      // If it's the scientific media card, give it a colored background
      if (title.toLowerCase().includes('scientific')) {
        placeholder.classList.add('cards-featured-card-accent');
      }
      row.appendChild(placeholder);
    }

    // Build content overlay
    const overlay = document.createElement('div');
    overlay.classList.add('cards-featured-card-content');
    if (h3) overlay.appendChild(h3.cloneNode(true));

    // For accent tile, also add description text
    if (title.toLowerCase().includes('scientific')) {
      const desc = document.createElement('p');
      desc.className = 'cards-featured-card-description';
      desc.textContent = 'Our scientists are chasing the next generation of treatment options for patients. Explore the ways we\u2019re accelerating the development of new medicines with differentiated research platforms and a multitude of treatment modalities.';
      overlay.appendChild(desc);
    }

    row.appendChild(overlay);

    // Make entire card clickable
    if (link) {
      const cardLink = document.createElement('a');
      cardLink.href = link.href;
      cardLink.classList.add('cards-featured-card-link');
      cardLink.setAttribute('aria-label', title);
      while (row.firstChild) cardLink.appendChild(row.firstChild);
      row.appendChild(cardLink);
    }
  });
}
