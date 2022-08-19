//setup navbar

let navItems = Array.from(document.getElementsByClassName("nav_item"))
let sections = Array.from(document.getElementsByClassName("section"))


//getcookkies

let secitonsPosition = getCookie('secitonsPosition') ? getCookie('secitonsPosition') : {git: 0}
let currentSection = getCookie('currentSection') ? getCookie('currentSection') : 'git'

$(`.nav_item-${currentSection}`).addClass("nav_item--selected")
$(`.section-${currentSection}`).show(100 ,()=> {
    $(window).scrollTop(secitonsPosition[currentSection])

    window.addEventListener('scroll', e => {
        secitonsPosition[currentSection]=window.scrollY
        setCookie('secitonsPosition', JSON.stringify(secitonsPosition), 1)
    })
})

navItems.forEach(e => {
    e.addEventListener("click", () => {

        //get current window scroll
        let currentScroll = window.pageYOffset

        //store current scroll
        secitonsPosition[currentSection] = currentScroll

        //scroll top if new selection is the same as the current one
        if(currentSection == e.getAttribute("section")){
            secitonsPosition[currentSection] = 0
            $("html, body").animate({ scrollTop: "0px" })
        }

        else {

            $(`.nav_item-${currentSection}`).removeClass("nav_item--selected")
            
            //set new current selection
            currentSection = e.getAttribute("section")
            $(`.nav_item-${currentSection}`).addClass("nav_item--selected")

            //set position when first time section selection
            if(secitonsPosition[currentSection] == null) secitonsPosition[currentSection] = 0

            //hide unselected sections
            sections.forEach(s => { if(!s.classList.contains(`section-${currentSection}`)) $(s).hide() })

            //show selected section
            $(`.section-${currentSection}`).fadeIn(100)

            //scrol to previously store scroll section after showing current section
            $(window).scrollTop(secitonsPosition[currentSection])
        }

        setCookie('secitonsPosition', JSON.stringify(secitonsPosition), 1)
        setCookie('currentSection', JSON.stringify(currentSection), 1)
    })
})


function setCookie(key, value, expiry) {
    var expires = new Date();
    expires.setTime(expires.getTime() + (expiry * 24 * 60 * 60 * 1000));
    document.cookie = key + '=' + value + ';path=/'+ ';sameSite=none' + ';expires=' + expires.toUTCString();
}

function getCookie(key) {
    var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
    return keyValue ? JSON.parse(keyValue[2]) : null;
}

