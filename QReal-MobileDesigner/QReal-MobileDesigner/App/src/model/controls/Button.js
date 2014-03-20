﻿var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "src/util/log/Log", "src/model/Enums", "src/model/properties/ButtonProperty", "src/model/controls/BaseControl"], function(require, exports, Log, Enums, ButtonProperty, BaseControl) {
    var Button = (function (_super) {
        __extends(Button, _super);
        function Button(id) {
            _super.call(this, new ButtonProperty(id));
            this.log = new Log("Button");
        }
        Button.prototype.ChangeProperty = function (propertyId, propertyType, newValue) {
            switch (propertyType) {
                case 1 /* Id */:
                    this.Properties.Id = newValue;
                    this.Element.attr('id', newValue);
                    break;
                case 0 /* Text */:
                    this.log.Debug("Enums.PropertyType.Text:", this.Element);
                    this.Element.find('.ui-btn-text').text(newValue);
                    break;
                case 2 /* Inline */:
                    var cond = newValue == "true";
                    this.Element.buttonMarkup({ inline: cond });
                    break;
                case 3 /* Corners */:
                    var cond = newValue == "true";
                    this.Element.buttonMarkup({ corners: cond });
                    break;
                case 4 /* Mini */:
                    var cond = newValue == "true";
                    this.Element.buttonMarkup({ mini: cond });
                    break;
                case 5 /* Theme */:
                    this.Element.buttonMarkup({ theme: newValue });
                    break;
            }
        };
        return Button;
    })(BaseControl);

    
    return Button;
});
//# sourceMappingURL=Button.js.map
