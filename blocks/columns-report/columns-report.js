export default function decorate(block) {
  const row = block.querySelector(':scope > div');
  if (!row) return;

  const cells = row.querySelectorAll(':scope > div');
  const leftCell = cells[0];
  const rightCell = cells[1];

  // Check if left cell is empty → inject fallback image
  if (leftCell && !leftCell.textContent.trim() && !leftCell.querySelector('img, picture')) {
    leftCell.innerHTML = `<picture><img src="https://www.bms.com/assets/bms/us/en-us/www/home/ESG_2025_cover_mobile.jpg" alt="2025 Impact Report"></picture>`;
  }

  // Check if right cell is empty → inject fallback ESG content
  if (rightCell && !rightCell.textContent.trim() && !rightCell.querySelector('img, picture, a')) {
    rightCell.innerHTML = `
      <div class="columns-report-content">
        <p class="columns-report-year">2025</p>
        <p class="columns-report-title">Impact Report</p>
        <p class="columns-report-subtitle">Building a Better Future</p>
        <p class="columns-report-cta"><a href="https://esg.bms.com" title="View our report">View our report</a></p>
      </div>
    `;
  }
}
