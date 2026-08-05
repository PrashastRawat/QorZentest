document.addEventListener('DOMContentLoaded', () => {

  // mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.style.display === 'flex';
      links.style.display = open ? 'none' : 'flex';
      links.style.cssText += open ? '' : 'position:absolute;top:78px;left:0;right:0;flex-direction:column;background:#0D1220;padding:24px 32px;border-bottom:1px solid #262F45;gap:20px;';
    });
  }

  // live counter animation for hero stats / readouts
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const decimals = el.dataset.count.includes('.') ? 1 : 0;
    let frame = 0;
    const totalFrames = 60;
    const animate = () => {
      frame++;
      const progress = Math.min(frame / totalFrames, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = (target * eased).toFixed(decimals) + suffix;
      if (progress < 1) requestAnimationFrame(animate);
    };
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        animate();
        observer.disconnect();
      }
    }, { threshold: 0.4 });
    observer.observe(el);
  });

  // simple readout ticker text rotation
  const readout = document.querySelector('.readout');
  if (readout) {
    const lines = [
      ['MODEL_STATUS: ONLINE', 'NODES_ACTIVE: 128', 'LATENCY: 42ms'],
      ['PIPELINE: TRAINING', 'ACCURACY: 97.3%', 'DRIFT: 0.02'],
      ['INFERENCE: LIVE', 'THROUGHPUT: 3.1k/s', 'UPTIME: 99.98%']
    ];
    let i = 0;
    setInterval(() => {
      i = (i + 1) % lines.length;
      readout.innerHTML = lines[i].join('<br>');
    }, 3200);
  }
});