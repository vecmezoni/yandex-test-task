(function(window, namespace) {

    function Browsers(element, name, classNames) {
        Browsers.super.constructor.apply(this, arguments);
    }

    namespace.component.create(Browsers);

    Browsers.prototype.init = function() {
        Array.prototype.slice.call(this.element.getElementsByClassName(this.classNames.icon)).forEach(function(item) {
            item.addEventListener('error', function() {
                this.style.display = 'none';
            });
        });
    };

})(window, yandex);