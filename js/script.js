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

  // Nutrition flavor toggle (fresa / uva) — swaps the real label image
  const nutriTabs = document.querySelectorAll('.nutri-tab');
  const nutriLabelImg = document.getElementById('nutriLabelImg');
  const nutriImages = {
    fresa: { src: 'assets/etiqueta-fresa.jpg', alt: 'Etiqueta nutricional ChocoFruit sabor fresa' },
    uva:   { src: 'assets/etiqueta-uva.jpg',   alt: 'Etiqueta nutricional ChocoFruit sabor uva verde' }
  };
  nutriTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      nutriTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const data = nutriImages[tab.dataset.flavor];
      if (nutriLabelImg && data) {
        nutriLabelImg.style.animation = 'none';
        nutriLabelImg.offsetHeight; /* restart animation */
        nutriLabelImg.style.animation = '';
        nutriLabelImg.src = data.src;
        nutriLabelImg.alt = data.alt;
      }
    });
  });

  // Scroll reveal
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Contact form -> sends directly to your inbox via Web3Forms (no email client opens)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const note = document.getElementById('formNote');
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalLabel = submitBtn.textContent;

      submitBtn.disabled = true;
      submitBtn.textContent = 'Enviando...';
      note.classList.remove('success', 'error');
      note.textContent = '';

      try {
        const formData = new FormData(contactForm);
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: formData
        });
        const result = await response.json();

        if (result.success) {
          note.textContent = '¡Gracias! Tu mensaje fue enviado correctamente.';
          note.classList.add('success');
          contactForm.reset();
        } else {
          note.textContent = 'No se pudo enviar el mensaje. Inténtalo de nuevo en unos minutos.';
          note.classList.add('error');
        }
      } catch (err) {
        note.textContent = 'No se pudo enviar el mensaje. Revisa tu conexión e inténtalo de nuevo.';
        note.classList.add('error');
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalLabel;
      }
    });
  }