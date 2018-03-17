function render (template, options) {
  return template.replace(/\$\{\s?([\w.]+)\s?\}/g, (match, variable) => {
    return variable.split('.').reduce((previous, current) => {
      return previous[current]
    }, options) || ''
  })
}
