(function(window, namespace) {

    function replace(template, key, value) {
        return template.replace('{' + key + '}', value);
    }

    function render(template, values) {

        if (Object.prototype.toString.call(values) === '[object Object]') {

            return Object.keys(values).reduce(function(template, key) {
                return replace(template, key, values[key]);
            }, template);
        } else {

            return values.reduce(function(template, value, key) {
                return replace(template, key, value);
            }, template);

        }
    }

    namespace.template = {
        render: render
    };

})(window, yandex);