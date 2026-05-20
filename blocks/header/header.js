import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

// media query match that indicates mobile/tablet width
const isDesktop = window.matchMedia('(min-width: 900px)');

function closeOnEscape(e) {
  if (e.code === 'Escape') {
    const nav = document.getElementById('nav');
    const navSections = nav.querySelector('.nav-sections');
    if (!navSections) return;
    const navSectionExpanded = navSections.querySelector('[aria-expanded="true"]');
    if (navSectionExpanded && isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleAllNavSections(navSections);
      navSectionExpanded.focus();
    } else if (!isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleMenu(nav, navSections);
      nav.querySelector('button').focus();
    }
  }
}

function closeOnFocusLost(e) {
  const nav = e.currentTarget;
  if (!nav.contains(e.relatedTarget)) {
    const navSections = nav.querySelector('.nav-sections');
    if (!navSections) return;
    const navSectionExpanded = navSections.querySelector('[aria-expanded="true"]');
    if (navSectionExpanded && isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleAllNavSections(navSections, false);
    } else if (!isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleMenu(nav, navSections, false);
    }
  }
}

function openOnKeydown(e) {
  const focused = document.activeElement;
  const isNavDrop = focused.className === 'nav-drop';
  if (isNavDrop && (e.code === 'Enter' || e.code === 'Space')) {
    const dropExpanded = focused.getAttribute('aria-expanded') === 'true';
    // eslint-disable-next-line no-use-before-define
    toggleAllNavSections(focused.closest('.nav-sections'));
    focused.setAttribute('aria-expanded', dropExpanded ? 'false' : 'true');
  }
}

function focusNavSection() {
  document.activeElement.addEventListener('keydown', openOnKeydown);
}

/**
 * Toggles all nav sections
 * @param {Element} sections The container element
 * @param {Boolean} expanded Whether the element should be expanded or collapsed
 */
function toggleAllNavSections(sections, expanded = false) {
  if (!sections) return;
  sections.querySelectorAll('.nav-sections .default-content-wrapper > ul > li').forEach((section) => {
    section.setAttribute('aria-expanded', expanded);
  });
}

/**
 * Toggles the entire nav
 * @param {Element} nav The container element
 * @param {Element} navSections The nav sections within the container element
 * @param {*} forceExpanded Optional param to force nav expand behavior when not null
 */
function toggleMenu(nav, navSections, forceExpanded = null) {
  const expanded = forceExpanded !== null ? !forceExpanded : nav.getAttribute('aria-expanded') === 'true';
  const button = nav.querySelector('.nav-hamburger button');
  document.body.style.overflowY = (expanded || isDesktop.matches) ? '' : 'hidden';
  nav.setAttribute('aria-expanded', expanded ? 'false' : 'true');
  toggleAllNavSections(navSections, expanded || isDesktop.matches ? 'false' : 'true');
  button.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
  // enable nav dropdown keyboard accessibility
  if (navSections) {
    const navDrops = navSections.querySelectorAll('.nav-drop');
    if (isDesktop.matches) {
      navDrops.forEach((drop) => {
        if (!drop.hasAttribute('tabindex')) {
          drop.setAttribute('tabindex', 0);
          drop.addEventListener('focus', focusNavSection);
        }
      });
    } else {
      navDrops.forEach((drop) => {
        drop.removeAttribute('tabindex');
        drop.removeEventListener('focus', focusNavSection);
      });
    }
  }

  // enable menu collapse on escape keypress
  if (!expanded || isDesktop.matches) {
    // collapse menu on escape press
    window.addEventListener('keydown', closeOnEscape);
    // collapse menu on focus lost
    nav.addEventListener('focusout', closeOnFocusLost);
  } else {
    window.removeEventListener('keydown', closeOnEscape);
    nav.removeEventListener('focusout', closeOnFocusLost);
  }
}

/**
 * loads and decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
const BMS_NAV_FALLBACK = `<div>
  <p><a href="/"><img src="/drafts/images/logo.svg" alt="Bristol Myers Squibb" width="170" height="40"></a></p>
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
<div><p><a href="/about-us/contact-us.html">Contact us</a> | <a href="https://careers.bms.com">Careers</a></p></div>`;

export default async function decorate(block) {
  // load nav as fragment
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta, window.location).pathname : '/nav';
  const fragment = await loadFragment(navPath);

  // decorate nav DOM
  block.textContent = '';
  const nav = document.createElement('nav');
  nav.id = 'nav';

  // If fragment is empty (content source not yet set up), use fallback nav
  const isEmpty = !fragment.firstElementChild
    || (fragment.children.length === 1 && !fragment.firstElementChild.textContent.trim()
        && !fragment.firstElementChild.querySelector('a, img'));
  if (isEmpty) {
    const tmp = document.createElement('div');
    tmp.innerHTML = BMS_NAV_FALLBACK;
    while (tmp.firstElementChild) nav.append(tmp.firstElementChild);
  } else {
    while (fragment.firstElementChild) nav.append(fragment.firstElementChild);
  }

  const classes = ['brand', 'sections', 'tools'];
  classes.forEach((c, i) => {
    const section = nav.children[i];
    if (section) section.classList.add(`nav-${c}`);
  });

  const navBrand = nav.querySelector('.nav-brand');
  const brandLink = navBrand.querySelector('.button');
  if (brandLink) {
    brandLink.className = '';
    brandLink.closest('.button-container').className = '';
  }

  // Re-query navSections after potential fallback injection
  const navSections = nav.querySelector('.nav-sections');
  if (navSections) {
    navSections.querySelectorAll(':scope .default-content-wrapper > ul > li').forEach((navSection) => {
      if (navSection.querySelector('ul')) navSection.classList.add('nav-drop');
      navSection.addEventListener('click', () => {
        if (isDesktop.matches) {
          const expanded = navSection.getAttribute('aria-expanded') === 'true';
          toggleAllNavSections(navSections);
          navSection.setAttribute('aria-expanded', expanded ? 'false' : 'true');
          // Show/hide sub-menu via inline style (avoids CSS cache issues)
          const subUl = navSection.querySelector(':scope > ul');
          if (subUl) {
            navSections.querySelectorAll(':scope .default-content-wrapper > ul > li > ul').forEach((u) => {
              u.style.display = 'none';
            });
            if (!expanded) subUl.style.display = 'block';
          }
        }
      });
    });
  }

  // hamburger for mobile
  const hamburger = document.createElement('div');
  hamburger.classList.add('nav-hamburger');
  hamburger.innerHTML = `<button type="button" aria-controls="nav" aria-label="Open navigation">
      <span class="nav-hamburger-icon"></span>
    </button>`;
  hamburger.addEventListener('click', () => toggleMenu(nav, navSections));
  nav.prepend(hamburger);
  nav.setAttribute('aria-expanded', 'false');
  // prevent mobile nav behavior on window resize
  toggleMenu(nav, navSections, isDesktop.matches);
  isDesktop.addEventListener('change', () => {
    const ns = nav.querySelector('.nav-sections');
    toggleMenu(nav, ns, isDesktop.matches);
  });

  // Ensure sub-menus are hidden on desktop (defensive: overrides any CSS cache issues)
  if (isDesktop.matches && navSections) {
    navSections.querySelectorAll(':scope .default-content-wrapper > ul > li > ul').forEach((subUl) => {
      subUl.style.display = 'none';
    });
  }

  const navWrapper = document.createElement('div');
  navWrapper.className = 'nav-wrapper';
  navWrapper.append(nav);
  block.append(navWrapper);
}
