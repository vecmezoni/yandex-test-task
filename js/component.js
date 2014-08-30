var yandex = {};

(function(window, namespace) {

    function extend(Child, Parent) {
        var F = function() {};
        F.prototype = Parent.prototype;
        Child.prototype = new F();
        Child.prototype.constructor = Child;
        Child.super = Parent.prototype;
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

})(window, yandex);

