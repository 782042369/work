module.exports = {
  plugins: [
    require("autoprefixer")({  
      browsers: [
        'ie>=9',
        '>1% in CN',
        "last 3 versions",
        "ff >= 30",
        "chrome >= 34",
        "safari >= 6",
        "ios >= 6",
        "android >= 4.4"
      ]  
  })  
  ]
}