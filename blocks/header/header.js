import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

const isDesktop = window.matchMedia('(min-width: 900px)');

const BMS_NAV_FALLBACK = `<div>
  <p><a href="/"><img src="/drafts/images/bms-logo.svg" alt="Bristol Myers Squibb" width="200" height="28"></a></p>
</div>
<div>
  <ul>
    <li><a href="/patient-and-caregivers.html">Patients &amp; caregivers</a><ul>
      <li><a href="/patient-and-caregivers/our-medicines.html">Our medicines</a></li>
      <li><a href="/patient-and-caregivers/survivorship-today.html">Survivorship Today</a></li>
      <li><a href="/patient-and-caregivers/patient-resources-by-condition.html">Patient resources</a></li>
      <li><a href="/patient-and-caregivers/get-help-paying-for-your-medicines.html">Get help paying for your medicines</a></li>
    </ul></li>
    <li><a href="/healthcare-providers.html">Healthcare providers</a><ul>
      <li><a href="/healthcare-providers/early-patient-access-to-investigational-medicine.html">Pre-approval access</a></li>
      <li><a href="/healthcare-providers/champions-in-care.html">Champions in Care</a></li>
    </ul></li>
    <li><a href="/researchers-and-partners.html">Researchers</a><ul>
      <li><a href="/researchers-and-partners/areas-of-focus.html">Areas of focus</a></li>
      <li><a href="/researchers-and-partners/in-the-pipeline.html">In the pipeline</a></li>
      <li><a href="/researchers-and-partners/clinical-trials-and-research.html">Clinical trials &amp; research</a></li>
    </ul></li>
    <li><a href="/investors.html">Investors</a><ul>
      <li><a href="/investors/stock-information.html">Stock information</a></li>
      <li><a href="/investors/financial-reporting.html">Financial reporting</a></li>
      <li><a href="/investors/events-and-presentations.html">Events and presentations</a></li>
    </ul></li>
    <li><a href="/business-development.html">Business development</a><ul>
      <li><a href="/business-development/existing-partners.html">Our partnerships</a></li>
      <li><a href="/business-development/why-partner-with-us.html">Why partner with us</a></li>
    </ul></li>
    <li><a href="/media.html">News &amp; media</a><ul>
      <li><a href="/media/press-releases.html">Press releases</a></li>
      <li><a href="/life-and-science.html">Our stories</a></li>
      <li><a href="/media/media-contacts.html">Media contacts</a></li>
    </ul></li>
    <li><a href="/about-us.html">About us</a><ul>
      <li><a href="/about-us/our-company.html">Our company</a></li>
      <li><a href="/about-us/leadership.html">Leadership</a></li>
      <li><a href="/about-us/our-science.html">Our science</a></li>
      <li><a href="/about-us/contact-us.html">Contact us</a></li>
    </ul></li>
  </ul>
</div>
<div>
  <ul>
    <li><a href="/patient-and-caregivers/our-medicines.html">Our medicines</a></li>
    <li><a href="/about-us/our-science.html">Our science</a></li>
    <li><a href="/life-and-science.html">Our stories</a></li>
  </ul>
  <p><a href="/about-us/contact-us.html">Contact us</a></p>
  <p><a href="https://careers.bms.com">Careers</a></p>
</div>`;

function buildDropdowns(navSections) {
  const topItems = navSections.querySelectorAll(':scope > ul > li, :scope .default-content-wrapper > ul > li');
  const allSubMenus = navSections.querySelectorAll(':scope > ul > li > ul, :scope .default-content-wrapper > ul > li > ul');

  // Hide all sub-menus on desktop immediately
  if (isDesktop.matches) {
    allSubMenus.forEach((ul) => { ul.style.display = 'none'; });
  }

  topItems.forEach((item) => {
    const subUl = item.querySelector(':scope > ul');
    if (subUl) {
      item.classList.add('nav-drop');
      item.addEventListener('click', (e) => {
        if (!isDesktop.matches) return;
        e.stopPropagation();
        const expanded = item.getAttribute('aria-expanded') === 'true';
        // Close all
        topItems.forEach((i) => {
          i.setAttribute('aria-expanded', 'false');
          const s = i.querySelector(':scope > ul');
          if (s) s.style.display = 'none';
        });
        if (!expanded) {
          item.setAttribute('aria-expanded', 'true');
          subUl.style.display = 'block';
        }
      });
    }
  });

  // Close on click outside
  document.addEventListener('click', () => {
    topItems.forEach((i) => {
      i.setAttribute('aria-expanded', 'false');
      const s = i.querySelector(':scope > ul');
      if (s) s.style.display = 'none';
    });
  });
}

