
var stackTrace = require('stack-trace');  // Для получения имени родительского модуля
var util = require('util'); //util.inspect()
var path = require('path'); //path.relative() path.sep
var projectname = require('../package').name;
var fs=require('fs')

module.exports = class Logger
{
    constructor()
    {
        function generateLogFunction(level)
        {
            return function(message,meta)
            {
                //var d = Date.now(); // Будем потом записовать время вызова
                var mes = this.module + " -- ";
                mes += level + " -- ";
                mes += message;
                if(meta) mes += "  " + util.inspect(meta) + " ";
                mes += '\n';

                this.stream.write(mes);
            }
        };

        var accessLogStream=fs.createWriteStream('./logs/logs.log',{flags: 'a'})
        this.trace = stackTrace.get()[1];
        this.filename = this.trace.getFileName();
        this.module = projectname + path.sep + path.relative('.',this.filename);
        this.stream = accessLogStream;
        this.log = generateLogFunction('Log'); // Лог поведения
        this.info = generateLogFunction('Info'); // Лог информативный
        this.error = generateLogFunction('Error'); // Лог ошибок
        this.warn = generateLogFunction('Warning'); // Лог предупреждений
    }

}