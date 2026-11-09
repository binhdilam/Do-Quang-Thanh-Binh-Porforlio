/* Floating Zalo contact button + popup. Shared by the intro page and the demo.
   Usage: <script src="/gmvmax-tool/zalo.js" data-lang-attr="data-lang" defer></script> */
(function () {
  var ZALO = "https://zalo.me/0788351752";
  var TEL = "tel:+84788351752";
  var NUMBER = "0788 351 752";

  var T = {
    en: { title: "Chat with Thanh Bình", sub: "Questions about the tool or a project? Message me", open: "Open Zalo", call: "Call", label: "Contact via Zalo", close: "Close" },
    vi: { title: "Nhắn Thanh Bình", sub: "Hỏi về tool hoặc dự án? Nhắn mình nhé", open: "Mở Zalo", call: "Gọi", label: "Liên hệ qua Zalo", close: "Đóng" }
  };

  function lang() {
    var l = document.documentElement.getAttribute("data-lang") || document.documentElement.lang || "en";
    return l.indexOf("vi") === 0 ? "vi" : "en";
  }

  var css = ""
    + ".zl-wrap{position:fixed;right:max(16px,env(safe-area-inset-right));bottom:max(16px,env(safe-area-inset-bottom));z-index:90;font-family:'Plus Jakarta Sans',system-ui,sans-serif}"
    + "body.zl-lift .zl-wrap{bottom:calc(76px + env(safe-area-inset-bottom))}"
    + ".zl-btn{position:relative;display:grid;place-items:center;width:56px;height:56px;border-radius:50%;border:0;cursor:pointer;background:#0068FF;color:#fff;box-shadow:0 10px 28px -8px rgba(0,104,255,.7),0 2px 6px rgba(15,31,25,.18);transition:transform .45s cubic-bezier(.32,.72,0,1)}"
    + ".zl-btn:hover{transform:translateY(-2px)}.zl-btn:active{transform:scale(.95)}"
    + ".zl-btn b{font-weight:800;font-size:13px;letter-spacing:-.02em}"
    + ".zl-btn::after{content:'';position:absolute;inset:0;border-radius:50%;border:2px solid #0068FF;animation:zlp 2.6s ease-out infinite;pointer-events:none}"
    + "@keyframes zlp{0%{transform:scale(1);opacity:.55}70%,100%{transform:scale(1.55);opacity:0}}"
    + "@media(prefers-reduced-motion:reduce){.zl-btn::after{animation:none;display:none}}"
    + ".zl-pop{position:absolute;right:0;bottom:68px;width:min(300px,calc(100vw - 32px));background:#fff;border:1px solid #DCE7E2;border-radius:22px;padding:18px;box-shadow:0 24px 56px -16px rgba(15,31,25,.35);transform-origin:100% 100%;opacity:0;transform:translateY(8px) scale(.96);pointer-events:none;transition:opacity .3s,transform .4s cubic-bezier(.32,.72,0,1)}"
    + ".zl-wrap.open .zl-pop{opacity:1;transform:none;pointer-events:auto}"
    + ".zl-pop h4{font-size:15px;font-weight:700;margin:0;color:#0F1F19}"
    + ".zl-pop p{margin:4px 0 0;font-size:12.5px;color:#64756D}"
    + ".zl-num{display:block;margin:14px 0 12px;font-family:'JetBrains Mono',ui-monospace,monospace;font-size:18px;font-weight:700;color:#0F1F19;letter-spacing:-.02em}"
    + ".zl-row{display:flex;gap:8px}"
    + ".zl-row a{flex:1;display:inline-flex;align-items:center;justify-content:center;min-height:44px;border-radius:99px;font-weight:700;font-size:14px;text-decoration:none}"
    + ".zl-go{background:#0068FF;color:#fff}.zl-tel{background:#F5F9F7;color:#0F1F19;border:1px solid #DCE7E2}"
    + ".zl-x{position:absolute;top:8px;right:8px;width:32px;height:32px;border:0;background:transparent;border-radius:50%;cursor:pointer;color:#64756D;font-size:18px;line-height:1}"
    + ".zl-x:hover{background:#F5F9F7}"
    + ".zl-btn:focus-visible,.zl-x:focus-visible,.zl-row a:focus-visible{outline:2px solid #0F1F19;outline-offset:3px}";

  function build() {
    var st = document.createElement("style");
    st.textContent = css;
    document.head.appendChild(st);

    var wrap = document.createElement("div");
    wrap.className = "zl-wrap";
    wrap.innerHTML =
      '<div class="zl-pop" role="dialog" aria-label="Zalo" id="zlPop">' +
        '<button class="zl-x" type="button" aria-label="Close">&times;</button>' +
        '<h4></h4><p></p>' +
        '<span class="zl-num">' + NUMBER + '</span>' +
        '<div class="zl-row"><a class="zl-go" href="' + ZALO + '" target="_blank" rel="noopener noreferrer"></a><a class="zl-tel" href="' + TEL + '"></a></div>' +
      '</div>' +
      '<button class="zl-btn" type="button" aria-expanded="false" aria-controls="zlPop"><b>Zalo</b></button>';
    document.body.appendChild(wrap);

    var btn = wrap.querySelector(".zl-btn");
    var x = wrap.querySelector(".zl-x");

    function paint() {
      var t = T[lang()];
      wrap.querySelector("h4").textContent = t.title;
      wrap.querySelector("p").textContent = t.sub;
      wrap.querySelector(".zl-go").textContent = t.open;
      wrap.querySelector(".zl-tel").textContent = t.call;
      btn.setAttribute("aria-label", t.label);
      x.setAttribute("aria-label", t.close);
    }
    function set(open) {
      wrap.classList.toggle("open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    }
    btn.addEventListener("click", function () { set(!wrap.classList.contains("open")); });
    x.addEventListener("click", function () { set(false); btn.focus(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") set(false); });
    document.addEventListener("click", function (e) { if (!wrap.contains(e.target)) set(false); });
    new MutationObserver(paint).observe(document.documentElement, { attributes: true, attributeFilter: ["data-lang", "lang"] });
    paint();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", build);
  else build();
})();
