document.addEventListener('DOMContentLoaded', function() {
  var addNoteButton = document.getElementById('addnote');
  addNoteButton.addEventListener('click', function() {
    chrome.tabs.getSelected(null, function(tab) {
      d = document;
      var liElement = d.createElement('li');
      liElement.style.padding = "4px";
      var divElement = d.createElement('div');
      divElement.style.width = "100%";
      divElement.style.height = "30px";
      divElement.style.boxShadow = "lightgrey 4px 5px 5px";
      if(document.querySelector('body').classList.contains('active')){
        let activeColor = document.querySelector('.active').getAttribute("data-color");
        divElement.style.backgroundColor = activeColor;
      }
      divElement.classList.add("newNoteDiv");
      liElement.appendChild(divElement);

      let headingDivElement = d.createElement('div');
      headingDivElement.setAttribute("class","newNoteHeading");
      headingDivElement.style.height = "30px";
      headingDivElement.style.width = "100%";
      headingDivElement.style.fontWeight = "bold";
      let bodyDivElement = d.createElement('div');
      bodyDivElement.setAttribute("class","newNoteBody");
      bodyDivElement.style.height = "100%";
      bodyDivElement.style.width = "100%";
      let spanElement = d.createElement('span');
      let iconElement = d.createElement('i');
      iconElement.setAttribute("class","fa fa-trash");
      iconElement.addEventListener('click', removeNoteFuntion, false);
      iconElement.style.fontSize = "16px";
      iconElement.style.padding = "6px 9px";
      spanElement.style.width = "30px";
      spanElement.style.height = "30px";
      spanElement.style.float = "right";
      spanElement.style.cursor = "pointer";
      spanElement.appendChild(iconElement);
      headingDivElement.appendChild(spanElement);
      divElement.appendChild(headingDivElement);
      divElement.appendChild(bodyDivElement);

      document.getElementById('noteList').appendChild(liElement);

      let notesDiv = document.getElementsByClassName("newNoteDiv");
      for (var k = 0; k< notesDiv.length; k++) {
          notesDiv[k].addEventListener('click', selectNotes, false);
          notesDiv[k].setAttribute('id', "newNoteDiv_"+k);
          notesDiv[k].setAttribute('data-serial', (k+1));
      }

      let notesHeadingDiv = document.getElementsByClassName("newNoteHeading");
      let notesBodyDiv = document.getElementsByClassName("newNoteBody");
      // alert(notesHeadingDiv.length);
      for (var l = 0; l< notesHeadingDiv.length; l++) {
          notesHeadingDiv[l].addEventListener('dblclick', noteheadingEditable, false);
          notesHeadingDiv[l].setAttribute('id', "noteHeadingDiv_"+l);
          notesHeadingDiv[l].setAttribute('data-heading', "Note_"+(l+1));

          let pElement = d.createElement('p');
          notesHeadingDiv[l].appendChild(pElement);
      }
      for (var m = 0; m< notesBodyDiv.length; m++) {
          notesBodyDiv[m].addEventListener('dblclick', notebodyEditable, false);
          notesBodyDiv[m].setAttribute('id', "noteBodyDiv_"+m);
          notesBodyDiv[m].setAttribute('data-body', "Body_"+(m+1));
      }
    });
  }, false);

  var colorActive = document.getElementsByClassName("colorPalleteClick");

  var removeNote = document.getElementsByClassName("fa-trash");

  var myFunction = function() {
      if (document.querySelector('.active') !== null) {
        document.querySelector('.active').classList.remove('active');
      }
      this.classList.add("active");
  };

  var removeNoteFuntion = function() {
      this.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode.parentNode.parentNode);
  };

  var noteheadingEditable = function() {
      this.childNodes[1].contentEditable = "true";
      this.childNodes[1].style.padding = "6px";
  };

  var notebodyEditable = function() {
      this.contentEditable = "true";
      this.style.height = "150px";
      this.style.wordWrap = "break-word";
  };

  for (var j = 0; j < colorActive.length; j++) {
      colorActive[j].addEventListener('click', myFunction, false);
  }

  var selectNotes = function() {
    if (document.querySelector('.selected') !== null) {
      document.querySelector('.selected').classList.remove('selected');
    }
    // else{
      this.classList.add("selected");
    // }

    var color = document.querySelector('.active').getAttribute("data-color");
    this.style.backgroundColor = color;
  };

}, false);
