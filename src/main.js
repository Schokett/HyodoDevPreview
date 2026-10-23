import "./style.css";

const translations = {
  de: {
    title: "Hyodo.dev wird umgebaut",
    subtitle: "Bitte besuchen Sie die Seite zu einem späteren Zeitpunkt noch einmal.",
  },
  en: {
    title: "Hyodo.dev is being rebuilt",
    subtitle: "Please visit the site again at a later time.",
  },
  ja: {
    title: "Hyodo.dev は現在リニューアル中です",
    subtitle: "後日あらためてアクセスしてください。",
  },
};

// Picks the first browser language we support, falling back to English.
// A ?lang=ja|en|de URL parameter overrides detection for testing.
function detectLanguage() {
  const override = new URLSearchParams(location.search).get("lang");
  const preferred = [override, navigator.language, ...(navigator.languages ?? [])];
  for (const lang of preferred) {
    const code = lang?.slice(0, 2).toLowerCase();
    if (code in translations) return code;
  }
  return "en";
}

const lang = detectLanguage();
const texts = translations[lang];

document.documentElement.lang = lang;
document.title = `hyodo.dev — ${texts.title}`;
document.querySelectorAll("[data-i18n]").forEach((el) => {
  el.textContent = texts[el.dataset.i18n];
});
