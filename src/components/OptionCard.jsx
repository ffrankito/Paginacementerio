export default function OptionCard({
  title,
  desc,
  selected = false,
  onClick,
  icon: Icon,
  variant = "default",
}) {
  return (
    <button
      type="button"
      className={`option-card option-card--${variant} ${selected ? "selected" : ""}`}
      onClick={onClick}
      aria-pressed={selected}
    >
      <span className="option-card__content">
        {Icon && (
          <span className="option-card__icon-wrap">
            <Icon className="option-card__icon" strokeWidth={1.8} />
          </span>
        )}

        <h3 className="option-card__title">{title}</h3>
        <p className="option-card__desc">{desc}</p>
      </span>
    </button>
  );
}