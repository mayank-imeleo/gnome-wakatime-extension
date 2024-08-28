const {St} = imports.gi;
const Main = imports.ui.main;
const GLib = imports.gi.GLib;

let panelButton = new St.Bin({
    style: 'padding-top: 7px',
});

let panelButtonText = new St.Label({
    text: `W:${getWakatimeValue()}`,
});

function disable() {
    Main.panel._rightBox.remove_child(panelButton);
}

function enable() {
    Main.panel._rightBox.insert_child_at_index(panelButton, 0);
    updatePanelButtonText();
    GLib.timeout_add_seconds(GLib.PRIORITY_DEFAULT, 5, () => {
        updatePanelButtonText();
        return true; // Continue the timeout
    });
}

function getWakatimeValue() {
    var [ok, commandOutputBytes] = GLib.spawn_command_line_sync('wakatime --today');
    if (!ok) {
        return "Error";
    }
    return commandOutputBytes.toString();
}

function init() {

    panelButton.set_child(panelButtonText);
}

function updatePanelButtonText() {
    panelButtonText.set_text(`W:${getWakatimeValue()}`);
}






