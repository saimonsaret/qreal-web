define(["require", "exports", "src/util/log/Log", "src/util/events/EventManager"], function(require, exports, __Log__, __EventManager__) {
    var Log = __Log__;
    var EventManager = __EventManager__;
    

    var DeviceController = (function () {
        function DeviceController() {
            this.log = new Log("DeviceController");
            this.log.Debug("constructor");
            this.eventManager = new EventManager((parent).$('body'));

            var self = this;
            this.eventManager.AddSubscriber(EventManager.EventTest, {
                OnEvent: function (data) {
                    self.log.Debug("OnEvent");
                    self.log.DebugObj(data);
                }
            });
        }
        Object.defineProperty(DeviceController, "Instance", {
            get: function () {
                return this.instance;
            },
            enumerable: true,
            configurable: true
        });

        DeviceController.prototype.Init = function () {
            var _this = this;
            this.log.Debug("Init");
            $('#mainPage').on('drop', function (event) {
                return _this.OnDrop(event);
            });
            $('#mainPage').on('dragover', function (event) {
                return _this.OnDragOver(event);
            });
        };

        DeviceController.prototype.OnDrop = function (event) {
            this.log.Debug("OnDrop");
            event.preventDefault();
            this.log.DebugObj(event);
            var data = event.originalEvent.dataTransfer.getData("ControlId");
            this.log.Debug("OnDrop. data: " + data);

            var bt = $("<button>My Button</button>");
            $(event.currentTarget).append(bt);

            var self = this;
            bt.on('click', function (e) {
                self.log.Debug('bt click');
                self.eventManager.Trigger(EventManager.EventShowProperties, { id: 'buttonId' });
            });
            bt.button();
        };

        DeviceController.prototype.OnDragOver = function (e) {
            //this.log.Debug("OnDragOver");
            e.preventDefault();
        };

        Object.defineProperty(DeviceController.prototype, "EventManager", {
            get: function () {
                return this.eventManager;
            },
            enumerable: true,
            configurable: true
        });
        DeviceController.instance = new DeviceController();
        return DeviceController;
    })();

    
    return DeviceController;
});
//# sourceMappingURL=DeviceController.js.map