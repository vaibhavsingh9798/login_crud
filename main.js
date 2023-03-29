let form = document.getElementById('form')
form.addEventListener('submit',onSubmit)
form.addEventListener('submit',updateUser)

// select and applay listener for del button and edit button
  let items = document.getElementById('items')
  items.addEventListener('click',deleteUser)
  items.addEventListener('click',updateUser)
  
  // global varible for update
   let edit = false;

function onSubmit(e){
    e.preventDefault()
    let name =  document.getElementById('name').value
    let email = document.getElementById('email').value
    let phone = document.getElementById('phone').value
   
    if(name && email && phone)
   {
     let objName = {name,email,phone}
     console.log('objName',objName)
     if(edit)
     updateUser(e,objName)
     else
     addUser(objName)
     
   }
     document.getElementById('name').value=''
     document.getElementById('email').value=''
     document.getElementById('phone').value=''
 
}


 // print data 
 let printUser = async () =>{
  let users;
  let ul = document.getElementById('items')
  // call get method 
   let info = await getUser()
   users = info.data
   users.map((item,ind) => {
    let li = document.createElement('li')
    li.appendChild(document.createTextNode(`${item.name} - ${item.email} - ${item.phone}`))
    let delBtn = document.createElement('button')
    let editBtn = document.createElement('button')
    delBtn.appendChild(document.createTextNode('x'))
    delBtn.setAttribute('class','btn btn-danger  float-right m-1')
    delBtn.setAttribute('id',`${item._id}`)
    editBtn.appendChild(document.createTextNode('edit'))
    editBtn.setAttribute('class','btn btn-info float-right m-1')
    editBtn.setAttribute('id',`${item._id}`)
    ul.appendChild(li) 
    li.appendChild(delBtn)
    li.appendChild(editBtn)
   })
  }

  // when dom load then call printUser function
window.addEventListener('DOMContentLoaded',printUser)

  // add single user on add and update in dom 
 function addSingleUserInDom(item,id){
  let ul = document.getElementById('items')
  let li = document.createElement('li')
  li.appendChild(document.createTextNode(`${item.name} - ${item.email} - ${item.phone}`))
  let delBtn = document.createElement('button')
  let editBtn = document.createElement('button')
  delBtn.appendChild(document.createTextNode('x'))
  delBtn.setAttribute('class','btn btn-danger  float-right m-1')
  delBtn.setAttribute('id',`${id}`)
  editBtn.appendChild(document.createTextNode('edit'))
  editBtn.setAttribute('class','btn btn-info float-right m-1')
  editBtn.setAttribute('id',`${item._id}`)
  ul.appendChild(li) 
  li.appendChild(delBtn)
  li.appendChild(editBtn)
 }
 


// addUser in CrudCuud 
function addUser(objData){
  axios.post('https://crudcrud.com/api/ea9de078a4bd43b7b5bf35527b713763/users',objData)
  .then((res) =>   addSingleUserInDom(res.data,res.data._id))
  .catch(err => console.log(err))
}

// getUser from crudcrud
async function getUser(){
  try{
   let users = await axios.get('https://crudcrud.com/api/ea9de078a4bd43b7b5bf35527b713763/users')
  return users;
  }
  catch(err){
    console.log(err)
  }
}

function deleteUser(e){
  e.preventDefault();
  if(e.target.getAttribute('class') == 'btn btn-danger  float-right m-1'){
  var id = e.target.getAttribute('id')
  let curNode = e.target.parentElement
  curNode.remove();
   axios.delete(`https://crudcrud.com/api/ea9de078a4bd43b7b5bf35527b713763/users/${id}`)
   .then((res) => console.log(res))
   .catch(err => console.log(err))
  }
}


let id;
function updateUser(e,userObj){
  e.preventDefault();
  if(e.target.getAttribute('class') == 'btn btn-info float-right m-1'){
   id = e.target.getAttribute('id')
   let curNode = e.target.parentElement;
   console.log('-curNode',curNode)
   let data = curNode.textContent.split('-')
   console.log('-data',data)
   document.getElementById('name').value=data[0]
   document.getElementById('email').value=data[1]
   document.getElementById('phone').value=data[2].replace('xedit','')
   curNode.remove()
   edit = true;
  }
  if(userObj && id){
   addSingleUserInDom(userObj,id)
  console.log(id,'--',userObj)
   axios.put(`https://crudcrud.com/api/ea9de078a4bd43b7b5bf35527b713763/users/${id}`,userObj)
   .then((res) => console.log(res))
   .catch(err => console.log(err))
    
  }

}

 

