import { Phone, MessageCircle } from "lucide-react";

// Update this once — both buttons below use it.
const PHONE_NUMBER = "9917529504";

export default function FloatingContact() {
  const telHref = `tel:+91${PHONE_NUMBER}`;
  const waHref = `https://wa.me/91${PHONE_NUMBER}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <a
        href={telHref}
        aria-label={`Call ${PHONE_NUMBER}`}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-600 text-white shadow-lg transition hover:scale-105 hover:bg-brand-700"
      >
        <Phone size={26} />
      </a>
      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`WhatsApp ${PHONE_NUMBER}`}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105 hover:bg-[#1DA851]"
      >
        <MessageCircle size={26} />
      </a>
    </div>
  );
}
