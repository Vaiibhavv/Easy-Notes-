
shownotes();  // if user reload the browser still ,notes will be present in the storage.
let addBtn= document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
         
    let addText= document.getElementById("addText");
    let addTitle= document.getElementById("addTitle");
    let notes= localStorage.getItem('notes');  // retrive from the local storage 
    let d= new Date();  // on which date, user added his notes 
    let dd= `${d.toDateString()} ${d.toLocaleTimeString()}`;
    
    if (notes==null)   // check whether notes is empyt or not 
    {
        notesobj= [];
    }
    else{
        notesobj= JSON.parse(notes);  // to convert it into object 
    }
    
    let containObj= {
          title: addTitle.value,
          text:addText.value,
          addDate:dd
    }
    notesobj.push(containObj);
    localStorage.setItem("notes", JSON.stringify(notesobj)) // objcet is stored in local storage in the form of string
    addText.value=""            // after adding the note , previos text will be clear 
    addTitle.value="";
    // console.log(notesobj);

    shownotes(); // to show how many notes are present 
});

//  -------------1----------

function shownotes()
{
    let notes=localStorage.getItem("notes");
    if (notes==null)
    {
        notesobj= [];
    }
    else{
        notesobj= JSON.parse(notes);
    }

    let html= "";   // to create the notes by using dom html
    
    notesobj.forEach(function (element, index){
        html+= ` <div class="notecard my-2 mx-2 card" style="width: 18rem;">
                    <div class="card-body" >
                        <h5 class="card-title"> ${element.title}  </h5>
                        <h8 class="card-title"> ${element.addDate}  </h8>
                        <hr>
                          <p class="card-text"> ${element.text}</p>
                        <button id="${index}" onclick="delete_note(this.id)" class="btn btn-primary">Delete note</button>
                    </div>
                </div> `
                // added the note one by one 
    });

    let notesEle= document.getElementById("notes");
    if(notesobj.length!=0)   // notesobject is the array array of notes , check for any note is present or not.
    {
        notesEle.innerHTML=html;
    }
    else
    {
        notesEle.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
    }
}

/// delete function take the index argument as , id of the delete button -- which is in line no= 41 .

// -------------2 ----------


function delete_note(index)   // if user want to delete the notes , 
{ 
    let notes=localStorage.getItem("notes");
    if (notes==null)
    {
        notesobj= [];
    }
    else{
        notesobj= JSON.parse(notes);
    }

    notesobj.splice(index, 1);   /// at a time only one note user can delete.
    localStorage.setItem("notes", JSON.stringify(notesobj));
    shownotes();
}


// ---------3 --------


// to search a note .

let search= document.getElementById("search");  


// as the user click on the search input tag, this event will be fired 
search.addEventListener("input", function()
{
    let inputVal= search.value.toLowerCase();  // input  
    //console.log("input event is fired");

    // to grab all added notes by their className.
    let notecards= document.getElementsByClassName("notecard");

     // to iterate the contain of notes

    Array.from(notecards).forEach(function(element) {
         
        // grabs the contain of notes with the help of paragraph. tag
        let cardText= element.getElementsByTagName("p")[0].innerText;

        if(cardText.includes(inputVal))  // cardtext is a string, check whether the user input value is present or not.
        {
            element.style.display="block";  //  shows the only contain present block.
        }
        else
        {
            element.style.display="none";
        }
    });


})
