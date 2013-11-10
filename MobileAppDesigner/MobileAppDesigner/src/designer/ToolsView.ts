﻿import Log = require("src/util/log/Log");
import Controller = require("src/designer/Controller");
import EventManager = require("src/util/events/EventManager");

class ToolsView {

    private log = new Log("ToolsView");

    private controls = [
        {
            id: 'tool-button',
            title: 'Button',
            tool: 'button'
        },
        {
            id: 'tool-button2',
            title: 'Button2',
            tool: 'button'
        }
    ]

    private controller: Controller;

    constructor(controller: Controller) {
        this.controller = controller;
    }

    public Init() {
        this.log.Debug("Init");
        $('#toolTmpl').tmpl(this.controls).appendTo('#controls');

        var jquery: any = jQuery;
        jquery.event.props.push('dataTransfer');

        var toolItems = $('.tool-item');

        toolItems.on('dragstart', event => this.OnDragStart(event));
        toolItems.on('drag', event => this.OnDrag(event));
        toolItems.on('dragend', () => this.OnDragend());
        var self = this;
        toolItems.on('click', function (e) {
            self.log.Debug('click');
            self.controller.EventManager.Trigger(EventManager.EVENT_TEST, { testkey: 'testValue' });
        });

    }

    public OnDragStart(event) {
        this.log.Debug("OnDragStart: ");
        event.originalEvent.dataTransfer.setData("ControlId", $(event.target).closest('div').attr('id'));
    }

    public OnDrag(event) {
        //this.log.Debug("OnDrag: " + event);
    }

    public OnDragend() {
        this.log.Debug("OnDragend");
    }
}

export = ToolsView;