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
    const getComments = async()=>{
        await axios.get(`http://127.0.0.1:8000/api/comments/${value}`,{headers})
        .then((result) => {
            console.log(result)
            result.data.data.forEach(comments => {
                elements += `
                <div class="col-sm-4 mb-3">
                <div class="card" style="overflow: hidden;box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;height:150px">
                  <div class="card-body" style="padding-left: 2.5em;overflow-y:auto">
                    <h5 class="card-title">${comments.who}</h5>
                    <p class="card-text">${comments.comment}</p>
                    
                    <a href="" class="btn btn-primary" style="position:absolute;top:0;right:0">
                        <i class="fa-solid fa-hands-clapping"></i>
                    </a>
                  </div>
                  <div class="box bg-primary text-center text-white" style="position: absolute;height: 7em;width: 30px;font-size:18pt"><b style="margin:4em auto">${comments.id}</b></div>
                </div>
              </div>
            `
            $('#post_details').html(comments.posted.post_title)
            });
            $('#comments_container').html(elements)
        }).catch((err) => {
            console.log(err)
        })
    }
    getComments()
})

