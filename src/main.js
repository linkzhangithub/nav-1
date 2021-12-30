const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const webPage = localStorage.getItem('webPage')
const webPageObject = JSON.parse(webPage)
const hashMap = webPageObject || [
    { logo: 'A', url: 'https://www.alibaba.com'},
    { logo: 'B', url:'https://www.bilibili.com'},
]

const simplifyUrl = (url) =>{
    return url.replace('https://', '')
    .replace('http://', '')
    .replace('www.', '')
    .replace(/\/.*/, '')  //删除以 / 开头的内容
}

const render = ()=>{
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node, index)=>{
        const $li = $(`<li>
                <div class="site">
                    <div class="logo">${node.logo}</div>
                    <div class="link">${simplifyUrl(node.url)}</div>
                    <div class="close">
                        <svg class="icon">
                            <use xlink:href="#icon-close"></use>
                        </svg>
                    </div>
                </div>
        </li>`).insertBefore($lastLi)
        $li.on('click', ()=>{
            window.open(node.url)
        })
        $li.on('click', '.close', (e)=>{
            e.stopPropagation()  //阻止冒泡
            hashMap.splice(index, 1)
            render()
        })
    })
}

render()

$('.addButton').on('click', ()=>{
        let url = window.prompt('输入一个要新增的网址吧')
        if(url.indexOf('http')!==0){
            url = 'https://' + url
        }
        console.log(url)
        hashMap.push({
            logo: simplifyUrl(url)[0].toUpperCase(), 
            url:url
        });
        render()
    })

window.onbeforeunload = ()=>{
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x',string)
}

// $(document).on('keypress',(e)=>{
//     const {key} = e //const key = e.key的简写
//     for(let i=0;i<hashMap.length;i++){
//         if(hashMap[i].logo.toLowerCase()===key){//如果hashMap的第i个logo的小写等于key
//             window.open(hashMap[i].url) //就打开这个网站
//         }
//     }
// })

