const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRKjzBR_BgGYWpnWUvGYzmo4rLbT2iGm2oI1fzjs1wJdPguDpw2UPZXrZQqcXPrGxwJ7PBeDCzHazAj/pub?output=csv";

const map = L.map('map').setView([0.8, 110.3], 10);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

function convertDriveLink(url) {
  const match = url.match(/[-\w]{25,}/);
  return match ? `https://drive.google.com/uc?export=view&id=${match[0]}` : '';
}

Papa.parse(sheetURL, {
  download: true,
  header: true,
  complete: function(results) {
    const data = results.data;
    let count = 0;

    data.forEach(row => {
      const coord = row['data-coordinate'];
      if (!coord) return;

      const [lat, lon] = coord.split(',').map(Number);
      if (isNaN(lat) || isNaN(lon)) return;

      const img = convertDriveLink(row['data-documentation-image_1']);
      const nama = row['data-base_info-nama'] || '-';
      const kategori = row['data-survey-categ'] || '-';
      const temuan = row['data-survey-finding'] || '-';
      const deskripsi = row['data-survey-description'] || '-';

      const popup = `
        <b>${nama}</b><br>
        <i>${kategori}</i> - ${temuan}<br>
        ${deskripsi}<br>
        ${img ? `<img src="${img}" class="popup-img">` : ''}
      `;

      L.circleMarker([lat, lon], {
        radius: 6,
        color: 'blue',
        fillColor: '#4A90E2',
        fillOpacity: 0.7
      }).addTo(map).bindPopup(popup);

      count++;
    });

    document.getElementById('stats').innerHTML = `
      <p><b>Total Titik:</b> ${count}</p>
    `;
    document.getElementById('legend').innerHTML = `
      <p><span style="background: #4A90E2; width: 12px; height: 12px; display:inline-block; margin-right:5px;"></span>
      Titik Patroli</p>
    `;
  }
});

const sliderBox = document.getElementById('slider-box');
const toggleBtn = document.getElementById('toggle-btn');

toggleBtn.addEventListener('click', () => {
  sliderBox.classList.toggle('active');
});
