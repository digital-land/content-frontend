const fs = require('fs')
const glob = require('glob')
const graymatter = require('gray-matter')
const markdownlint = require('markdownlint')
const markdown = require('./markdown.js')
const nunjucks = require('./nunjucks.js')

const actions = {
  generateBreadcrumbs (page, index) {
    // TODO: Fix breadcrumb links
    const breadcrumbs = [{
      text: 'Digital Land',
      href: '/'
    }]

    breadcrumbs.push({
      text: index.matter.title,
      href: '/'
    })

    if (page.directory !== './docs/') {
      breadcrumbs.push({
        text: page.matter.title,
        href: '/'
      })
    }

    return breadcrumbs.map((crumb, index) => {
      if (index === (breadcrumbs.length - 1)) {
        delete crumb['href']
      }
      return crumb
    })
  },
  getAllContent () {
    return glob.sync('content/**.md').map(file => {
      const filename = file.replace('content/', '').replace('.md', '')
      const directory = (filename === 'index') ? '' : filename
      const content = fs.readFileSync(file, 'utf8')
      const matter = graymatter(content)
      const lint = markdownlint.sync({
        files: [file],
        config: {
          'line-length': false
        }
      })

      const lintString = lint.toString(true)

      if (lintString) {
        console.log('Markdownlint: warning, may not compile correctly:\n', lintString)
      }

      return {
        directory: `./docs/${directory}`,
        filename: 'index.html',
        matter: matter.data,
        params: {},
        markdown: matter.content,
        content: markdown.render(matter.content),
        assetPath: '/content-frontend/assets'
      }
    })
  },
  render () {
    const allContent = actions.getAllContent()
    const index = allContent.find(file => file.directory === './docs/')

    return allContent.map(file => {
      // Generate breadcrumbs and caption headings
      const breadcrumbs = actions.generateBreadcrumbs(file, index)
      file.params.breadcrumbs = breadcrumbs
      file.params.captionHeading = (breadcrumbs.length > 2) ? breadcrumbs[breadcrumbs.length - 2].text : false

      const render = nunjucks.render('content.njk', file)
      fs.mkdirSync(file.directory, { recursive: true })
      return fs.writeFileSync(`${file.directory}/${file.filename}`, render)
    })
  }
}

actions.render()
