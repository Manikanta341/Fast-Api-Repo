let login = document.getElementById("login")
let form = document.getElementById("form")
let cancel= document.getElementById("cancel")
let save = document.getElementById("submit")
let usernameEle = document.getElementById("username").value
let emailEle = document.getElementById("email").value
let passwordEle = document.getElementById("password").value
let contactEle = document.getElementById("contact").value


login.addEventListener('click',function()
{
    form.classList.add('active')     
})
cancel.addEventListener("click",function()
{
    form.classList.remove('active')
})

save.addEventListener('click',function()
{
    let http_method="POST"
    let URL= 'http://127.0.0.1:8000/Mobiles/registration/'


    if(usernameEle && emailEle && passwordEle && contactEle)
    {
        let form_data={username:usernameEle,email:emailEle,password:passwordEle,contact:contactEle}
        fetch(URL,{method:http_method,headers:{"Content-Type":"application/json"},body:JSON.stringify(form_data)}).then((e)=>{console.log(e),getRegistration()})
    }
})
function getRegistration()
{
    usernameEle=''
    emailEle=''
    passwordEle=''
    contactEle=''

}