class Button implements Shape {
    id:string;
    type;
    el:joint.shapes.devs.RectWithPorts;
    text:string;
    action;

    constructor(el:joint.shapes.devs.RectWithPorts, id : string, action : string) {
        this.el = el;
        this.type = NodeType[NodeType.Button];
        this.id = id;
        this.action = action;
    }

    setText(text:string) {
        this.text = text;
        this.el.attr({
                '.label': { text: text, 'ref-x': .2, 'ref-y': .9 / 2 }
            }
        )
    }
    getElement() {
        return this.el;
    }
}