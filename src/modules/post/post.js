const BASE_URL = "http://localhost:8080"
const USER_DATA_KEY = 'userData'

if(!localStorage.getItem("userData")){
    navigate("/src/modules/login/index.html")
}

function navigate(path){
  location.pathname = path
}

const elPostForm = document.querySelector(".post__form")
const elPostInputTitle = document.querySelector(".js-post-title")
const elPostInputBody = document.querySelector(".js-post-body")

const userData = localStorage.getItem("userData")
const user = JSON.parse(userData)
const elUserAvatar = document.querySelector(".header__user-btn").textContent = user?.user?.name.slice(0, 1).toUpperCase()

elPostForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const titleValue = elPostInputTitle.value.trim()
    const bodyValue = elPostInputBody.value.trim()
    if(titleValue && bodyValue){
        fetch(`${BASE_URL}/posts`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: titleValue,
                body: bodyValue,
                userId: user.user.id,
                viuw: 0,
                image:'https://picsum.photos/360/300/?random',
                id: Date.now(),
                created_at: new Date().toLocaleDateString(),
                user:{
                    name: user.user.name,
                }
            })
        })
        .then((res) => {
            if(res.ok){
                navigate("/src/modules/home/index.html")
                return res.json()
            }
        })
       
        .catch((err) => {
            console.log(err)
        })
    }
})