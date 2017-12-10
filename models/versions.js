var mongoose = require('mongoose');

const AutoIncrement = require('mongoose-sequence')(mongoose);


var Schema = mongoose.Schema;


var versionSchema = new Schema({
  content: String,
})

versionSchema.plugin(AutoIncrement, { inc_field: 'version' })

module.exports = mongoose.model('FirstPage', versionSchema);