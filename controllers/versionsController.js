var FirstPage = require('../models/versions')


exports.contents_list = function (req, res, next) {

  FirstPage.findOne({ version: 2 }, function (err, doc) {
    res.send(doc.content)
  })

}