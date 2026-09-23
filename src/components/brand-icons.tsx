/** Official third-party marks — colours are the brand-specified values. */

const WA_GLYPH =
  "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z";

export function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path fill="currentColor" fillRule="evenodd" d={WA_GLYPH} />
    </svg>
  );
}

export function WhatsAppAppIcon({ size = 52 }: { size?: number }) {
  return (
    <svg
      className="ios-app-icon ios-app-icon-whatsapp"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <rect width="24" height="24" rx="5.4" fill="#25D366" />
      <path fill="#fff" fillRule="evenodd" d={WA_GLYPH} />
    </svg>
  );
}

export function GmailAppIcon({ size = 52 }: { size?: number }) {
  return (
    <svg
      className="ios-app-icon ios-app-icon-gmail"
      width={size}
      height={size}
      viewBox="0 0 48 48"
      aria-hidden="true"
      focusable="false"
    >
      <rect width="48" height="48" rx="10.8" fill="#fff" />
      <path fill="#4caf50" d="M45 16.2 40 18.95 35 23.7 35 40h7c1.657 0 3-1.343 3-3V16.2z" />
      <path fill="#1e88e5" d="M3 16.2 6.614 17.91 13 23.25V40H6c-1.657 0-3-1.343-3-3V16.2z" />
      <polygon fill="#e53935" points="35,11.2 24,17.75 13,11.2 12,17 13,23.25 24,29.75 35,23.25 36,17" />
      <path
        fill="#c62828"
        d="M3 12.298V16.2l10 7.05V11.2L9.876 8.862C9.132 8.301 8.228 8 7.298 8h0C4.619 8 3 9.619 3 12.298z"
      />
      <path
        fill="#fbc02d"
        d="M45 12.298V16.2l-10 7.05V11.2l3.124-2.338C38.868 8.301 39.772 8 40.702 8h0C43.381 8 45 9.619 45 12.298z"
      />
    </svg>
  );
}

export function MapsAppIcon({ size = 52 }: { size?: number }) {
  return (
    <svg
      className="ios-app-icon ios-app-icon-maps"
      width={size}
      height={size}
      viewBox="0 0 64 64"
      aria-hidden="true"
      focusable="false"
    >
      <rect width="64" height="64" rx="14.4" fill="#fff" />
      <path fill="#34A853" d="M0 14C0 6.268 6.268 0 14 0h18v30L14 52H0V14z" />
      <path fill="#FBBC04" d="M32 0h18c7.732 0 14 6.268 14 14v18L44 54 32 30V0z" />
      <path fill="#4285F4" d="M0 48l18-14 22 18v.5C40 60.09 33.09 64 25.5 64H14C6.268 64 0 57.732 0 50v-2z" />
      <path fill="#EA4335" d="M32 8c-8.284 0-15 6.716-15 15 0 11.25 15 28 15 28s15-16.75 15-28c0-8.284-6.716-15-15-15z" />
      <circle fill="#F6D95C" cx="32" cy="23" r="6.4" />
    </svg>
  );
}
