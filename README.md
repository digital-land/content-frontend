# content-frontend

[![License](https://img.shields.io/github/license/mashape/apistatus.svg)](LICENSE)

A quick compiler to take Markdown files and output a Digital Land template

## Requirements

- [Node.js >= 12](https://nodejs.org/)
- [npm](https://npmjs.com/) (bundled with Node)

## Getting started

Clone the repository and install dependencies:

```
git clone https://github.com/digital-land/content-frontend
cd content-frontend
npm install
```

To run it locally, run `npm run start`, which will compile all assets and expose the /docs subdirectory to `localhost:8080`.

## Making changes

Changes should be made in the root directory files, such as `content`, `css`, `javascript`, and `templates`. Don't commit changes from the /docs folder. When `master` is pushed to, a GitHub workflow runs to recompile /docs.
