/**
 * Campaign proof gallery.
 *
 * Every number below is read directly off the account screenshots stored in
 * src/assets/showcase/*. Nothing here is estimated or rounded up — if a figure
 * is not visible in the dashboard, it is simply not listed.
 */

import ecomVideoManual from "../assets/showcase/ecom-video-manual-ads.png";
import ecomVideoGmvMax from "../assets/showcase/ecom-video-gmvmax-month.png";
import ecomLiveGmvMaxMonth from "../assets/showcase/ecom-live-gmvmax-month.png";
import ecomLiveTopKoc from "../assets/showcase/ecom-live-topkoc-session.png";
import ecomLiveSession from "../assets/showcase/ecom-live-gmvmax-session.png";
import uaMetaAppInstall from "../assets/showcase/ua-meta-app-install.png";
import uaMetaLeadGen from "../assets/showcase/ua-meta-lead-gen.png";
import uaGoogleAppInstall from "../assets/showcase/ua-google-app-install.png";
import uaApple from "../assets/showcase/ua-apple-search-ads.png";
import uaZalo from "../assets/showcase/ua-zalo-ads.png";
import ecomMetaLanding from "../assets/showcase/ecom-meta-landingpage-conversion.webp";

export type ShowcaseCategory = "ecommerce" | "acquisition";

export interface ShowcaseStat {
  label: { en: string; vi: string };
  value: string;
  /** Marks the single number the tile leads with */
  hero?: boolean;
}

export interface ShowcaseItem {
  id: string;
  category: ShowcaseCategory;
  image: string;
  /** Tailwind object-position utility for the cropped tile thumbnail (lightbox always shows the full image). Defaults to "object-top". */
  imagePosition?: string;
  platform: string;
  period: string;
  title: { en: string; vi: string };
  note: { en: string; vi: string };
  alt: { en: string; vi: string };
  stats: ShowcaseStat[];
  /** Bento span on large screens */
  span: "wide" | "normal";
}

/** Each category carries its own accent so the gallery reads in colour blocks. */
export const categoryTint: Record<ShowcaseCategory, { bezel: string; text: string; badge: string }> = {
  ecommerce: {
    bezel: "bezel--amber",
    text: "text-amber-deep",
    badge: "bg-amber-wash text-amber-deep",
  },
  acquisition: {
    bezel: "bezel--brand",
    text: "text-brand",
    badge: "bg-brand-wash text-brand-deep",
  },
};

export const showcaseFilters = [
  { id: "all", label: { en: "All campaigns", vi: "Tất cả chiến dịch" } },
  { id: "ecommerce", label: { en: "E-commerce & TikTok Shop", vi: "E-commerce & TikTok Shop" } },
  { id: "acquisition", label: { en: "App install & lead gen", vi: "Cài app & thu lead" } },
] as const;

