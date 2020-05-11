/*
  This changes markdown-it rendering rules, to add GOV.UK specific classes to the output.
*/
const markdown = require('markdown-it')()

// Use the default renderer to attach rules to
const defaultRender = (tokens, idx, options, env, self) => {
  return self.renderToken(tokens, idx, options)
}

// Custom renderers
// Heading
markdown.renderer.rules.heading_open = (tokens, idx, options, env, self) => {
  const tag = tokens[idx].tag

  if (tag === 'h2') {
    tokens[idx].attrPush(['class', 'govuk-heading-l'])
  }

  if (tag === 'h3') {
    tokens[idx].attrPush(['class', 'govuk-heading-m'])
  }

  if (tag === 'h4') {
    tokens[idx].attrPush(['class', 'govuk-heading-s'])
  }

  if (tag === 'h5') {
    tokens[idx].attrPush(['class', 'govuk-heading-s'])
  }

  if (tag === 'h6') {
    tokens[idx].attrPush(['class', 'govuk-heading-s'])
  }

  return defaultRender(tokens, idx, options, env, self)
}

// Paragraph
markdown.renderer.rules.paragraph_open = (tokens, idx, options, env, self) => {
  tokens[idx].attrPush(['class', 'govuk-body'])
  return defaultRender(tokens, idx, options, env, self)
}

// Link
markdown.renderer.rules.link_open = (tokens, idx, options, env, self) => {
  tokens[idx].attrPush(['class', 'govuk-link'])
  return defaultRender(tokens, idx, options, env, self)
}

// Bullet point list
markdown.renderer.rules.bullet_list_open = (tokens, idx, options, env, self) => {
  tokens[idx].attrPush(['class', 'govuk-list govuk-list--bullet'])
  return defaultRender(tokens, idx, options, env, self)
}

// Table
markdown.renderer.rules.table_open = (tokens, idx, options, env, self) => {
  tokens[idx].attrPush(['class', 'govuk-table'])
  return defaultRender(tokens, idx, options, env, self)
}

// Table head
markdown.renderer.rules.thead_open = (tokens, idx, options, env, self) => {
  tokens[idx].attrPush(['class', 'govuk-table__head'])
  return defaultRender(tokens, idx, options, env, self)
}

// Table row
markdown.renderer.rules.tr_open = (tokens, idx, options, env, self) => {
  tokens[idx].attrPush(['class', 'govuk-table__row'])
  return defaultRender(tokens, idx, options, env, self)
}

// Table body
markdown.renderer.rules.tbody_open = (tokens, idx, options, env, self) => {
  tokens[idx].attrPush(['class', 'govuk-table__body'])
  return defaultRender(tokens, idx, options, env, self)
}

module.exports = markdown
