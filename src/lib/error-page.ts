export function renderErrorPage(): string {
  return `<!doctype html>
<html lang="pt">
  <head>
    <meta charset="utf-8" />
    <title>MOOVIA Portugal, Ocorreu um erro</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body { font-family: 'Urbanist', system-ui, sans-serif; background: #0e0f12; color: #f9f5ec; display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
      .card { max-width: 28rem; width: 100%; text-align: center; padding: 3rem; border: 1px solid rgba(173,137,87,.18); background: #12141a; }
      h1 { font-family: 'Amotha', serif; font-size: 2rem; margin: 0 0 1rem; font-weight: 200; }
      p { color: rgba(249,245,236,.35); margin: 0 0 2rem; font-weight: 300; line-height: 1.6; }
      .actions { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
      a, button { padding: 0.75rem 1.5rem; border-radius: 0; font-size: 11px; font-weight: 600; cursor: pointer; text-decoration: none; border: 1px solid transparent; text-transform: uppercase; letter-spacing: 0.2em; transition: all 0.3s; }
      .primary { background: #ad8957; color: #0e0f12; }
      .primary:hover { background: #cead84; }
      .secondary { background: transparent; color: #f9f5ec; border-color: rgba(173,137,87,.18); }
      .secondary:hover { border-color: #ad8957; }
    </style>
    <link href="https://fonts.googleapis.com/css2?family=Urbanist:wght@300;600&display=swap" rel="stylesheet">
  </head>
  <body>
    <div class="card">
      <h1>Ocorreu um erro</h1>
      <p>Algo não correu como esperado. Por favor, tente recarregar a página ou volte ao início.</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">Recarregar</button>
        <a class="secondary" href="/">Voltar ao início</a>
      </div>
    </div>
  </body>
</html>`;
}
