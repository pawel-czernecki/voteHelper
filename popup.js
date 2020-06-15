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

var n = 1;
const nextEmail = () =>{
    if(n<=Math.pow(2, document.getElementById("emailInput").value.length-1)-1)
        document.getElementById("emailOutput").value=generateEmailAlternation(document.getElementById("emailInput").value, n);
    else{
        alert("Emails are over!");
        n=0;
    }
    n++;
}

const copyEmail = () =>{
    document.getElementById("emailOutput").select();
    document.execCommand("copy");
}

document.getElementById("next").addEventListener("click", nextEmail);
document.getElementById("copy").addEventListener("click", copyEmail);
document.getElementById("nextCopy").addEventListener("click", ()=>{nextEmail(); copyEmail();});