export default async function decorate(block) {
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta, window.location).pathname : '/nav';
  const fragment = await loadFragment(navPath);

  block.textContent = '';

  // Parse fragment — detect if empty
  const isEmpty = !fragment.firstElementChild
    || (fragment.children.length <= 1
        && !fragment.firstElementChild.textContent.trim()
        && !fragment.firstElementChild.querySelector('a, img'));

  let navChildren;
  if (isEmpty) {
    const tmp = document.createElement('div');
    tmp.innerHTML = BMS_NAV_FALLBACK;
    navChildren = [...tmp.children];
  } else {
    navChildren = [...fragment.children];
  }

  // navChildren[0] = brand (logo)
  // navChildren[1] = main nav sections
  // navChildren[2] = utility (top-left links + right buttons)

  const brandEl = navChildren[0];
  const sectionsEl = navChildren[1];
  const toolsEl = navChildren[2];

  // ── Build Row 1: top utility bar ──
  const topBar = document.createElement('div');
  topBar.className = 'nav-top-bar';

  // Left utility links (Our medicines, Our science, Our stories)
  const topLeft = document.createElement('div');
  topLeft.className = 'nav-top-left';
  if (toolsEl) {
    const leftUl = toolsEl.querySelector('ul');
    if (leftUl) {
      leftUl.querySelectorAll('li a').forEach((a) => {
        const link = document.createElement('a');
        link.href = a.href;
        link.textContent = a.textContent.trim();
        topLeft.append(link);
      });
    }
  }

  // Center: Logo
  const brandDiv = document.createElement('div');
  brandDiv.className = 'nav-brand';
  if (brandEl) {
    const img = brandEl.querySelector('img');
    const logoLink = document.createElement('a');
    logoLink.href = '/';
    if (img) {
      img.width = 200;
      img.height = 28;
      logoLink.append(img.cloneNode(true));
    } else {
      logoLink.textContent = 'Bristol Myers Squibb';
    }
    brandDiv.append(logoLink);
  }

  // Right utility (Contact us | Careers)
  const topRight = document.createElement('div');
  topRight.className = 'nav-top-right';
  if (toolsEl) {
    toolsEl.querySelectorAll('p a').forEach((a) => {
      const link = document.createElement('a');
      link.href = a.href;
      link.textContent = a.textContent.trim();
      topRight.append(link);
    });
  }

  // Hamburger (mobile)
  const hamburger = document.createElement('div');
  hamburger.className = 'nav-hamburger';
  hamburger.innerHTML = `<button type="button" aria-label="Open navigation">
    <span class="nav-hamburger-icon"></span>
  </button>`;

  topBar.append(topLeft, brandDiv, topRight, hamburger);

  // ── Build Row 2: magenta main nav bar ──
  const mainBar = document.createElement('div');
  mainBar.className = 'nav-main-bar';
  const mainInner = document.createElement('div');
  mainInner.className = 'nav-main-inner';

  const navSections = document.createElement('div');
  navSections.className = 'nav-sections';
  if (sectionsEl) {
    while (sectionsEl.firstChild) navSections.append(sectionsEl.firstChild);
  }
  mainInner.append(navSections);
  mainBar.append(mainInner);

  // ── Assemble ──
  const wrapper = document.createElement('div');
  wrapper.className = 'nav-wrapper';
  wrapper.append(topBar, mainBar);
  block.append(wrapper);

  // Set up dropdowns
  buildDropdowns(navSections);

  // Mobile toggle
  hamburger.querySelector('button').addEventListener('click', () => {
    const open = wrapper.classList.toggle('nav-open');
    mainBar.style.display = open ? 'block' : '';
    hamburger.querySelector('button').setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });

  // Ensure header height is set for body offset
  document.querySelector('header').style.setProperty('--nav-height', '94px');
}
