const form = document.getElementById("form")
console.log(form)
const uname = document.getElementById("uname")
const email = document.getElementById("email")
const password = document.getElementById("password")
const cpassword = document.getElementById("cpassword")
const tc = document.getElementById("tc")

uname.addEventListener('keyup',checkUname)
form.addEventListener('submit',(e)=>{e.preventDefault(),validate()})
var isValidName = false
var isValidEmail = false
var isValidPassword = false
var isValidCpassword = false
var isValidtc = false

function validate()
{
    let nameValue =   uname.value.trim();
    let emailValue = email.value.trim();
    console.log(emailValue)
    let passwordValue =password.value.trim();
    let cpasswordValue = cpassword.value.trim(); 
    let tcValue = tc.value.trim();
    isValidName=false
    isValidEmail=false
    isValidPassword=false
    isValidCpassword=false
    isValidtc=false

    // uname check
    if(nameValue===''){
        setError(uname,'name can not be empty')
       
    }
    else if(nameValue.length<3){
        setError(uname,'uname can not be less then 3 chars')
    }
    else
    {
        setSuccess(uname) 
         isValidName=true
    }   


//check email
if(emailValue=='')
   setError(email,'email can not be empty')
else if (!emailCheck(emailValue))
    setError(email,'enter valid email id')
else
{
    setSuccess(email)
    isValidEmail=true
}
//password check
if(passwordValue==='')
    setError(password,'pass word can not be empty')
else if (passwordValue.length<8)
    setError(password,'password should be more than 8 char')
else
{
    setSuccess(password)
    isValidPassword=true
}

//check confime password
if(cpasswordValue==='')
    setError(cpassword,'can not be empty')
else if(cpasswordValue!==passwordValue)
    setError(cpassword,'can not match')
else
{
    setSuccess(cpassword)
    isValidCpassword=true
}

//check boc check
if(!tc.checked)
    setError(tc,'can not be checked')
else 
{
    setSuccess(tc)
    isValidtc=true
}
if(isValidName&&isValidEmail&&isValidPassword&&isValidCpassword&&isValidtc)
{
    console.log("all are true")
    form.submit()

}
}

function setError(input,message)
{
    let parent = input.parentElement;
    console.log(parent)
    let small = parent.querySelector('small')
    small.innerText=message
    parent.classList.add('error')
    parent.classList.remove('success')
}
function setSuccess(input)
{
    let parent = input.parentElement;
    parent.classList.add('success')
    parent.classList.remove('error')
}
function emailCheck(input)
{

   let emailReg = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
   let valid = emailReg.test(input)
   console.log(valid)
   return valid
}

function checkUname()
{
    let unameValue = uname.value.trim()
    console.log("characters")
    if(unameValue=='')
    {
        setError(uname,'can not be empty')
    }
    else if(uname.length<3)
    {
        setError(uname,'can not be less than 3 chars')
    }
    else{
        setSuccess(uname)
        isValidName=true
    }
}