const tagSelect = document.querySelectorAll("select"), 
translationBtn = document.querySelector("button"),
fromText = document.querySelector(".from-text"),
toText = document.querySelector(".to-text"),
exchangeIcon = document.querySelector(".exchange"),
icons = document.querySelectorAll(".row i");


tagSelect.forEach((tag, id) => {
    for (const country_code in countries) {
        let selected;
         if(id == 0 && country_code == "en-GB"){
            selected = "selected";
         }else if(id == 1 && country_code == "sw-SZ"){
            selected = "selected";
         }
        let option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend",option); //adding options tag inside select tag
    }
});

translationBtn.addEventListener("click", () => {
    let text = fromText.value,
    translateFrom = tagSelect[0].value, //getting fromSelect tag value
    translateTo = tagSelect[1].value; //getting fromSelect tag value
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
     fetch(apiUrl)
     .then(res => res.json())
     .then(data => {console.log(data);
    toText.value = data.responseData.translatedText;
    });
});

exchangeIcon.addEventListener("click",() => {
   let typedText = fromText.value;
   fromText.value = toText.value;
   toText.value = typedText;
});

icons.forEach(icon => {
    icon.addEventListener("click", ({target}) => {
        if(target.classList.contains("fa-copy")){
            if(target.id == "from"){
                navigator.clipboard.writeText(fromText.value);
            } else {
                navigator.clipboard.writeText(toText.value);
            }
        }else {
            console.log("Speech icon clicked");
        }
    })
})