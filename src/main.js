// Select tab-group
const tabGroup = document.querySelector("tab-group");

// Setup the default tab which is created when the "New Tab" button is clicked
tabGroup.setDefaultTab({
    title: "Cheweek",
    src: urlGl
});

// Do stuff
const tab = tabGroup.addTab({
    title: "Cheweek",
    src: urlGl
});
tab.on("webview-dom-ready", (tab) => {
    tab.activate();
    event_binder(tab);
});
tabGroup.on("tab-added", (tab, tabGroups) => {
    tab.activate();
    event_binder(tab);
});
function event_binder(tab) {
    tab.webview.addEventListener('page-title-updated', () => {
        tab.setTitle(replaceTitle(tab.webview.getTitle()));
    });
    tab.webview.addEventListener('new-window', (e) => {
        if(e.disposition == 'new-window'){
            window.open(e.url, '_blank', 'autoHideMenuBar=true,width=1100,height=800,nodeIntegration=no');
        } else {
            tabGroup.addTab({
                title: "Cheweek",
                src: e.url
            });
        }
    });
}
function replaceTitle(dt) {
    return dt.replace('| Cheweek', '');
}