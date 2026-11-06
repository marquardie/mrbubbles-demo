/* PT is the source text living in the HTML; this file holds the English copy and UI strings. */
(() => {
  const EN = {
    skip: 'Skip to content',
    hero_alt: 'Glossy black car under hexagon lights (sample image)',
    n_serv: 'Services', n_gal: 'Gallery', n_rev: 'Reviews', n_con: 'Contact', n_book: 'Book',
    eyebrow: 'Car detailing · Sintra',
    h1: 'Your car like on <span class="hl">day one</span>',
    lead: 'Interior cleaning, full wash and paint polishing. Drop off the car, get it back shining.',
    cta1: 'Book on WhatsApp <b>→</b>', cta2: 'See the gallery',
    ck1: '30 Google reviews', ck2: '1860+ washes done', ck3: '950+ happy customers',
    s_h: 'Every detail of your car, taken care of',
    s_sub: 'Interior, exterior, paint and glass. Tell us the condition of your car and we will suggest the right treatment.',
    t1: 'Interior', t2: 'Interior and exterior', t3: 'Paint', t4: 'Glass and headlights',
    h_1: 'Upholstery and mat cleaning', p_1: 'Removes stains, odours and built-up dirt from seats, mats and carpets.',
    h_2: 'Full wash', p_2: 'A careful wash inside and out, so the car is handed back clean in every corner.',
    h_3: 'Paint polishing and restoration', p_3: 'Fixes scratches, marks and dullness. The paint reflects again.',
    h_4: 'Glass and headlight polishing', p_4: 'Cloudy headlights turn clear again and glass gains clarity.',
    quote: 'Request a quote',
    g_h: 'The difference speaks for itself', g_ig: 'More on Instagram ↗',
    g_sub: 'Real results, from the state the car arrived in to the finished result.',
    before: 'Before', after: 'After',
    a1a: 'Black SUV before washing and polishing', a1b: 'Black SUV after washing and polishing',
    a2a: 'Bonnet with marks and dust before polishing', a2b: 'Front of the car polished after treatment',
    a3a: 'Dirty alloy wheel before cleaning', a3b: 'Clean alloy wheel after treatment',
    a4a: 'Dirty interior before cleaning', a4b: 'Clean interior after cleaning',
    a5a: 'Dirty rear seat before', a5b: 'Clean rear seat after',
    a6a: 'Fiat 500 interior with the floor stripped out during deep cleaning', a6b: 'Fiat 500 interior clean and reassembled',
    a7a: 'Clean car floor', a7b: 'Clean engine bay',
    c1: 'SUV wash and polish', c2: 'Paint: polish and shine', c3: 'Wheels: from brake dust to clean metal',
    c4: 'Interior: mats and seats renewed', c5: 'Rear seat: no stains, no dust',
    c6: 'Fiat 500 interior: deep clean', c7: 'Deep clean: floor and engine bay',
    pr_k: 'How it works', pr_h: 'From first contact to the final shine',
    st1h: 'Get in touch', st1p: 'Send a WhatsApp message with your car model and what you need.',
    st2h: 'Assessment', st2p: 'We check the state of the interior and paint and recommend the right treatment.',
    st3h: 'Treatment', st3p: 'We work on the car carefully, from the inside out.',
    st4h: 'Handover', st4p: 'We check the result with you before handing back the keys.',
    r_h: 'Customers who come back', r_ex: 'Excellent ★★★★★',
    ab_k: 'About us', ab_h: 'Tired of a dull-looking car?',
    ab_1: 'At Mr Bubbles we treat your car as if it were our own. We clean, polish and give it back the look it had when you bought it.',
    ab_2: 'A well-kept car is also worth more. Give it that value.',
    st_a: 'washes', st_b: 'customers', st_c: 'Google reviews',
    fq_k: 'FAQ', fq_h: 'Before you book',
    q1: 'How much does it cost?', a1: 'The price depends on the size and condition of the car. Send us photos on WhatsApp and we will give you a price.',
    q2: 'How long does it take?', a2: 'A wash takes less time than a full polish. We agree the timing with you at the assessment.',
    q3: 'Can I leave the car and go?', a3: 'Yes. Leave the car and we will let you know when it is ready.',
    q4: 'How do I book?', a4: 'By WhatsApp, phone or email. We reply with availability and a quote.',
    c_h: 'Give your car more value', c_sub: 'Write to us and we will reply with availability and a quote.',
    c_addr: 'Address', c_tel: 'Phone', c_soc: 'Social',
    f_name: 'Name', f_car: 'Car make and model', f_serv: 'Service', f_msg: 'Message',
    o0: 'Choose a service', o2: 'Full wash, interior and exterior',
    f_send: 'Send via WhatsApp <b>→</b>', f_fine: 'Opens WhatsApp with your message already written.',
    f_demo: 'Design demo, not published',
    title: 'Mr Bubbles Car Detailing — car detailing in Sintra',
    desc: 'Upholstery cleaning, full wash, paint polishing, glass and headlights. Aldeia de Juso, Sintra. Book on WhatsApp.'
  };
  const UI = {
    pt: { need: 'Indique o seu nome para continuarmos.', open: 'A abrir o WhatsApp…', hi: n => `Olá! Sou ${n}.`, car: 'Carro', svc: 'Serviço',
      w1: 'Olá! Gostava de um orçamento para limpeza de estofos.', w2: 'Olá! Gostava de um orçamento para lavagem completa.',
      w3: 'Olá! Gostava de um orçamento para polimento da pintura.', w4: 'Olá! Gostava de um orçamento para polimento de faróis.' },
    en: { need: 'Please enter your name so we can continue.', open: 'Opening WhatsApp…', hi: n => `Hello! I'm ${n}.`, car: 'Car', svc: 'Service',
      w1: 'Hello! I would like a quote for upholstery cleaning.', w2: 'Hello! I would like a quote for a full wash.',
      w3: 'Hello! I would like a quote for paint polishing.', w4: 'Hello! I would like a quote for headlight polishing.' }
  };
  const WA = 'https://api.whatsapp.com/send/?phone=351917777813';
  const $$ = (s) => [...document.querySelectorAll(s)];
  const PT = { title: document.title, desc: document.querySelector('[data-i-meta]').content };
  $$('[data-i]').forEach(el => { el._pt = el.innerHTML; });
  $$('[data-i-alt]').forEach(el => { el._pt = el.alt; });

  const L = window.L = { lang: 'pt', ui: k => UI[L.lang][k] };
  L.set = (lang, save = true) => {
    L.lang = lang === 'en' ? 'en' : 'pt';
    const en = L.lang === 'en';
    document.documentElement.lang = en ? 'en' : 'pt-PT';
    $$('[data-i]').forEach(el => { el.innerHTML = en ? (EN[el.dataset.i] ?? el._pt) : el._pt; });
    $$('[data-i-alt]').forEach(el => { el.alt = en ? (EN[el.dataset.iAlt] ?? el._pt) : el._pt; });
    document.title = en ? EN.title : PT.title;
    document.querySelector('[data-i-meta]').content = en ? EN.desc : PT.desc;
    $$('[data-wa]').forEach(a => { a.href = WA + '&text=' + encodeURIComponent(UI[L.lang][a.dataset.wa]); });
    $$('.lang button').forEach(b => b.setAttribute('aria-pressed', b.dataset.lang === L.lang));
    if (save) try { localStorage.setItem('lang', L.lang); } catch (_) {}
  };
  $$('.lang button').forEach(b => b.addEventListener('click', () => L.set(b.dataset.lang)));
  let saved = null; try { saved = localStorage.getItem('lang'); } catch (_) {}
  L.set(saved || 'pt', false);
})();
