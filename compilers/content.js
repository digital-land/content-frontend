const fs = require('fs')
const glob = require('glob')
const graymatter = require('gray-matter')
const markdown = require('./markdown.js')
const nunjucks = require('./nunjucks.js')

const actions = {
  generateBreadcrumbs (pages, indexMatter) {
    let breadcrumbs = [{
      text: 'Digital Land',
      href: '/'
    }].concat(indexMatter)

    let isIndex = false
    for (const crumb of breadcrumbs) {
      if (crumb.text === pages[0].text) {
        isIndex = true
      }
    }

    if (!isIndex) {
      breadcrumbs = breadcrumbs.concat(pages)
    }

    return breadcrumbs.map((crumb, index) => {
      if (index === (breadcrumbs.length - 1)) {
        delete crumb['href']
      }
      return crumb
    })
  },
  getAllContent () {
    return glob.sync('content/**.md')
  },
  render () {
    return actions.getAllContent().map(file => {
      const indexMatter = graymatter(fs.readFileSync('content/index.md'))
      const indexCrumb = [{
        href: '/',
        text: indexMatter.data.title
      }]

      const contents = fs.readFileSync(file, 'utf8')
      const filename = file.replace('content/', '').replace('.md', '')
      const matter = graymatter(contents)
      const content = markdown.render(matter.content)
      const pageCrumb = [{
        href: '/',
        text: matter.data.title
      }]
      const breadcrumbs = actions.generateBreadcrumbs(pageCrumb, indexCrumb)

      const data = {
        content,
        params: {
          breadcrumbs,
          captionHeading: (breadcrumbs.length > 2) ? breadcrumbs[breadcrumbs.length - 2].text : false
        },
        matter: matter.data
      }

      // If there's an index with no content, it's probably a list page
      if (filename === 'index' && content.length === 0) {
        console.log('list', actions.getAllContent())
        // todo
      }

      const rendered = nunjucks.render('content.njk', data)
      return fs.writeFileSync(`./docs/${filename}.html`, rendered)
    })
  }
}

actions.render()
