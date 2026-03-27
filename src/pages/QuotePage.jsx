import { useState } from "react";
import StepIndicator from "../components/StepIndicator";
import NavigationButtons from "../components/NavigationButtons";
import OptionCard from "../components/OptionCard";
import { petTypes } from "../data/petTypes";
import { sizes } from "../data/sizes";
import { services } from "../data/services";
import { pickupMethods } from "../data/pickupMethods";
import { ashesDelivery } from "../data/ashesDelivery";
import { zones } from "../data/zones";

const TOTAL_STEPS = 8;

const initialFormData = {
  petType: "",
  size: "",
  service: "",
  pickupMethod: "",
  ashesDelivery: "",
  zone: "",
  petName: "",
  ownerName: "",
  phone: "",
  email: "",
  notes: "",
};

export default function QuotePage({ onBackHome }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(initialFormData);
  const [showOtherPetTypes, setShowOtherPetTypes] = useState(false);

  const principalPetTypes = petTypes.filter((item) => item.group === "principal");
  const otherPetTypes = petTypes.filter((item) => item.group === "otros");

  const handleNext = () => {
    if (!canContinue()) return;
    if (step < TOTAL_STEPS) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (step === 1 && showOtherPetTypes) {
      setShowOtherPetTypes(false);
      setFormData((prev) => ({ ...prev, petType: "" }));
      return;
    }

    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  const resetFlow = () => {
    setStep(1);
    setShowOtherPetTypes(false);
    setFormData(initialFormData);
  };

  const canContinue = () => {
    if (step === 1) return formData.petType !== "";
    if (step === 2) return formData.size !== "";
    if (step === 3) return formData.service !== "";
    if (step === 4) return formData.pickupMethod !== "";
    if (step === 5) return formData.ashesDelivery !== "";
    if (step === 6) return formData.zone !== "";
    if (step === 7) {
      return (
        formData.petName.trim() !== "" &&
        formData.ownerName.trim() !== "" &&
        formData.phone.trim() !== "" &&
        formData.email.trim() !== ""
      );
    }
    if (step === 8) return true;
    return false;
  };

  const selectedPetType =
    petTypes.find((item) => item.id === formData.petType)?.title || "—";
  const selectedSize =
    sizes.find((item) => item.id === formData.size)?.title || "—";
  const selectedService =
    services.find((item) => item.id === formData.service)?.title || "—";
  const selectedPickup =
    pickupMethods.find((item) => item.id === formData.pickupMethod)?.title || "—";
  const selectedAshes =
    ashesDelivery.find((item) => item.id === formData.ashesDelivery)?.title || "—";
  const selectedZone =
    zones.find((item) => item.id === formData.zone)?.title || "—";

  const renderQuestionHeader = (title, text) => (
    <div className="question-block">
      <span className="question-block__eyebrow">
        Aires de Paz · Cotización paso a paso
      </span>
      <h2 className="question-block__title">{title}</h2>
      <p className="question-block__text">{text}</p>
    </div>
  );

  const renderStepContent = () => {
    if (step === 1) {
      if (!showOtherPetTypes) {
        return (
          <>
            {renderQuestionHeader(
              "Contanos qué mascota vamos a acompañar en este momento",
              "Elegí si se trata de un canino, un felino u otro tipo de mascota."
            )}

            <div className="grid grid-2">
              {principalPetTypes.map((item) => (
                <OptionCard
  key={item.id}
  title={item.title}
  desc={item.desc}
  icon={item.icon}
  variant={item.id}
  selected={formData.petType === item.id}
  onClick={() => {
    if (item.id === "otro") {
      setShowOtherPetTypes(true);
      setFormData((prev) => ({ ...prev, petType: "" }));
    } else {
      setFormData((prev) => ({ ...prev, petType: item.id }));
    }
  }}
                />
              ))}
            </div>
          </>
        );
      }

      return (
        <>
          {renderQuestionHeader(
            "Indicanos qué tipo de mascota es",
            "Seleccioná la categoría que mejor representa a tu mascota."
          )}

          <div className="grid grid-2">
            {otherPetTypes.map((item) => (
              <OptionCard
                key={item.id}
  title={item.title}
  desc={item.desc}
  icon={item.icon}
  variant="other-detail"
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
          {renderQuestionHeader(
            "¿De qué tamaño es tu mascota?",
            "Esto nos ayuda a preparar correctamente la logística del homenaje."
          )}

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

    if (step === 3) {
      return (
        <>
          {renderQuestionHeader(
            "Elegí el servicio que te gustaría ofrecerle",
            "Seleccioná la opción que mejor acompañe este momento."
          )}

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
    }

    if (step === 4) {
      return (
        <>
          {renderQuestionHeader(
            "¿Cómo preferís que recibamos a tu mascota?",
            "Elegí si la acercás a un punto de atención o si preferís retiro a domicilio."
          )}

          <div className="grid grid-2">
            {pickupMethods.map((item) => (
              <OptionCard
                key={item.id}
                title={item.title}
                desc={item.desc}
                selected={formData.pickupMethod === item.id}
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    pickupMethod: item.id,
                  }))
                }
              />
            ))}
          </div>
        </>
      );
    }

    if (step === 5) {
      return (
        <>
          {renderQuestionHeader(
            "¿Dónde querés recibir las cenizas?",
            "Seleccioná la modalidad de entrega que te resulte más cómoda."
          )}

          <div className="grid grid-2">
            {ashesDelivery.map((item) => (
              <OptionCard
                key={item.id}
                title={item.title}
                desc={item.desc}
                selected={formData.ashesDelivery === item.id}
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    ashesDelivery: item.id,
                  }))
                }
              />
            ))}
          </div>
        </>
      );
    }

    if (step === 6) {
      return (
        <>
          {renderQuestionHeader(
            "Indicá la zona donde vamos a buscar a tu mascota",
            "Esto nos permite organizar correctamente la cobertura y la logística."
          )}

          <div className="grid grid-2">
            {zones.map((item) => (
              <OptionCard
                key={item.id}
                title={item.title}
                desc={item.desc}
                selected={formData.zone === item.id}
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    zone: item.id,
                  }))
                }
              />
            ))}
          </div>
        </>
      );
    }

    if (step === 7) {
      return (
        <>
          {renderQuestionHeader(
            "Último paso: tus datos para acompañarte mejor",
            "Completá tus datos y nos pondremos en contacto para continuar con la solicitud."
          )}

          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="petName">Nombre de la mascota</label>
              <input
                id="petName"
                type="text"
                value={formData.petName}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, petName: e.target.value }))
                }
              />
            </div>

            <div className="form-field">
              <label htmlFor="ownerName">Tu nombre</label>
              <input
                id="ownerName"
                type="text"
                value={formData.ownerName}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, ownerName: e.target.value }))
                }
              />
            </div>

            <div className="form-field">
              <label htmlFor="phone">Teléfono</label>
              <input
                id="phone"
                type="text"
                value={formData.phone}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, phone: e.target.value }))
                }
              />
            </div>

            <div className="form-field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            </div>

            <div className="form-field form-field--full">
              <label htmlFor="notes">Observaciones</label>
              <textarea
                id="notes"
                rows="5"
                value={formData.notes}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, notes: e.target.value }))
                }
              />
            </div>
          </div>
        </>
      );
    }

    return (
      <div className="success-panel">
        <span className="success-panel__badge">Aires de Paz</span>
        <h2 className="success-panel__title">
          Gracias por confiar en nosotros
        </h2>
        <p className="success-panel__text">
          Tu solicitud quedó registrada correctamente. En la versión final,
          desde acá podremos enviarla a WhatsApp, email o guardarla en base de
          datos para el panel administrador.
        </p>

        <div className="success-panel__summary">
          <p><strong>Nombre mascota:</strong> {formData.petName || "—"}</p>
          <p><strong>Tipo:</strong> {selectedPetType}</p>
          <p><strong>Tamaño:</strong> {selectedSize}</p>
          <p><strong>Servicio:</strong> {selectedService}</p>
          <p><strong>Retiro:</strong> {selectedPickup}</p>
          <p><strong>Cenizas:</strong> {selectedAshes}</p>
          <p><strong>Zona:</strong> {selectedZone}</p>
          <p><strong>Responsable:</strong> {formData.ownerName || "—"}</p>
          <p><strong>Teléfono:</strong> {formData.phone || "—"}</p>
          <p><strong>Email:</strong> {formData.email || "—"}</p>
        </div>

        <div className="success-panel__actions">
          <button
            type="button"
            className="action-button action-button--secondary"
            onClick={onBackHome}
          >
            Volver al inicio
          </button>

          <button
            type="button"
            className="action-button action-button--primary"
            onClick={resetFlow}
          >
            Empezar de nuevo
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="app">
      <div className="container">
        <div className="quote-topbar">
          <button
            type="button"
            className="action-button action-button--secondary"
            onClick={onBackHome}
          >
            ← Volver al inicio
          </button>
        </div>

        <header className="hero card-shell">
          <span className="hero__brand">Aires de Paz</span>
          <span className="hero__badge">Cotizador online</span>
          <h1 className="hero__title">Elegí el homenaje para tu mascota</h1>
          <p className="hero__text">
            Un recorrido guiado, claro y humano para acompañarte paso a paso.
          </p>
        </header>

        <StepIndicator step={step} totalSteps={TOTAL_STEPS} />

        <main className={`layout ${step < TOTAL_STEPS ? "quote-layout--single" : ""}`}>
          <section className="workspace workspace--question card-shell">
            {renderStepContent()}

            {step < TOTAL_STEPS && (
              <NavigationButtons
                step={step}
                totalSteps={TOTAL_STEPS}
                onBack={handleBack}
                onNext={handleNext}
                canContinue={canContinue()}
              />
            )}
          </section>

          {step === TOTAL_STEPS && (
            <aside className="summary card-shell">
              <h3 className="summary__title">Resumen final</h3>

              <div className="summary__box">
                <p><strong>Mascota:</strong> {selectedPetType}</p>
                <p><strong>Tamaño:</strong> {selectedSize}</p>
                <p><strong>Servicio:</strong> {selectedService}</p>
                <p><strong>Retiro:</strong> {selectedPickup}</p>
                <p><strong>Cenizas:</strong> {selectedAshes}</p>
                <p><strong>Zona:</strong> {selectedZone}</p>
                <p><strong>Nombre mascota:</strong> {formData.petName.trim() || "—"}</p>
                <p><strong>Responsable:</strong> {formData.ownerName.trim() || "—"}</p>
                <p><strong>Teléfono:</strong> {formData.phone.trim() || "—"}</p>
                <p><strong>Email:</strong> {formData.email.trim() || "—"}</p>
              </div>
            </aside>
          )}
        </main>
      </div>
    </div>
  );
}