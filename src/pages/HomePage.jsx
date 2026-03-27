export default function HomePage({ onStart }) {
  return (
    <div className="app">
      <div className="container">
        <section className="landing landing--hero card-shell">
          <div className="landing__content">
            <span className="landing__brand">Aires de Paz</span>
            <span className="landing__badge">Cementerio y homenaje para mascotas</span>

            <h1 className="landing__title">
              Un espacio de amor, respeto y recuerdo para quienes siempre fueron
              parte de la familia
            </h1>

            <p className="landing__text">
              En Aires de Paz te acompañamos con una experiencia cálida, clara y
              guiada para ayudarte a elegir el homenaje adecuado en un momento
              sensible.
            </p>

            <div className="landing__actions">
              <button
                type="button"
                className="action-button action-button--primary action-button--large"
                onClick={onStart}
              >
                Comenzar cotización
              </button>
            </div>
          </div>

          <div className="landing__panel">
            <div className="landing__mini-card">
              <h3>Atención cercana</h3>
              <p>
                Un acompañamiento humano y respetuoso para despedir a tu mascota
                con la calidez que merece.
              </p>
            </div>

            <div className="landing__mini-card">
              <h3>Cobertura local</h3>
              <p>
                Servicio pensado para Rosario, Pueblo Esther y localidades
                cercanas, con una experiencia simple y ordenada.
              </p>
            </div>

            <div className="landing__mini-card">
              <h3>Cotización guiada</h3>
              <p>
                El proceso se presenta por etapas, con una estética clara y sin
                sobrecargar la página principal.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}