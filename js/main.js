//setup navbar

let navItems = Array.from(document.getElementsByClassName("nav_item"))
let sections = Array.from(document.getElementsByClassName("section"))

let secitonsPosition = {git: 0}
let currentSection = 'git'

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

            //scrol to previously store scroll section
            $(window).scrollTop(secitonsPosition[currentSection])

            //hide unselected sections
            sections.forEach(s => { if(!s.classList.contains(`section-${currentSection}`)) $(s).hide() })

            //show selected section
            $(`.section-${currentSection}`).fadeIn(100)
        }
    })
})

//navbar fixed style on scroll
window.onscroll = () => { 
    console.log($(window).scrollTop())
    if($(window).scrollTop() > 51) {
        $(".nav").addClass("nav--fixed")
        $("main").addClass("main--fixed")
    }
    else{
        $(".nav").removeClass("nav--fixed")
        $("main").removeClass("main--fixed")

    }
}

