class HttpClient {
    constructor() {
        this.url = 'http://localhost:8000/';
    }

    get(url) {
        url = this.url + url;
        
        return new Promise( (resolve, reject)=> {
            $.ajax({
                url: url,
                method: 'GET',
                success: resolve,
                error: reject
            })
        });
    }

    put(url, data) {
        url = this.url + url;

        return new Promise( (resolve, reject)=> {
            $.ajax({
                url: url,
                data: data,
                method: 'PUT',
                success: resolve,
                error: reject
            })
        });
    }

    post(url, data) {
        url = this.url + url;
        return new Promise( (resolve, reject)=> {
            $.ajax({
                url: url,
                data: data,
                method: 'POST',
                success: resolve,
                error: reject
            })
        });
    }
}

;(function(window) {
    window.httpClient = new HttpClient();
})(window);