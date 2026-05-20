export default async function decorate(block) {
  const rows = [...block.children];

  // For carousel functionality with multiple slides
  if (rows.length > 1) {
    let currentSlide = 0;

    rows.forEach((row, i) => {
      row.classList.add('hero-carousel-slide');
      if (i !== 0) row.style.display = 'none';
    });

    function showSlide(index) {
      rows.forEach((row, i) => {
        row.style.display = i === index ? '' : 'none';
      });
      currentSlide = index;
    }

    // Auto-advance every 5 seconds
    setInterval(() => {
      showSlide((currentSlide + 1) % rows.length);
    }, 5000);
  }

  // Make the entire slide clickable if there's a link
  rows.forEach((row) => {
    const cells = [...row.children];
    const textCell = cells[cells.length - 1];
    const link = textCell.querySelector('a');

    if (link) {
      row.style.cursor = 'pointer';
      row.addEventListener('click', (e) => {
        if (e.target.tagName !== 'A') {
          link.click();
        }
      });
    }
  });
}
