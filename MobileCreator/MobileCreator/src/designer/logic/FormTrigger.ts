import mAction = module("designer/logic/Action")

export class FormTrigger {
    private formId: string;
    private triggerName: string;
    private action: mAction.Action;
    constructor(formId: string, triggerName: string) {
        //this.action = 
        this.formId = formId;
        this.triggerName = triggerName;
        this.action = new mAction.Action();
    }
    get FormId() {
        return this.formId;
    }
    set FormId(formId: string) {
        this.formId = formId;
    }
    get TriggerName() {
        return this.triggerName;
    }
    set TriggerName(triggerName: string) {
        this.triggerName = triggerName;
    }
    get Action() {
        return this.action;
    }
    set Action(action: mAction.Action) {
        this.action = action;
    }

    public toXML() {
        var xml = "<trigger form-id='" + this.formId + "' event='" + this.triggerName + "'>\n";
        xml += this.action.toXML();
        xml += "</trigger>\n"
        return xml;
    }
}