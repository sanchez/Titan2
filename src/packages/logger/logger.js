
// Creates access to the stack trace for printing out the calling function
Object.defineProperty(global, '__stack', {
    get: function() {
        var orig = Error.prepareStackTrace;
        Error.prepareStackTrace = function(_, stack) {
            return stack;
        };
        var err = new Error;
        Error.captureStackTrace(err, arguments.callee);
        var stack = err.stack;
        Error.prepareStackTrace = orig;
        return stack;
    }
});

// Used for easily accessing the caller line
Object.defineProperty(global, '__line', {
    get: function() {
        return __stack[3].getLineNumber();
    }
});

// Used for easily accessing the caller filename
Object.defineProperty(global, '__file', {
    get: function() {
        return __stack[3].getFileName();
    }
});

// Gets the timestamp for printing the time to the console
var getTimeStamp = () => {
    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;
    var minute = date.getMinutes();
    minute = (minute < 10 ? "0" : "") + minute;
    var sec = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    return "[" + hour + ":" + minute + ":" + sec + "]";
}

// Gets the file and line number stamp for debug output
var getDebugStamp = () => {
    var fileName = __file;
    fileName = fileName.slice(fileName.lastIndexOf('/') + 1);
    return `(${fileName}:${__line})`
}

/**
 * Prints the message out to the console with the time and file stamp
 * @param  {String} message The message that needs to be printed the the console
 */
var log = (message) => {
    console.log(getTimeStamp() + getDebugStamp() + "  " + message);
}

// Creates a global logger instance so that logger can be accessed globally throughout the whole application
Object.defineProperty(global, "logger", {
    get: () => {
        return {
            log
        }
    }
});

// Defines the functions to be exported
module.exports = {
    log
}