export const showcaseItems: ShowcaseItem[] = [
  /* ---------------- E-COMMERCE / TIKTOK SHOP ---------------- */
  {
    id: "video-manual",
    category: "ecommerce",
    image: ecomVideoManual,
    platform: "TikTok Ads — Manual video",
    period: "1 Nov – 31 Dec 2025",
    span: "wide",
    title: {
      en: "16 manual video campaigns held at 9.54x ROAS",
      vi: "16 chiến dịch video thủ công giữ ROAS 9.54x",
    },
    note: {
      en: "Two-month push across a full product catalogue. Spend scaled without letting blended ROAS slip below 9x — the top campaign in the account closed at 19.31x.",
      vi: "Chiến dịch đẩy 2 tháng trên toàn bộ danh mục sản phẩm. Tăng ngân sách nhưng ROAS tổng vẫn giữ trên 9x — chiến dịch tốt nhất tài khoản đạt 19.31x.",
    },
    alt: {
      en: "TikTok Ads Manager report showing 16 campaigns with 179,817,302 VND cost and 1,715,554,567 VND gross revenue at 9.54 ROAS",
      vi: "Báo cáo TikTok Ads Manager: 16 chiến dịch, chi phí 179.817.302đ, doanh thu 1.715.554.567đ, ROAS 9.54",
    },
    stats: [
      { label: { en: "Blended ROAS", vi: "ROAS tổng" }, value: "9.54x", hero: true },
      { label: { en: "Ad spend", vi: "Chi phí" }, value: "179,817,302₫" },
      { label: { en: "Gross revenue", vi: "Doanh thu" }, value: "1,715,554,567₫" },
      { label: { en: "Impressions", vi: "Lượt hiển thị" }, value: "2,194,314" },
      { label: { en: "Clicks", vi: "Lượt click" }, value: "113,393" },
      { label: { en: "CTR", vi: "CTR" }, value: "5.17%" },
      { label: { en: "CPC", vi: "CPC" }, value: "1,586₫" },
      { label: { en: "Product page views", vi: "Lượt xem trang SP" }, value: "427,355" },
    ],
  },
  {
    id: "video-gmvmax",
    category: "ecommerce",
    image: ecomVideoGmvMax,
    platform: "TikTok GMV Max — Video",
    period: "1 – 26 May 2026",
    span: "normal",
    title: {
      en: "Video GMV Max returning 33.21x on a lean budget",
      vi: "Video GMV Max đạt ROI 33.21x với ngân sách mỏng",
    },
    note: {
      en: "The highest-efficiency window in the account. 17.1M₫ of spend returned 569M₫ at a 4,292₫ cost per order.",
      vi: "Giai đoạn hiệu quả nhất của tài khoản. Chi 17,1 triệu đồng thu về 569 triệu, chi phí mỗi đơn chỉ 4.292đ.",
    },
    alt: {
      en: "TikTok GMV Max dashboard, May 2026: 17,135,160 VND cost, 569,043,443 VND gross revenue, ROI 33.21",
      vi: "Dashboard TikTok GMV Max tháng 5/2026: chi phí 17.135.160đ, doanh thu 569.043.443đ, ROI 33.21",
    },
    stats: [
      { label: { en: "ROI", vi: "ROI" }, value: "33.21x", hero: true },
      { label: { en: "Ad spend", vi: "Chi phí" }, value: "17,135,160₫" },
      { label: { en: "Gross revenue", vi: "Doanh thu" }, value: "569,043,443₫" },
      { label: { en: "SKU orders", vi: "Đơn SKU" }, value: "3,992" },
      { label: { en: "Cost per order", vi: "Chi phí / đơn" }, value: "4,292₫" },
    ],
  },
  {
    id: "live-gmvmax-month",
    category: "ecommerce",
    image: ecomLiveGmvMaxMonth,
    platform: "TikTok GMV Max — Livestream",
    period: "1 – 31 Mar 2026",
    span: "normal",
    title: {
      en: "A full month of daily livestream at 10.80x ROI",
      vi: "Trọn tháng livestream hàng ngày, ROI 10.80x",
    },
    note: {
      en: "Daily livestream ads run every day for 31 days: 7,727 SKU orders at a stable 11,330₫ cost per order.",
      vi: "Quảng cáo livestream chạy đều 31 ngày liên tục: 7.727 đơn SKU, chi phí mỗi đơn ổn định ở 11.330đ.",
    },
    alt: {
      en: "TikTok GMV Max livestream dashboard, March 2026: 87,544,431 VND cost, 945,809,949 VND revenue, ROI 10.80",
      vi: "Dashboard livestream GMV Max tháng 3/2026: chi phí 87.544.431đ, doanh thu 945.809.949đ, ROI 10.80",
    },
    stats: [
      { label: { en: "ROI", vi: "ROI" }, value: "10.80x", hero: true },
      { label: { en: "Ad spend", vi: "Chi phí" }, value: "87,544,431₫" },
      { label: { en: "Gross revenue", vi: "Doanh thu" }, value: "945,809,949₫" },
      { label: { en: "SKU orders", vi: "Đơn SKU" }, value: "7,727" },
      { label: { en: "Cost per order", vi: "Chi phí / đơn" }, value: "11,330₫" },
    ],
  },
  {
    id: "live-topkoc",
    category: "ecommerce",
    image: ecomLiveTopKoc,
    platform: "TikTok GMV Max — Top KOC",
    period: "1 – 13 Mar 2026",
    span: "normal",
    title: {
      en: "Budget concentrated on top KOCs for 18.06x ROI",
      vi: "Dồn ngân sách vào Top KOC, đạt ROI 18.06x",
    },
    note: {
      en: "Rather than spreading spend evenly, budget was pushed into the creators already converting. 1,927 orders at 6,383₫ each.",
      vi: "Thay vì chia đều ngân sách, dồn tiền vào các KOC đang chuyển đổi tốt. 1.927 đơn, mỗi đơn 6.383đ.",
    },
    alt: {
      en: "TikTok GMV Max top KOC report: 12,300,000 VND cost, 222,145,240 VND revenue, ROI 18.06, 1,927 SKU orders",
      vi: "Báo cáo GMV Max Top KOC: chi phí 12.300.000đ, doanh thu 222.145.240đ, ROI 18.06, 1.927 đơn SKU",
    },
    stats: [
      { label: { en: "ROI", vi: "ROI" }, value: "18.06x", hero: true },
      { label: { en: "Ad spend", vi: "Chi phí" }, value: "12,300,000₫" },
      { label: { en: "Gross revenue", vi: "Doanh thu" }, value: "222,145,240₫" },
      { label: { en: "SKU orders", vi: "Đơn SKU" }, value: "1,927" },
      { label: { en: "Cost per order", vi: "Chi phí / đơn" }, value: "6,383₫" },
    ],
  },
  {
    id: "live-session",
    category: "ecommerce",
    image: ecomLiveSession,
    platform: "TikTok GMV Max — Single session",
    period: "One livestream session",
    span: "normal",
    title: {
      en: "One livestream session: 39.4M₫ GMV at 14.46x",
      vi: "Một phiên livestream: GMV 39,4 triệu, ROI 14.46x",
    },
    note: {
      en: "Session-level view of how a single stream performs — 37.5% LIVE CTR and a 22-second average watch time is what carried the 2.46M₫ GMV per hour.",
      vi: "Góc nhìn chi tiết một phiên live — LIVE CTR 37,5% và thời lượng xem trung bình 22 giây chính là thứ kéo GMV lên 2,46 triệu/giờ.",
    },
    alt: {
      en: "TikTok livestream session dashboard: 39,363,040 VND GMV, ROI 14.46, 465 items sold, 7,720 viewers",
      vi: "Dashboard phiên livestream: GMV 39.363.040đ, ROI 14.46, 465 sản phẩm bán, 7.720 người xem",
    },
    stats: [
      { label: { en: "GMV Max ROI", vi: "ROI GMV Max" }, value: "14.46x", hero: true },
      { label: { en: "Session GMV", vi: "GMV phiên" }, value: "39,363,040₫" },
      { label: { en: "Ad cost", vi: "Chi phí" }, value: "3,010,000₫" },
      { label: { en: "Items sold", vi: "SP đã bán" }, value: "465" },
      { label: { en: "Viewers", vi: "Người xem" }, value: "7,720" },
      { label: { en: "GMV per hour", vi: "GMV mỗi giờ" }, value: "2,460,000₫" },
      { label: { en: "LIVE CTR", vi: "LIVE CTR" }, value: "37.5%" },
      { label: { en: "Avg. watch time", vi: "Thời lượng xem TB" }, value: "22s" },
      { label: { en: "Impressions", vi: "Lượt hiển thị" }, value: "1,130,000" },
    ],
  },

  /* ---------------- APP INSTALL / LEAD GEN ---------------- */
  {
    id: "meta-landingpage-conversion",
    category: "ecommerce",
    image: ecomMetaLanding,
    imagePosition: "object-right-top",
    platform: "Meta Ads — Landing page conversion",
    period: "14 – 16 Aug 2026",
    span: "normal",
    title: {
      en: "E-commerce landing page test at 7.51x purchase ROAS",
      vi: "Test landing page ecom, Purchase ROAS 7.51x",
    },
    note: {
      en: "Short budget window on a single campaign to validate a new landing page before scaling. 247 link clicks converted into 29 website purchases at 9.40% CTR.",
      vi: "Chạy thử ngân sách ngắn trên 1 campaign để kiểm chứng landing page mới trước khi scale. 247 lượt click ra 29 đơn mua hàng trên website, CTR 9.40%.",
    },
    alt: {
      en: "Meta Ads Manager campaign report, 14–16 Aug 2026: 515,336 VND spent, 29 website purchases, 7.51 purchase ROAS, 9.40% CTR",
      vi: "Báo cáo chiến dịch Meta Ads Manager 14–16/8/2026: chi 515.336đ, 29 đơn mua hàng trên website, ROAS 7.51, CTR 9.40%",
    },
    stats: [
      { label: { en: "Purchase ROAS", vi: "Purchase ROAS" }, value: "7.51x", hero: true },
      { label: { en: "Website purchases", vi: "Đơn mua hàng" }, value: "29" },
      { label: { en: "Ad spend", vi: "Chi phí" }, value: "515,336₫" },
      { label: { en: "Cost per purchase", vi: "Chi phí / đơn" }, value: "17,770₫" },
      { label: { en: "CTR", vi: "CTR" }, value: "9.40%" },
      { label: { en: "Link clicks", vi: "Lượt click liên kết" }, value: "247" },
      { label: { en: "CPC", vi: "CPC" }, value: "1,416₫" },
      { label: { en: "Reach", vi: "Tiếp cận" }, value: "2,822" },
    ],
  },
  {
    id: "meta-app-install",
    category: "acquisition",
    image: uaMetaAppInstall,
    platform: "Meta Ads — App install",
    period: "1 Jan – 30 Apr 2025",
    span: "wide",
    title: {
      en: "12,543 mobile app installs at 8,610₫ each",
      vi: "12.543 lượt cài app, chi phí 8.610đ mỗi lượt",
    },
    note: {
      en: "Four months on the BUTL/Bship mobility app across 7 ad sets. The two ad sets carrying most of the volume held their cost per install near 8,100₫ while scaling past 41M₫ of spend each.",
      vi: "Bốn tháng cho app di chuyển BUTL/Bship với 7 nhóm quảng cáo. Hai nhóm gánh phần lớn volume vẫn giữ chi phí mỗi lượt cài quanh 8.100đ dù đã đẩy chi tiêu vượt 41 triệu mỗi nhóm.",
    },
    alt: {
      en: "Meta Ads Manager, January to April 2025: 7 ad sets, 12,543 mobile app installs, 107,993,094 VND total spent, 8,610 VND per install",
      vi: "Meta Ads Manager từ 1/2025 đến 4/2025: 7 nhóm QC, 12.543 lượt cài app, tổng chi 107.993.094đ, 8.610đ mỗi lượt cài",
    },
    stats: [
      { label: { en: "Cost per install", vi: "Chi phí / lượt cài" }, value: "8,610₫", hero: true },
      { label: { en: "App installs", vi: "Lượt cài app" }, value: "12,543" },
      { label: { en: "Total spent", vi: "Tổng chi" }, value: "107,993,094₫" },
      { label: { en: "Impressions", vi: "Lượt hiển thị" }, value: "6,970,074" },
      { label: { en: "Reach", vi: "Tiếp cận" }, value: "1,337,881" },
      { label: { en: "Ad sets", vi: "Nhóm quảng cáo" }, value: "7" },
    ],
  },
  {
    id: "google-app-install",
    category: "acquisition",
    image: uaGoogleAppInstall,
    platform: "Google App Campaigns",
    period: "1 Oct 2024 – 30 Apr 2025",
    span: "normal",
    title: {
      en: "13,554 installs at 5,333₫ across seven months",
      vi: "13.554 lượt cài, 5.333đ mỗi lượt trong bảy tháng",
    },
    note: {
      en: "Sustained target-CPA app campaigns. The best campaign in the account converted at 55.03% and delivered installs at 5,063₫ — roughly a third of what the weakest line was paying.",
      vi: "Chiến dịch app chạy target CPA dài hạn. Campaign tốt nhất tài khoản đạt tỷ lệ chuyển đổi 55,03% với chi phí 5.063đ mỗi lượt cài — chỉ bằng khoảng một phần ba nhóm kém nhất.",
    },
    alt: {
      en: "Google Ads app campaigns, October 2024 to April 2025: 13,554 installs, 72,279,193 VND cost, 5,333 VND cost per install",
      vi: "Google Ads app campaigns từ 10/2024 đến 4/2025: 13.554 lượt cài, chi phí 72.279.193đ, 5.333đ mỗi lượt cài",
    },
    stats: [
      { label: { en: "Cost per install", vi: "Chi phí / lượt cài" }, value: "5,333₫", hero: true },
      { label: { en: "App installs", vi: "Lượt cài app" }, value: "13,554" },
      { label: { en: "Campaign cost", vi: "Chi phí chiến dịch" }, value: "72,279,193₫" },
      { label: { en: "Conversions", vi: "Chuyển đổi" }, value: "16,440" },
      { label: { en: "Cost per conv.", vi: "Chi phí / chuyển đổi" }, value: "4,397₫" },
      { label: { en: "In-app actions", vi: "Hành động trong app" }, value: "2,886" },
    ],
  },
  {
    id: "meta-lead-gen",
    category: "acquisition",
    image: uaMetaLeadGen,
    platform: "Meta Ads — Lead generation",
    period: "1 Jan – 28 Feb 2025",
    span: "normal",
    title: {
      en: "4,432 completed registrations at 9,867₫",
      vi: "4.432 lượt đăng ký hoàn tất, giá 9.867đ",
    },
    note: {
      en: "Website registration campaigns across 8 ad sets. Cost per registration ranged from 7,867₫ to 14,206₫, so budget kept moving toward the cheaper half of the set.",
      vi: "Chiến dịch đăng ký trên website với 8 nhóm quảng cáo. Chi phí mỗi lượt đăng ký dao động 7.867đ – 14.206đ, nên ngân sách liên tục được dịch về nửa rẻ hơn.",
    },
    alt: {
      en: "Meta Ads Manager lead generation report, January to February 2025: 4,432 completed registrations, 43,728,591 VND spent, 9,867 VND per registration",
      vi: "Báo cáo lead generation Meta Ads từ 1/2025 đến 2/2025: 4.432 lượt đăng ký hoàn tất, chi 43.728.591đ, 9.867đ mỗi lượt",
    },
    stats: [
      { label: { en: "Cost per registration", vi: "Chi phí / đăng ký" }, value: "9,867₫", hero: true },
      { label: { en: "Registrations", vi: "Lượt đăng ký" }, value: "4,432" },
      { label: { en: "Total spent", vi: "Tổng chi" }, value: "43,728,591₫" },
      { label: { en: "Impressions", vi: "Lượt hiển thị" }, value: "1,556,559" },
      { label: { en: "CTR (link)", vi: "CTR (liên kết)" }, value: "1.60%" },
      { label: { en: "CPC", vi: "CPC" }, value: "1,753₫" },
    ],
  },
  {
    id: "apple-ua",
    category: "acquisition",
    image: uaApple,
    platform: "Apple Search Ads",
    period: "1 – 31 Jan 2025",
    span: "normal",
    title: {
      en: "App Store installs at $1.45 and a 38.5% conversion rate",
      vi: "Cài app từ App Store giá $1.45, tỷ lệ chuyển đổi 38,5%",
    },
    note: {
      en: "High-intent App Store search terms. Nearly four in ten taps became an install, which is what keeps the CPA this low on a $30/day budget.",
      vi: "Nhắm từ khoá tìm kiếm ý định cao trên App Store. Gần 4/10 lượt tap thành lượt cài — đó là lý do CPA giữ được mức thấp với ngân sách $30/ngày.",
    },
    alt: {
      en: "Apple Search Ads campaign report, January 2025: 461 installs, $1.45 average CPA, 38.5% tap-through conversion rate",
      vi: "Báo cáo Apple Search Ads tháng 1/2025: 461 lượt cài, CPA trung bình $1.45, tỷ lệ chuyển đổi 38,5%",
    },
    stats: [
      { label: { en: "Avg. CPA", vi: "CPA trung bình" }, value: "$1.45", hero: true },
      { label: { en: "Installs", vi: "Lượt cài" }, value: "461" },
      { label: { en: "Spend", vi: "Chi phí" }, value: "$668.78" },
      { label: { en: "Conversion rate", vi: "Tỷ lệ chuyển đổi" }, value: "38.5%" },
      { label: { en: "Impressions", vi: "Lượt hiển thị" }, value: "36,601" },
      { label: { en: "Cost per tap", vi: "Chi phí / tap" }, value: "$0.70" },
    ],
  },
  {
    id: "zalo-ua",
    category: "acquisition",
    image: uaZalo,
    platform: "Zalo Ads",
    period: "Nov – Dec 2024",
    span: "normal",
    title: {
      en: "6.47M domestic impressions for local reach",
      vi: "6,47 triệu lượt hiển thị nội địa cho độ phủ địa phương",
    },
    note: {
      en: "Zalo carries reach that Meta and Google cannot buy in Vietnam. Used here as a local awareness layer underneath the performance channels rather than a direct-response line.",
      vi: "Zalo có độ phủ mà Meta và Google không mua được tại Việt Nam. Ở đây dùng như lớp nhận diện địa phương bên dưới các kênh performance, không phải kênh direct-response.",
    },
    alt: {
      en: "Zalo Ads campaign dashboard: 6 campaigns, 6,468,180 impressions, 7,117 clicks, 11,839,252 VND cost",
      vi: "Dashboard chiến dịch Zalo Ads: 6 chiến dịch, 6.468.180 lượt hiển thị, 7.117 click, chi phí 11.839.252đ",
    },
    stats: [
      { label: { en: "Impressions", vi: "Lượt hiển thị" }, value: "6,468,180", hero: true },
      { label: { en: "Campaigns", vi: "Số chiến dịch" }, value: "6" },
      { label: { en: "Clicks", vi: "Lượt click" }, value: "7,117" },
      { label: { en: "Total cost", vi: "Tổng chi" }, value: "11,839,252₫" },
    ],
  },
];
