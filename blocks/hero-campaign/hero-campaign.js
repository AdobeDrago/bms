export default function decorate(block) {
  const FALLBACK_IMAGE = '/drafts/images/FIFA_bms_hero_desktop.jpg';

  const rows = block.querySelectorAll(':scope > div');
  if (!rows.length) return;

  const firstRow = rows[0];
  const cells = firstRow.querySelectorAll(':scope > div');

  const imageCell = cells[0];
  const textCell = cells[1];

  // Determine background image
  let bgImage = FALLBACK_IMAGE;
  const img = imageCell ? imageCell.querySelector('img') : null;
  if (img && img.src) bgImage = img.src;

  // Build final HTML structure
  block.innerHTML = '';

  const bgContainer = document.createElement('div');
  bgContainer.className = 'hero-campaign-background';
  bgContainer.style.backgroundImage = `url('${bgImage}')`;

  const overlay = document.createElement('div');
  overlay.className = 'hero-campaign-overlay';

  const textContainer = document.createElement('div');
  textContainer.className = 'hero-campaign-text';

  if (textCell) {
    // Try to split combined h2 text into headline + body
    // Document merges "We Won't Lose" + body text into one h2
    // Split at the second sentence boundary
    const rawH = textCell.querySelector('h1, h2, h3');
    if (rawH) {
      const fullText = rawH.textContent || '';
      // BMS pattern: "We Won't Lose" is the short headline; rest is body
      const splitPattern = /^(We Won['']t Lose)\s*(.*)/si;
      const match = fullText.match(splitPattern);
      if (match) {
        const headline = document.createElement('h2');
        headline.textContent = match[1];
        const body = document.createElement('p');
        body.textContent = match[2].trim();
        textContainer.appendChild(headline);
        textContainer.appendChild(body);
      } else {
        // No known split pattern — use as-is
        textContainer.innerHTML = textCell.innerHTML;
      }
    } else {
      textContainer.innerHTML = textCell.innerHTML;
    }
  }

  overlay.appendChild(textContainer);
  bgContainer.appendChild(overlay);
  block.appendChild(bgContainer);
}
