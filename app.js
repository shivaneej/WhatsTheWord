var api_url;
window.onload = function()
{
	document.getElementById("result").style.display="none";
}
function getData()
{
	var sb = document.getElementById("searchBox");
	var word = sb.value;
	api_url = 'https://wordsapiv1.p.mashape.com/words/'+word+'/definitions';
	fetch(api_url);
}
async function fetch(value)
{
	const def = await fetch(value);
    const json = await def.json();
    document.getElementById("result").style.display="block";
    document.getElementById("title").innerHTML = json.word;
    // document.getElementById("def").innerHTML = json.definitions;
}
