var Logger = require('./index.js');
var logger = new Logger();

module.exports = function(req,res,next)
{
  var time=new Date();
    var beginTime = Date.now();
    res.on('finish',()=>{
        var d =  Date.now();
        logger.log('Reponse time: ' + (d - beginTime),{
            url:req.originalUrl,
            reqTime:time.getHours()+':'+time.getMinutes()+':'+time.getSeconds(),
            status:res.statusCode,
            time:(d - beginTime)
        });
    });



    next();
}