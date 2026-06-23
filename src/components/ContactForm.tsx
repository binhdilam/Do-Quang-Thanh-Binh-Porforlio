import { useState, FormEvent } from "react";
import { translations } from "../translations";
import { MessageSquare, Phone, Mail, MapPin, Send, CheckCircle2, ShieldAlert } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ContactFormProps {
  lang: "en" | "vi";
}

export default function ContactForm({ lang }: ContactFormProps) {
  const t = translations[lang];

  // Lead form state
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
    message: ""
  });
  
  // Non-disclosure agreement checkbox
  const [requestNda, setRequestNda] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Form submission handler
  const handleSubmitForm = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch('/api/notify-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, requestNda }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Gửi thất bại, vui lòng thử lại.');
      }

      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setFormData({ name: "", email: "", phone: "", website: "", message: "" });
        setRequestNda(false);
      }, 8000);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Có lỗi xảy ra, vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-26 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
        
        {/* Left direct channel contact options */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <span className="font-sans text-sm font-semibold text-indigo-600 tracking-wide uppercase block mb-3">
              {lang === "en" ? "LEAD INTAKE GATEWAY" : "KÊNH LIÊN HỆ ĐỒNG BỘ"}
            </span>
            <h2 className="font-sans font-bold text-slate-900 tracking-tight text-3xl sm:text-4.5xl mb-4 leading-tight">
              {t.contact.title}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8 font-sans">
              {t.contact.subtitle}
            </p>

            <h3 className="font-sans font-bold text-slate-800 text-xs sm:text-sm uppercase tracking-wider mb-5">
              {t.contact.directTitle}
            </h3>

            <div className="space-y-4">
              
              {/* Zalo Direct click */}
              <a 
                href="https://zalo.me/0788351752" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-3.5 p-4 rounded-xl bg-white border border-slate-200 hover:border-indigo-600/30 transition-all group cursor-pointer shadow-sm"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-100 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <span className="text-slate-500 font-sans text-xs font-semibold tracking-wider block uppercase mb-1">
                    {t.contact.directZalo}
                  </span>
                  <span className="font-sans font-bold text-slate-900 text-sm sm:text-base leading-none">
                    zalo.me/0788351752
                  </span>
                </div>
              </a>

              {/* Phone call hotline */}
              <a 
                href="tel:+84788351752"
                className="flex items-center gap-3.5 p-4 rounded-xl bg-white border border-slate-200 hover:border-indigo-600/30 transition-all group cursor-pointer shadow-sm"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                  <Phone className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <span className="text-slate-500 font-sans text-xs font-semibold tracking-wider block uppercase mb-1">
                    {t.contact.directTel}
                  </span>
                  <span className="font-sans font-bold text-slate-900 text-sm sm:text-base leading-none">
                    +84 788 351 752
                  </span>
                </div>
              </a>

              {/* Email Channel link */}
              <a 
                href="mailto:thanhbinh72.work@gmail.com"
                className="flex items-center gap-3.5 p-4 rounded-xl bg-white border border-slate-200 hover:border-indigo-600/30 transition-all group cursor-pointer shadow-sm"
              >
                <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                  <Mail className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <span className="text-slate-500 font-sans text-xs font-semibold tracking-wider block uppercase mb-1">
                    {t.contact.directEmail}
                  </span>
                  <span className="font-sans font-bold text-slate-900 text-xs sm:text-sm break-all leading-none">
                    thanhbinh72.work@gmail.com
                  </span>
                </div>
              </a>

              {/* geographical location */}
              <div className="flex items-center gap-3.5 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="w-10 h-10 rounded-lg bg-slate-200 text-slate-600 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-slate-500 font-sans text-xs font-semibold tracking-wider block uppercase mb-1">
                    {t.contact.directLocation}
                  </span>
                  <span className="font-sans font-bold text-slate-800 text-xs sm:text-sm">
                    Ho Chi Minh City, Vietnam
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Quick trust metrics */}
          <div className="mt-8 pt-6 border-t border-slate-200/60 hidden lg:block">
            <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest block mb-2">
              {lang === "en" ? "Airtight Non-disclosure Guarantee" : "BẢO MẬT THÔNG TIN TUYỆT ĐỐI"}
            </span>
            <p className="text-slate-500 text-xs leading-relaxed max-w-sm">
              {lang === "en" ? "All product codes, pixel tags, and budget details are covered by standard NDA contracts prior to campaign scaling." : "Mọi thông số kỹ thuật, pixel và ngân sách phân bổ đều được bảo vệ và tối ưu đúng chuẩn hợp đồng NDA chặt chẽ trước khi dồn lực triển khai."}
            </p>
          </div>

        </div>

        {/* Right Direct Submission Lead Intake Form */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 sm:p-9 shadow-sm">
          
          <AnimatePresence mode="wait">
            {!formSubmitted ? (
              <motion.form 
                key="contact-form"
                onSubmit={handleSubmitForm} 
                className="space-y-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                
                {/* Name field */}
                <div>
                  <label className="block text-slate-705 text-xs font-semibold mb-2 lowercase tracking-wider uppercase">
                    {t.contact.formName} *
                  </label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. Unilever Beauty brand manager"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 font-sans text-sm focus:bg-white focus:outline-primary placeholder:text-slate-400"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Email field */}
                  <div>
                    <label className="block text-slate-705 text-xs font-semibold mb-2 lowercase tracking-wider uppercase">
                      {t.contact.formEmail} *
                    </label>
                    <input 
                      type="email"
                      required
                      placeholder="manager@brandname.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 font-sans text-sm focus:bg-white focus:outline-primary placeholder:text-slate-400"
                    />
                  </div>

                  {/* Phone field */}
                  <div>
                    <label className="block text-slate-705 text-xs font-semibold mb-2 lowercase tracking-wider uppercase">
                      {t.contact.formPhone}
                    </label>
                    <input 
                      type="tel"
                      placeholder="0788351752"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 font-sans text-sm focus:bg-white focus:outline-primary placeholder:text-slate-400"
                    />
                  </div>

                </div>

                {/* Website link */}
                <div>
                  <label className="block text-slate-705 text-xs font-semibold mb-2 lowercase tracking-wider uppercase">
                    {t.contact.formWebsite}
                  </label>
                  <input 
                    type="url"
                    placeholder="https://brandname.com"
                    value={formData.website}
                    onChange={(e) => setFormData({...formData, website: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 font-sans text-sm focus:bg-white focus:outline-primary placeholder:text-slate-400"
                  />
                </div>

                {/* Message targeting */}
                <div>
                  <label className="block text-slate-705 text-xs font-semibold mb-2 lowercase tracking-wider uppercase">
                    {t.contact.formMsg}
                  </label>
                  <textarea 
                    rows={4}
                    placeholder={lang === "en" ? "Looking to scale on TikTok shop with $15k spend/mo..." : "Cần phát triển phễu đồng bộ lead cho sản phẩm app với ngân sách..."}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 font-sans text-sm focus:bg-white focus:outline-primary placeholder:text-slate-400 resize-none"
                  />
                </div>

                {/* NDA Pre-check */}
                <div className="flex items-center gap-2.5 p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700">
                  <input
                    type="checkbox"
                    id="nda"
                    checked={requestNda}
                    onChange={(e) => setRequestNda(e.target.checked)}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-600 accent-indigo-600 cursor-pointer"
                  />
                  <label htmlFor="nda" className="font-sans text-xs font-semibold cursor-pointer select-none">
                    {lang === "en" 
                      ? "🔒 Request mutual NDA agreement document prior to sharing campaign metrics" 
                      : "🔒 Đăng ký cấp quyền bảo mật thông số trung lập (NDA) trước khi trao đổi tệp"}
                  </label>
                </div>

                {requestNda && (
                  <motion.div 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-2 p-3 bg-indigo-50 border border-indigo-100 rounded-xl text-indigo-600 text-[11px]"
                  >
                    <ShieldAlert className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                    <span>
                      {lang === "en" 
                        ? "An editable mutual NDA document from Howard's legal partners will be attached with your automatically dispatched campaign proposal."
                        : "Văn bản mẫu bảo lãnh NDA từ đại lý pháp vụ của Howard sẽ tự động đính kèm cùng phản hồi đề xuất lên phễu sau 30 phút."}
                    </span>
                  </motion.div>
                )}

                {submitError && (
                  <p className="text-red-500 text-xs text-center">{submitError}</p>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-sans font-bold tracking-wide uppercase py-4 px-6 rounded-xl text-sm cursor-pointer transition-all flex items-center justify-center gap-2.5 shadow-sm"
                >
                  <Send className="w-4 h-4 text-emerald-400" />
                  <span>{isSubmitting ? (lang === "en" ? "Sending..." : "Đang gửi...") : t.contact.formBtn}</span>
                </button>

              </motion.form>
            ) : (
              <motion.div 
                key="success-prompt"
                className="text-center py-10 px-4 flex flex-col items-center justify-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-6 animate-bounce">
                  <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
                </div>
                <h3 className="font-sans font-bold text-slate-900 text-xl sm:text-2xl mb-4 uppercase tracking-tight">
                  {lang === "en" ? "Strategic Request Transmitted" : "Yêu Cầu Chiến Dịch Đã Đồng Bộ!"}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed max-w-md font-sans">
                  {t.contact.successMsg}
                </p>
                
                {/* n8n simulated indicator */}
                <div className="mt-8 p-4 bg-slate-50 border border-slate-100 rounded-2xl text-left w-full max-w-sm">
                  <span className="font-mono text-[9px] text-slate-400 font-bold block uppercase mb-2 tracking-widest">
                    n8n webhook pipeline response:
                  </span>
                  <div className="font-mono text-[11px] text-slate-600 space-y-1">
                    <p>✓ Syncing lead with Howard's WhatsApp messenger...</p>
                    <p className="text-emerald-600">✓ Status: ROUTER_200_SUCCESS_DISPATCHED</p>
                    <p>{requestNda ? "✓ Mutual NDA standard contract draft pre-compiled" : "✓ Non-NDA baseline route active"}</p>
                    <p>✓ Transmitted successfully to Howard inbox.</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
