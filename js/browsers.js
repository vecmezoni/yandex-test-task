(function(window, namespace) {

    function Browsers(element, name, classNames) {
        Browsers.superclass.constructor.apply(this, arguments);
    }

    Browsers.name = 'Browsers';

    namespace.component.create(Browsers);

    Browsers.prototype.init = function() {
        Array.prototype.forEach.call(this.element.querySelectorAll(namespace.template.render('.{0}', [this.classNames.icon])), function(item) {

            var handler = function(event) {
                var target = (typeof event.target !== 'undefined') ? event.target : event.srcElement;
                target.style.display = 'none';
            };

            if (item.addEventListener) {
                item.addEventListener('error', handler);
            } else {
                item.attachEvent('onerror', handler);
            }

        });
    };

})(window, yandex);