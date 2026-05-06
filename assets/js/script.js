
  console.log('Site initialized');
  lucide.createIcons();

  const projBlocks = document.querySelectorAll('.proj-module-block, .proj-phase-block, .proj-capstone-section');
  for (let i = 0; i < projBlocks.length; i++) {
    projBlocks[i].style.display = 'none';
  }

  let lastFocused = null;

  function openModal(block, isModule) {
    lastFocused = document.activeElement;
    const clone = block.cloneNode(true);
    clone.style.display = 'block';
    clone.style.border = 'none';
    clone.style.margin = '0';
    if (isModule) clone.classList.remove('proj-module-block');
    else clone.classList.remove('proj-phase-block', 'proj-capstone-section');
    const modal = document.getElementById('projectModal');
    const modalContent = document.getElementById('modalContent');
    modalContent.innerHTML = '';
    modalContent.appendChild(clone);
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    lucide.createIcons();
    setTimeout(() => {
      const closeBtn = document.getElementById('modalClose');
      if (closeBtn) closeBtn.focus();
    }, 100);
  }

  function closeModal() {
    const modal = document.getElementById('projectModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
    if (lastFocused) setTimeout(() => lastFocused.focus(), 50);
  }

  // Module card buttons
  const cards = document.querySelectorAll('.module-card');
  for (let j = 0; j < cards.length; j++) {
    const card = cards[j];
    const btn = document.createElement('button');
    btn.className = 'proj-toggle-btn';
    btn.innerHTML = '<i data-lucide="sparkles"></i> View Module Projects';
    card.appendChild(btn);
    let block = null;
    let next = card.nextElementSibling;
    while (next) {
      if (next.classList && next.classList.contains('proj-module-block')) {
        block = next; break;
      }
      next = next.nextElementSibling;
    }
    if (block) {
      btn.addEventListener('click', function(e) { e.stopPropagation(); openModal(block, true); });
    }
  }

  // Phase header buttons
  const phaseBtns = document.querySelectorAll('.phase-header-row .proj-toggle-btn');
  for (let k = 0; k < phaseBtns.length; k++) {
    const btn = phaseBtns[k];
    const phase = btn.closest('.phase');
    const phaseBlock = phase ? phase.querySelector('.proj-phase-block, .proj-capstone-section') : null;
    if (phaseBlock) {
      btn.addEventListener('click', function(e) { e.stopPropagation(); console.log("Phase btn clicked"); openModal(phaseBlock, false); });
    } else {
      console.log('No phase block found for button', k);
    }
  }

  lucide.createIcons();

  const modal = document.getElementById('projectModal');
  const modalClose = document.getElementById('modalClose');
  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', function(e) { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
    if (e.key === 'Tab' && modal.classList.contains('active')) {
      const f = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length-1].focus(); }
      else if (!e.shiftKey && document.activeElement === f[f.length-1]) { e.preventDefault(); f[0].focus(); }
    }
  });
