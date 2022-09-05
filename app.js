const getJulianDate = () => {
    date = new Date()
    const time = date.getTime();
    const tzoffset = date.getTimezoneOffset()

    return (time / 86400000) - (tzoffset / 1440) + 2440587.5;
}

const LUNAR_MONTH = 29.530588853;

const getLunarAge = () => {
    const percent = getLunarAgePercent();
    const age = percent * LUNAR_MONTH;
    return age;
}
const getLunarAgePercent = () => {
    return normalize((getJulianDate() - 2451550.3) / LUNAR_MONTH);
}


const normalize = value => {
    value = value - Math.floor(value);
    if (value < 0)
        value = value + 1
    return value;
}


getclip(getLunarAge())

function getclip(lunarAge) {
    let videoDuration = 23.786646;

    let video = document.createElement('video');
    let source = document.createElement('source');
    source.src = 'moon.mp4'
    video.appendChild(source);


    let canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');

    let time = (lunarAge / LUNAR_MONTH) * videoDuration;

    video.currentTime = time;

    video.onloadeddata = () => {
        let w = video.videoWidth,
            h = video.videoHeight

        canvas.width = h - 4;
        canvas.height = h - 4;

        ctx.fillRect(0, 0, w, h);
        ctx.drawImage(video, (h - w) / 2, 0, w, h);

        let dataURI = canvas.toDataURL('image/jpeg');
        let img = document.createElement('img');

        img.src = dataURI;
        document.body.appendChild(img);
    }
}