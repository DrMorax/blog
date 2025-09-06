import barba from '/js/barba.mjs';

barba.init({
  transitions: [
    {
      name: 'fade-vertical-fast',
      leave({ current }) {
        // Apply fade + down transform
        current.container.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        current.container.style.opacity = 0;
        current.container.style.transform = 'translateY(20px)';

        // Return a promise that resolves after the transition ends
        return new Promise(resolve => {
          current.container.addEventListener('transitionend', function handler(e) {
            if (e.propertyName === 'opacity') {
              current.container.removeEventListener('transitionend', handler);
              resolve();
            }
          });
        });
      },
      enter({ next }) {
        // Start below
        next.container.style.opacity = 0;
        next.container.style.transform = 'translateY(20px)';

        // Force reflow to trigger transition
        next.container.getBoundingClientRect();

        // Animate up to normal
        next.container.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        next.container.style.opacity = 1;
        next.container.style.transform = 'translateY(0)';
      }
    }
  ]
});

console.log('✅ Barba initialized (fade + vertical, 300ms)');