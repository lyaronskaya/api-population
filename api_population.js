/**
 * Реализация API, не изменяйте ее
 * @param {string} url
 * @param {function} callback
 */
function getData(url, callback) {
    var RESPONSES = {
        '/countries': [
            {name: 'Cameroon', continent: 'Africa'},
            {name :'Fiji Islands', continent: 'Oceania'},
            {name: 'Guatemala', continent: 'North America'},
            {name: 'Japan', continent: 'Asia'},
            {name: 'Yugoslavia', continent: 'Europe'},
            {name: 'Tanzania', continent: 'Africa'}
        ],
        '/cities': [
            {name: 'Bamenda', country: 'Cameroon'},
            {name: 'Suva', country: 'Fiji Islands'},
            {name: 'Quetzaltenango', country: 'Guatemala'},
            {name: 'Osaka', country: 'Japan'},
            {name: 'Subotica', country: 'Yugoslavia'},
            {name: 'Zanzibar', country: 'Tanzania'},
        ],
        '/populations': [
            {count: 138000, name: 'Bamenda'},
            {count: 77366, name: 'Suva'},
            {count: 90801, name: 'Quetzaltenango'},
            {count: 2595674, name: 'Osaka'},
            {count: 100386, name: 'Subotica'},
            {count: 157634, name: 'Zanzibar'}
        ]
    };

    setTimeout(function () {
        var result = RESPONSES[url];
        if (!result) {
            return callback('Unknown url');
        }

        callback(null, result);
    }, Math.round(Math.random * 1000));
}

/**
 * Ваши изменения ниже
 */

var requests = ['/countries', '/cities', '/populations'];
var responses = {};

function callback(error, result) {
    var request = requests[callback.i];
    responses[request] = result;
    var l = [];

    for (K in responses)
        l.push(K);

    if (l.length == 3) {
        var c = [], cc = [], p = 0;
        for (i = 0; i < responses['/countries'].length; i++) {
            if (responses['/countries'][i].continent === 'Africa') {
                c.push(responses['/countries'][i].name);
            }
        }

        for (i = 0; i < responses['/cities'].length; i++) {
            for (j = 0; j < c.length; j++) {
                if (responses['/cities'][i].country === c[j]) {
                    cc.push(responses['/cities'][i].name);
                }
            }
        }

        for (i = 0; i < responses['/populations'].length; i++) {
            for (j = 0; j < cc.length; j++) {
                if (responses['/populations'][i].name === cc[j]) {
                    p += responses['/populations'][i].count;
                }
            }
        }
        console.log('Total population in African cities: ' + p);
    }
    callback.i++;
};


callback.i = 0;


for (i = 0; i < 3; ++i) {
    var request = requests[i];
    getData(request, callback);
}


/**
 * Диалог с пользователем
 */

var callAboutPLace = function() {
    var requests = ['/cities', '/populations'];

    var input = window.prompt('Введите страну или город', 'Cameroon');

    if (input && input !== '') {
        var responses = {};

        function callback(error, result) {
            var i = callback.i,
                request = requests[i];
            responses[request] = result;
            var l = [];
            for (K in responses)
                l.push(K);

            if (l.length == 2) {
                var c = [], p = 0;

                for (i = 0; i < responses['/cities'].length; i++) {
                    if (responses['/cities'][i].name === input) {
                        c.push(input);
                        console.log(responses['/cities'][i].name);
                        break;
                    }
                    if (responses['/cities'][i].country === input) {
                        c.push(responses['/cities'][i].name);
                    }
                }

                if (c.length < 1) {
                    alert('Unknown city or country');
                }
                else {
                    for (i = 0; i < responses['/populations'].length; i++) {
                        for (j = 0; j < c.length; j++) {
                            if (responses['/populations'][i].name === c[j]) {
                                p += responses['/populations'][i].count;
                            }
                        }
                    }
                    alert('Population: ' + p);
                }
            }
            callback.i++;
        };


        callback.i = 0;

        for (i = 0; i < requests.length; i++) {
            var request = requests[i];
            getData(request, callback);
        }
    }
}
callAboutPLace()




