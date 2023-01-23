document.addEventListener('DOMContentLoaded',()=>{
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
    // Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
    let value = params.id; // "some_value"
    console.log(value)

    const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        // 'Authorization': 'Bearer ' + store.getters.getToken
        }
    let elements = ''
    const getDisliked = async()=>{
        await axios.get(`http://127.0.0.1:8000/api/dislike/${value}`,{headers})
        .then((result) => {
            console.log(result)
            result.data.data.forEach(disliked => {
                elements += `
                <div class="col-sm-4 mb-3">
                <div class="card" style="overflow: hidden;box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;">
                  <div class="card-body" style=" padding-left: 2.5em;">
                    <h5 class="card-title"><b>${disliked.who}</b></h5>
                    <p class="card-text">${disliked.who} disliked your post. review your posts!</p>
                    
                    <a href="" class="btn btn-primary" style="position:absolute;top:0;right:0">
                        <i class="fa-solid fa-hands-clapping"></i>
                    </a>
                  </div>
                  <div class="box bg-primary text-center text-white" style="position: absolute;height: 7em;width: 30px;font-size:18pt"><b style="margin:4em auto">${disliked.id}</b></div>
                </div>
              </div>
            `
            $('#post_details').html(disliked.posted.post_title)
            });
            $('#likes_container').html(elements)
            
        }).catch((err) => {
            console.log(err)
        })
    }
    getDisliked()
})

