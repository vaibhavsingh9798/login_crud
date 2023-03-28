let form = document.getElementById('form')
form.addEventListener('submit',onSubmit)

// select and applay listener for del button
//  let items = document.getElementById('items')
//  items.addEventListener('click',delItem)
//  items.addEventListener('click',editItem)


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
 window.addEventListener('DOMContentLoaded',async () =>{ 
  let ul = document.getElementById('items')
  let users = await getUser()
   users.data.map((item) => {
    let li = document.createElement('li')
    li.appendChild(document.createTextNode(`${item.name} :- ${item.email} :- ${item.phone}`))
    let delBtn = document.createElement('button')
    let editBtn = document.createElement('button')
    delBtn.appendChild(document.createTextNode('x'))
    delBtn.setAttribute('class','btn btn-danger  float-right m-1')
    editBtn.appendChild(document.createTextNode('edit'))
    editBtn.setAttribute('class','btn btn-info float-right m-1')
    ul.appendChild(li) 
    li.appendChild(delBtn)
    li.appendChild(editBtn)
   })
  })


// addUser in CrudCuud 
function addUser(objData){
  axios.post('https://crudcrud.com/api/0a4c918dac0f41ed815ceed4640b8b27/users',objData)
  .then((res) =>  console.log(res))
  .catch(err => console.log(err))
}

// getUser from crudcrud
async function getUser(){
  try{
   let users = await axios.get('https://crudcrud.com/api/0a4c918dac0f41ed815ceed4640b8b27/users')
  return users;
  }
  catch(err){
    console.log(err)
  }
}

// function updateUser(e){
//   axios.put('https://crudcrud.com/api/0a4c918dac0f41ed815ceed4640b8b27/users')
//   .then((res) => console.log(res))
//   .catch(err => console.log(err))
// }

// function deleteUser(){
//   axios.put('https://crudcrud.com/api/0a4c918dac0f41ed815ceed4640b8b27/users')
//   .then((res) => console.log(res))
//   .catch(err => console.log(err))
// }
