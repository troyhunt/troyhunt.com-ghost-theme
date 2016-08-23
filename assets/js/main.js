! function() {
    function init() {
        initEvents()
    }

    function initEvents() {
        openbtn.addEventListener("click", toggleMenu), closebtn && closebtn.addEventListener("click", toggleMenu), content.addEventListener("click", function(ev) {
            var target = ev.target;
            isOpen && target !== openbtn && toggleMenu()
        })
    }

    function toggleMenu() {
        isOpen ? classie.remove(bodyEl, "show-menu") : classie.add(bodyEl, "show-menu"), isOpen = !isOpen
    }
    var bodyEl = document.body,
        content = document.querySelector("#container"),
        openbtn = document.getElementById("open-button"),
        closebtn = document.getElementById("close-button"),
        isOpen = !1;
    init()
}();