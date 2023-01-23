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
  const getAllPostBy = async ()=>{
    await axios.get(`http://127.0.0.1:8000/api/posts/${value}`,{headers})
    .then((result) => {
        console.log(result)
       result.data.data.forEach(postedBy => {
            // if(){

            // }
                elements += `
                <div class="col-sm-6 mb-3">
                    <div class="card"  style="box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;height:180px;">
                        <div class="card-body p-3" style="overflow-y:auto">
                            <h5 class="card-title">${postedBy.post_title}</h5>
                            <p class="card-text text-secondary" style="padding-right:2em">${postedBy.description} posts!</p>
                        
                        </div>
                        <a href="./likes.html?id=${postedBy.id}" class="btn btn-primary" style="position:absolute;top:1em;right:-1em;">
                            <i class="fa-solid fa-thumbs-up">
                                <span class="position-absolute top-0 start-0 translate-middle p-2 bg-danger border border-light rounded-circle"> 
                                    <span style="font-size:8pt" class="count">${postedBy.likes.length}</span>
                                </span>
                            </i>
                        </a>
                        <a href="./disliked.html?id=${postedBy.id}" class="btn btn-primary" style="position:absolute;top:4.5em;right:-1em;">
                            <i class="fa-solid fa-thumbs-down">
                                <span class="position-absolute top-0 start-0 translate-middle p-2 bg-danger border border-light rounded-circle"> 
                                    <span style="font-size:8pt" class="count">${postedBy.disliked.length}</span>
                                </span>
                            </i>
                        </a>
                        <a href="./comments.html?id=${postedBy.id}" class="btn btn-primary" style="position:absolute;top:8em;right:-1em;">
                            <i class="fa-solid fa-comment">
                                <span class="position-absolute top-0 start-0 translate-middle p-2 bg-danger border border-light rounded-circle"> 
                                    <span style="font-size:8pt" class="count">${postedBy.comments.length}</span>
                                    
                                </span>
                            </i>
                        </a>
                        
                        <span class="text-center text-secondary">${postedBy.created_at}</span>
                    </div>
                </div>
            `
       });
       $('#postedby_container').html(elements)
    }).catch((err) => {
        console.log(err)
    })
  }
  getAllPostBy()
  })