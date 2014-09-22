module.exports = function(hostname) {
    var production = (hostname + pathname === 'atlregional.github.io/draw/');

    return {
        client_id: production ?
            '7daf56800845b70fcd18' :
            'bb7bbe70bd1f707125bc',
        gatekeeper_url: production ?
            'http://gatekeeper-draw.herokuapp.com' :
            'https://localhostauth.herokuapp.com'
    };
};
