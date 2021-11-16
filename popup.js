var filterList = new Array();

chrome.storage.sync.get(["filterList"], function (result) {
  //Handle first time using extension
  if (result.filterList === undefined) {
    chrome.storage.sync.set({
      filterList: [],
    });
  } else if (result.filterList.length > 0) {
    filterList = result.filterList;
    console.log("FilterList: " + filterList);
    for (var i = 0; i < filterList.length; i++) {
      addToList(filterList[i]);
    }
  }
});

function addButtonTask() {
  var filterWord = document.getElementById("listInput").value;
  //Check if filterWord is empty or only has spaces
  if (/^ *$/.test(filterWord)) {
    alert("You must write something!");
  } else {
    //adding the new item to tasklist array
    filterList.push(filterWord);
    console.log("tasksList under click :" + filterList);
    addToList(filterWord);
    //adding the new list back to chrome storage
    chrome.storage.sync.set({
      filterList: filterList,
    });
  }
}

function addToList(value) {
  console.log("addToList");
  document.getElementById("listInput").value = ""; //Clear input
  var ul = document.getElementById("listUL");
  addItem(ul, value);
}

function addItem(ul, value) {
  var li = document.createElement("li");
  li.classList.add("list-group-item");
  li.appendChild(document.createTextNode(value));
  ul.appendChild(li);
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  $(".close").click(function () {
    var index = $(this).index(".close");
    if (index > -1) {
      console.log(index);
      var div = this.parentElement;
      div.style.display = "none";
      removeItem(index);
      $(".close").eq(index).remove();
    }
  });
}

function removeItem(itemIndex) {
  console.log("removeitem");
  chrome.storage.sync.get(["filterList"], function (result) {
    filterList = result.filterList;
    filterList.splice(itemIndex, 1);
    console.log("new list", filterList);

    chrome.storage.sync.set({
      filterList: filterList,
    });
  });
}

document.getElementById("addButton").addEventListener("click", addButtonTask);

//Best way to handle appears to be to update the array/object followed by updating the list
//Add - Add to array/object and then add to the list (Ordering?)
//Clear list - Empty the array and then clear the list
//Delete item - Remove from array/object (which is easier?) and then remove from list (or clear list and then recreate [probably easier])
