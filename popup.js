var emailIter = 1;

chrome.storage.sync.get('email',(result)=>{
    document.getElementById("emailInput").value=result.email;
});

chrome.storage.sync.get('emailIteration',(result)=>{
    emailIter=result.emailIteration;
    document.getElementById("emailOutput").value=generateEmailAlternation(document.getElementById("emailInput").value, result.emailIteration-1);
});

document.getElementById("emailInput").addEventListener("change",()=>{
    chrome.storage.sync.set({'email': document.getElementById("emailInput").value},()=>{});
    document.getElementById("emailOutput").value=document.getElementById("emailInput").value+"@gmail.com";
    emailIter=1;
});

const generateEmailAlternation = (email, alternationNumber) =>{
    let str = convertDecToBin(alternationNumber);
    let temp = str.length;
    for(let i=0; i<=email.length-1-temp; i++) 
        str="0"+str;
    var i = str.length;
    while (i--) {
        if(str.charAt(i)==1){
            email = email.substring(0,i)+"."+email.substring(i,email.length);
        }
    }
    return email+"@gmail.com";
}

const convertDecToBin = (number) =>{
    return number.toString(2);
}


const nextEmail = () =>{
    if(emailIter<=Math.pow(2, document.getElementById("emailInput").value.length-1)-1)
        document.getElementById("emailOutput").value=generateEmailAlternation(document.getElementById("emailInput").value, emailIter);
    else{
        alert("Emails are over!");
        emailIter=0;
    }
    emailIter++;
    chrome.storage.sync.set({'emailIteration': emailIter},()=>{});
}

const copyEmail = () =>{
    document.getElementById("emailOutput").select();
    document.execCommand("copy");
}

document.getElementById("next").addEventListener("click", nextEmail);
document.getElementById("copy").addEventListener("click", copyEmail);
document.getElementById("nextCopy").addEventListener("click", ()=>{nextEmail(); copyEmail();});