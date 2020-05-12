const nunjucks = require('nunjucks')
const dateFilter = require('nunjucks-date-filter')
const path = require('path')

/*
  Nunjucks - look for template files in GOV.UK Frontend and in this repository.
  This also adds the following filters:
    - date-filter
 */
nunjucks.configure([
  path.dirname(require.resolve('govuk-frontend/README.md')),
  path.join(__dirname, '../templates/'),
  path.join(__dirname, '../templates/components/')
], {
  autoescape: true
}).addFilter('date', dateFilter)

module.exports = nunjucks
