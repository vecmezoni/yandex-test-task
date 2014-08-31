(function(window, namespace) {

    function Stars(element, name, classNames, template, number) {
        this.number = number;
        this.storageName = 'Stars-' + name;
        this.template = document.querySelector(template).innerHTML;
        Stars.superclass.constructor.apply(this, arguments);
    }

    Stars.name = 'Stars';

    namespace.component.create(Stars);

    Stars.prototype.init = function() {
        var handler = function(event) {
            var target = (typeof event.target !== 'undefined') ? event.target : event.srcElement;
            var value = parseInt(target.value, 10);
            if (!target.classList.contains(this.classNames.starInput)) {
                return;
            }
            this.changeState(this.value === value ? this.value - 1 : value);
            this.save();
        }.bind(this);

        if (this.element.addEventListener) {
            this.element.addEventListener('click', handler);
        } else {
            this.element.attachEvent('onclick', handler);
        }

        var result = '';
        for(var i = 0; i < this.number; i++) {
            result += namespace.template.render(this.template, {
                name: this.name,
                value: i + 1
            });
        }
        this.element.innerHTML = result;

        this.changeState(this.restore());
    };

    Stars.prototype.changeState = function(value) {
        this.value = value;

        Array.prototype.forEach.call(this.element.querySelectorAll(namespace.template.render('.{0}', [this.classNames.star])), function(star, index) {
            star.classList.toggle(this.classNames.selected, index + 1 <= this.value);
            if (index + 1 === this.value) {
                star.querySelector(namespace.template.render('.{0}', [this.classNames.starInput])).checked = true;
            }
        }, this);
    };

    Stars.prototype.restore = function() {
        return parseInt(window.localStorage.getItem(this.storageName), 10) || 0;
    };

    Stars.prototype.save = function() {
        window.localStorage.setItem(this.storageName, this.value);
    };

})(window, yandex);