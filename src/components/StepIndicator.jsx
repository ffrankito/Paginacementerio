export default function StepIndicator({ step, totalSteps }) {
  return (
    <div className="step-indicator-wrapper">
      <div className="step-indicator" aria-label="Progreso del cotizador">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const currentStep = index + 1;

          return (
            <div
              key={currentStep}
              className={`step-indicator__item ${
                step >= currentStep ? "is-active" : ""
              }`}
            >
              <span className="step-indicator__number">{currentStep}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}