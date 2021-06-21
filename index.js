const limit = 15; 
let LANG = "zh";
var nowIndex = 0 ;
var isLoading = false;
var GAME = 'League%20of%20Legends'

//https://github.com/Lidemy/forum/discussions/138#discussion-3400596
//Call API
const getData = (game,lang,cb) => {  
    const Accept = 'application/vnd.twitchtv.v5+json';
    const clientId = 'luz7ktst4nb0p2ur5eee2apvgmf837';     
    const apiUrl = 'https://api.twitch.tv/kraken/streams/?game='+game+'&limit=' + limit + '&offset=' + nowIndex + '&language=' + lang;
    isLoading = true;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", apiUrl, true);
    xhr.setRequestHeader('Accept',Accept);
    xhr.setRequestHeader('Client-id',clientId);
    xhr.send();
    xhr.onreadystatechange = function() {
        if(this.readyState === 4 && this.status === 200){
            var responseData =JSON.parse(this.responseText);
            cb(null, responseData);   
        }
}
}


//append Data to row

const appendData = (game,lang) => {
    
    getData(game,lang, (err, data) => {
        const streams = data.streams;
        const $row = $('.row');
        for (let index = 0; index < streams.length; index++) {
            $row.append(getColumn(streams[index]));        
        }
    })
    nowIndex += limit ;
    setTimeout(() => {isLoading = false;}, 1000); //setting isLoading => 避免持續發送request
                                                  //serring delay => 避免滑鼠滾輪抖動，發送2~3個request
    
}

// API json to html

const getColumn = data => {
    return `
    <div class="col" onclick="window.open('${data.channel.url}', '_blank')">
                <div class="preview"><img src="${data.preview.medium}" onload="this.style.opacity=1"></div>
                <div class="buttom">
                    <div class="manPhoto"><img src="${data.channel.logo}" onload="this.style.opacity=1"></div>
                    <div class="channel_info">
                        <div class="channel_name"> ${data.channel.status}</div>
                        <div class="channel_owner">${data.channel.display_name}</div>
                    </div>
                </div>
            </div>`;
}

// ***********************************18N************************************//

const changeLang = (lang) =>{
    //console.log(windows.I18N[lang]['TITLE']);
    $('.menu h1').text(window.I18N[lang]['TITLE']);
    LANG = lang;
    $('.row').empty();
    nowIndex = 0;
    appendData(GAME,lang);
}
const changeGame = (game) =>{
    //console.log(windows.I18N[lang]['TITLE']);
    GAME = game;
    $('.row').empty();
    nowIndex = 0;
    appendData(game,LANG);
}

//Load
appendData(GAME,LANG);
$(window).scroll(function(){  //scroll event
    console.log('new scroll');
    if($(window).scrollTop() + $(window).height()>= $(document).height()-400){  
        //load new channel
        if(!isLoading)      //isLoading is for 避免持續發送request
            appendData(GAME,LANG);
    }        
})
