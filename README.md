<h1 align="center">Footballers</h1>
<p align="center">
  A Node.js back-end to explore football statistics for barcelona (for now).
</p>

<div>
  <img alt="GitHub Workflow Status" src="https://img.shields.io/github/workflow/status/mr-wellick/footballers/footballers-flow?style=flat-square">
  https://github.com/mr-wellick/footballers/workflows/footballers-flow/badge.svg
</div>

# Introduction

    - Web scrapped and processed Barcelona player statistics for the years 2004 to 2020 using R.
    - Once the data was processed, each year was saved as a csv file.
    - With the help of Node.js and D3.js, loaded each csv file into memory to
      programmatically generate SQL commands.
    - Finally, connected to MySQL locally and processed SQL commands to set up tables.
