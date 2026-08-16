async function loadSite(){
  const res = await fetch('./data/site.json', {cache:'no-store'});
  const data = await res.json();

  document.title = `${data.siteTitle} | Official Website`;
  document.getElementById('site-title').textContent = data.siteTitle;
  document.getElementById('site-subtitle').textContent = data.siteSubtitle;
  document.getElementById('hero-lead').innerHTML = data.heroLead.replace('、','、<br>');
  document.getElementById('profile-intro').textContent = data.profile.intro;
  document.getElementById('profile-lifework').textContent = data.profile.lifework;
  document.getElementById('profile-current').textContent = data.profile.current;
  document.getElementById('footer-text').textContent = data.footer;

  const card = item => {
    const portrait = item.image && (item.title === '随筆' || item.title === '日中関係史');

    return `
      <article class="text-card ${item.image ? 'has-image' : ''}">
        ${item.image ? `
          <div class="text-card-image-wrap">
            <img
              src="${item.image}"
              alt="${item.title}"
              class="text-card-image ${portrait ? 'portrait' : ''}"
            >
          </div>
        ` : ''}

        <div class="text-card-body">
          <h3>${item.title}</h3>
          <p>${item.text || ''}</p>

          ${item.url ? `
            <a
              href="${item.url}"
              target="_blank"
              rel="noopener noreferrer"
            >
              ${item.linkLabel || '詳しく見る'} →
            </a>
          ` : ''}
        </div>
      </article>
    `;
  };

  document.getElementById('themes-grid').innerHTML =
    data.themes.map(card).join('');

  document.getElementById('works-grid').innerHTML =
    data.works.map(card).join('');

  document.getElementById('social-grid').innerHTML =
    data.social.map(card).join('');

  document.getElementById('news-list').innerHTML =
    data.news.map(item => `
      <article class="news-item">
        <div class="news-date">${item.date}</div>

        <div>
          <div class="news-title">${item.title}</div>
          <div class="news-text">${item.text || ''}</div>

          ${item.url ? `
            <a
              class="news-link"
              href="${item.url}"
              target="_blank"
              rel="noopener noreferrer"
            >
              ${item.linkLabel || '詳しく見る'} →
            </a>
          ` : ''}
        </div>
      </article>
    `).join('');
}

document.querySelector('.menu-btn').addEventListener('click', () => {
  document.querySelector('.nav').classList.toggle('open');
});

document.querySelectorAll('.nav a').forEach(a => {
  a.addEventListener('click', () => {
    document.querySelector('.nav').classList.remove('open');
  });
});

loadSite().catch(console.error);
