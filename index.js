
var BookmarkName = document.getElementById('name');
var BookmarkURL = document.getElementById('Url');
var list = []
var nameCheck ;
var urlCheck;
if(JSON.parse(localStorage.getItem('Sites')) != null){

    list = JSON.parse(localStorage.getItem('Sites'));
    displaySites();
}

function validate(name , url)
{
    nameCheck = /(.*[a-z]){3}/i.test(name);
    urlCheck = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/.test(url);
    if(nameCheck != true || urlCheck != true){
        return false;
    }
    else
    {
        return true;
    }

}
function Submit(){


    if (validate(BookmarkName.value,BookmarkURL.value)){
    var site = {
        name : BookmarkName.value,
        url  : BookmarkURL.value
    };
    list.push(site);
    localStorage.setItem('Sites',JSON.stringify(list));
    displaySites();
    }
    else
    {
        // window.alert(`Site Name or Url is not valid, Please follow the rules below :
        // - Site name must contain at least 3 characters
        // - Site URL must be a valid one`);
        var x = document.getElementById('Demo');
        x.classList.replace('d-none','d-flex'); 
        console.log(x);
        if(nameCheck == false)
        {BookmarkName.focus();
        BookmarkName.style.borderColor = 'red';}
        else
        {
            BookmarkURL.focus();
            BookmarkURL.style.borderColor = 'red';
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
      <button onclick="Delete(${i})" class="btn bg-danger text-white">
        <i class="fa-solid fa-trash"></i> Delete
      </button>
    </td>
  </tr>`
    }
document.getElementById('data').innerHTML = siteData;

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
function Close(){
//    var x = document.getElementById('Demo').style.display = 'none';
// if(display == 1)
// {
//     x.style.display = 'flex';
//     display = 0;
// }
// else
// {
//     x.style.display = 'none';
//     display = 1;
// }
var x = document.getElementById('Demo');
    x.classList.replace('d-flex','d-none');
    // x.style.removeProperty ='d-none';
    // x.style.setProperty = 'd-flex';
    console.log(x);
}