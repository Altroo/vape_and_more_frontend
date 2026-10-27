export const waHref = (phone: string, message: string) => `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
