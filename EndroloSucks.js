//hook pushState(), replaceState() and popstate event : fire locationchange event
//https://todayilearned.net/2021/03/no-javascript-event-url-change
function runEndrolo(){
    history.pushState = ( f => function pushState(){
        var ret = f.apply(this, arguments);
        window.dispatchEvent(new Event('pushstate'));
        window.dispatchEvent(new Event('locationchange'));
        return ret;
    })(history.pushState);
    history.replaceState = ( f => function replaceState(){
        var ret = f.apply(this, arguments);
        window.dispatchEvent(new Event('replacestate'));
        window.dispatchEvent(new Event('locationchange'));
        return ret;
    })(history.replaceState);
    $(window).on('popstate',()=>{
        window.dispatchEvent(new Event('locationchange'))
    });

    //https://stackoverflow.com/questions/5525071/how-to-wait-until-an-element-exists
    function waitForElm(selector) {
        return new Promise(resolve => {
            if (document.querySelector(selector)) {
                return resolve(document.querySelector(selector));
            }
            const observer = new MutationObserver(mutations => {
                if (document.querySelector(selector)) {
                    resolve(document.querySelector(selector));
                    observer.disconnect();
                }
            });
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        });
    }

    //handle locationchange event
    waitForElm('.chunk').then(() => {
        const indicator = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="50px" height="50px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" style="position:absolute; top:10px; right:10px; background: #00000000 none repeat scroll 0% 0%; display: block;"><path fill="none" stroke-width="8" stroke-dasharray="42.76482137044271 42.76482137044271" d="M24.3 30C11.4 30 5 43.3 5 50s6.4 20 19.3 20c19.3 0 32.1-40 51.4-40 C88.6 30 95 43.3 95 50s-6.4 20-19.3 20C56.4 70 43.6 30 24.3 30z" stroke-linecap="round" style="transform:scale(0.8);transform-origin:50px 50px" stroke="#000"><animate attributeName="stroke-dashoffset" repeatCount="indefinite" dur="1s" keyTimes="0;1" values="0;256.58892822265625"></animate></path></svg>'
        const Block = '<div class="endrolo-block" style="display:block;position:absolute;top:0;left:0;height:100%;width:100%;background-color:rgb(53, 62, 67);z-index:100;"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" style="position:absolute; top:50%; left:50%; transform: translate(-50%, -50%); background: #00000000 none repeat scroll 0% 0%; display: block;"><path fill="none" stroke-width="8" stroke-dasharray="42.76482137044271 42.76482137044271" d="M24.3 30C11.4 30 5 43.3 5 50s6.4 20 19.3 20c19.3 0 32.1-40 51.4-40 C88.6 30 95 43.3 95 50s-6.4 20-19.3 20C56.4 70 43.6 30 24.3 30z" stroke-linecap="round" style="transform:scale(0.8);transform-origin:50px 50px" stroke="#FFFFFF"><animate attributeName="stroke-dashoffset" repeatCount="indefinite" dur="1s" keyTimes="0;1" values="0;256.58892822265625"></animate></path></svg></div>'
        $(body).append(indicator);
        $(window).on('locationchange',()=>{
            console.log("locationchange");
            $('.chunk').prepend(Block);
            setTimeout(() => {
                let elem = document.getElementsByClassName("has-chunk-visit active")[0];
                if(elem.classList.contains("has-question")){
                    waitForElm('[type="radio"]').then(() => {
                        for (var x of document.querySelectorAll('[type="radio"]')){
                        x.click()
                        }
                        $('.endrolo-block').remove();
                    });
                }
                else {
                    $('.endrolo-block').remove();
                }
            }, 1000);
        });
    });
}
