export default function decorate(block) {
  const FALLBACK_IMAGE = '/drafts/images/FIFA_bms_hero_desktop.jpg';

  const rows = block.querySelectorAll(':scope > div');
  if (!rows.length) return;

  const firstRow = rows[0];
  const cells = firstRow.querySelectorAll(':scope > div');

  const imageCell = cells[0];
  const textCell = cells[1];

  // Determine image source
  let imgSrc = FALLBACK_IMAGE;
  let imgAlt = 'We Won\'t Lose — Bristol Myers Squibb';
  const sourceImg = imageCell ? imageCell.querySelector('img') : null;
  if (sourceImg && sourceImg.src) {
    imgSrc = sourceImg.src;
    imgAlt = sourceImg.alt || imgAlt;
  }

  // Build HTML structure
  block.innerHTML = '';

  const bgContainer = document.createElement('div');
  bgContainer.className = 'hero-campaign-background';

  // Hero image: positioned absolutely on the right
  const heroImg = document.createElement('img');
  heroImg.className = 'hero-campaign-img';
  heroImg.src = imgSrc;
  heroImg.alt = imgAlt;
  heroImg.loading = 'eager';
  heroImg.fetchpriority = 'high';
  bgContainer.appendChild(heroImg);

  // Text overlay
  const overlay = document.createElement('div');
  overlay.className = 'hero-campaign-overlay';

  const textContainer = document.createElement('div');
  textContainer.className = 'hero-campaign-text';

  if (textCell) {
    const rawH = textCell.querySelector('h1, h2, h3');
    if (rawH) {
      const fullText = rawH.textContent || '';
      // BMS pattern: "We Won't Lose" is the short headline; rest is body
      const splitPattern = /^(We Won['\u2019]t Lose)\s*(.*)/si;
      const match = fullText.match(splitPattern);
      if (match) {
        const headline = document.createElement('h2');
        headline.textContent = match[1];
        const body = document.createElement('p');
        body.textContent = match[2].trim();
        textContainer.appendChild(headline);
        textContainer.appendChild(body);
      } else {
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
