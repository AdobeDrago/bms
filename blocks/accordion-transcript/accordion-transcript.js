/*
 * Accordion Block
 * Recreate an accordion
 * https://www.hlx.live/developer/block-collection/accordion
 */

export default function decorate(block) {
  [...block.children].forEach((row) => {
    // decorate accordion-transcript item label
    const label = row.children[0];
    const summary = document.createElement('summary');
    summary.className = 'accordion-transcript-item-label';
    summary.append(...label.childNodes);
    // decorate accordion-transcript item body
    const body = row.children[1];
    body.className = 'accordion-transcript-item-body';
    // decorate accordion-transcript item
    const details = document.createElement('details');
    details.className = 'accordion-transcript-item';
    details.append(summary, body);
    row.replaceWith(details);
  });
}
