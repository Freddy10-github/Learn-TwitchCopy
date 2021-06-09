
const getData = (cb) => {
const Accept = 'application/vnd.twitchtv.v5+json';
const clientId = 'luz7ktst4nb0p2ur5eee2apvgmf837';
const limit = 20;
const apiUrl = 'https://api.twitch.tv/kraken/streams/?game=League%20of%20Legends&limit=' + limit;
//https://github.com/Lidemy/forum/discussions/138#discussion-3400596

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

getData((err, data) => {
    const streams = data.streams;
    const $row = $('.row');
    for (let index = 0; index < streams.length; index++) {
        $row.append(getColumn(streams[index]));        
    }
})
const getColumn = data => {
    return `
    <div class="col">
                <div class="preview"><img src="${data.preview.medium}" alt=""></div>
                <div class="buttom">
                    <div class="manPhoto"><img src="${data.channel.logo}" alt=""></div>
                    <div class="channel_info">
                        <div class="channel_name"> ${data.channel.status}</div>
                        <div class="channel_owner">${data.channel.display_name}</div>
                    </div>
                </div>
            </div>`;
}
