var yandex = {};

(function(window, namespace) {

    function extend(Child, Parent) {
        var F = function() {};
        F.prototype = Parent.prototype;
        Child.prototype = new F();
        Child.prototype.constructor = Child;
        Child.superclass = Parent.prototype;
    }


    function Component(element, name, classNames) {
        this.element = element;
        this.name = name;
        this.classNames = classNames;
        this.init();
    }

    Component.prototype.init = function() {};

    namespace.component = {
        create: function(component) {
            extend(component, Component);
            namespace[component.name] = component;
        }
    };

    if (!(document.createElementNS &&
        document.createElementNS('http://www.w3.org/2000/svg','svg').createSVGRect)) {
        document.documentElement.classList.add('no-svg');
    }

    var fontChecker = new Image();

    var handler = function() {
        document.documentElement.classList.add('font-loaded');
    };

    if (fontChecker.addEventListener) {
        fontChecker.addEventListener('error', handler);
    } else {
        fontChecker.attachEvent('onerror', handler);
    }

    fontChecker.src = './css/ptsans.woff';


})(window, yandex);

