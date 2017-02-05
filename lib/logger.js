
function getTimeStamp() {
    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;
    var minute = date.getMinutes();
    minute = (minute < 10 ? "0" : "") + minute;
    var sec = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    return "[" + hour + ":" + minute + ":" + sec + "]  ";
}

module.exports = {
    ERROR: {value: 0, name: "Error"},
    WARNING: {value: 1, name: "Warning"},
    LOG: {value: 2, name: "Log"},
    DEBUG: {value: 3, name: "Debug"},

    error: function(message) {
        const chalk = require("chalk");
        console.log(chalk.bold.red(getTimeStamp() + message));
        console.log(chalk.yellow(new Error().stack));
    },

    warn: function(message) {
        const chalk = require("chalk");
        console.log(chalk.bold.yellow(getTimeStamp() + message));
    },

    log: function(message) {
        console.log(getTimeStamp() + message);
    },

    debug: function(message) {
        if (process.env.logLevel <= this.DEBUG.value) {
            const chalk = require("chalk");
            console.log(chalk.blue(getTimeStamp() + message));
        }
    },

    setLogLevel: function(newLevel) {
        process.env.logLevel = newLevel.value;
    },

    getLogString: function() {
        switch (process.env.logLevel) {
            case this.DEBUG.value:
                return this.DEBUG.name;
            case this.LOG.value:
                return this.LOG.name;
            case this.WARNING.value:
                return this.WARNING.name;
            case this.ERROR.value:
                return this.ERROR.name;
        }
    }

}

if (process.env.logLevel == undefined) {
    process.env.logLevel = module.exports.DEBUG.value;
}
