import { HTTP } from 'meteor/http'
Template.sendNotifications.onRendered(function(){
	// alert('hi');
	$('.input-group.date').datepicker({
	});
	// $('#sandbox-container .input-group.date').datepicker({
	// });
});

Template.sendNotifications.events({

	'change #image':function(event,template){
		let file = event.target.files;
		media = file[0];
		if(media.size > 10485760){
			media ='';
			alert('File size must be less than 10 MB');
			event.target.value ='';
		}
	},

	'submit form':function(event){		event.preventDefault();
		let request = new XMLHttpRequest();
		let headers = Object.assign({},
            {'content-type': 'application/json'},
            {'Content-Type': 'multipart/form-data'}
		);

		Object.keys(headers)
      	.forEach( function(k) { 
         	if (k.toLowerCase()==='content-type') delete headers[k] 
      	})
		let body = new FormData();
		body.append('files',media);
		console.log(media)
			if(media){
				// console.log('media ******* ',body);
				// fetch('http://localhost:3000/rest/v1/files/upload',{
				// 	headers: headers,
				// 	method:'POST',
				// 	body
				// }).then(res=>{
				// 	res.json();
				// 	//console.log(res.json())
				// }).catch(error =>{ console.log('error:-',error)
				// }).then(response => console.log('success-',response));


				return new Promise(function(fulfill, reject) {
                    //console.log("url=> ",Connection.getResturl() + url ," requestObject=> ",params, " x-auth-token => ",token, " x-user-id => ",userId )
                    fetch('http://localhost:3000/rest/v1/files/upload', {
                            method : "POST",
                            headers: headers,
                            body: body
                        }).then((response) => {
                            return response.text()
                        })
                        .then(responseText => {
                            console.log('responseText*****',responseText);
                            fulfill(JSON.parse(responseText));
                        })
                        .catch(error => {
                            fulfill({message:'Please check your internet connectivity or our server is not responding.'});
                            console.warn("eroro",error);
                        });
        });
                




// 				fd.append('file', {
//   contentType: fileType,
//   filename: file.name(),
//   data: buffer
// });
// var generated = fd.generate();
// result = HTTP.post(uploadUrl, {
//   headers: generated.headers,
//   content: generated.body
// });			

				// HTTP.call('POST', 'http://localhost:3000/rest/v1/files/upload', {
				// 	  headers: headers,
				// 	  data: body
				// 	}, (error, result) => {
				// 		console.log(error, result);
				// 	  if (!error) {
				// 	    console.log(result);
				// 	  }
				// 	});
			
				
			}
		}

	});

