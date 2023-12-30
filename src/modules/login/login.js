const BASE_URL = "http://localhost:8080"
const USER_DATA_KEY = 'userData'

const userData = localStorage.getItem(USER_DATA_KEY)

function navigate(path) {
  location.pathname = path
}

if(userData) {
    navigate("/src/modules/home/index.html")
}

const registerBtn = document.querySelector(".js-register-btn") 
const elLogInForm = document.querySelector(".login__form")
const elUserNameInput = document.querySelector(".js-login-name")
const elPasswordInput = document.querySelector(".js-login-password")

elLogInForm.addEventListener('submit', onFormSubmit)

registerBtn.addEventListener("click", (e) => {
  location.href = "/src/modules/register/index.html"
})

function onFormSubmit(e) {

  const userNameValue = elUserNameInput.value.trim()
  const passwordValue = elPasswordInput.value.trim()
  
  if (userNameValue && passwordValue) {
      fetch(BASE_URL + '/login', {
        method: 'POST',
        body: JSON.stringify({
          username: userNameValue,
          password: passwordValue
        }),
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res => {
        if (res.ok) {
          return res.json()
        }
      }).then(data => {
        localStorage.setItem(USER_DATA_KEY, JSON.stringify(data))
        navigate("/src/modules/home/index.html")
      }).catch((err) => {
        console.log(err)
      })
  }
}