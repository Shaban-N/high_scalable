
var stackTrace = require('stack-trace');  // Для получения имени родительского модуля
var util = require('util'); //util.inspect()
var path = require('path'); //path.relative() path.sep
var projectname = require('../package').name;
var fs=require('fs')

module.exports = class Logger // Класс логера :)
{
    constructor()
    {
        function generateLogFunction(level) // Функция генератор функий логгера :)
        {
            return function(message,meta)
            {
                //var d = Date.now(); // Будем потом записовать время вызова
                var mes = this.module + " -- ";
                mes += level + " -- ";
                mes += message; // прицепить сообщение
                if(meta) mes += "  " + util.inspect(meta) + " "; // Записать доп инфу (Object||Error)
                mes += '\n'; // Конец строки :)

                this.stream.write(mes);
                // Записать во все потоки наше сообщение
            }
        };

        var accessLogStream=fs.createWriteStream('./logs/logs.log',{flags: 'a'})
        this.trace = stackTrace.get()[1]; // Получить стек вызова
        this.filename = this.trace.getFileName(); // Получить имя файла которое вызвало конструктор
        this.module = projectname + path.sep + path.relative('.',this.filename); // Записать име модуля
        this.stream = accessLogStream; // Потоки в которые мы будем записовать логи
        // В дальнейшем здесь будет стрим к файлу
        this.log = generateLogFunction('Log'); // Лог поведения
        this.info = generateLogFunction('Info'); // Лог информативный
        this.error = generateLogFunction('Error'); // Лог ошибок
        this.warn = generateLogFunction('Warning'); // Лог предупреждений
    }

}