window.onload = function()
{
	document.getElementById("result").style.display="none";
	document.getElementById("title").style.display="none";
	document.getElementById("def").style.display="none";
}

var url;
async function getData()
{
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
	 	var partOfSpeech = jsonobj[0].fl;
	 	var defs= [];
	 	defs=jsonobj[0].shortdef;
	 	var output="";
	 	for (var i = 0; i < defs.length; i++) 
		{
	  		output = output + '<li class="define">'+defs[i]+'</li>';
		}
	    document.getElementById("result").style.display="block";
	    document.getElementById("title").style.display="block";
	    document.getElementById("title").innerHTML=word;
	    document.getElementById("def").style.display="block";
	    document.getElementById("partOfSpeech").innerHTML=partOfSpeech;
	    document.getElementById("list").innerHTML=output;
	}
	// console.log(word);
	

}
