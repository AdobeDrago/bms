export default function decorate(block) {
  const FALLBACK_IMAGE = '/drafts/images/FIFA_bms_hero_desktop.jpg';

  const rows = block.querySelectorAll(':scope > div');
  if (!rows.length) return;

  const firstRow = rows[0];
  const cells = firstRow.querySelectorAll(':scope > div');

  // Cell 0: image cell, Cell 1: text cell
  const imageCell = cells[0];
  const textCell = cells[1];

  // Determine background image
  let bgImage = FALLBACK_IMAGE;
  const img = imageCell ? imageCell.querySelector('img') : null;
  if (img && img.src) {
    bgImage = img.src;
  }

  // Restructure: clear block content and rebuild
  block.innerHTML = '';

  // Create background container
  const bgContainer = document.createElement('div');
  bgContainer.className = 'hero-campaign-background';
  bgContainer.style.backgroundImage = `url('${bgImage}')`;

  // Create overlay
  const overlay = document.createElement('div');
  overlay.className = 'hero-campaign-overlay';

  // Create text container
  const textContainer = document.createElement('div');
  textContainer.className = 'hero-campaign-text';
  if (textCell) {
    textContainer.innerHTML = textCell.innerHTML;
  }

  overlay.appendChild(textContainer);
  bgContainer.appendChild(overlay);
  block.appendChild(bgContainer);
}
