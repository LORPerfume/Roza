(() => {
  'use strict';

  const IG_USER = 'roza.76981';
  const IG_DM = `https://ig.me/m/${IG_USER}`;
  const PRICE = 20;
  const IMG = (id) => `assets/img/${id}.webp`;

  const FAMILIES = [
    { id: 'all', label: 'الكل', dot: '#d8b06a' },
    { id: 'floral', label: 'زهري ناعم', dot: '#b9a9d9' },
    { id: 'sweet', label: 'حلو وفانيلا', dot: '#cfc3b2' },
    { id: 'fruity', label: 'فاكهي منعش', dot: '#eba79e' },
    { id: 'evening', label: 'سهرة وجرأة', dot: '#c65cc0' },
    { id: 'kids', label: 'للأطفال', dot: '#9fd3c7' },
  ];

  const PRODUCTS = [
    { id: 'sensual-code', en: 'Sensual Code', ar: 'سنشوال كود', insp: 'Gucci Flora', family: 'floral', tint: '#b9a9d9',
      notes: ['ورد', 'فاوانيا', 'خشب الصندل'], desc: 'زهري أنثوي وناعم، متل باقة ورد طازة بين خصلات شعرك.' },
    { id: 'seduction', en: 'Seduction', ar: 'سيدكشن', insp: 'Victoria’s Secret Bombshell', family: 'fruity', tint: '#eba79e',
      notes: ['باشن فروت', 'فاوانيا', 'فانيلا'], desc: 'فاكهي مرح بلمسة زهرية، طاقة وانتعاش طول النهار.' },
    { id: 'vanilla-club', en: 'Vanilla Club', ar: 'فانيلا كلوب', insp: 'Mancera Roses Vanille', family: 'sweet', tint: '#cfc3b2',
      notes: ['ورد', 'فانيلا', 'ليمون'], desc: 'ورد دافئ ملفوف بالفانيلا، ناعم وبيعلق بالذاكرة.' },
    { id: 'pre-party', en: 'Pre-Party', ar: 'بري بارتي', insp: 'Lancôme La Vie Est Belle', family: 'sweet', tint: '#b78ddb',
      notes: ['سوسن', 'برالين', 'فانيلا'], desc: 'حلو وأنيق، عطر الفرح والمناسبات الحلوة.' },
    { id: 'harmony', en: 'Harmony', ar: 'هارموني', insp: 'Jean Paul Gaultier Scandal', family: 'evening', tint: '#d968a8',
      notes: ['عسل', 'غاردينيا', 'زهر البرتقال'], desc: 'عسلي جريء ولافت، لما بدك الكل يسأل شو حاطّة.' },
    { id: 'pretty', en: 'Pretty', ar: 'بريتي', insp: 'Giorgio Armani Sì', family: 'evening', tint: '#c65cc0', alcoholFree: true,
      notes: ['كشمش أسود', 'ورد', 'فانيلا'], desc: 'فاكهي راقٍ بقاعدة دافئة، أناقة هادية وواثقة.' },
    { id: 'wedding-night', en: 'Wedding Night', ar: 'ودنغ نايت', insp: 'Burberry Her', family: 'fruity', tint: '#e8bfcb',
      notes: ['توت أحمر', 'ياسمين', 'مسك'], desc: 'توتي مشرق وحلو، رائحة عروس من أول رشّة.' },
    { id: 'date', en: 'Date', ar: 'ديت', insp: 'Carolina Herrera Good Girl', family: 'evening', tint: '#d79fd6',
      notes: ['ياسمين', 'تونكا', 'كاكاو'], desc: 'غامض وساحر، مثالي للسهرات والمواعيد.' },
    { id: 'delicate', en: 'Delicate', ar: 'ديليكيت', insp: 'Lancôme Trésor Midnight Rose', family: 'floral', tint: '#8fc4e8',
      notes: ['توت العليق', 'ورد', 'مسك'], desc: 'ورد ليلي رقيق بلمسة توت، ناعم ومميز.' },
    { id: 'happy-hair', en: 'Happy Hair', ar: 'هابي هير · للأطفال', insp: null, family: 'kids', tint: '#9fd3c7', kids: true,
      notes: ['فك تشابك', 'بدون شطف', 'لطيف على الأطفال'],
      desc: 'بخاخ من إيلورا كيدز بيترك على الشعر، بيفك التشابك وبيخلّي التمشيط سهل بلا بكي ولا شدّ.' },
  ];
  const byId = Object.fromEntries(PRODUCTS.map((p) => [p.id, p]));

  const $ = (s, r = document) => r.querySelector(s);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* ---------- storage (best effort) ---------- */
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* ignore */ } },
  };

  /* ---------- cart ---------- */
  let cart = store.get('rosa.cart', {});
  for (const id of Object.keys(cart)) if (!byId[id] || !(cart[id] > 0)) delete cart[id];

  const cartCount = () => Object.values(cart).reduce((a, b) => a + b, 0);
  const saveCart = () => { store.set('rosa.cart', cart); renderCart(); };
  const addToCart = (id, n = 1) => {
    cart[id] = Math.min(20, (cart[id] || 0) + n);
    saveCart();
    const b = $('#cartOpen'); b.classList.remove('bump'); void b.offsetWidth; b.classList.add('bump');
  };
  const setQty = (id, n) => { if (n <= 0) delete cart[id]; else cart[id] = Math.min(20, n); saveCart(); };

  /* ---------- ribbon ---------- */
  const names = PRODUCTS.filter((p) => p.insp).map((p) => `${p.en} — ${p.insp}`);
  $('#ribbon').innerHTML = [...names, ...names].map((t) => `<span>${esc(t)}</span>`).join('');

  /* ---------- chips ---------- */
  let family = 'all';
  $('#chips').innerHTML = FAMILIES.map((f) =>
    `<button class="chip" role="tab" type="button" data-f="${f.id}" aria-selected="${f.id === 'all'}" style="--dot:${f.dot}"><i></i>${esc(f.label)}</button>`
  ).join('');
  $('#chips').addEventListener('click', (e) => {
    const c = e.target.closest('.chip'); if (!c) return;
    family = c.dataset.f;
    document.querySelectorAll('.chip').forEach((x) => x.setAttribute('aria-selected', String(x === c)));
    applyFilter();
  });

  /* ---------- grid ---------- */
  const plus = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>';
  const cardHTML = (p) => {
    const insp = p.insp ? `<p class="insp">مستوحى من <b>${esc(p.insp)}</b></p>` : '';
    const tag = p.kids ? '<span class="tag">جديد · للأطفال</span>' : (p.alcoholFree ? '<span class="tag">خالٍ من الكحول</span>' : '');
    const media = `<button class="card__media" type="button" data-open="${p.id}" aria-label="تفاصيل ${esc(p.en)}">
        <img src="${IMG(p.id)}" alt="${esc(p.en)} من إيلورا" loading="lazy" width="1000" height="1000">
        ${tag}<span class="quick">عرض التفاصيل</span></button>`;
    const buy = `<div class="card__buy">
        <span class="price">$${PRICE}<small>للعبوة</small></span>
        <button class="add" type="button" data-add="${p.id}">${plus}<span>أضيفي للسلة</span></button></div>`;
    const notes = `<ul class="notes">${p.notes.map((n) => `<li>${esc(n)}</li>`).join('')}</ul>`;
    if (p.kids) {
      return `<article class="card card--kids" data-family="${p.family}" style="--tint:${p.tint}">
        ${media}
        <div class="card__body">
          <p class="eyebrow">Elura Kids · Detangling Leave-in Spray</p>
          <p class="kicker">شعر بنتك بيغلّبك بالتمشيط؟</p>
          <p class="pname">${esc(p.en)}</p>
          <p class="lead">${esc(p.desc)}</p>
          ${notes}${buy}
        </div></article>`;
    }
    return `<article class="card" data-family="${p.family}" style="--tint:${p.tint}">
        ${media}
        <div class="card__body">
          <p class="pname">${esc(p.en)}</p>
          <h3>${esc(p.ar)}</h3>
          ${insp}${notes}${buy}
        </div></article>`;
  };
  const grid = $('#grid');
  grid.innerHTML = PRODUCTS.map(cardHTML).join('');

  function applyFilter() {
    grid.querySelectorAll('.card').forEach((c) => {
      const show = family === 'all' || c.dataset.family === family;
      c.classList.toggle('is-out', !show);
      c.classList.remove('is-new');
      if (show) { void c.offsetWidth; c.classList.add('is-new'); }
    });
  }

  grid.addEventListener('click', (e) => {
    const add = e.target.closest('[data-add]');
    if (add) {
      addToCart(add.dataset.add);
      add.classList.add('done');
      add.querySelector('span').textContent = 'انضافت ✓';
      clearTimeout(add._t);
      add._t = setTimeout(() => { add.classList.remove('done'); add.querySelector('span').textContent = 'أضيفي للسلة'; }, 1500);
      toast(`انضاف ${byId[add.dataset.add].en} للسلة`);
      return;
    }
    const open = e.target.closest('[data-open]');
    if (open) openModal(open.dataset.open, open);
  });

  /* ---------- overlays ---------- */
  let lastFocus = null;
  const show = (el, focusSel) => {
    lastFocus = document.activeElement; el.hidden = false; document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => (el.querySelector(focusSel) || el.querySelector('button'))?.focus());
  };
  const hide = (el) => {
    el.hidden = true;
    if ($('#modal').hidden && $('#drawer').hidden) document.body.style.overflow = '';
    lastFocus?.focus?.();
  };
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (!$('#modal').hidden) hide($('#modal')); else if (!$('#drawer').hidden) hide($('#drawer'));
  });

  /* modal */
  const modal = $('#modal');
  let mId = null, mQty = 1;
  function openModal(id) {
    const p = byId[id]; mId = id; mQty = 1;
    $('.modal__card', modal).style.setProperty('--tint', p.tint);
    $('#mImg').src = IMG(id); $('#mImg').alt = `${p.en} من إيلورا`;
    $('#mEn').textContent = p.en;
    $('#mTitle').textContent = p.ar;
    $('#mInsp').innerHTML = p.insp ? `مستوحى من <b>${esc(p.insp)}</b>` : 'من مجموعة Elura Kids';
    $('#mDesc').textContent = p.desc;
    $('#mNotes').innerHTML = p.notes.map((n) => `<li>${esc(n)}</li>`).join('');
    $('#mNotes').style.setProperty('--tint', p.tint);
    const specs = p.kids
      ? ['بخاخ يُترك على الشعر', 'لفك التشابك', 'لتمشيط أسهل', 'من Elura Kids']
      : ['عبوة 200 مل', 'ثبات وفوحان 48 ساعة', 'فيتامين E وبروتين الحرير', p.alcoholFree ? 'خالٍ من الكحول' : 'بدون سلفات'];
    $('#mSpecs').innerHTML = specs.map((s) => `<li>${esc(s)}</li>`).join('');
    syncModalQty();
    show(modal, '#mAdd');
  }
  const syncModalQty = () => { $('#mQty').textContent = mQty; $('#mPrice').textContent = `$${mQty * PRICE}`; };
  $('#mMinus').onclick = () => { mQty = Math.max(1, mQty - 1); syncModalQty(); };
  $('#mPlus').onclick = () => { mQty = Math.min(20, mQty + 1); syncModalQty(); };
  $('#mAdd').onclick = () => { addToCart(mId, mQty); hide(modal); toast(`انضاف ${byId[mId].en} × ${mQty} للسلة`); };
  modal.addEventListener('click', (e) => { if (e.target.closest('[data-close]')) hide(modal); });

  /* drawer */
  const drawer = $('#drawer');
  $('#cartOpen').onclick = () => show(drawer, '[data-close]');
  drawer.addEventListener('click', (e) => {
    const c = e.target.closest('[data-close]');
    if (c) { hide(drawer); if (c.dataset.goto) document.querySelector(c.dataset.goto)?.scrollIntoView({ behavior: 'smooth' }); return; }
    const q = e.target.closest('[data-q]');
    if (q) setQty(q.dataset.id, (cart[q.dataset.id] || 0) + Number(q.dataset.q));
  });

  function renderCart() {
    const ids = Object.keys(cart);
    $('#cartCount').textContent = cartCount();
    drawer.classList.toggle('is-empty', ids.length === 0);
    $('#empty').hidden = ids.length > 0;
    $('#lines').innerHTML = ids.map((id) => {
      const p = byId[id], n = cart[id];
      return `<li class="line">
        <img src="${IMG(id)}" alt="" width="64" height="64">
        <div class="line__info"><div class="line__name">${esc(p.en)}</div><div class="line__meta">${n} × $${PRICE} = <b>$${n * PRICE}</b></div></div>
        <div class="qty"><button type="button" data-q="-1" data-id="${id}" aria-label="إنقاص ${esc(p.en)}">−</button><output>${n}</output><button type="button" data-q="1" data-id="${id}" aria-label="زيادة ${esc(p.en)}">+</button></div>
      </li>`;
    }).join('');
    $('#total').textContent = `$${cartCount() * PRICE}`;
    $('#msgPreview').textContent = buildMessage();
  }

  /* ---------- order message ---------- */
  const who = store.get('rosa.who', {});
  $('#fName').value = who.name || '';
  $('#fCity').value = who.city || '';
  $('#who').addEventListener('input', () => {
    store.set('rosa.who', { name: $('#fName').value, city: $('#fCity').value });
    $('#msgPreview').textContent = buildMessage();
  });
  $('#who').addEventListener('submit', (e) => e.preventDefault());

  function buildMessage() {
    const ids = Object.keys(cart);
    const lines = ids.map((id) => {
      const p = byId[id];
      const tail = p.insp ? ` (${p.insp})` : '';
      return `• ${p.en}${tail} × ${cart[id]} = $${cart[id] * PRICE}`;
    });
    const name = $('#fName').value.trim(), city = $('#fCity').value.trim();
    return [
      'مرحبا روزا 🌸 بدي اطلب:',
      ...lines,
      '',
      `عدد القطع: ${cartCount()}`,
      `المجموع: $${cartCount() * PRICE}`,
      name ? `الاسم: ${name}` : null,
      city ? `المنطقة: ${city}` : null,
    ].filter((l) => l !== null).join('\n');
  }

  async function copy(text) {
    try { await navigator.clipboard.writeText(text); return true; }
    catch {
      try {
        const t = document.createElement('textarea'); t.value = text; t.setAttribute('readonly', '');
        t.style.position = 'fixed'; t.style.opacity = '0'; document.body.appendChild(t); t.select();
        const ok = document.execCommand('copy'); t.remove(); return ok;
      } catch { return false; }
    }
  }

  $('#orderBtn').href = IG_DM;
  $('#orderBtn').addEventListener('click', (e) => {
    if (!cartCount()) { e.preventDefault(); return; }
    // the link itself opens Instagram; copy the order so it can be pasted into the chat
    copy(buildMessage()).then((ok) => {
      toast(ok ? 'نسخنا رسالة طلبك ✓ الصقيها بمحادثة إنستغرام واضغطي إرسال' : 'افتحي «شوفي رسالة الطلب» وانسخيها يدوياً', 6000);
      if (!ok) $('.preview').open = true;
    });
  });
  $('#copyBtn').addEventListener('click', () => copy(buildMessage()).then((ok) => toast(ok ? 'تم نسخ الرسالة ✓' : 'حددي النص وانسخيه يدوياً')));

  /* ---------- toast ---------- */
  let tt;
  function toast(msg, ms = 2400) {
    const t = $('#toast'); t.textContent = msg; t.hidden = false;
    t.style.animation = 'none'; void t.offsetWidth; t.style.animation = '';
    clearTimeout(tt); tt = setTimeout(() => { t.hidden = true; }, ms);
  }

  renderCart();

  /* ---------- hero mist ---------- */
  const cv = $('#mist');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (cv && cv.getContext) {
    const ctx = cv.getContext('2d');
    const cols = ['247,198,217', '216,176,106', '185,169,217', '143,196,232'];
    let W = 0, H = 0, dots = [], raf = 0, visible = true;
    const resize = () => {
      const r = cv.getBoundingClientRect(), dpr = Math.min(2, window.devicePixelRatio || 1);
      W = r.width; H = r.height; cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(Math.min(90, (W * H) / 9000));
      dots = Array.from({ length: n }, () => ({
        x: Math.random() * W, y: Math.random() * H, r: Math.random() * 2.2 + .4,
        vx: (Math.random() - .5) * .18, vy: -(Math.random() * .25 + .05),
        a: Math.random() * .5 + .15, c: cols[(Math.random() * cols.length) | 0], p: Math.random() * Math.PI * 2,
      }));
    };
    const draw = (t) => {
      ctx.clearRect(0, 0, W, H);
      for (const d of dots) {
        d.x += d.vx; d.y += d.vy;
        if (d.y < -10) { d.y = H + 10; d.x = Math.random() * W; }
        if (d.x < -10) d.x = W + 10; else if (d.x > W + 10) d.x = -10;
        const tw = .6 + .4 * Math.sin(t / 900 + d.p);
        ctx.beginPath(); ctx.fillStyle = `rgba(${d.c},${d.a * tw})`; ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2); ctx.fill();
      }
      if (!reduce && visible) raf = requestAnimationFrame(draw);
    };
    resize(); draw(0);
    window.addEventListener('resize', () => { resize(); if (reduce) draw(0); });
    if ('IntersectionObserver' in window && !reduce) {
      new IntersectionObserver(([en]) => {
        visible = en.isIntersecting; cancelAnimationFrame(raf); if (visible) raf = requestAnimationFrame(draw);
      }).observe(cv);
    }
  }
})();
