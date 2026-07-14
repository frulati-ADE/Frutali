// Mobile nav toggle
  const menuBtn = document.getElementById('menuBtn');
  const navLinks = document.getElementById('navLinks');
  menuBtn.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

  // Product cross-section interaction
  const layerInfos = document.querySelectorAll('.layer-info');
  const layers = document.querySelectorAll('.layer');
  function activate(target){
    layerInfos.forEach(el => el.classList.toggle('active', el.dataset.target === target));
    layers.forEach(l => l.style.opacity = (l.id === target) ? '1' : '0.35');
  }
  layerInfos.forEach(el => {
    el.addEventListener('mouseenter', () => activate(el.dataset.target));
    el.addEventListener('click', () => activate(el.dataset.target));
  });
  document.querySelectorAll('.layer').forEach(l => l.style.transition = 'opacity .25s ease');

  // Scroll reveal
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
