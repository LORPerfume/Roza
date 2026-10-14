(() => {
  'use strict';

  const IG_USER = 'roza.76981';
  const IG_DM = `https://ig.me/m/${IG_USER}`;
  const PRICE = 20;
  const IMG = (id) => `assets/img/${id}.webp`;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
  // scent profile 0–5: sweet, fresh, floral, warm  ·  quiz traits: time, style, mood
  const PROFILE = {
    'sensual-code': { m: [2, 3, 5, 2], time: 'day', style: 'floral', mood: 'soft' },
    'seduction': { m: [3, 4, 3, 1], time: 'day', style: 'fruity', mood: 'fun' },
    'vanilla-club': { m: [4, 2, 4, 3], time: 'any', style: 'sweet', mood: 'romantic' },
    'pre-party': { m: [5, 1, 3, 4], time: 'any', style: 'sweet', mood: 'fun' },
    'harmony': { m: [4, 1, 3, 5], time: 'night', style: 'warm', mood: 'bold' },
    'pretty': { m: [3, 2, 3, 4], time: 'any', style: 'fruity', mood: 'soft' },
    'wedding-night': { m: [4, 4, 2, 1], time: 'day', style: 'fruity', mood: 'romantic' },
    'date': { m: [4, 1, 3, 5], time: 'night', style: 'warm', mood: 'bold' },
    'delicate': { m: [3, 3, 4, 2], time: 'any', style: 'floral', mood: 'romantic' },
  };
  const METERS = ['حلاوة', 'انتعاش', 'زهري', 'دفء'];
  PRODUCTS.forEach((p) => Object.assign(p, PROFILE[p.id] || {}));
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
      burst(add, byId[add.dataset.add].tint);
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
    requestAnimationFrame(() => { (el.querySelector(focusSel) || el.querySelector('button'))?.focus({ preventScroll: true }); const sc = el.querySelector('.modal__card'); if (sc) sc.scrollTop = 0; });
  };
  const hide = (el) => {
    el.hidden = true;
    if (el.id === 'modal' && location.hash.startsWith('#p-')) { try { history.replaceState(null, '', location.pathname + location.search); } catch { /* ignore */ } }
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
    $('#mMeters').hidden = !p.m;
    if (p.m) {
      $('#mMeters').innerHTML = p.m.map((v, i) => `<div class="meter"><span>${METERS[i]}</span><span class="meter__bar">${
        [1, 2, 3, 4, 5].map((k) => `<i class="${k <= v ? 'on' : ''}"></i>`).join('')}</span></div>`).join('')
        + '<span class="meters__note">تقدير تقريبي لطابع الرائحة</span>';
    }
    try { history.replaceState(null, '', `#p-${id}`); } catch { /* ignore */ }
    syncModalQty();
    show(modal, '#mAdd');
  }
  const syncModalQty = () => { $('#mQty').textContent = mQty; $('#mPrice').textContent = `$${mQty * PRICE}`; };
  $('#mMinus').onclick = () => { mQty = Math.max(1, mQty - 1); syncModalQty(); };
  $('#mPlus').onclick = () => { mQty = Math.min(20, mQty + 1); syncModalQty(); };
  $('#mShare').onclick = () => {
    const url = location.href.split('#')[0] + `#p-${mId}`;
    copy(url).then((ok) => toast(ok ? 'نسخنا رابط العطر ✓ شاركيه مع صحباتك' : url, 4000));
  };
  $('#mAdd').onclick = (e) => { burst(e.currentTarget, byId[mId].tint); addToCart(mId, mQty); hide(modal); toast(`انضاف ${byId[mId].en} × ${mQty} للسلة`); };
  modal.addEventListener('click', (e) => { if (e.target.closest('[data-close]')) hide(modal); });

  /* drawer */
  const drawer = $('#drawer');
  $('#cartOpen').onclick = () => show(drawer, '[data-close]');
  $('#cartbarBtn').onclick = () => show(drawer, '[data-close]');
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
    const n = cartCount();
    $('#cartbar').hidden = n === 0;
    document.body.classList.toggle('has-bar', n > 0);
    $('#cbCount').textContent = n;
    $('#cbTotal').textContent = `$${n * PRICE}`;
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

  /* ---------- spray burst ---------- */
  function burst(el, color) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = el.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    const cs = [color, '#f6d9a4', '#f7c6d9'];
    for (let i = 0; i < 16; i++) {
      const d = document.createElement('i'), a = Math.random() * Math.PI * 2, dist = 30 + Math.random() * 50;
      d.className = 'puff';
      d.style.cssText = `left:${cx}px;top:${cy}px;--c:${cs[i % 3]};--dx:${Math.cos(a) * dist}px;--dy:${Math.sin(a) * dist - 20}px;animation-delay:${Math.random() * .08}s`;
      document.body.appendChild(d); setTimeout(() => d.remove(), 1100);
    }
  }

  /* ---------- hero showcase ---------- */
  const stage = $('#stage'), dotsEl = $('#showDots'), sc = $('#showcase');
  const slides = [{ id: null, en: 'The Collection', insp: '٩ عطور تحاكي العالمية' },
    ...PRODUCTS.filter((p) => p.insp).map((p) => ({ id: p.id, en: p.en, insp: `مستوحى من ${p.insp}` }))];
  slides.slice(1).forEach((s) => {
    const im = document.createElement('img');
    im.className = 'slide'; im.src = IMG(s.id); im.alt = `${s.en} من إيلورا`; im.loading = 'lazy'; im.width = 1000; im.height = 1000;
    stage.appendChild(im);
  });
  const slideEls = [...stage.querySelectorAll('.slide')];
  dotsEl.innerHTML = slides.map((s, i) => `<button type="button" role="tab" aria-label="${esc(s.en)}" aria-selected="${i === 0}" data-i="${i}"></button>`).join('');
  let cur = 0, timer = 0;
  function go(i) {
    cur = (i + slides.length) % slides.length;
    slideEls.forEach((el, k) => el.classList.toggle('is-on', k === cur));
    dotsEl.querySelectorAll('button').forEach((b, k) => b.setAttribute('aria-selected', String(k === cur)));
    sc.classList.add('swap');
    setTimeout(() => { $('#showEn').textContent = slides[cur].en; $('#showInsp').textContent = slides[cur].insp; sc.classList.remove('swap'); }, 300);
  }
  const autoplay = () => { clearInterval(timer); if (!reduce) timer = setInterval(() => go(cur + 1), 3800); };
  dotsEl.addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) { go(+b.dataset.i); autoplay(); } });
  $('#showOpen').onclick = () => { const s = slides[cur]; if (s.id) openModal(s.id); else $('#shop').scrollIntoView({ behavior: 'smooth' }); };
  // swipe on the arch
  let sx = null;
  $('#arch').addEventListener('touchstart', (e) => { sx = e.touches[0].clientX; }, { passive: true });
  $('#arch').addEventListener('touchend', (e) => {
    if (sx === null) return; const dx = e.changedTouches[0].clientX - sx; sx = null;
    if (Math.abs(dx) > 40) { go(cur + (dx > 0 ? 1 : -1)); autoplay(); }
  });
  // gentle tilt on desktop
  const art = $('.hero__art');
  if (window.matchMedia('(hover: hover)').matches) {
    art.addEventListener('pointermove', (e) => {
      const r = art.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      $('#arch').style.setProperty('--ry', `${x * 10}deg`); $('#arch').style.setProperty('--rx', `${-y * 8}deg`);
    });
    art.addEventListener('pointerleave', () => { $('#arch').style.setProperty('--ry', '0deg'); $('#arch').style.setProperty('--rx', '0deg'); });
  }

  /* ---------- scent quiz ---------- */
  const QUIZ = [
    { key: 'time', title: 'إمتى بتحبي تحطي عطرك أكتر شي؟', opts: [
      { v: 'day', ico: '☀️', t: 'بالنهار', s: 'جامعة، شغل، مشاوير' },
      { v: 'night', ico: '🌙', t: 'بالسهرات', s: 'مناسبات وطلعات مسائية' },
      { v: 'any', ico: '✨', t: 'كل الأوقات', s: 'عطر واحد لكل شي' },
      { v: 'gift', ico: '🎁', t: 'هدية', s: 'بدي فاجئ حدا غالي' } ] },
    { key: 'style', title: 'أي رائحة بتشدّك؟', opts: [
      { v: 'floral', ico: '🌸', t: 'ورد وزهور', s: 'ناعم ونظيف' },
      { v: 'sweet', ico: '🍦', t: 'حلو وفانيلا', s: 'دافئ وبيشهّي' },
      { v: 'fruity', ico: '🍓', t: 'فواكه وتوت', s: 'منعش ومرح' },
      { v: 'warm', ico: '🍯', t: 'عسل وكاكاو', s: 'عميق وجذاب' } ] },
    { key: 'mood', title: 'كيف بتوصفي حالك؟', opts: [
      { v: 'soft', ico: '🤍', t: 'هادئة وأنيقة', s: 'البساطة سرّي' },
      { v: 'romantic', ico: '🎀', t: 'رومانسية', s: 'بحب التفاصيل الحلوة' },
      { v: 'fun', ico: '💃', t: 'مرحة', s: 'طاقة وضحكة' },
      { v: 'bold', ico: '🔥', t: 'جريئة', s: 'بحب كون لافتة' } ] },
  ];
  const ans = {};
  let step = 0;
  const qPanel = $('#qPanel'), qBar = $('#qBar');
  function score(p) {
    let s = 0;
    if (ans.time === 'gift') s += p.id === 'pre-party' || p.id === 'vanilla-club' ? 1.5 : 0;
    else if (p.time === ans.time) s += 2; else if (p.time === 'any') s += 1;
    if (p.style === ans.style) s += 3;
    if (p.mood === ans.mood) s += 2;
    return s + p.m[0] * 0.01;
  }
  function renderQuiz() {
    qBar.style.width = `${(Math.min(step, QUIZ.length) / QUIZ.length) * 100}%`;
    if (step < QUIZ.length) {
      const q = QUIZ[step];
      qPanel.innerHTML = `<p class="q__step">${step + 1} / ${QUIZ.length}</p><p class="q__title">${esc(q.title)}</p>
        <div class="q__opts">${q.opts.map((o) => `<button class="q__opt" type="button" data-v="${o.v}"><span class="q__ico" aria-hidden="true">${o.ico}</span><b>${esc(o.t)}</b><span>${esc(o.s)}</span></button>`).join('')}</div>
        ${step ? '<button class="q__back" type="button" data-back>→ رجوع</button>' : ''}`;
      return;
    }
    const ranked = PRODUCTS.filter((p) => p.m).map((p) => [p, score(p)]).sort((a, b) => b[1] - a[1]);
    const best = ranked[0][0], pct = Math.round(70 + (ranked[0][1] / 7.05) * 29);
    qPanel.innerHTML = `<div class="q__result" style="--tint:${best.tint}">
        <img src="${IMG(best.id)}" alt="${esc(best.en)}">
        <div><span class="q__match">تطابق ${pct}%</span><p class="pname">${esc(best.en)}</p>
        <p>مستوحى من <b>${esc(best.insp)}</b></p><p>${esc(best.desc)}</p></div></div>
      <div class="q__actions">
        <button class="btn btn--primary" type="button" data-qadd="${best.id}">أضيفيه للسلة · $${PRICE}</button>
        <button class="btn btn--ghost" type="button" data-qopen="${best.id}">التفاصيل</button>
        <button class="btn btn--ghost" type="button" data-restart>أعيدي الاختبار</button>
      </div>
      <div class="q__alts">كمان رح يعجبوكِ: ${ranked.slice(1, 3).map(([p]) => `<button type="button" data-qopen="${p.id}">${esc(p.en)}</button>`).join('')}</div>`;
  }
  qPanel.addEventListener('click', (e) => {
    const o = e.target.closest('.q__opt');
    if (o) { ans[QUIZ[step].key] = o.dataset.v; step++; renderQuiz(); return; }
    if (e.target.closest('[data-back]')) { step = Math.max(0, step - 1); renderQuiz(); return; }
    if (e.target.closest('[data-restart]')) { step = 0; renderQuiz(); return; }
    const a = e.target.closest('[data-qadd]');
    if (a) { burst(a, byId[a.dataset.qadd].tint); addToCart(a.dataset.qadd); toast(`انضاف ${byId[a.dataset.qadd].en} للسلة`); return; }
    const op = e.target.closest('[data-qopen]');
    if (op) openModal(op.dataset.qopen);
  });
  renderQuiz();

  /* ---------- reveal on scroll ---------- */
  if ('IntersectionObserver' in window && !reduce) {
    const els = document.querySelectorAll('.benefit, .sechead, .quiz__intro, .quiz__panel, .steps li, .faq details, .how h2');
    const io = new IntersectionObserver((ens) => ens.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add('reveal', 'in'); io.unobserve(en.target); }
    }), { rootMargin: '0px 0px -8% 0px' });
    els.forEach((el) => { if (el.getBoundingClientRect().top > innerHeight) io.observe(el); });
  }

  /* ---------- deep link #p-<id> ---------- */
  const openFromHash = () => { const m = location.hash.match(/^#p-([\w-]+)$/); if (m && byId[m[1]]) openModal(m[1]); };
  window.addEventListener('hashchange', openFromHash);
  openFromHash();

  /* ---------- hero mist ---------- */
  const cv = $('#mist');
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
