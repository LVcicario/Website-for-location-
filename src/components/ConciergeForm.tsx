import { useState, type FormEvent } from "react";
import type { Locale } from "~/i18n/config";
import { t } from "~/i18n/ui";

interface Props {
  locale: Locale;
}

type Status = "idle" | "sending" | "success" | "error";

export default function ConciergeForm({ locale }: Props) {
  const strings = t(locale).concierge;
  const [status, setStatus] = useState<Status>("idle");
  const [website, setWebsite] = useState("");

  const endpoint = import.meta.env.PUBLIC_CONCIERGE_ENDPOINT;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (website) return;
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      dates: String(data.get("dates") ?? ""),
      message: String(data.get("message") ?? ""),
      locale,
    };

    if (!endpoint) {
      const subject = encodeURIComponent(`L'Arbois — ${payload.name}`);
      const body = encodeURIComponent(
        `Name: ${payload.name}\nEmail: ${payload.email}\nDates: ${payload.dates}\n\n${payload.message}`,
      );
      window.location.href = `mailto:concierge@larbois.example?subject=${subject}&body=${body}`;
      setStatus("success");
      form.reset();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="concierge-form grid gap-6" noValidate>
      <label className="sr-only" htmlFor="concierge-website">Website</label>
      <input
        id="concierge-website"
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid gap-6 md:grid-cols-2">
        <Field id="concierge-name" name="name" label={strings.name} required autoComplete="name" />
        <Field id="concierge-email" name="email" label={strings.email} type="email" required autoComplete="email" />
      </div>
      <Field id="concierge-dates" name="dates" label={strings.dates} placeholder="—" />
      <Field id="concierge-message" name="message" label={strings.message} textarea />

      <div className="flex flex-wrap items-center gap-6 mt-2">
        <button type="submit" className="btn btn--primary" disabled={status === "sending"} data-magnetic>
          <span>{status === "sending" ? strings.sending : strings.submit}</span>
          <span aria-hidden="true" className="btn__arrow">→</span>
        </button>
        {status === "success" && <p className="eyebrow text-[var(--color-gold)]">{strings.success}</p>}
        {status === "error" && <p className="eyebrow text-red-300">{strings.error}</p>}
      </div>
    </form>
  );
}

interface FieldProps {
  id: string;
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  placeholder?: string;
  textarea?: boolean;
}

function Field({ id, name, label, type = "text", required, autoComplete, placeholder, textarea }: FieldProps) {
  const shared = "w-full bg-transparent border-0 border-b border-[var(--color-bone-soft)]/25 py-3 text-[var(--color-bone)] focus:border-[var(--color-gold)] focus:outline-none placeholder:text-[var(--color-bone-soft)]/40 transition-colors";

  return (
    <div className="field">
      <label htmlFor={id} className="eyebrow mb-2 block">{label}{required && " *"}</label>
      {textarea ? (
        <textarea id={id} name={name} rows={4} required={required} placeholder={placeholder} className={shared} />
      ) : (
        <input id={id} name={name} type={type} required={required} autoComplete={autoComplete} placeholder={placeholder} className={shared} />
      )}
    </div>
  );
}
