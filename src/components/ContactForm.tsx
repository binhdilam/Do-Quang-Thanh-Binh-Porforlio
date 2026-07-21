import {
  useState,
  type ReactNode,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { translations } from "../translations";
import { ArrowUpRight, Check, Phone, Mail, Pin, Clock } from "./ui/Icons";

interface ContactFormProps {
  lang: "en" | "vi";
}

type Status = "idle" | "sending" | "sent" | "error";
type Errors = Partial<Record<"name" | "email" | "message", string>>;

const validation = {
  en: {
    nameRequired: "Please enter your name or company.",
    emailRequired: "Please enter an email address.",
    emailInvalid: "That email address doesn't look right.",
    messageShort: "A sentence or two about your product helps me reply usefully.",
    failed: "The message couldn't be sent. Please email me directly at thanhbinh72.work@gmail.com.",
  },
  vi: {
    nameRequired: "Vui lòng nhập tên bạn hoặc tên công ty.",
    emailRequired: "Vui lòng nhập địa chỉ email.",
    emailInvalid: "Địa chỉ email này có vẻ chưa đúng.",
    messageShort: "Một hai câu về sản phẩm sẽ giúp tôi phản hồi hữu ích hơn.",
    failed: "Không gửi được tin nhắn. Bạn gửi email trực tiếp tới thanhbinh72.work@gmail.com giúp tôi nhé.",
  },
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function ContactForm({ lang }: ContactFormProps) {
  const t = translations[lang];
  const v = validation[lang];

  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
    message: "",
  });

  const set = (k: keyof typeof form) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setErrors((prev) => ({ ...prev, [k]: undefined }));
  };

  const validate = (): boolean => {
    const next: Errors = {};
    if (!form.name.trim()) next.name = v.nameRequired;
    if (!form.email.trim()) next.email = v.emailRequired;
    else if (!EMAIL_RE.test(form.email.trim())) next.email = v.emailInvalid;
    if (form.message.trim().length > 0 && form.message.trim().length < 12)
      next.message = v.messageShort;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/notify-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="relative px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[30rem]"
        style={{
          background:
            "radial-gradient(55% 60% at 50% 100%, var(--color-brand-wash) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[88rem]">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          {/* ---- Left: the ask ---- */}
          <div className="lg:col-span-5">
            <div className="reveal lg:sticky lg:top-28">
              <span className="inline-block rounded-full border border-line bg-paper px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-brand">
                {lang === "en" ? "Contact" : "Liên hệ"}
              </span>
              <h2 className="display mt-6 text-4xl leading-tight text-ink sm:text-5xl">
                {t.contact.title}
              </h2>
              <p className="prose-measure mt-6 text-base leading-relaxed text-ink-2">
                {t.contact.subtitle}
              </p>

              <ul className="mt-10 space-y-5 border-t border-line pt-8">
                <ContactRow
                  icon={<Phone className="h-4 w-4" />}
                  label={t.contact.directTel}
                  value="+84 788 351 752"
                  href="tel:+84788351752"
                />
                <ContactRow
                  icon={<Mail className="h-4 w-4" />}
                  label={t.contact.directEmail}
                  value="thanhbinh72.work@gmail.com"
                  href="mailto:thanhbinh72.work@gmail.com"
                />
                <ContactRow
                  icon={<Pin className="h-4 w-4" />}
                  label={t.contact.directLocation}
                  value={
                    lang === "en"
                      ? "Ho Chi Minh City, Vietnam"
                      : "TP. Hồ Chí Minh, Việt Nam"
                  }
                />
                <ContactRow
                  icon={<Clock className="h-4 w-4" />}
                  label={lang === "en" ? "Response time" : "Thời gian phản hồi"}
                  value={
                    lang === "en" ? "Within 30 minutes" : "Trong vòng 30 phút"
                  }
                />
              </ul>
            </div>
          </div>

          {/* ---- Right: the form ---- */}
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="reveal bezel" style={{ transitionDelay: "120ms" }}>
              <div className="bezel-core p-6 sm:p-9 lg:p-10">
                {status === "sent" ? (
                  <div className="py-10 text-center">
                    <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-forest-wash text-forest">
                      <Check className="h-6 w-6" />
                    </span>
                    <h3 className="display mt-6 text-2xl text-ink sm:text-3xl">
                      {lang === "en" ? "Message received" : "Đã nhận được tin nhắn"}
                    </h3>
                    <p className="prose-measure mx-auto mt-4 text-sm leading-relaxed text-ink-2">
                      {t.contact.successMsg}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={submit} noValidate>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field
                        id="name"
                        label={t.contact.formName}
                        value={form.name}
                        onChange={set("name")}
                        error={errors.name}
                        required
                        autoComplete="name"
                      />
                      <Field
                        id="email"
                        type="email"
                        label={t.contact.formEmail}
                        value={form.email}
                        onChange={set("email")}
                        error={errors.email}
                        required
                        autoComplete="email"
                      />
                      <Field
                        id="phone"
                        type="tel"
                        label={t.contact.formPhone}
                        value={form.phone}
                        onChange={set("phone")}
                        autoComplete="tel"
                      />
                      <Field
                        id="website"
                        type="url"
                        label={t.contact.formWebsite}
                        value={form.website}
                        onChange={set("website")}
                        autoComplete="url"
                      />
                    </div>

                    <div className="mt-5">
                      <Field
                        id="message"
                        label={t.contact.formMsg}
                        value={form.message}
                        onChange={set("message")}
                        error={errors.message}
                        textarea
                      />
                    </div>

                    {status === "error" && (
                      <p
                        role="alert"
                        className="mt-5 rounded-xl border border-brand/30 bg-brand-wash px-4 py-3 text-sm leading-relaxed text-brand-deep"
                      >
                        {v.failed}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="group mt-8 inline-flex w-full items-center justify-center gap-3 rounded-full bg-ink py-2 pl-6 pr-2 text-sm font-semibold text-paper transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-brand-deep active:scale-[0.99] disabled:opacity-60 sm:w-auto"
                    >
                      {status === "sending"
                        ? lang === "en"
                          ? "Sending…"
                          : "Đang gửi…"
                        : t.contact.formBtn}
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-paper/12 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105">
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  required,
  textarea,
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
  autoComplete?: string;
}) {
  const cls = `w-full rounded-xl border bg-paper-2 px-4 py-3 text-sm text-ink placeholder:text-ink-4 transition-colors duration-500 ${
    error ? "border-brand" : "border-line focus:border-ink-4"
  }`;

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.13em] text-ink-3"
      >
        {label}
        {required && <span className="ml-1 text-brand">*</span>}
      </label>

      {textarea ? (
        <textarea
          id={id}
          name={id}
          rows={5}
          value={value}
          onChange={onChange}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`${cls} resize-y`}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          autoComplete={autoComplete}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cls}
        />
      )}

      {error && (
        <p id={`${id}-error`} role="alert" className="mt-2 text-xs text-brand-deep">
          {error}
        </p>
      )}
    </div>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line bg-paper-2 text-ink-3 transition-colors duration-500 group-hover:border-brand/40 group-hover:bg-brand-wash group-hover:text-brand">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-4">
          {label}
        </span>
        <span className="block truncate text-sm font-semibold text-ink">
          {value}
        </span>
      </span>
    </>
  );

  return (
    <li>
      {href ? (
        <a href={href} className="group flex items-center gap-4">
          {inner}
        </a>
      ) : (
        <div className="group flex items-center gap-4">{inner}</div>
      )}
    </li>
  );
}
