const forms = document.querySelectorAll('form');

forms.forEach(form => {
    
    const button = document.createElement("button");
    button.textContent = "New Buton";
    button.style.margin = "10px";
    button.type = "button";
  
    
    button.addEventListener('click', () => {

        chrome.runtime.sendMessage({ action: "sendUrl", url: "https://www.linkedin.com/in/farid-garayev/" }, (response) => {
            if (response && response.status === "success") {
                console.log("Response from background:", response.data);
            } else {
                console.error("Error from background:", response.error);
            }
        });
        
        // const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        // const targetUrl = 'https://www.linkedin.com/in/farid-garayev/';

        // fetch(proxyUrl + targetUrl+'authwall?trk=bf&trkInfo=bf', {
        //     method: 'GET',
        //     headers: {
        //         'Origin': proxyUrl + targetUrl+'authwall?trk=bf&trkInfo=bf', 
        //         'X-Requested-With': 'XMLHttpRequest', 
        //         'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
        //     },
        //   })
        // .then(response => response.text())
        // .then(html => {
        //     console.log(html)
        // })
        // .catch(error => console.error('Fetch error:', error));
             });
  
    
    form.insertBefore(button, form.firstChild);
  });


  