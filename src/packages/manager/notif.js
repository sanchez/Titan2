
var notify = function(title, body, callback) {
    var n = new Notification(title, {
        body
    });
}

module.exports = {
    notify
}