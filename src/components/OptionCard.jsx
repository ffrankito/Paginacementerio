export default function OptionCard({
  title,
  desc,
  selected = false,
  onClick,
}) {
  return (
    <button
      type="button"
      className={`option-card ${selected ? "selected" : ""}`}
      onClick={onClick}
      aria-pressed={selected}
    >
      <span className="option-card__content">
        <h3 className="option-card__title">{title}</h3>
        <p className="option-card__desc">{desc}</p>
      </span>
    </button>
  );
}