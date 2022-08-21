//setup navbar

let navItems = Array.from(document.getElementsByClassName("nav_item"))
let sections = Array.from(document.getElementsByClassName("section"))

//getcookkies
let secitonsPosition = getCookie('secitonsPosition') ? getCookie('secitonsPosition') : {git: 0}
let currentSection = getCookie('currentSection') ? getCookie('currentSection') : 'git'



function scrollToElement(id){
    console.log(id)
    console.log($(`#${id}`).offset())
    setTimeout(() => {        
        $(window).scrollTop($(`#${id}`).offset().top -80)
    }, 50);
}

$(`.nav_item-${currentSection}`).addClass("nav_item--selected")
$(`.section-${currentSection}`).show(250 ,()=> {
    $(window).scrollTop(secitonsPosition[currentSection])

    window.addEventListener('scroll', e => {
        secitonsPosition[currentSection]=window.scrollY
        setCookie('secitonsPosition', JSON.stringify(secitonsPosition), 1)
    })

    $(`.nav .nav_item`).each((i, navItem) => {
        let section = $(navItem).attr('section')

        // let navItemHtml = `<div class="nav_item_flex-container">`

        // // $(navItem).append("<def1>test</def1>")

        // $(`.section-${section} def1`).each((i, def1) => {




        //     let def1_id = ""+section+$(def1).text().replaceAll(" ", "_")
        //     $(def1).prop('id', def1_id)
        //     navItemHtml += `<div class="nav_item_flex-container-item" onclick="scrollToElement('${def1_id}')"> ${$(def1).text()}</div>`


        //     $(`#${def1_id} def2`).each((i, def2) => {
        //         let def2_id = ""+section+$(def2).text().replaceAll(" ", "_")
        //         $(def2).prop('id', def2_id)
        //         navItemHtml += `<div class="nav_item_flex-container-item--sec" onclick="scrollToElement('${def2_id}')"> ${$(def2).text()}</div>`
        //     })


        // })

        let navItemHtml = `<div class="nav_item_flex-container">`

        $(`.section-${section} .block`).each((i, block ) => {

            $(block).find(`def1`).each((i, def1) => {
                let def1_id = ""+section+$(def1).text().replaceAll(" ", "_").replaceAll("%", "_").replaceAll("*", "star")
                $(def1).prop('id', def1_id)
                navItemHtml += `<div class="nav_item_flex-container-item" onclick="scrollToElement('${def1_id}')"> ${$(def1).text()}</div>`
            })

            $(block).find(`def2`).each((i, def2) => {
                let def2_id = ""+section+$(def2).text().replaceAll(" ", "_").replaceAll("%", "_").replaceAll("*", "star")
                $(def2).prop('id', def2_id)
                navItemHtml += `<div class="nav_item_flex-container-item nav_item_flex-container-item--sec" onclick="scrollToElement('${def2_id}')"> ${$(def2).text()}</div>`
            })

            $(block).find(`def3`).each((i, def3) => {
                let def3_id = ""+section+$(def3).text().replaceAll(" ", "_").replaceAll("%", "_").replaceAll("*", "star")
                $(def3).prop('id', def3_id)
                navItemHtml += `<div class="nav_item_flex-container-item nav_item_flex-container-item--third" onclick="scrollToElement('${def3_id}')"> ${$(def3).text()}</div>`
            })

        })
        navItemHtml += `</div>`

        $(navItem).append(navItemHtml)

    })

    // $(`def1`).each((i, e) => {
    //     console.log($(e).text())
    //     $(e).prop('id', "def1_"+$(e).text())
    // })

    // $(`def2`).each((i, e) => {
    //     console.log($(e).text())
    //     $(e).prop('id', "def2_"+$(e).text())
    // })
    
})

navItems.forEach(e => {
    e.addEventListener("click", () => {

        //get current window scroll
        let currentScroll = window.pageYOffset

        //store current scroll
        secitonsPosition[currentSection] = currentScroll

        //scroll top if new selection is the same as the current one
        if(currentSection == e.getAttribute("section")){
            // secitonsPosition[currentSection] = 0
            // $("html, body").animate({ scrollTop: "0px" })
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
    var expires = new Date()
    expires.setTime(expires.getTime() + (expiry * 24 * 60 * 60 * 1000))
    document.cookie = key + '=' + value + ';path=/'+ ';sameSite=none' + ';expires=' + expires.toUTCString()
}

function getCookie(key) {
    var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)')
    return keyValue ? JSON.parse(keyValue[2]) : null
}

//set ids on def1 elements

// $(`section-${currentSection} def1`)
// $(`section-${currentSection} def1`)
