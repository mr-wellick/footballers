<h1 align="center">Footballers</h1>
<p align="center">
  A Node.js back-end to explore football statistics for barcelona (for now).
</p>

<div>
  <img alt="GitHub Workflow Status" src="https://github.com/mr-wellick/footballers/workflows/footballers-flow/badge.svg">
</div>

# Introduction

- Web scrapped and processed Barcelona player statistics for the years 2004 to 2020 using R.
- Once the data was processed, each year was saved as a csv file.
- Read each file into memory then used d3-dsv to parse each file.
- Programmatically generated SQL commands to create tables for each file.
- Finally, connected to PostgreSQL locally and ran the sql commands to set up all tables (using supabase now).

# Stack

<p>
    Using Hono.js to generate Node.js (Typescript) template. Using JSX as the templating language (because why not).
    For styling, chose TailwindCSS and DaisyUI. I went with HTMX since we know it's the best for client interactivity (/s).
    For the database, decided to go with Supabase.
</p>
