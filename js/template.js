(function(window, namespace) {

    function render(template, values) {

        Object.keys(values).forEach(function (key) {
            template = template.replace('{' + key + '}', values[key]);
        });

        return template;
    }

    namespace.template = {
        render: render
    };

})(window, yandex);