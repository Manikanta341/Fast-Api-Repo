const person ={"name":"Mani"}
let  college ="kit"
function greet(age,city)
{
  console.log(`Hello ,${age}   age ${this.name} and city ${college} college ${city}`)
}
greet.call(person,25,"hyd",college)

greet.apply(person,[26,"bang"])

const binds =greet.bind(person,27,"chennai")
binds()