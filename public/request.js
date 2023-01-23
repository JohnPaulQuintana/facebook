console.log('connected...')
const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    // 'Authorization': 'Bearer ' + store.getters.getToken
}

let elements = ''

// function get all post
const getAllPost = async ()=>{
    await axios.get('http://127.0.0.1:8000/api/users',{headers})
    .then((res)=>{
    //    console.log(res)
       res.data.data.forEach(postedBy => {
            console.log(postedBy)
            
                elements += `
                    <div class="col-sm-6 mb-3">
                        <div class="card"  style="box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;height:100px;">
                            <div class="card-body p-3" style="overflow-y:auto">
                                <span class="text-secondary">Posted by : <span class="text-primary border p-1">${postedBy.name}</span></span>
                                <h5 class="card-title">${'Hello, User-1.'}</h5>
                                <p class="card-text text-secondary" style="padding-right:2em">Check what's new about ${''} posts!</p>
                            
                            </div>
                            <a href="./postCollection.html?id=${postedBy.id}" class="btn btn-primary" style="position:absolute;top:1em;right:-1em;">
                                <i class="fa-solid fa-eye">
                                    <span class="position-absolute top-0 start-0 translate-middle p-2 bg-danger border border-light rounded-circle"> 
                                        <span style="font-size:8pt" id="count">${postedBy.relationship.length}</span>
                                    </span>
                                </i>
                            </a>
                            
                        </div>
                    </div>
                `      
       });
       $('#post_container').html(elements)
    })
    .catch((err) => {
        console.log(err)
    })
}

// call
getAllPost()
