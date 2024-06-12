const replace = require('replace-in-file')
const fs = require('fs-extra')

// Rename directory]

// fs.moveSync(".output/public/_nuxt", ".output/public/assets", {
//   overwrite: true,
// });

fs.moveSync('.output/public/_payload.json', '.output/public/payload.json', {
  overwrite: true
})

replace.sync({
  files: '.output/**/*.html',
  from: [/_payload.json/g],
  to: ['payload.json']
})

// replace.sync({
//   files: ".output/**/*.html",
//   from: [/\/_nuxt/g, /_payload.json/g],
//   to: ["/assets", "payload.json"],
// })
