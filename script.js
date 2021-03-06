let imagesFromFlickr = [];
let imagesFromPage = [];

function jsonpToJson(jsonp) {
    if (jsonp !== null && jsonp.length > 0) {
        return JSON.parse(jsonp.replace(/^[^(]*\(/, '').replace(/\);?$/, ''));
    }
    return null;
}

function getImgUrl(image) {
    return `https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`;
}

function sendRequest() {
    const apiUrl = 'https://api.flickr.com/services/rest/?';
    return $.ajax({
        url : apiUrl,
        type : 'GET',
        dataType : 'text',
        data : {
            method : 'flickr.photos.search',
            format : 'json',
            api_key : '34c737fdc64936e6f309e73c6551a974',
            text : 'Candace Kucsulain',
            media : 'photos',
            page : '1',
            per_page : '500'
        }
    });
}

$(window).on('load', () => {
    imagesFromPage = document.querySelectorAll('img');
    if (imagesFromPage.length > 0) {
        sendRequest().done((response) => {
            imagesFromFlickr = jsonpToJson(response).photos.photo;
            let imgWidth;
            let imgHeight;
            $.each(imagesFromPage, (index, image) => {
                imgWidth = image.clientWidth;
                imgHeight = image.clientHeight;
                image.src = getImgUrl(imagesFromFlickr[index]);
                image.width = imgWidth;
                image.height = imgHeight;
            });
            /*
            $(document).on('DOMSubtreeModified', () => {
                let newImagesFromPage = document.querySelectorAll('img');
                if (imagesFromPage.length < newImagesFromPage.length) {
                    let startIndex = imagesFromPage.length;
                    imagesFromPage = newImagesFromPage;
                    for (var i = startIndex; i < newImagesFromPage.length; i++) {
                        imagesFromPage[i].src = getImgUrl(imagesFromFlickr[i]);
                    }
                }
            });
            */
        });
    }
});
