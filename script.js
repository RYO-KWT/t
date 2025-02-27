'use strict';
{
  document.addEventListener('DOMContentLoaded', () => {
    // trapFocus
    const handleTrapFocus = (event, container, trigger) => {
      const focusableSelectors = 'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])';
      const focusableElements = [trigger, ...container.querySelectorAll(focusableSelectors)];
      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];

      if (event.key === 'Tab') {
        if (event.shiftKey && document.activeElement === firstFocusable) {
          event.preventDefault();
          lastFocusable.focus();
        } else if (!event.shiftKey && document.activeElement === lastFocusable) {
          event.preventDefault();
          firstFocusable.focus();
        }
      }
    };
    // trapFocus end

    // handleEscapeKey
    const handleEscapeKey = (event, closeCallback) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeCallback();
      }
    };
    // handleEscapeKey end

    // hamburger
    const setupHamburger = () => {
      const headerHamburger = document.querySelector('.js-header__hamburger');
      const headerNav = document.querySelector('.js-header__nav');
      const headerNavLinks = document.querySelectorAll('.js-header__nav-link');
      const body = document.body

      if (!headerHamburger || !headerNav || !headerNavLinks.length) return;

      const handleNavKeyDowns = (event) => {
        if (!headerNav.classList.contains('is-active')) return;
        handleTrapFocus(event, headerNav, headerHamburger);
        handleEscapeKey(event, closeNav);
      };

      const openNav = () => {
        headerHamburger.classList.add('is-active');
        headerHamburger.setAttribute('aria-expanded', 'true');
        headerHamburger.setAttribute('aria-label', 'メニューを閉じる');
        headerNav.classList.add('is-active');
        body.style.overflow = 'hidden';
        setTimeout(() => headerNavLinks[0]?.focus(), 300);
        document.addEventListener('keydown', handleNavKeyDowns);
      };

      const closeNav = () => {
        headerHamburger.classList.remove('is-active');
        headerHamburger.setAttribute('aria-expanded', 'false');
        headerHamburger.setAttribute('aria-label', 'メニューを開く');
        headerNav.classList.remove('is-active');
        body.style.removeProperty('overflow');
        headerHamburger.focus();
        document.removeEventListener('keydown', handleNavKeyDowns);
      };

      const toggleNav = () => {
        headerNav.classList.contains('is-active') ? closeNav() : openNav();
      };

      const addEvent = () => {
        headerHamburger.addEventListener('click', toggleNav);
        headerNav.addEventListener('click', (event) => {
          if (event.target === headerNav) {
            closeNav();
          }
        });

        headerNavLinks.forEach(link => link.addEventListener('click', closeNav));
      };

      addEvent();
    };
    // hamburger end

    // dropdown
    const setupDropdown = () => {
      const dropdownHamburger = document.querySelector('.js-dropdown__hamburger');
      const dropdownNav = document.querySelector('.js-dropdown__nav');
      const dropdownNavItems = document.querySelectorAll('.js-dropdown__nav-item');
      const dropdownHeaders = document.querySelectorAll('.js-dropdown__header');
      const dropdownBodyLinks = document.querySelectorAll('.js-dropdown__body-link');
      const body = document.body
      const isHoverDevice = window.matchMedia('(any-hover: hover)').matches;

      if (!dropdownHamburger || !dropdownNav || !dropdownNavItems.length || !dropdownHeaders.length || !dropdownBodyLinks.length) return;

      const handleNavKeyDowns = (event) => {
        if (!dropdownNav.classList.contains('is-active')) return;
        const activeItem = document.querySelector('.js-dropdown__nav-item.is-active');

        if (!activeItem) {
          handleTrapFocus(event, dropdownNav, dropdownHamburger);
          handleEscapeKey(event, closeNav);
        }
      };

      const handleItemKeyDowns = (event) => {
        const activeItem = document.querySelector('.js-dropdown__nav-item.is-active');
        if (!activeItem) return;
        const activeHeader = activeItem.querySelector('.js-dropdown__header');

        handleTrapFocus(event, activeItem, activeHeader);
        handleEscapeKey(event, () => closeItem({ currentTarget: activeItem }));
      };

      const openNav = () => {
        dropdownHamburger.classList.add('is-active');
        dropdownHamburger.setAttribute('aria-expanded', 'true');
        dropdownHamburger.setAttribute('aria-label', 'メニューを閉じる');
        dropdownNav.classList.add('is-active');
        body.style.overflow = 'hidden';
        setTimeout(() => dropdownHeaders[0]?.focus(), 300);
        document.addEventListener('keydown', handleNavKeyDowns);
      };

      const closeNav = () => {
        dropdownHamburger.classList.remove('is-active');
        dropdownHamburger.setAttribute('aria-expanded', 'false');
        dropdownHamburger.setAttribute('aria-label', 'メニューを開く');
        dropdownNav.classList.remove('is-active');
        body.style.removeProperty('overflow');
        dropdownHamburger.focus();
        document.removeEventListener('keydown', handleNavKeyDowns);
      };

      const toggleNav = () => {
        dropdownNav.classList.contains('is-active') ? closeNav() : openNav();
      };

      const openItem = (event) => {
        const header = event.currentTarget;
        const item = header.closest('.js-dropdown__nav-item');
        const body = item.querySelector('.js-dropdown__body');

        header.setAttribute('aria-expanded', 'true');
        header.setAttribute('aria-label', 'メニュー閉じる');
        item.classList.add('is-active')
        requestAnimationFrame(() => {
          body.style.maxHeight = `${body.scrollHeight}px`;
        });
        document.addEventListener('keydown', handleItemKeyDowns);
      };

      const closeItem = (event) => {
        const header = event.currentTarget;
        const item = header.closest('.js-dropdown__nav-item');
        const body = item.querySelector('.js-dropdown__body');

        header.setAttribute('aria-expanded', 'false');
        header.setAttribute('aria-label', 'メニューを開く');
        item.classList.remove('is-active');
        requestAnimationFrame(() => body.style.maxHeight = '0px');
        document.addEventListener('keydown', handleItemKeyDowns);
      };

      const otherCloseItem = (event) => {
        const header = event.currentTarget;
        const item = header.closest('.js-dropdown__nav-item');
        const activeItems = document.querySelectorAll('.js-dropdown__nav-item.is-active');

        activeItems.forEach(otherItem => {
          if (otherItem !== item) {
            const activeHeader = otherItem.querySelector('.js-dropdown__header');
            closeItem({ currentTarget: activeHeader });
          }
        });
      };

      const closeAllDropdown = () => {
        const activeItems = document.querySelectorAll('.js-dropdown__nav-item.is-active');

        activeItems.forEach(otherItem => {
          const activeHeader = otherItem.querySelector('.js-dropdown__header');
          closeItem({ currentTarget: activeHeader });
        });

        closeNav();
      };

      const toggleItem = (event) => {
        const header = event.currentTarget;
        const item = header.closest('.js-dropdown__nav-item');
        const isActive = item.classList.contains('is-active');

        if (isActive) {
          closeItem(event);
        } else {
          otherCloseItem(event);
          openItem(event);
        }
      };

      const addEvent = () => {
        dropdownHamburger.addEventListener('click', toggleNav);
        dropdownNav.addEventListener('click', (event) => {
          if (event.target === dropdownNav) closeAllDropdown();
        });

        if (isHoverDevice) {
          dropdownNavItems.forEach(item => {
            const header = item.querySelector('.js-dropdown__header');

            header.addEventListener('mouseenter', () => openItem({ currentTarget: header }));
            item.addEventListener('mouseleave', () => closeItem({ currentTarget: header }));
          });
        }

        dropdownHeaders.forEach(header => header.addEventListener('click', toggleItem));
        dropdownBodyLinks.forEach(link => link.addEventListener('click', closeAllDropdown));
      };

      addEvent();
    };
    // dropdown end


    const setupAll = () => {
      setupHamburger();
      setupDropdown();
    };
    setupAll();
  });
}