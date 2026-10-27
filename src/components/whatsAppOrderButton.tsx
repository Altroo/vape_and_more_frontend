import { waHref } from '@/utils/whatsapp';

export const WhatsAppOrderButton = ({
	phone,
	message,
	label,
	ariaLabel,
	className = '',
}: {
	phone: string;
	message: string;
	label: string;
	ariaLabel?: string;
	className?: string;
}) => (
	<a
		className={`af15k-whatsapp-button ${className}`.trim()}
		href={waHref(phone, message)}
		target="_blank"
		rel="noopener noreferrer"
		aria-label={ariaLabel}
	>
		<svg className="af15k-whatsapp-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
			<path
				d="M20.52 11.62a8.36 8.36 0 0 1-12.33 7.39L4 20l1.06-4.05a8.36 8.36 0 1 1 15.46-4.33Z"
				stroke="currentColor"
				strokeWidth="1.85"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M8.87 8.45c.16-.37.33-.38.57-.39h.48c.15 0 .35.06.4.33l.55 1.45c.06.17.03.37-.1.52l-.42.51c-.12.14-.1.3.01.45.29.49.71.94 1.16 1.32.52.44 1.04.72 1.56.9.16.06.33.04.45-.09l.5-.57c.13-.15.3-.2.48-.13l1.36.64c.22.1.28.22.25.43-.06.43-.24.87-.57 1.1-.24.17-.56.3-1 .26-.5-.05-1.52-.44-2.85-1.67-1.06-.98-1.78-2.16-1.97-2.72-.19-.56-.2-1.02-.09-1.3Z"
				stroke="currentColor"
				strokeWidth="1.45"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
		{label}
	</a>
);
