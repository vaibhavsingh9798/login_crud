let form = document.getElementById('form')
form.addEventListener('submit',onSubmit)

// select and applay listener for del button
// let items = document.getElementById('items')
// items.addEventListener('click',delItem)
// items.addEventListener('click',editItem)

let count = 0;

function onSubmit(e){
    e.preventDefault()
    let name =  document.getElementById('name').value
    let email = document.getElementById('email').value
    let phone = document.getElementById('phone').value
   
    if(name && email && phone)
   {
     let objName = {name,email,phone}
     addUser(objName)
     count++
   }
     document.getElementById('name').value=''
     document.getElementById('email').value=''
     document.getElementById('phone').value=''
 
}

// get element from crudcrud network call  if refresh page
let refresh = async () => {
  let ul = document.getElementById('items')

  let users = await getUser()
   users.data.map((item) => {
    let li = document.createElement('li')
    li.appendChild(document.createTextNode(`${item.name} :- ${item.email} :- ${item.phone}`))
    ul.appendChild(li) 
   })
}
if(count == 0){
  refresh()
}

// addUser in CrudCuud 
function addUser(objData){
  axios.post('https://crudcrud.com/api/0a4c918dac0f41ed815ceed4640b8b27/users',objData)
  .then((res) =>  console.log(res))
  .catch(err => console.log(err))
}

// getUser from crudcrud
async function getUser(){
  let users = await axios.get('https://crudcrud.com/api/0a4c918dac0f41ed815ceed4640b8b27/users')
  // .then((res) => console.log(res))
  // .catch(err => console.log(err))
  return users;
}

// function updateUser(){
//   axios.put('https://crudcrud.com/api/0a4c918dac0f41ed815ceed4640b8b27/users')
//   .then((res) => console.log(res))
//   .catch(err => console.log(err))
// }

// function deleteUser(){
//   axios.put('https://crudcrud.com/api/0a4c918dac0f41ed815ceed4640b8b27/users')
//   .then((res) => console.log(res))
//   .catch(err => console.log(err))
// }
