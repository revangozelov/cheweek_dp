

  // Select tab-group
  const tabGroup = document.querySelector("tab-group");

  // Setup the default tab which is created when the "New Tab" button is clicked
  tabGroup.setDefaultTab({
    title: "Cheweek",
    src: "https://app.cheweek.com/",
  });

  // Do stuff
  const tab = tabGroup.addTab({
    title: "Cheweek",
    src: "https://app.cheweek.com/"
  });
  tab.on("webview-dom-ready", (tab) => {

     tab.activate();
     tab.webview.addEventListener('page-title-updated', () => {
      tab.setTitle(replaceTitle(tab.webview.getTitle()))
    });
   });
  tabGroup.on("tab-added", (tab, tabGroup) => {
    tab.activate();
    tab.webview.addEventListener('page-title-updated', () => {
      tab.setTitle(replaceTitle(tab.webview.getTitle()))
    });
    tab.webview.addEventListener('new-window', async (e) => {
      console.log(e.url);
      const protocol = (new URL(e.url)).protocol
      if (protocol === 'http:' || protocol === 'https:') {          
        await shell.openExternal(e.url);
      }
    })
  });
  function replaceTitle(dt) {
       return dt.replace('| Cheweek','');
  }
 