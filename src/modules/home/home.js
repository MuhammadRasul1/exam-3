const BASE_URL = "http://localhost:8080"
const USER_DATA_KEY = 'userData'

fetch(`${BASE_URL}/posts`,{
  method: "GET",
  headers: {
      "Content-Type": "application/json"
  }
})
.then((res) => {
  if(res.ok){
      return res.json()
  }
})
.then((data) => {
  data.forEach(post => render(post))
})

//render posts
const elPostsList = document.querySelector(".article__list")
const elTemplate = document.querySelector("#posts-template").content

function render(post) {
  const fragment = document.createDocumentFragment()

    const cloneList = elTemplate.cloneNode(true)
    cloneList.querySelector('.article__item').id = post.id
    cloneList.querySelector('.article__hero-img').src = post.image
    cloneList.querySelector('.js-article-date').textContent = post.created_at
    cloneList.querySelector('.js-article-title').textContent = post.title
    cloneList.querySelector('.js-article-body').textContent = post.body
    cloneList.querySelector('.js-article-avatar').src = post.user.img
    if(post.user?.name && post.user?.surname){
      cloneList.querySelector('.js-article-username').textContent = post?.user?.name + ' ' + post?.user?.surname
    }else{
        cloneList.querySelector('.js-article-username').textContent = post?.user?.name
    }
    cloneList.querySelector('.js-article-views').textContent = post.views || 0
    
    fragment.appendChild(cloneList)

  elPostsList.appendChild(fragment) 
}

if(!localStorage.getItem(USER_DATA_KEY)) {
  location.pathname = '/src/modules/login/index.html'
}
