define(["require", "exports", "src/util/log/Log"], function(require, exports, __Log__) {
    var Log = __Log__;
    

    var EventManager = (function () {
        function EventManager(element) {
            var _this = this;
            this.log = new Log("EventManager");
            this.subscribers = [];
            this.log.Debug("constructor");
            this.element = element;
            this.element.on(EventManager.EVENT_TEST, function (e, data) {
                return _this.OnEvent(e, data);
            });
        }
        EventManager.prototype.Trigger = function (eventName, data) {
            this.log.Debug('trigger, event: ' + eventName);
            this.element.trigger(eventName, data);
        };

        EventManager.prototype.OnEvent = function (event, data) {
            this.log.Debug('OnEvent: ' + event.type);

            if (this.subscribers[event.type]) {
                this.subscribers[event.type].forEach(function (listener) {
                    return listener.OnEvent(data);
                });
            }
        };

        EventManager.prototype.AddSubscriber = function (eventType, listener) {
            if (!this.subscribers[eventType]) {
                this.subscribers[eventType] = [];
            }
            this.subscribers[eventType].push(listener);
        };
        EventManager.EVENT_TEST = "test_event";
        return EventManager;
    })();

    
    return EventManager;
});
//# sourceMappingURL=EventManager.js.map
