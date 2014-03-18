﻿var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "src/util/log/Log", "src/model/properties/InputProperty", "src/model/controls/BaseControl"], function(require, exports, Log, InputProperty, BaseControl) {
    var Input = (function (_super) {
        __extends(Input, _super);
        function Input(id) {
            _super.call(this, new InputProperty(id));
            this.log = new Log("Input");
        }
        return Input;
    })(BaseControl);

    
    return Input;
});
//# sourceMappingURL=Input.js.map