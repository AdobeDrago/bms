export default function decorate(block) {
  const row = block.querySelector(':scope > div');
  if (!row) return;

  const cells = row.querySelectorAll(':scope > div');
  const leftCell = cells[0];
  const rightCell = cells[1];

  // Inject fallback cover image if left cell is empty
  if (leftCell && !leftCell.querySelector('img, picture')) {
    leftCell.innerHTML = `<picture>
      <img src="/drafts/images/ESG_2025_cover_mobile.jpg" alt="2025 Impact Report" loading="eager">
    </picture>`;
  }

  // Inject fallback ESG content if right cell is empty
  if (rightCell && !rightCell.textContent.trim()) {
    rightCell.innerHTML = `
      <div class="columns-report-content">
        <p class="columns-report-year">2025</p>
        <p class="columns-report-title">Impact Report</p>
        <p class="columns-report-subtitle">Building a Better Future</p>
        <p class="columns-report-cta"><a href="https://esg.bms.com" title="View our report">View our report</a></p>
      </div>
    `;
  } else {
    // If right cell has content, wrap it in columns-report-content if not already
    if (!rightCell.querySelector('.columns-report-content')) {
      const wrapper = document.createElement('div');
      wrapper.className = 'columns-report-content';
      while (rightCell.firstChild) wrapper.appendChild(rightCell.firstChild);
      rightCell.appendChild(wrapper);
    }
  }

  // Flatten grid: move left and right cells directly onto block element
  // This allows CSS `display: grid; grid-template-columns: 1fr 1fr` on .columns-report
  block.innerHTML = '';
  block.appendChild(leftCell);
  block.appendChild(rightCell);
}
