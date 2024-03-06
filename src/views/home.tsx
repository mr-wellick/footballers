import type { FC } from 'hono/jsx';
import Footer from './footer';
import Header from './header';

const Layout: FC = () => {
  return (
    <html data-theme="cyberpunk">
      <head>
        <title>Footy</title>
        <link href="./output.css" rel="stylesheet" />
      </head>
      <body>
        <Header />
        <div class="min-h-screen bg-base-200">
          <div hx-get="/api/v1/footballers/seasons" hx-trigger="load">
            <span class="loading loading-ring loading-lg htmx-indicator"></span>
          </div>
        </div>
        <Footer />
      </body>
      <script
        src="https://unpkg.com/htmx.org@1.9.10"
        integrity="sha384-D1Kt99CQMDuVetoL1lrYwg5t+9QdHe7NLX/SoJYkXDFfX37iInKRy5xLSi8nO7UC"
        crossorigin="anonymous"
      ></script>
    </html>
  );
};

export default Layout;
