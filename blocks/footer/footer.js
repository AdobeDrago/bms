import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * Builds a fallback footer DOM matching the bms.com structure when the authored
 * /footer fragment is empty. Authoring this fragment in DA will override this.
 */
function buildFallbackFooter() {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = `
    <div class="footer-columns">
      <div class="footer-col">
        <h4>Sitemap</h4>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about-us">About us</a></li>
          <li><a href="/our-medicines">Our medicines</a></li>
          <li><a href="/our-science">Our science</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Resources</h4>
        <ul>
          <li><a href="/medical-information">Medical information</a></li>
          <li><a href="/clinical-trials">Clinical trials</a></li>
          <li><a href="/patient-assistance">Patient assistance</a></li>
          <li><a href="/legal-notice">Legal notice</a></li>
          <li><a href="/privacy-policy">Privacy policy</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Quick links</h4>
        <ul>
          <li><a href="/careers">Careers</a></li>
          <li><a href="/our-stories">Our stories</a></li>
          <li><a href="/contact-us">Contact us</a></li>
          <li><a href="/locations">Locations</a></li>
          <li><a href="/investors">Investors</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Connect</h4>
        <ul class="footer-social">
          <li><a href="https://www.facebook.com/bristolmyerssquibb" aria-label="Facebook">Facebook</a></li>
          <li><a href="https://www.linkedin.com/company/bristol-myers-squibb" aria-label="LinkedIn">LinkedIn</a></li>
          <li><a href="https://x.com/bmsnews" aria-label="X">X</a></li>
          <li><a href="https://www.youtube.com/user/BMSnewsroom" aria-label="YouTube">YouTube</a></li>
          <li><a href="https://www.instagram.com/bristolmyerssquibb" aria-label="Instagram">Instagram</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-legal">
      <p>&copy; 2026 Bristol-Myers Squibb Company. All Rights Reserved.</p>
    </div>
  `;
  return wrapper;
}

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  let fragment = await loadFragment(footerPath);

  // If the authored footer fragment is empty (or only blank wrappers),
  // fall back to a default structure so the footer still renders.
  if (!fragment || !fragment.textContent.trim()) {
    fragment = buildFallbackFooter();
  }

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  block.append(footer);
}
