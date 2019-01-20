window.onload = function()
{
	document.getElementById("result").style.display="none";
	document.getElementById("title").style.display="none";
	document.getElementById("def").style.display="none";
}

var url;
async function getData()
{
	document.getElementById("list").innerHTML="";
	document.getElementById("title").innerHTML="";
	document.getElementById("partOfSpeech").innerHTML="";
	var word = document.getElementById("searchBox").value;
	if(word=="" || word==null)
	{
		document.getElementsByClassName("errorMsg")[0].innerHTML='Please enter any word.';
	}
	else
	{
		url ="https://dictionaryapi.com/api/v3/references/learners/json/"+word
		+"?key=6b5f2059-92e7-4761-b787-d7ff3514ae73";
		const def = await fetch(url);
	 	const jsonobj = await def.json();
	 	console.log(typeof(jsonobj[0]));
	 	if(typeof(jsonobj[0])=="string")
	 	{
	 		var sugg = jsonobj[0];
			for (var i = 1; i < jsonobj.length ; i++) 
			{
			 	sugg = sugg + ', '+jsonobj[i];
			}
			console.log(sugg);
			var show = document.getElementsByClassName("noRes")[0];
			show.style.display="block";
	 		show.innerHTML = 'Sorry! No results found. Did you mean any of '+
	 		sugg+ '?';
	 	}
	 	else
	 	{
	 		var partOfSpeech = jsonobj[0].fl;
	 		console.log(typeof(jsonobj[0]));
		 	var defs= [];
		 	defs=jsonobj[0].shortdef;
	 		var output="";
		 	for (var i = 0; i < defs.length; i++) 
			{
		  		output = output + '<li class="define">'+defs[i]+'</li>';
			}
		    document.getElementById("partOfSpeech").innerHTML=partOfSpeech;
		    document.getElementById("list").innerHTML=output;
	 	}
	 	
	    document.getElementById("result").style.display="block";
	    document.getElementById("title").style.display="block";
	    document.getElementById("title").innerHTML=word;
	    document.getElementById("def").style.display="block";
	   
	}
	
	

}

window.addEventListener('load', async e => {
    console.log(navigator.onLine);
    if ('serviceWorker' in navigator) {
        try {
            navigator.serviceWorker.register('serviceworker.js');
            console.log('SW registered');
        } catch (error) {
            console.log('SW failed');

        }
    }
    if(navigator.onLine){
        navigator.serviceWorker.controller.postMessage("online");
    }
    else
    {
        displayNotification('No Internet','Please connent to a network to search a new word');
        navigator.serviceWorker.controller.postMessage("offline");
    }
    await fetchNew();
});
