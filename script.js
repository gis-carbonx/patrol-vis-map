const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRKjzBR_BgGYWpnWUvGYzmo4rLbT2iGm2oI1fzjs1wJdPguDpw2UPZXrZQqcXPrGxwJ7PBeDCzHazAj/pub?output=csv";

const map = L.map('map').setView([0.8, 110.3], 10);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

function convertDriveLink(url) {
  if (!url) return '';
  url = url.trim();

  if (url.includes("drive.google.com/uc?export=view")) return url;

  try {
    const u = new URL(url);
    if (u.searchParams && u.searchParams.get('id')) {
      return `https://drive.google.com/uc?export=view&id=${u.searchParams.get('id')}`;
    }
  } catch(e) {
  }

  let match = url.match(/\/d\/([a-zA-Z0-9_-]{20,})/);
  if (!match) match = url.match(/[?&]id=([a-zA-Z0-9_-]{20,})/);
  if (!match) match = url.match(/([a-zA-Z0-9_-]{25,})/);
  if (match) {
    return `https://drive.google.com/uc?export=view&id=${match[1]}`;
  }

  return url;
}

function createImgHtml(src) {
  if (!src) return '';

  const safe = src.replace(/"/g, '&quot;');
  return `<img loading="lazy" class="popup-img" src="${safe}" onerror="this.classList.add('img-hidden'); this.style.display='none';">`;
}

Papa.parse(sheetURL, {
  download: true,
  header: true,
  skipEmptyLines: true,
  complete: function(results) {
    const data = results.data;
    let count = 0;

    data.forEach(row => {
      const coord = row['data-coordinate'];
      if (!coord) return;

      const parts = coord.split(',').map(s => s.trim());
      if (parts.length < 2) return;

      let lat = parseFloat(parts[0]);
      let lon = parseFloat(parts[1]);

      if (isNaN(lat) || isNaN(lon)) return;

      const kategori = row['data-survey-categ'] || '';
      const temuan = row['data-survey-finding'] || '';
      const nama = row['data-base_info-nama'] || '-';
      const deskripsi = row['data-survey-description'] || '';
      const imgRaw = row['data-documentation-image_1'] || '';
      const imgUrl = convertDriveLink(imgRaw);

      const titleLine = `${kategori}${temuan ? ' - ' + temuan : ''}`;
      const popupHtml =
        `<div class="popup-title">${escapeHtml(titleLine)}</div>` +
        `<div class="popup-sub">${escapeHtml(nama)}</div>` +
        `<div>${escapeHtml(deskripsi)}</div>` +
        `${imgUrl ? createImgHtml(imgUrl) : ''}`;

      const marker = L.circleMarker([lat, lon], {
        radius: 6,
        color: 'blue',
        fillColor: '#4A90E2',
        fillOpacity: 0.8
      }).addTo(map);

      marker.bindPopup(popupHtml, { maxWidth: 320 });

      count++;
    });

    document.getElementById('stats').innerHTML = `<p><b>Total Titik:</b> ${count}</p>`;
    document.getElementById('legend').innerHTML = `
      <p><span style="background: #4A90E2; width: 12px; height: 12px; display:inline-block; margin-right:8px; border-radius:3px;"></span>
      Titik Patroli</p>
    `;
  },
  error: function(err) {
    console.error('Gagal load CSV:', err);
  }
});

function escapeHtml(text) {
  if (!text && text !== 0) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const sliderBox = document.getElementById('slider-box');
const toggleBtn = document.getElementById('toggle-btn');
toggleBtn.addEventListener('click', () => sliderBox.classList.toggle('active'));

document.addEventListener('click', function(e){
  const target = e.target;
  if (!sliderBox.contains(target) && !toggleBtn.contains(target)) {
    sliderBox.classList.remove('active');
  }
});
