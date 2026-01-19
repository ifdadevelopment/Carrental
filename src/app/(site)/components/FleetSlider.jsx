export function initSlider(container) {
  let index = 0;
  let cards = [];
  let visibleCards = getVisibleCards();
  let resizeHandler;

  function getVisibleCards() {
    if (window.innerWidth >= 1024) return 3;
    return 1;
  }

  function setup() {
    const originalCards = Array.from(container.children);
    container.innerHTML = "";

    visibleCards = getVisibleCards();

    const before = originalCards.slice(-visibleCards).map(c => c.cloneNode(true));
    const after = originalCards.slice(0, visibleCards).map(c => c.cloneNode(true));

    cards = [...before, ...originalCards, ...after];
    cards.forEach(c => container.appendChild(c));

    index = visibleCards;
    update(false);
  }

  function cardWidth() {
    return cards[0].offsetWidth + 24;
  }

  function update(animate = true) {
    container.style.transition = animate
      ? "transform 1.5s ease-in-out"
      : "none";

    container.style.transform = `translateX(-${index * cardWidth()}px)`;
  }

  function next() {
    index++;
    update(true);

    if (index >= cards.length - visibleCards) {
      setTimeout(() => {
        index = visibleCards;
        update(false);
      }, 1500);
    }
  }

  function prev() {
    index--;
    update(true);

    if (index < 0) {
      setTimeout(() => {
        index = cards.length - visibleCards * 2;
        update(false);
      }, 1500);
    }
  }

  resizeHandler = () => setup();
  window.addEventListener("resize", resizeHandler);

  return {
    init: setup,
    next,
    prev,
    destroy() {
      window.removeEventListener("resize", resizeHandler);
    }
  };
}
