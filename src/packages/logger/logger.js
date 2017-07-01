//# sourceURL=logger

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

Object.defineProperty(global, '__line', {
    get: function() {
        return __stack[3].getLineNumber();
    }
});

Object.defineProperty(global, '__file', {
    get: function() {
        return __stack[3].getFileName();
    }
});

var getTimeStamp = function() {
    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour
    var minute = date.getMinutes();
    minute = (minute < 10 ? "0" : "") + minute;
    var sec = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    return `[${hour}:${minute}:${sec}]`;
}

var getDebugStamp = function() {
    var fileName = __file;
    fileName = fileName.slice(fileName.lastIndexOf("/") + 1);
    return `(${fileName}:${__line})`;
}

var log = function(message) {
    console.log(getTimeStamp() + getDebugStamp() + "\n" + message);
}

Object.defineProperty(global, "logger", {
    get: () => {
        return { log };
    }
});

module.exports = {
    log
}