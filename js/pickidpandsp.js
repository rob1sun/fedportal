
//Läs in IdP-array från json
{
		fetch('https://robertsundin.se/json/multiidp.json')
            .then(function (idpResponse) {
                return idpResponse.json();
            })
            .then(function (idpData) {
                appendSpData(idpData);
            })
            .catch(function (err) {
                console.log('error: ' + err);
            });
//Append json och nästla efterföljande script
        function appendSpData(idpData) {
			
            for (let y = 0; y < idpData.length; y++) {
				let idpDisplayName = idpData[y].idpDisplayName
				let idpEntityId = idpData[y].idpEntityId
				let idpImg = idpData[y].idpImg
				
//Skapa lista och infoga på sida
const dFragIdp = document.createDocumentFragment();
				
const opt = document.createElement('option');
  opt.textContent = idpDisplayName;
  opt.value = idpEntityId;
  
  dFragIdp.appendChild(opt);
  
  document.getElementById('idpSelect').appendChild(dFragIdp);
  
}}

//Sätt vald entityID som variabel
 function updateIdp() {
  let pickedIdp = document.getElementById("idpSelect").value;
  

// sätt text från selected option som variabel
const pickedIdpDisplay = (el) => {
  if (el.selectedIndex === -1) {
    return null;
  }
  return el.options[el.selectedIndex].text;
}
const select = document.querySelector('select')
const text = pickedIdpDisplay(select);


// visa vald organisation och omval
const myOrgContent=`
<div class="flex-header wrap">
<div class="flex-headeritem-org"><h1 id="show">Ingen vald organisation</h1></div>
<div class="flex-headeritem-org"><button class="button" onclick="reload()">Byt inloggning</button></div>
</div>
`;

document.getElementById("myOrg").innerHTML = myOrgContent;

// infoga text för vald option i dokumentet
document.getElementById("show").innerHTML = text;
  
 	
		//Läs in SP-array från json
		fetch('https://robertsundin.se/json/splink.json')
            .then(function (spResponse) {
                return spResponse.json();
            })
            .then(function (spData) {
                appendSpData(spData);
            })
            .catch(function (err) {
                console.log('error: ' + err);
            });
//Append json och nästla efterföljande script
        function appendSpData(spData) {
			
            for (let x = 0; x < spData.length; x++) {
				let concLink = spData[x].spLink + pickedIdp + spData[x].spTarget;
				let spDisplayName = spData[x].spDisplayName
				let spImg = spData[x].spImg
				
//Skapa lista och infoga på sida
const dFrag = document.createDocumentFragment();
				
const li = document.createElement('li');
  li.className = "flex-item";
  li.textContent = spDisplayName;
  const a = document.createElement('a');
  a.className = "flex-item-link";
  a.setAttribute('href', concLink);
  a.target = "_blank";
  const img = document.createElement('img');
  img.className = "flex-item-img";
  img.setAttribute('src', spImg);
  
  dFrag.appendChild(li);
  li.appendChild(a);
  a.appendChild(img);
  
  document.getElementById('spList').appendChild(dFrag);
  
  
 // Dölj val av orgaisation efter att valet är gjort
  document.getElementById("idpSelectDiv").style.display = "none";
  
		}}}}

//Visa alert box och ladda därefter om dokumentet vid "välj en annan organisation"
function reload() {
  alert("Du kommer nu att kunna göra om ditt val av organisation, men tänk på att om du redan har loggat in i en tjänst så kommer tjänsten att komma ihåg den inloggningen. Du kan därför behöva stänga webbläsaren och öppna portalen igen.");
  location.reload();
}
