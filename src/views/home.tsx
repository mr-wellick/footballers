import type { FC } from 'hono/jsx';
import Footer from './footer';
import Header from './header';

const Layout: FC = () => {
  return (
    <html data-theme="cyberpunk">
      <head>
        <meta charset="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <title>Footy</title>
        <link
          href="https://cdn.jsdelivr.net/npm/daisyui@4.7.2/dist/full.min.css"
          rel="stylesheet"
          type="text/css"
        />
      </head>
      <body>
        <Header />
        <div class="min-h-screen bg-base-200">
          <div hx-get="/api/v1/seasons" hx-trigger="load">
            <span class="loading loading-ring loading-lg htmx-indicator"></span>
          </div>
        </div>
        <Footer />
      </body>
      <script src="https://cdn.tailwindcss.com"></script>
      <script
        src="https://unpkg.com/htmx.org@1.9.10"
        integrity="sha384-D1Kt99CQMDuVetoL1lrYwg5t+9QdHe7NLX/SoJYkXDFfX37iInKRy5xLSi8nO7UC"
        crossorigin="anonymous"
      ></script>
    </html>
  );
};

export default Layout;
