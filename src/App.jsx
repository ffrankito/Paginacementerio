import { useState } from "react";
import "./index.css";
import StepIndicator from "./components/StepIndicator";
import NavigationButtons from "./components/NavigationButtons";
import OptionCard from "./components/OptionCard";
import { petTypes } from "./data/petTypes";
import { sizes } from "./data/sizes";
import { services } from "./data/services";

const TOTAL_STEPS = 3;

export default function App() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    petType: "",
    size: "",
    service: "",
  });

  const handleNext = () => {
    if (!canContinue()) return;
    if (step < TOTAL_STEPS) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  const canContinue = () => {
    if (step === 1) return formData.petType !== "";
    if (step === 2) return formData.size !== "";
    if (step === 3) return formData.service !== "";
    return false;
  };

  const renderStepContent = () => {
    if (step === 1) {
      return (
        <>
          <div className="workspace__header">
            <h2 className="section-title">¿Qué tipo de mascota es?</h2>
            <p className="section-text">
              Seleccioná la categoría que mejor representa a tu mascota.
            </p>
          </div>

          <div className="grid grid-2">
            {petTypes.map((item) => (
              <OptionCard
                key={item.id}
                title={item.title}
                desc={item.desc}
                selected={formData.petType === item.id}
                onClick={() =>
                  setFormData((prev) => ({ ...prev, petType: item.id }))
                }
              />
            ))}
          </div>
        </>
      );
    }

    if (step === 2) {
      return (
        <>
          <div className="workspace__header">
            <h2 className="section-title">¿Qué tamaño tiene?</h2>
            <p className="section-text">
              Esto nos permite preparar correctamente la logística del servicio.
            </p>
          </div>

          <div className="grid grid-2">
            {sizes.map((item) => (
              <OptionCard
                key={item.id}
                title={item.title}
                desc={item.desc}
                selected={formData.size === item.id}
                onClick={() =>
                  setFormData((prev) => ({ ...prev, size: item.id }))
                }
              />
            ))}
          </div>
        </>
      );
    }

    return (
      <>
        <div className="workspace__header">
          <h2 className="section-title">Elegí el servicio</h2>
          <p className="section-text">
            Seleccioná la opción que mejor acompañe este momento.
          </p>
        </div>

        <div className="grid grid-2">
          {services.map((item) => (
            <OptionCard
              key={item.id}
              title={item.title}
              desc={item.desc}
              selected={formData.service === item.id}
              onClick={() =>
                setFormData((prev) => ({ ...prev, service: item.id }))
              }
            />
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="app">
      <div className="container">
        <header className="hero card-shell">
          <span className="hero__badge">Cotizador online</span>
          <h1 className="hero__title">Elegí el homenaje para tu mascota</h1>
          <p className="hero__text">
            Plataforma de cotización paso a paso para servicios funerarios para
            mascotas, con una experiencia visual moderna, profesional y
            escalable.
          </p>
        </header>

        <StepIndicator step={step} totalSteps={TOTAL_STEPS} />

        <main className="layout">
          <section className="workspace card-shell">
            {renderStepContent()}

            <NavigationButtons
              step={step}
              totalSteps={TOTAL_STEPS}
              onBack={handleBack}
              onNext={handleNext}
              canContinue={canContinue()}
            />
          </section>

          <aside className="summary card-shell">
            <h3 className="summary__title">Resumen</h3>

            <div className="summary__box">
              <p>
                <strong>Mascota:</strong>{" "}
                {petTypes.find((item) => item.id === formData.petType)?.title ||
                  "—"}
              </p>
              <p>
                <strong>Tamaño:</strong>{" "}
                {sizes.find((item) => item.id === formData.size)?.title || "—"}
              </p>
              <p>
                <strong>Servicio:</strong>{" "}
                {services.find((item) => item.id === formData.service)?.title ||
                  "—"}
              </p>
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
}