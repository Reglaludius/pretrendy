const fs = require('fs');

// Read base64 images
const imgs = JSON.parse(fs.readFileSync('_b64_images.json', 'utf8'));

// Read the original HTML
let html = fs.readFileSync('index.html', 'utf8');

// Replace image sources with base64
const replacements = {
  'imgs/meme1.jpg': imgs.meme1,
  'imgs/meme2.jpg': imgs.meme2,
  'imgs/meme3.jpg': imgs.meme3,
  'imgs/meme4.jpg': imgs.meme4,
  'imgs/meme5.jpg': imgs.meme5,
  'imgs/meme6.jpg': imgs.meme6,
  'imgs/meme7.jpg': imgs.meme7,
  'imgs/meme8.jpg': imgs.meme8,
  'imgs/Cattegories/shirt.jpg': imgs.shirt,
  'imgs/Cattegories/hoodies.jpg': imgs.hoodies,
  'imgs/Cattegories/pullover.jpg': imgs.pullover,
  'imgs/Cattegories/dress.jpg': imgs.dress,
  'imgs/Cattegories/cap.jpg': imgs.cap,
  'imgs/Cattegories/phone-case.jpg': imgs.phonecase,
  'imgs/Cattegories/stickers.jpg': imgs.stickers,
  'imgs/Cattegories/accesaries.jpg': imgs.accesaries,
  'imgs/distracted.webp': imgs.distracted,
};

for (const [src, b64] of Object.entries(replacements)) {
  html = html.split(src).join(b64);
}

// Replace assets/logo-hero.png with empty (has onerror fallback)
html = html.replace('src="assets/logo-hero.png"', 'src=""');

// Keep Tailwind CDN script and config (needed for styling)
// Keep Google Fonts links (load from CDN when online)

// Remove Instagram embed.js
html = html.replace(/<script async src="\/\/www\.instagram\.com\/embed\.js"><\/script>/, '');

// Replace Instagram blockquotes with simple linked cards
html = html.replace(
  /<blockquote class="instagram-media"[^>]*data-instgrm-permalink="([^"]+)"[^>]*>[\s\S]*?<\/blockquote>/g,
  (match, url) => {
    return `<a href="${url}" target="_blank" rel="noopener" style="display:block;background:#fff;border-radius:12px;box-shadow:0 2px 12px rgba(0,0,0,0.08);padding:2.5rem 1rem;text-align:center;text-decoration:none;color:#6b6b6b;font-size:13px;">
      <svg style="width:24px;height:24px;margin:0 auto 12px;" fill="#6b6b6b" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
      View post on Instagram<br><span style="font-size:11px;color:#999;">(requires internet)</span>
    </a>`;
  }
);

fs.writeFileSync('pretrendy-offline.html', html);
const size = fs.statSync('pretrendy-offline.html').size;
console.log('Built pretrendy-offline.html —', (size / 1024).toFixed(0) + 'KB (' + (size / 1024 / 1024).toFixed(1) + 'MB)');
