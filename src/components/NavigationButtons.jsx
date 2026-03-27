export default function NavigationButtons({
  step,
  totalSteps,
  onBack,
  onNext,
  canContinue,
}) {
  const isLastStep = step === totalSteps;

  return (
    <div className="navigation-buttons">
      <button
        type="button"
        className="action-button action-button--secondary"
        onClick={onBack}
        disabled={step === 1}
      >
        Volver atrás
      </button>

      <button
        type="button"
        className="action-button action-button--primary"
        onClick={onNext}
        disabled={!canContinue}
      >
        {isLastStep ? "Finalizar" : "Siguiente"}
      </button>
    </div>
  );
}