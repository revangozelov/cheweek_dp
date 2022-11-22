
const cont = $('#menu-box');
const titleDomain = document.getElementById('domainname');

let menuToggle = document.querySelector('.menu-toggle');
let navigation = document.querySelector('.navigation');
let currentDomain = localStorage.getItem('currentDomain');
let list;
let urlGl;
(async function () {
    

    menuToggle.onclick = function () {
        navigation.classList.toggle('active');
    }
    // Select tab-group;
    async function loadList() {
        list = await window.transferEvent.getList();
        list=list||[];
        setCurrentDomain();
        if (!list || list.length < 2) {
            $(navigation).hide();
        }else{
            $(navigation).show();
        }
        $('#table tbody').empty();
        cont.empty();
        list.forEach((o, i) => {
            var li = $("<li>").append($('<a>')
                .attr('href', '#' + o.url)
                .text(o.name));
            cont.append(li);
            var it;
            if (currentDomain.url != o.url) {
                li.on('click', (e) => {
                    clickItem(o);
                });
                it = tblItem(o, i, true);
            } else {
                li.addClass('active');
                it = tblItem(o, i, false);
            }
            $('#table tbody').append(it);
        });
        console.log(list);
    }
    function tblItem(o, i, trig) {
        var dt = $('<button type="button"  class="btn btn-danger">').text('sil');
        dt.on('click', function () {
            if (i > -1) { // only splice array when item is found
                list.splice(i, 1); // 2nd parameter means remove one item only
            }
            window.transferEvent.refreshList(list, async function (params) {
                  loadList();
            });

        })
        return $('<tr>')
            .append($('<td>').text(o.name))
            .append($('<td>').text(o.url))
            .append(trig ? dt : 'current')
    }
    $('#add-button').on('click', function (params) {
        var urk  = $('#recipient-url').val();
        if (urk.length < 4 &&!urk.contains('cheweek')) {
            return;
          }
          if (urk.startsWith('http://')||urk.startsWith('https://')) {
            list.push({
                name: $('#recipient-name').val(),
                url: urk
            })
            $('#recipient-url').val('');
            $('#recipient-name').val(' ')
            window.transferEvent.refreshList(list, async function (params) {
                 loadList();
            });
          }
      
    })

    function setCurrentDomain() {
        currentDomain =(typeof currentDomain == 'string') ?JSON.parse(currentDomain):currentDomain || list[0];
        var txt = currentDomain.name + ' | Cheweek'
        document.title = txt;
        titleDomain.innerText = txt;
        urlGl = currentDomain.url;
    }
    await loadList();
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
        if(tabGroups.getTabs().length<1){
            window.transferEvent.appQuit();
        }
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

let keys = {
    ctrl: false,
    alt: false,
    i: false,
    t: false,
};
function reset1() {
    if (event.key === "Control") {
        keys.ctrl = false;
    }
    if (event.key === "Alt") {
        keys.alt = false;
    }
    if (event.key === "i") {
        keys.i = false;
    }
    if (event.key === "t") {
        keys.t = false;
    }
}
addEventListener("keydown", (event) => {
    if (event.key === "Control") {
        keys.ctrl = true;
    }
    if (event.key === "Alt") {
        keys.alt = true;
    }
    if (event.key === "i") {
        keys.i = true;
    }
    if (event.key === "t") {
        keys.t = true;
    }
    if (keys.ctrl && keys.alt && keys.t && keys.i) {
        $('#domainModal').modal('show')
        reset1();
    }

});


addEventListener("keyup", (event) => {
    reset1()
});
addEventListener("blur", (event) => {
    reset1()
});

