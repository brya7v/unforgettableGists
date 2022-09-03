showLoader()
//setup navbar


let navItems = Array.from(document.getElementsByClassName("nav_item"))
let sections = Array.from(document.getElementsByClassName("section"))

//getcookkies
let secitonsPosition = getCookie('secitonsPosition') ? getCookie('secitonsPosition') : {git: 0}
let currentSection = getCookie('currentSection') ? getCookie('currentSection') : 'git'

document.title = "Unforgettable Gists - " + currentSection

function scrollToElement(id){ setTimeout(() => {
        $("html, body").animate({ scrollTop: $(`#${id}`).offset().top -80 }, 500)
    },100)
}

$(`.nav_item-${currentSection}`).addClass("nav_item--selected")

if($(`.section-${currentSection}`).length < 1 ){ currentSection = $(navItems[0]).attr('section') }

$(`.section-${currentSection}`).fadeIn(500, ()=> {
    setTimeout(() => {

        $("html, body").animate({ scrollTop: secitonsPosition[currentSection] }, 500)

        window.addEventListener('scroll', e => {
            secitonsPosition[currentSection]=window.scrollY
            setCookie('secitonsPosition', JSON.stringify(secitonsPosition), 1)
        })

        setTimeout(() => {
            $(`.nav .nav_item`).each((i, navItem) => {
                let section = $(navItem).attr('section')

                if(section == "about") return 

                //Initialize submenu flex container
                let navItemHtml = `<div class="nav_item_flex-container">`
                $(`.section-${section} .block`).each((i, block ) => {

                    //set def1 lements ids, create submenu items
                    $(block).find(`def1`).each((i, def1) => {
                        let def1_id = ""+section+$(def1).text().replaceAll(" ", "_").replaceAll("%", "_").replaceAll("*", "star").replace(".", "dot")
                        $(def1).prop('id', def1_id)
                        navItemHtml += `<div class="nav_item_flex-container-item" onclick="scrollToElement('${def1_id}')"> ${$(def1).text()}</div>`
                    })

                    //set def2 lements ids, create submenu items
                    $(block).find(`def2`).each((i, def2) => {
                        let def2_id = ""+section+$(def2).text().replaceAll(" ", "_").replaceAll("%", "_").replaceAll("*", "star").replace(".", "dot")
                        $(def2).prop('id', def2_id)
                        navItemHtml += `<div class="nav_item_flex-container-item nav_item_flex-container-item--sec" onclick="scrollToElement('${def2_id}')"> ${$(def2).text()}</div>`

                        //set def3 lements ids, create submenu items
                        $(def2).parent().find(`def3`).each((i, def3) => {
                            let def3_id = ""+section+$(def3).text().replaceAll(" ", "_").replaceAll("%", "_").replaceAll("*", "star").replace(".", "dot")
                            $(def3).prop('id', def3_id)
                            navItemHtml += `<div class="nav_item_flex-container-item nav_item_flex-container-item--third" onclick="scrollToElement('${def3_id}')"> ${$(def3).text()}</div>`
                        })
                    })


                })
                //closing element of the submenu container

                navItemHtml += `</div>`
                //append submenu container with items to the navItem
                $(navItem).append(navItemHtml)
                hideLoader(500)
            })
        },100)
    },100)
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
            document.title = "Unforgettable Gists - " + currentSection
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


function showLoader(){ $(".loader").show() }
function hideLoader(time=0){ setTimeout(()=>{ $(".loader").fadeOut(500)},time)  }


//1. TWO SUM
var twoSum = function(nums, target) {
    var map = new Map()
    var index1, index2
    nums.some( (e, index) => {
        if(map.get(target-e) == null) map.set(e, index)                    
        else {
            index1 = index
            index2 = map.get(target-e) 
            return true
        }
    })        
    return [index1, index2]
}

var twoSum = function(nums, target) {
    var map = {}
    var index1, index2
    nums.some( (e, index) => {
        if(map[target-e] == null) map[e] = index        
        else {
            index1 = index
            index2 = map[target-e]
            return true
        }
    })        
    return [index1, index2]
}

//twoSum([2,7,11,15],9)

var addTwoNumbers = function(l1, l2) {
    
    let num1='', num2='', sum=0
    
    num1 = getListNodeValue(l1)
    num2 = getListNodeValue(l2)
    sum = num1+num2    
    
    sum = sum.toString()
    
    let nodesArray = []
    
    sum.split("").reverse().forEach((e, idx )=> {
        nodesArray.push(new ListNode(e))        
        if(idx > 0) nodesArray[idx-1].next = nodesArray[idx]            
    })
    
    return nodesArray[0]
    
    function getListNodeValue(ln){
        let arr =[], next = ln
        do{
            arr.push(next.val)
            next = next.next          
        }while(next != null)
        return BigInt(arr.reverse().join(""))
    }    
}

var addTwoNumbers = function(l1, l2) {
    
    let num1='', num2='', sum=0
    
    num1 = getListNodeValue(l1)
    num2 = getListNodeValue(l2)
    sum = num1+num2    
    sum = sum.toString()
    
    let node
    
    sum.split("").forEach((e, idx )=> {
        if(idx == 0) node = new ListNode(e)
        else {
            let newNode = new ListNode(e)
            newNode.next = node
            node = newNode
        }       
    })
    return node
    
    function getListNodeValue(ln){
        let arr =[], next = ln
        do{
            arr.push(next.val)
            next = next.next          
        }while(next != null)
        return BigInt(arr.reverse().join(""))
    }    
}

//a less messy solution should add the numbers one by one with an overflow instead of using the BigInt
//addTwoNumbers([2,4,3], [5,6,4])

//3. Longest Substring Without Repeating Charact
function lengthOfLongestSubstring(s) {
    let subs = ""
    let longest = 0
    s.split("").forEach( e=> {
        if(subs.includes(e)) subs = subs.substring(subs.indexOf(e)+1)
        subs += e        
        if(longest < subs.length) longest = subs.length
    })
    return longest
};

//console.log(lengthOfLongestSubstring("aabaab!bb"))


//4. Median of Two Sorted Arrays 
var findMedianSortedArrays = function(nums1, nums2) {
    let arr = [...nums1, ...nums2]
    arr.sort(function(a, b) {
        if( a === Infinity ) return 1
        else if( isNaN(a)) return -1
        else return a - b;
    }) 

    console.log(arr)
    let len = arr.length
    if(len == 1) return arr[0]    
    return len % 2 != 0 ? arr[Math.floor(len/2)] : (arr[Math.floor(len/2)-1]+arr[Math.floor(len/2)])/2    
};

// console.log(findMedianSortedArrays([1,3], [2] ))


function logItems(n){
    for(let i=0; i<n; i++){
        console.log(i)
    }
}