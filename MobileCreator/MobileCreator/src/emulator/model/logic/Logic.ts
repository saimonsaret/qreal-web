import mEmulator = module("emulator/model/Emulator");
import mEventManager = module("emulator/model/managers/EventManager");
import mLog = module("utils/log/Log");
import mMap = module("emulator/model/ui/Map");

export class FunctionFactory {
    private logger = new mLog.Logger("FunctionFactory");

    public seqFunc(func1: Function, func2: Function): Function {
        return function () {
            func1();
            func2();
        }
    }

    public ifFunc(condition: string, thenFunc: Function, elseFunc: Function): Function {
        return function (data: string) {
            var ifCondition: bool;
            switch (condition) {
                case "loginSuccess":
                    ifCondition = data == "success";
                    break;
            }
            if (ifCondition) {
                thenFunc();
            } else if (elseFunc) {
                elseFunc();
            }
        }
    }

    public transitionFunc(pageId: string): Function {
        return function () {
            mEmulator.Emulator.instance.NavigationManager.showPage(pageId);
        }
    }

    public loginRequestFunc(url: string, login_id: string, password_id: string): Function {
        var _this = this;
        return function () {
            var login = mEmulator.Emulator.instance.EmulatorViewModel.getInputText(login_id);
            var password = mEmulator.Emulator.instance.EmulatorViewModel.getInputText(password_id);
            _this.sendLoginRequest(url, login, password);
        }
    }

    public saveSessionFunc(): Function {
        this.logger.log("saveSessionFunc");
        return function () {
        }
    }

    public patientsRequestFunc(url: string): Function {
        this.logger.log("saveSessionFunc");
        var _this = this;
        return function () {
            _this.sendPatientsRequest(url);
        }
    }

    public showMapFunc(id: string): Function {
        this.logger.log("showMapFunc");
        var _this = this;
        return function (responseData?: string) {
            _this.logger.log("showMapFunc responseData: " + responseData);
            var points: mMap.Point[] = [];
            if (responseData) {
                var data:string[] = responseData.split(';');
                for (var i = 0; i < data.length; i+=3){
                    points.push(new mMap.Point(parseFloat(data[i]), parseFloat(data[i+1]), data[i+2]));
                }
            }
            var map = <mMap.Map> mEmulator.Emulator.instance.NavigationManager.findControlById(id);
            map.addPushpins(points);
        }
    }

    //#region private functions

    public sendLoginRequest(url: string, login: string, password: string): void {
        this.logger.log("sendLoginRequest: url=" + url + " login=" + login + " password=" + password);
        var parameters = "login?" + jQuery.param({
            login: login,
            password: password
        });

        var _this = this;

        $.ajax({
            type: "POST",
            url: url,
            data: parameters,
            success: function (data) {
                _this.logger.log("sendLoginRequest POST success");
                mEmulator.Emulator.instance.EventManager.trigger(
                    mEmulator.Emulator.instance.NavigationManager.CurrentPage.Name,
                    mEventManager.EventManager.OnLoginResponse,
                    data);
                //alert("Response " + data);
            },
            dataType: "text"
        });
    }

    private sendPatientsRequest(url: string) {
        this.logger.log("sendPatientsRequest: url=" + url);
        $.ajax({
            type: "POST",
            url: url,
            data: "coordinates",
            success: function (data) {
                mEmulator.Emulator.instance.EventManager.trigger(
                   mEmulator.Emulator.instance.NavigationManager.CurrentPage.Name,
                   mEventManager.EventManager.OnPatientsResponse,
                   data);
            },
            dataType: "text"
        });
    }

    //#endregion
}

