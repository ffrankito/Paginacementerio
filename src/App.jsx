import { useState } from "react";
import "./index.css";
import StepIndicator from "./components/StepIndicator";
import NavigationButtons from "./components/NavigationButtons";
import OptionCard from "./components/OptionCard";
import { petTypes } from "./data/petTypes";
import { sizes } from "./data/sizes";
import { services } from "./data/services";
import { pickupMethods } from "./data/pickupMethods";
import { ashesDelivery } from "./data/ashesDelivery";
import { zones } from "./data/zones";

const TOTAL_STEPS = 7;

export default function App() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
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

    if (step === 3) {
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
    }

    if (step === 4) {
      return (
        <>
          <div className="workspace__header">
            <h2 className="section-title">¿Cómo preferís el retiro?</h2>
            <p className="section-text">
              Elegí si vas a acercar a tu mascota o si preferís retiro a
              domicilio.
            </p>
          </div>

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
          <div className="workspace__header">
            <h2 className="section-title">¿Cómo querés recibir las cenizas?</h2>
            <p className="section-text">
              Seleccioná retiro en sucursal o entrega a domicilio.
            </p>
          </div>

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
          <div className="workspace__header">
            <h2 className="section-title">Seleccioná tu zona</h2>
            <p className="section-text">
              Esto nos ayuda a organizar correctamente la logística del servicio.
            </p>
          </div>

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
          <div className="workspace__header">
            <h2 className="section-title">Tus datos</h2>
            <p className="section-text">
              Completá la información para continuar con la solicitud.
            </p>
          </div>

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

    return null;
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

              <p>
                <strong>Retiro:</strong>{" "}
                {pickupMethods.find(
                  (item) => item.id === formData.pickupMethod
                )?.title || "—"}
              </p>

              <p>
                <strong>Cenizas:</strong>{" "}
                {ashesDelivery.find(
                  (item) => item.id === formData.ashesDelivery
                )?.title || "—"}
              </p>

              <p>
                <strong>Zona:</strong>{" "}
                {zones.find((item) => item.id === formData.zone)?.title || "—"}
              </p>

              <p>
                <strong>Responsable:</strong>{" "}
                {formData.ownerName.trim() || "—"}
              </p>

              <p>
                <strong>Teléfono:</strong> {formData.phone.trim() || "—"}
              </p>

              <p>
                <strong>Email:</strong> {formData.email.trim() || "—"}
              </p>
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
}