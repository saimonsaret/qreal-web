﻿define(["require", "exports", "src/Application", "src/util/log/Log", "src/model/DesignerControls"], function(require, exports, App, Log, DesignerControls) {
    var DesignerControlFactory = (function () {
        function DesignerControlFactory() {
            this.log = new Log("DesignerControlFactory");
        }
        DesignerControlFactory.prototype.CreatePage = function (property) {
            var page = new DesignerControls.Page(property);
            var $page = $('<div></div>');
            $page.data('role', 'page');
            $page.attr('id', property.Id);
            $page.attr('class', 'sortcontainer');

            $page.on('drop', function (event) {
                return page.OnDrop(event);
            });
            $page.on('dragover', function (event) {
                return page.OnDragOver(event);
            });
            page.Element = $page;
            return page;
        };

        DesignerControlFactory.prototype.CreateButton = function (property) {
            var _this = this;
            var button = new DesignerControls.Button(property);
            var $bt = $('<a href="#"></a>');

            $bt.attr('data-role', 'button');
            $bt.attr('id', button.Properties.Id);
            $bt.attr('class', 'item');
            $bt.text(button.Properties.Text);

            $bt.on('click', function (event) {
                event.preventDefault();
                _this.log.Debug('bt click');
                App.Instance.Designer.ShowProperty(button.Properties);
            });

            button.Element = $bt.button();
            this.log.Debug("button:", button.Element);
            return button;
        };

        DesignerControlFactory.prototype.CreateInput = function (property) {
            var _this = this;
            var input = new DesignerControls.Input(property);

            var $container = $("<div data-role='fieldcontain'></div>");
            $container.attr('id', input.Properties.Id);
            var $label = $("<label></label>");
            $label.text(input.Properties.Title);
            $label.attr('for', 'input_' + input.Properties.Id);

            var $input = $('<input />');
            $input.attr('type', 'text');

            $input.attr('name', input.Properties.Name);
            $input.attr('id', 'input_' + input.Properties.Id);
            $container.append($label);
            $container.append($input);

            $container.on('click', function (event) {
                event.preventDefault();
                _this.log.Debug('input click');
                App.Instance.Designer.ShowProperty(input.Properties);
            });

            this.log.Debug('input: ', $container);
            $container.find('input').textinput();
            input.Element = $container;
            return input;
        };
        return DesignerControlFactory;
    })();

    
    return DesignerControlFactory;
});
//# sourceMappingURL=DesignerControlFactory.js.map
