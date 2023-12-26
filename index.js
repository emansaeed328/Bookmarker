
var BookmarkName = document.getElementById('name');
var BookmarkURL = document.getElementById('Url');
var list = []
var nameCheck ;
var urlCheck;
var update_index = -1 ;
if(JSON.parse(localStorage.getItem('Sites')) != null){

    list = JSON.parse(localStorage.getItem('Sites'));
    displaySites();
}


function CheckName(name){
    nameCheck = /(.*[a-z]){3}/i.test(name);
    if(nameCheck == true)
    {
        BookmarkName.style.borderColor = 'green'
        document.getElementById('name-valid').classList.replace('d-flex','d-none');
    }
    else
    {
        BookmarkName.style.borderColor = 'red'
        document.getElementById('name-valid').classList.replace('d-none','d-flex');
    }
    return nameCheck;
}

function CheckUrl(url){

    urlCheck = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/.test(url);
    if(urlCheck == true)
    {
        BookmarkURL.style.borderColor = 'green'
        document.getElementById('url-valid').classList.replace('d-flex','d-none');
    }
    else
    {
        BookmarkURL.style.borderColor = 'red'
        document.getElementById('url-valid').classList.replace('d-none','d-flex');
    }
    return urlCheck;
}
function validate(name , url)
{
    nameCheck = /(.*[a-z]){3}/i.test(name);
    if(nameCheck ==true)
    {
        BookmarkName.style.borderColor = 'green'
        document.getElementById('name-valid').classList.replace('d-flex','d-none');
    }
    else
    {
        document.getElementById('name-valid').classList.replace('d-none','d-flex');
    }
    urlCheck = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/.test(url);
    if(urlCheck ==true)
    {
        BookmarkURL.style.borderColor = 'green'
    }
    
    if(nameCheck != true || urlCheck != true){
        return false;
    }
    else
    {
        return true;
    }

}
function checkDuplicate(name,url)
{
    var valid = true;
    if(list.length != 0){
        for(var i = 0; i<list.length; i++)
        {
            if( list[i].name.toLowerCase()==name.toLowerCase() && list[i].url.toLowerCase()== url.toLowerCase())
            {
                valid = false
                window.alert('This site is already in your favourite list!')
            }
            else
            {
                valid = true
            }
        }
    }
return valid;
}
function Submit(){

    if (validate(BookmarkName.value,BookmarkURL.value) && checkDuplicate(BookmarkName.value,BookmarkURL.value)){
    var site = {
        name : BookmarkName.value,
        url  : BookmarkURL.value
    };
    list.push(site);
    localStorage.setItem('Sites',JSON.stringify(list));
    BookmarkName.value = '';
    BookmarkURL.value = '';
    window.alert('Site added to your favorites');
    displaySites();
    }
    else
    {
        var x = document.getElementById('Demo');
        x.classList.replace('d-none','d-flex'); 
        if(nameCheck == false)
        {BookmarkName.focus();
        BookmarkName.style.borderColor = 'red';}
        else if(urlCheck == false)
        {
            BookmarkURL.focus();
            BookmarkURL.style.borderColor = 'red';
        }
        else
        {
            BookmarkName.focus();
            BookmarkName.style.borderColor = 'red';

        }
    }
}
function displaySites(){

    var siteData = '';
    for( var i = 0; i< list.length; i++){
        siteData += `<tr>
    <td>${i+1}</td>
    <td>${list[i].name}</td>
    <td>
      <button onclick="Visit('${list[i].url}')" class="btn bg-success text-white">
        <i class="fa-regular fa-eye"></i> Visit
      </button>
    </td>
    <td>
    <button onclick="Update(${i})" class="btn bg-secondary text-white">
    <i class="fa-regular fa-pen-to-square"></i> Update
    </button>
    </td>
    <td>
      <button onclick="Delete(${i})" class="btn bg-danger text-white">
        <i class="fa-solid fa-trash"></i> Delete
      </button>
      
    </td>
  </tr>`
    }
document.getElementById('data').innerHTML = siteData;

}
function Update(index){
BookmarkName.value = list[index].name;
BookmarkURL.value = list[index].url;
document.getElementById('submit').classList.replace('d-flex','d-none');
document.getElementById('Save').classList.replace('d-none','d-flex');
document.getElementById('cancel').classList.replace('d-none','d-flex');
update_index = index;

}
function Save(){
    if (validate(BookmarkName.value,BookmarkURL.value) && checkDuplicate(BookmarkName.value,BookmarkURL.value)){

        list[update_index].name = BookmarkName.value;
        list[update_index].url = BookmarkURL.value;
        localStorage.setItem('Sites',JSON.stringify(list));
        BookmarkName.value = '';
        BookmarkURL.value = '';
        window.alert('Site Data Updated Successfully.');
        displaySites();
        }
        else
        {
            var x = document.getElementById('Demo');
            x.classList.replace('d-none','d-flex'); 
            if(nameCheck == false)
            {BookmarkName.focus();
            BookmarkName.style.borderColor = 'red';}
            else if(urlCheck == false)
            {
                BookmarkURL.focus();
                BookmarkURL.style.borderColor = 'red';
            }
            else
            {
                BookmarkName.focus();
                BookmarkName.style.borderColor = 'red';
    
            }
        }
    document.getElementById('Save').classList.replace('d-flex','d-none');
    document.getElementById('submit').classList.replace('d-none','d-flex');

}
function Cancel()
{
    BookmarkName.value = '';
    BookmarkURL.value = '';
    displaySites();
    document.getElementById('Save').classList.replace('d-flex','d-none');
    document.getElementById('cancel').classList.replace('d-flex','d-none');
    document.getElementById('submit').classList.replace('d-none','d-flex');
}
function Delete(index){

    list.splice(index,1);
    localStorage.setItem('Sites',JSON.stringify(list));
    displaySites()
}

function Visit(url)
{
    console.log(url);
    console.log(url);
        window.open(url,'__blank');
}

function search(name)
{
    var siteData= '';
    for(var i = 0; i<list.length; i++)
    {

        if(list[i].name.toLowerCase().includes(name.toLowerCase()))
        {
            siteData += `<tr>
            <td>${i+1}</td>
            <td>${list[i].name}</td>
            <td>
              <button onclick="Visit('${list[i].url}')" class="btn bg-success text-white">
                <i class="fa-regular fa-eye"></i> Visit
              </button>
            </td>
            <td>
            <button onclick="Update(${i})" class="btn bg-secondary text-white">
            <i class="fa-regular fa-pen-to-square"></i> Update
            </button>
            </td>
            <td>
              <button onclick="Delete(${i})" class="btn bg-danger text-white">
                <i class="fa-solid fa-trash"></i> Delete
              </button>
            </td>
          </tr>`
        }  
    }
    document.getElementById('data').innerHTML = siteData;

}
function Close(){

var x = document.getElementById('Demo');
    x.classList.replace('d-flex','d-none');

}