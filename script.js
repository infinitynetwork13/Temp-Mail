fetch('tool/old_data.in').then(response => response.json()).then(odata => {
	console.log(odata);
	let cunt = 0
	const viewe = document.getElementById('emai_view')
	odata.forEach(data=>{
		cunt++
		let a = data.from
		let b = a.replace('\"',"")
		let c = b.replace('"',"")
		let d = c.replace(">","")
		let e = d.replace("<","")
		if(data.attachments.length === 0){
			const div = document.createElement('fieldset')
			div.classList.add('main');
			div.innerHTML = `
				<legend>Mail Box [<ii>${cunt}</ii>]</legend>
				<p class="tt"><strong>ID:</strong> ${data.id}</p>
				<p class="tt"><strong>From:</strong> ${e}</p>
				<p class="tt"><strong>CC:</strong> ${data.cc}</p>
				<p class="tt"><strong>To:</strong> ${data.to}</p>
				<p class="tt"><strong>Subject:</strong> ${data.subject}</p>
				<fieldset><legend>Body</legend><div class="bod">${data.body_text}</div></fieldset>
			`;
			viewe.appendChild(div)
		}else{
			data.attachments.forEach(function(file){
				const fi = document.createElement('fieldset')
				fi.classList.add('main');
				const name = file.name
				var tag = ""
				if(name.endsWith('.png')){
					 tag = `<img src="https://api.internal.temp-mail.io/api/v3/attachment/${file.id}?preview=1"/>`
				}else if(name.endsWith('.jpg')){
					 tag = `<img src="https://api.internal.temp-mail.io/api/v3/attachment/${file.id}?preview=1"/>`
				}else if(name.endsWith('.mp4')){
					 tag = `<video class="img" src="https://api.internal.temp-mail.io/api/v3/attachment/${file.id}?preview=1" controls/>`
				}
				const ai = {
					"size":file.size
				}
				var size = ""
				if (1048576 >= parseInt(ai["size"]) && 1024 <= parseInt(ai["size"])) {
					let mathSize = (parseInt(ai["size"]) / 1024).toString();
					let sizeOfIa = mathSize.slice(0, 4);
					size = `<strong>SIZE:</strong> ${sizeOfIa}k.B`
				} else if (1048576 <= parseInt(ai["size"])) {
					let mathSize = (parseInt(ai["size"]) / 1048576).toString();
					let sizeOfIa = mathSize.slice(0, 4);
					size = `<strong>SIZE:</strong> ${sizeOfIa}M.B`
				} else {
					size = `<strong>SIZE: </strong>${file.size}Byt`
				}
				fi.innerHTML = `
					<legend>Mail Box [${cunt}]</legend>
					<p class="tt"><strong>From</strong> ${e}</p>
					<p class="tt"><strong>CC:</strong> ${data.cc}</p>
					<p class="tt"><strong>To: </strong>${data.to}</p>
					<p class="tt"><strong>Subject: </strong> ${data.subject}</p>
					<fieldset><legend>Body</legend><div class="bod">${data.body_text}</div></fieldset>
					<fieldset><legend>File</legend>
						<p class="tt"><strong>Name: </strong>${file.name}</p>
						<p class="tt">${size}</p>
						<p class="tt">${tag}</p>
						<a href="https://api.internal.temp-mail.io/api/v3/attachment/${file.id}?download=1"<button>Downloads</button></a>
					</fieldset>
				`
				viewe.appendChild(fi)
			})
		}
	})
}).catch(error => {
	console.error('Error reading the file:', error);
});
function cn(a) {
	console.log(a)
}