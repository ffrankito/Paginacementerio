import "./index.css";

export default function App() {
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

        <main className="layout">
          <section className="workspace card-shell">
            <div className="workspace__header">
              <h2 className="section-title">Inicio del flujo</h2>
              <p className="section-text">
                En esta sección vamos a montar el cotizador por pasos.
              </p>
            </div>

            <div className="placeholder-block">
              <p>Base de trabajo lista para integrar componentes.</p>
            </div>
          </section>

          <aside className="summary card-shell">
            <h3 className="summary__title">Resumen</h3>

            <div className="summary__box">
              <p>
                <strong>Mascota:</strong> —
              </p>
              <p>
                <strong>Tamaño:</strong> —
              </p>
              <p>
                <strong>Servicio:</strong> —
              </p>
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
}