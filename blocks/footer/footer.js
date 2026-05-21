import { getMetadata, decorateIcons } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

const BMS_FOOTER_FALLBACK = `<div>
  <div class="footer-nav">
    <div>
      <div>
        <h2>Main navigation</h2>
        <ul>
          <li><a href="/site-map.html">Sitemap</a></li>
          <li><a href="/">Home</a></li>
          <li><a href="/patient-and-caregivers.html">Patients &amp; caregivers</a></li>
          <li><a href="/healthcare-providers.html">Healthcare providers</a></li>
          <li><a href="/researchers-and-partners.html">Researchers</a></li>
          <li><a href="/investors.html">Investors</a></li>
          <li><a href="/media.html">News &amp; media</a></li>
          <li><a href="/about-us.html">About us</a></li>
        </ul>
      </div>
      <div>
        <h2>Resources</h2>
        <ul>
          <li><a href="/patient-and-caregivers/our-medicines.html">Our medicines</a></li>
          <li><a href="/legal-notice.html">Legal notice</a></li>
          <li><a href="/privacy-policy.html">Privacy notice center</a></li>
          <li><a href="/trademarks.html">Trademarks</a></li>
          <li><a href="/forward-looking-statement.html">Forward-looking statement</a></li>
        </ul>
      </div>
    </div>
  </div>
</div>
<div>
  <div class="footer-social">
    <div>
      <div>
        <h2>Follow us</h2>
        <p>
          <a href="http://www.facebook.com/BristolMyersSquibb" aria-label="Facebook"><span class="icon icon-facebook"></span></a>
          <a href="https://www.instagram.com/bristolmyerssquibb" aria-label="Instagram"><span class="icon icon-instagram"></span></a>
          <a href="http://twitter.com/BMSNEWS" aria-label="X"><span class="icon icon-twitter"></span></a>
          <a href="http://www.linkedin.com/company/bristol-myers-squibb" aria-label="LinkedIn"><span class="icon icon-linkedin"></span></a>
          <a href="http://www.youtube.com/bristolmyerssquibb" aria-label="YouTube"><span class="icon icon-youtube"></span></a>
        </p>
      </div>
      <div>
        <ul>
          <li><a href="https://careers.bms.com/">Careers</a></li>
          <li><a href="/life-and-science.html">Our stories</a></li>
          <li><a href="/about-us/contact-us.html">Contact us</a></li>
          <li><a href="/about-us/our-company/worldwide-facilities.html">Worldwide locations</a></li>
        </ul>
      </div>
    </div>
  </div>
</div>
<div>
  <div class="footer-legal">
    <div>
      <div><p>&copy; 2026 Bristol-Myers Squibb Company</p></div>
    </div>
  </div>
</div>`;

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');

  // If fragment is empty (content source not yet set up), use fallback footer
  const isEmpty = !fragment.firstElementChild
    || (fragment.children.length === 1 && !fragment.firstElementChild.textContent.trim()
        && !fragment.firstElementChild.querySelector('a, img'));
  if (isEmpty) {
    const tmp = document.createElement('div');
    tmp.innerHTML = BMS_FOOTER_FALLBACK;
    while (tmp.firstElementChild) footer.append(tmp.firstElementChild);
  } else {
    while (fragment.firstElementChild) footer.append(fragment.firstElementChild);
  }

  block.append(footer);
  // Decorate icon spans injected by fallback HTML
  decorateIcons(block);
}
