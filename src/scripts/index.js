function loadSplits() {
    var split = Split(['#file-viewer', '#file-main'], {
        elementStyle: function(dimension, size, gutterSize) {
            return { 'flex-basis': 'calc(' + size + '% - ' + gutterSize + 'px)' }
        },
        gutterStyle: function(dimension, gutterSize) {
            return { 'flex-basis': gutterSize + 'px' }
        },
        sizes: [50, 200],
        minSize: 200
    });
}

function documentReady() {
    loadSplits();
    process.chdir(`${__dirname}/packages`);
}