'use strict';
{
  document.addEventListener('DOMContentLoaded', () => {
    // ------------------------------------------------------------
    // scroll-visible
    // ------------------------------------------------------------
    const setupScrollVisible = () => {
      const header = document.querySelector('.js-header');
      const backToTop = document.querySelector('.js-back-to-top');

      if (!header || !backToTop) return;

      const showElement = () => {
        header.classList.add('is-active');
        backToTop.classList.add('is-active');
      };
      const hideElement = () => {
        header.classList.remove('is-active');
        backToTop.classList.remove('is-active');
      };

      const toggleVisible = () => {
        window.scrollY > 100 ? showElement() : hideElement();
      };

      const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };

      const addEvent = () => {
        window.addEventListener('scroll', toggleVisible);
        backToTop.addEventListener('click', scrollTop);
      };

      addEvent();
    };
    // ------------------------------------------------------------
    // scroll-visible end
    // ------------------------------------------------------------

    // ------------------------------------------------------------
    // hamburger
    // ------------------------------------------------------------
    const setupHamburger = () => {
      const headerHamburger = document.querySelector('.js-header__hamburger');
      const headerNav = document.querySelector('.js-header__nav');
      const headerNavLinks = document.querySelectorAll('.js-header__nav-link');
      const body = document.body;

      if (!headerHamburger || !headerNav || !headerNavLinks.length) return;

      const openNav = () => {
        headerNav.classList.add('is-active');
        headerHamburger.classList.add('is-active');
        headerHamburger.setAttribute('aria-expanded', 'true');
        headerHamburger.setAttribute('aria-label', 'メニューを閉じる');
        body.style.overflow = 'hidden';
      };

      const closeNav = () => {
        headerNav.classList.remove('is-active');
        headerHamburger.classList.remove('is-active');
        headerHamburger.setAttribute('aria-expanded', 'false');
        headerHamburger.setAttribute('aria-label', 'メニューを開く');
        body.style.removeProperty('overflow');
      };

      const toggleNav = () => {
        headerNav.classList.contains('is-active') ? closeNav() : openNav();
      };

      const addEvent = () => {
        headerHamburger.addEventListener('click', toggleNav);
        headerNav.addEventListener('click', closeNav);
        headerNavLinks.forEach(link => link.addEventListener('click', closeNav));
      };

      addEvent();
    };
    // ------------------------------------------------------------
    // hamburger end
    // ------------------------------------------------------------

    // ------------------------------------------------------------
    // dropdown
    // ------------------------------------------------------------
    const setupDropdown = () => {
      const dropdownHamburger = document.querySelector('.js-dropdown__hamburger');
      const dropdownNav = document.querySelector('.js-dropdown__nav');
      const dropdownNavItems = document.querySelectorAll('.js-dropdown__nav-item');
      const dropdownHeaders = document.querySelectorAll('.js-dropdown__header');
      const dropdownBodyLinks = document.querySelectorAll('.js-dropdown__body-link');
      const body = document.body;
      const isHoverDevice = window.matchMedia('(any-hover: hover)').matches;

      if (!dropdownHamburger || !dropdownNav || !dropdownNavItems.length || !dropdownHeaders.length || !dropdownBodyLinks.length) return;

      const openDropdownNav = () => {
        dropdownHamburger.classList.add('is-active');
        dropdownHamburger.setAttribute('aria-expanded', 'true');
        dropdownHamburger.setAttribute('aria-label', 'メニューを閉じる');
        dropdownNav.classList.add('is-active');
        body.style.overflow = 'hidden';
      };

      const closeDropdownNav = () => {
        dropdownHamburger.classList.remove('is-active');
        dropdownHamburger.setAttribute('aria-expanded', 'false');
        dropdownHamburger.setAttribute('aria-label', 'メニューを開く');
        dropdownNav.classList.remove('is-active');
        body.style.removeProperty('overflow');
      };

      const toggleDropdownNav = () => {
        dropdownNav.classList.contains('is-active') ? closeDropdownNav() : openDropdownNav();
      };

      const openDropdownItem = (event) => {
        const dropdownHeader = event.currentTarget;
        const dropdownItem = dropdownHeader.closest('.js-dropdown__nav-item');
        const dropdownBody = dropdownItem.querySelector('.js-dropdown__body');

        dropdownHeader.setAttribute('aria-expanded', 'true');
        dropdownHeader.setAttribute('aria-label', 'メニューを閉じる');
        dropdownItem.classList.add('is-active');
        dropdownBody.style.maxHeight = '0px'
        dropdownBody.offsetHeight;
        requestAnimationFrame(() => dropdownBody.style.maxHeight = `${dropdownBody.scrollHeight}px`);
      };

      const closeDropdownItem = (event) => {
        const dropdownHeader = event.currentTarget;
        const dropdownItem = dropdownHeader.closest('.js-dropdown__nav-item');
        const dropdownBody = dropdownItem.querySelector('.js-dropdown__body');

        dropdownHeader.setAttribute('aria-expanded', 'false');
        dropdownHeader.setAttribute('aria-label', 'メニューを開く');
        dropdownItem.classList.remove('is-active');
        requestAnimationFrame(() => dropdownBody.style.maxHeight = '0px');
      };

      const otherCloseDropdownItem = (otherDropdownItem) => {
        dropdownNavItems.forEach(dropdownItem => {
          const dropdownHeader = dropdownItem.querySelector('.js-dropdown__header')
          if (dropdownItem !== otherDropdownItem) {
            closeDropdownItem({ currentTarget: dropdownHeader });
          }
        });
      };

      const toggleDropdownItem = (event) => {
        const dropdownHeader = event.currentTarget;
        const dropdownItem = dropdownHeader.closest('.js-dropdown__nav-item');

        if (dropdownItem.classList.contains('is-active')) {
          closeDropdownItem(event);
        } else {
          otherCloseDropdownItem(dropdownItem);
          openDropdownItem(event);
        }
      };

      const allCloseDropdown = () => {
        dropdownNavItems.forEach(dropdownItem => {
          const dropdownHeader = dropdownItem.querySelector('.js-dropdown__header')

          closeDropdownItem({ currentTarget: dropdownHeader });
        });
        closeDropdownNav();
      };

      const addEvent = () => {
        dropdownHamburger.addEventListener('click', toggleDropdownNav);

        dropdownNav.addEventListener('click', (event) => {
          if (event.target === dropdownNav) allCloseDropdown();
        });

        dropdownHeaders.forEach(dropdownHeader => dropdownHeader.addEventListener('click', (event) => toggleDropdownItem(event)));
        dropdownBodyLinks.forEach(dropdownLink => dropdownLink.addEventListener('click', allCloseDropdown));

        if (isHoverDevice) {
          dropdownNavItems.forEach(dropdownItem => {
            const dropdownHeader = dropdownItem.querySelector('.js-dropdown__header');

            dropdownItem.addEventListener('mouseenter', () => openDropdownItem({ currentTarget: dropdownHeader }));
            dropdownItem.addEventListener('mouseleave', () => closeDropdownItem({ currentTarget: dropdownHeader }));
          });
        }
      };

      addEvent();
    };
    // ------------------------------------------------------------
    // dropdown end
    // ------------------------------------------------------------

    // ------------------------------------------------------------
    // tab
    // ------------------------------------------------------------
    const setupTab = () => {
      const tabHeaders = document.querySelectorAll('.js-tab__header');

      if (!tabHeaders) return;

      const openTab = (event) => {
        const tabHeader = event.currentTarget;
        const tabBodyId = tabHeader.getAttribute('aria-controls');
        const tabBody = document.getElementById(tabBodyId);

        tabHeader.setAttribute('aria-selected', 'true');
        tabHeader.classList.add('is-active');
        tabBody.classList.add('is-active');
      };

      const closeTab = (event) => {
        const tabHeader = event.currentTarget;
        const tabBodyId = tabHeader.getAttribute('aria-controls');
        const tabBody = document.getElementById(tabBodyId);

        tabHeader.setAttribute('aria-selected', 'false');
        tabHeader.classList.remove('is-active');
        tabBody.classList.remove('is-active');
      };

      const otherCloseTab = (currentTabHeader) => {
        tabHeaders.forEach(tabHeader => {
          if (tabHeader !== currentTabHeader) {
            closeTab({ currentTarget: tabHeader });
          }
        });
      };

      const toggleTab = (event) => {
        const tabHeader = event.currentTarget;

        if (tabHeader.classList.contains('is-active')) return;
        otherCloseTab(tabHeader);
        openTab(event);
      };

      const addEvent = () => {
        tabHeaders.forEach(tabHeader => {
          tabHeader.addEventListener('click', (event) => {
            toggleTab(event);
          });
        });
      };

      addEvent();
    };
    // ------------------------------------------------------------
    // tab end
    // ------------------------------------------------------------

    // ------------------------------------------------------------
    // accordion
    // ------------------------------------------------------------
    const setupAccordion = () => {
      const accordionItems = document.querySelectorAll('.js-accordion__item');
      const accordionHeaders = document.querySelectorAll('.js-accordion__header');

      const openAccordion = (event) => {
        const accordionHeader = event.currentTarget;
        const accordionItem = accordionHeader.closest('.js-accordion__item');
        const accordionBody = accordionItem.querySelector('.js-accordion__body');

        accordionHeader.setAttribute('aria-expanded', 'true');
        accordionHeader.setAttribute('aria-label', 'メニューを閉じる');
        accordionItem.classList.add('is-active');
        accordionItem.setAttribute('open', 'true');
        accordionBody.style.maxHeight = '0px';
        accordionBody.offsetHeight;
        requestAnimationFrame(() => accordionBody.style.maxHeight = `${accordionBody.scrollHeight}px`);
      };

      const closeAccordion = (event) => {
        const accordionHeader = event.currentTarget;
        const accordionItem = accordionHeader.closest('.js-accordion__item');
        const accordionBody = accordionItem.querySelector('.js-accordion__body');

        accordionHeader.setAttribute('aria-expanded', 'false');
        accordionHeader.setAttribute('aria-label', 'メニューを開く');
        accordionItem.classList.remove('is-active');
        setTimeout(() => accordionItem.removeAttribute('open'), 300);
        requestAnimationFrame(() => accordionBody.style.maxHeight = '0px');
      };

      const otherCloseAccordion = (currentAccordionItem) => {
        accordionItems.forEach(accordionItem => {
          const accordionHeader = accordionItem.querySelector('.js-accordion__header');
          if (accordionItem !== currentAccordionItem) {
            closeAccordion({ currentTarget: accordionHeader });
          }
        });
      };

      const toggleAccordion = (event) => {
        const accordionHeader = event.currentTarget;
        const accordionItem = accordionHeader.closest('.js-accordion__item');

        if (accordionItem.classList.contains('is-active')) {
          closeAccordion(event);
        } else {
          otherCloseAccordion(accordionItem);
          openAccordion(event);
        }
      };

      const addEvent = () => {
        accordionHeaders.forEach(accordionHeader => {
          accordionHeader.addEventListener('click', (event) => {
            event.preventDefault();
            toggleAccordion(event);
          });
        });
      };

      addEvent();
    };
    // ------------------------------------------------------------
    // accordion end
    // ------------------------------------------------------------

    // ------------------------------------------------------------
    // modal
    // ------------------------------------------------------------
    const setupModal = () => {
      const modalWindow = document.querySelector('.js-modal__window');
      const modalButtonOpen = document.querySelector('.js-modal__button-open');
      const modalButtonClose = document.querySelector('.js-modal__button-close');
      const body = document.body;

      const openModal = () => {
        modalWindow.showModal();
        requestAnimationFrame(() => modalWindow.classList.add('is-active'));
        body.style.overflow = 'hidden';
      };

      const closeModal = () => {
        modalWindow.classList.remove('is-active');
        setTimeout(() => modalWindow.close(),800);
        body.style.removeProperty('overflow');
      };

      const addEvent = () => {
        modalWindow.addEventListener('click', (event) => {
          if (event.target === modalWindow) {
            closeModal();
          }
        });

        modalButtonOpen.addEventListener('click', openModal);
        modalButtonClose.addEventListener('click', closeModal);
      };

      addEvent();
    };
    // ------------------------------------------------------------
    // modal end
    // ------------------------------------------------------------

    const setupAll = () => {
      setupScrollVisible();
      setupHamburger();
      setupDropdown();
      setupTab();
      setupAccordion();
      setupModal();
    };

    setupAll();
  });
}


