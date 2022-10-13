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
                        let def1_id = ""+section+$(def1).text().replaceAll(" ", "_").replaceAll("%", "_").replaceAll("*", "star").replaceAll(".", "dot").replaceAll("(", "_").replaceAll(")", "_").replaceAll("/", "_")
                        $(def1).prop('id', def1_id)
                        navItemHtml += `<div class="nav_item_flex-container-item" onclick="scrollToElement('${def1_id}')"> ${$(def1).text()}</div>`
                    })

                    //set def2 lements ids, create submenu items
                    $(block).find(`def2`).each((i, def2) => {
                        let def2_id = ""+section+$(def2).text().replaceAll(" ", "_").replaceAll("%", "_").replaceAll("*", "star").replaceAll(".", "dot").replaceAll("(", "_").replaceAll(")", "_").replaceAll("/", "_")
                        $(def2).prop('id', def2_id)
                        navItemHtml += `<div class="nav_item_flex-container-item nav_item_flex-container-item--sec" onclick="scrollToElement('${def2_id}')"> ${$(def2).text()}</div>`

                        //set def3 lements ids, create submenu items
                        $(def2).parent().find(`def3`).each((i, def3) => {
                            let def3_id = ""+section+$(def3).text().replaceAll(" ", "_").replaceAll("%", "_").replaceAll("*", "star").replaceAll(".", "dot").replaceAll("(", "_").replaceAll(")", "_").replaceAll("/", "_")
                            $(def3).prop('id', def3_id)
                            navItemHtml += `<div class="nav_item_flex-container-item nav_item_flex-container-item--third" onclick="scrollToElement('${def3_id}')"> ${$(def3).text()}</div>`
                        })
                    })


                })
                //closing element of the submenu container

                navItemHtml += `</div>`
                //append submenu container with items to the navItem
                $(navItem).append(navItemHtml)
                hideLoader(250)
            })
        },250)
    },250)
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


//5 longest palindrome

var longestPalindrome = function(s) {    
    let longest = ""

    for(let i=0; i< s.length; i++){
        if(longest.length < s.substring(i).length){
            let substr = s.substring(i)            
            let tempStr = ""
            for(let j=0; j< substr.length; j++){
                tempStr = substr.substring(0, substr.length-j) 
                if(tempStr.length > longest.length && isPalindrome(tempStr)) {
                    longest = tempStr
                    break
                }
            }
        } 
        else break
    }

    function isPalindrome(str){
        for(let i=0; i< Math.floor(str.length-1/2); i++){
            if(str[i] != str[str.length-1-i]) return false
        }
        return true
    }

    return longest
};

// let x = "civilwartestingwhetherthatnaptionoranynartionsoconceivedandsodedicatedcanlongendureWeareqmetonagreatbattlefiemldoftzhatwarWehavecometodedicpateaportionofthatfieldasafinalrestingplaceforthosewhoheregavetheirlivesthatthatnationmightliveItisaltogetherfangandproperthatweshoulddothisButinalargersensewecannotdedicatewecannotconsecratewecannothallowthisgroundThebravelmenlivinganddeadwhostruggledherehaveconsecrateditfaraboveourpoorponwertoaddordetractTgheworldadswfilllittlenotlenorlongrememberwhatwesayherebutitcanneverforgetwhattheydidhereItisforusthelivingrathertobededicatedheretotheulnfinishedworkwhichtheywhofoughtherehavethusfarsonoblyadvancedItisratherforustobeherededicatedtothegreattdafskremainingbeforeusthatfromthesehonoreddeadwetakeincreaseddevotiontothatcauseforwhichtheygavethelastpfullmeasureofdevotionthatweherehighlyresolvethatthesedeadshallnothavediedinvainthatthisnationunsderGodshallhaveanewbirthoffreedomandthatgovernmentofthepeoplebythepeopleforthepeopleshallnotperishfromtheearth"
// console.log(longestPalindrome(x))


//6. Zigzag Conversion
var convert = function(s, numRows) {
    let matrix = {}

    for(let i=0; i < numRows; i++){ matrix[i] = [] }

    let index = 0
    let indexRef = 1
    for(let i=0; i < s.length; i++){

        matrix[index].push(s[i])        
        
        index += indexRef
                
        if(index == numRows-1) indexRef = -1
        if(index == 0) indexRef = 1    
        if(numRows == 1) index = 0
    }

    let text = ""
    for(let i=0; i < numRows; i++){ text += matrix[i].join("") }
    return text
}

// console.log(convert("AB", 3))


//7. Reverse Integer

var reverse = function(x) {
    
    let str = ''+x
    let rev = ''

    for(let i=str.length-1; i>=0 ; i--){
        if(str[i] != '-')rev += str[i]
    }

    if(Math.log2(rev)>31) return 0
    rev = +rev
    if(x<0) rev = -rev
    return rev
};

//console.log(reverse(-12349996))





//8. String to Integer (atoi)
/**
 * @param {string} s
 * @return {number}
 */
 var myAtoi = function(s) {
    let num = ''
    let numFlag = false
    let symbolFlag = false
    let negativeFlag = false

    for(let i=0; i<s.length ; i++){

        if(s[i] == ' ' || (s[i]>=0 && s[i]<=9) || ((s[i] == '-' || s[i] == '+') && !numFlag)) {
            
            if(s[i] == ' ' && (numFlag || symbolFlag)) break
            if(s[i] == '-' || s[i] == '+') {
                if(!symbolFlag) {
                    symbolFlag = true
                    if(s[i] == '-')negativeFlag = true
                }                    
                else return 0
            }
            else if(s[i] != ' ' ){
                numFlag = true
                num +=s[i]
            }
        }
        else if(num.length>0 && num!='-') break
        else if(!numFlag) return 0
    }

    if(isNaN(+num)) num =0
    if(num != 0){
        if(negativeFlag) num = -num
        if(num>0 && Math.log2(num)>=31) return Math.pow(2,31)-1
        if(num<0 && Math.log2(-num)>=31) return -Math.pow(2,31)
    }
    return +num
};

// console.log(myAtoi("   +0 123"))


var isPalindrome = function(x) {
    let length = Math.ceil(Math.log10(x+1))
    let tempX = x
    let palindrome = 0
    for(let i=length-1, j=0; i >= 0; i--, j++) {
        let z = Math.floor(tempX/(1*10**i))

        tempX = tempX - (z * (1*10**i))
        palindrome+= (1*10**j) * z
    } 

    if(x == palindrome) return true
    return false
};

// console.log(isPalindrome(-123321))