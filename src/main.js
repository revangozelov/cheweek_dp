 (async function(){
    const cont = document.getElementById('menu-box');
    const titleDomain = document.getElementById('domainname');

    let menuToggle = document.querySelector('.menu-toggle');
    let navigation = document.querySelector('.navigation');
    
    menuToggle.onclick = function () {
        navigation.classList.toggle('active');
    }
    let currentDomain = localStorage.getItem('currentDomain');
    let list;
    let urlGl;
    
    // Select tab-group;
    async function loadList() {
        list = await window.transferEvent.getList();
        setCurrentDomain();
        if(!list||list.length<2){
            navigation.remove();
           return
        }
        list.forEach(o => {
            var li = document.createElement("li");
            var a = document.createElement('a');
            a.setAttribute('href', '#' + o.url);
            a.innerText = o.name;
            li.appendChild(a);
            cont.appendChild(li);
            if(currentDomain.url!=o.url){
                li.addEventListener('click', (e) => {
                    clickItem(o);
                });
            }else{
                li.classList.add('active')
            }
            
        });
    }
    
    
    function setCurrentDomain() {
        currentDomain = JSON.parse(currentDomain) || list[0];
        var txt = currentDomain.name + ' | Cheweek'
        document.title = txt;
        titleDomain.innerText = txt;
        urlGl = currentDomain.url;
    }
    await loadList(null);
    const tabGroup = document.querySelector("tab-group");
    
    // Setup the default tab which is created when the "New Tab" button is clicked
    tabGroup.setDefaultTab({
        title: "Cheweek",
        src: urlGl + 'index.html?lastMenuId=21010300595707289233'
    });
    
    // Do stuff
    const tab = tabGroup.addTab({
        title: "Cheweek",
        src: urlGl
    });
    tab.activate();
    event_binder(tab);
    tabGroup.on("tab-added", (tab, tabGroups) => {
        addWidth();
        tab.activate();
        event_binder(tab);
    });
    tabGroup.on("tab-removed", (tab, tabGroups) => {
        addWidth();
    });
    function addWidth(params) {
        var div = tabGroup.parentElement;
        var item = tabGroup.tabs;
        let width = div.offsetWidth - 62;
        let itemWitdh = width / item.length;
        item.forEach(elm => {
            const o = elm.element;
            o.style.width = itemWitdh + 'px';
        });
    }
    function event_binder(tab) {
        tab.webview.addEventListener('page-title-updated', () => {
            tab.setTitle(replaceTitle(tab.webview.getTitle()));
        });
        tab.webview.addEventListener('new-window', (e) => {
            if (e.disposition == 'new-window') {
                window.open(e.url, '_blank', 'autoHideMenuBar=true,width=1100,height=800,nodeIntegration=no');
            } else {
                tabGroup.addTab({
                    title: "Cheweek",
                    src: e.url
                });
            }
        });
        //   window.transferEvent.setTab(tab)
        /*  tab.webview.addEventListener("dom-ready", function () {
             tab.webview.openDevTools();
         }); */
    }
    
    function replaceTitle(dt) {
        return dt.replace('| Cheweek', '');
    }
    function clickItem(dt) {
    
        if (confirm('Bütün pəncərələr baglanacaq.. Əminsiniz?!!')) {
            localStorage.setItem('currentDomain', JSON.stringify(dt));
            document.location.reload();
        };
    }
    
    
}())
