const BASE_URL = "http://localhost:8080"
const USER_DATA_KEY = 'userData'

const userData = localStorage.getItem(USER_DATA_KEY)

function navigate(path) {
  location.pathname = path
}

const loginBtn = document.querySelector(".register__login-btn") 
const elRegisterForm = document.querySelector(".register__form")
const elRegisterNameInput = document.querySelector(".js-register-name")
const elRegisterUserNameInput = document.querySelector(".js-register-username")
const elRegisterEmailInput = document.querySelector(".js-register-email")
const elRegisterPasswordInput = document.querySelector(".js-register-password")
const errorMsg = document.querySelector(".error")

elRegisterForm.addEventListener('submit', onFormSubmit)

loginBtn.addEventListener("click", (e) => {
    location.href = "/src/modules/login/index.html"
})

function onFormSubmit(e) {
  e.preventDefault()
  errorMsg.textContent = ""
  const nameValue = elRegisterNameInput.value.trim()
  const userNameValue = elRegisterUserNameInput.value.trim()
  const emailValue = elRegisterEmailInput.value.trim()
  const passwordValue = elRegisterPasswordInput.value.trim()
  
  if (nameValue && userNameValue && emailValue && passwordValue) {
      fetch(BASE_URL + "/register", {
        method: 'POST',
        body: JSON.stringify({
            name: nameValue,
            username: userNameValue,
            email: emailValue,
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
        if (data) { 
          localStorage.setItem(USER_DATA_KEY, JSON.stringify(data))
          navigate("/src/modules/login/index.html")
        } else {
          errorMsg.textContent = "Bu login parol avval ishlatilgan yoki noto'g'ri"
        }
      }).catch((err) => {
        console.log({err})
      })
  }
}