// responsive scaling

let gameContainer= document.getElementById("gameContainer");
let nextArrow= document.getElementById("nextArrow");
let previousArrow=document.getElementById("previousArrow");
let x= window.matchMedia("(min-width: 890px)");
let wrongChoices= document.getElementsByClassName("wrong");
let rightChoices= document.getElementsByClassName("right");
let carouselItem1=document.getElementById("carousel-item1");
let allButtons=document.getElementsByTagName("button");
let viewedAnswer = [];
let count=0;

resize(x);
x.addListener(resize);

// event listeners

window.addEventListener("resize",resize);

// functions

function resize (){
    if(x.matches){
        gameContainer.style.transform=""
        gameContainer.style.width="70%";
        gameContainer.style.height="100vh";
        gameContainer.style.zIndex="";
        let left=(window.innerWidth*0.3)/2;
        console.log(left)
        gameContainer.style.left=left+"px";
    }
    else{
     
        gameContainer.style.left="0"
        gameContainer.style.width="1280px";
        gameContainer.style.height="";
        let scale = window.innerWidth / 1280;
        gameContainer.style.transform="scale("+scale+")";
        
    }
    console.log(gameContainer.style.width)
    console.log(window.innerWidth)
}
function nextCard(element1){

    let pageIndex= +document.getElementById("pageIndex").innerText;
    console.log(pageIndex);
    if(pageIndex>=1 && pageIndex<4){

        setTimeout(() => {
            let element= document.getElementById("pageIndex");
            pageIndex=pageIndex+1;
            element.innerText=pageIndex;
            previousArrow.style.opacity="1";
           
            if(pageIndex==4){
                nextArrow.style.opacity="0.5";
            }
            else{
                nextArrow.style.opacity="1";
              
            }

            let end=pageIndex*2-1;
            let start= end-1;
            let count=0;
        for (let key in rightChoices)
         {
        if (key==start || key==end) {
            console.log(rightChoices[key].style.display)
            if(rightChoices[key].style.display=="block"){
                ++count;
            }
        
        }


    }
    if(count!=2){
        element1.style.opacity="1";
    }
    else if(count==2){
        element1.style.opacity="0.5";
    }
        },1200);
   
    }

}
function prevCard(element1){
    let pageIndex= +document.getElementById("pageIndex").innerText;
    if(pageIndex>=2 && pageIndex<=4){
    
        setTimeout(() => {
            let element= document.getElementById("pageIndex");
            pageIndex=pageIndex-1;
            element.innerText=pageIndex;
            nextArrow.style.opacity="1";
            if(pageIndex==1){
                previousArrow.style.opacity="0.5";
            }
            else{
                previousArrow.style.opacity="1";
            }
            let end=pageIndex*2-1;
            let start= end-1;
            let count=0;
        for (let key in rightChoices)
         {
        if (key==start || key==end) {
            console.log(rightChoices[key].style.display)
            if(rightChoices[key].style.display=="block"){
                ++count;
            }
        
        }


    }
    if(count!=2){
        element1.style.opacity="1";
    }
    else if(count==2){
        element1.style.opacity="0.5";
    }




        },1200);
   
    }

}
function resetAll(element){
    for (let key in wrongChoices) {
           if(+key || +key==0){
               let element = wrongChoices[key];
                element.style.display="none";
                element.parentElement.removeAttribute("disabled")
                element.parentElement.style.opacity="1";
           }
    }
    for (let key in rightChoices){
        if(+key || +key==0){
            let element = rightChoices[key];
            element.style.display="none";
            element.parentElement.removeAttribute("disabled");
        }
    }
    element.style.opacity="1";
   $('.carousel').carousel(0);
   setTimeout(() => {
    document.getElementById("pageIndex").innerText=1;
    previousArrow.style.opacity="0.5";
    nextArrow.style.opacity="1";
   }, 1200);
   viewedAnswer=[];
}
function resetAnswer(element){
    let pageIndex = +document.getElementById("pageIndex").innerText - 1;
    console.log(pageIndex)
    console.log(viewedAnswer)
    let data = viewedAnswer.filter(function(ele){
        return ele[2]==pageIndex+1;
    })
    data.forEach(function(ele){
        let rightAnswer = ele[0];
        let wrongAnswer =ele[1];
        console.log(rightAnswer,wrongAnswer)
        rightAnswer.children[0].style.display="none";
        wrongAnswer.style.opacity="1";
        wrongAnswer.removeAttribute("disabled");
    })

    let end=+document.getElementById("pageIndex").innerText*2-1;
    let start= end-1;
    for (let key in rightChoices) {
        if (key==start || key==end) {
            rightChoices[key].style.display="none";
            rightChoices[key].parentElement.removeAttribute("disabled");
        }

    }
    for (let key in wrongChoices){
        if (key==start || key==end) {
            console.log( wrongChoices[key]);
            wrongChoices[key].parentElement.style.opacity="1";
            wrongChoices[key].parentElement.removeAttribute("disabled");
        }
    }
    element.style.opacity="1";
    viewedAnswer = [];

}
function rightAnswer(rightAnswer,wrongAnswer){
    wrongAnswer.style.opacity="0.5";
    wrongAnswer.disabled="true";
    rightAnswer.children[0].style.display="block";
    let answer=[];
    let pageIndex= +document.getElementById("pageIndex").innerText;

    answer.push(rightAnswer);
    answer.push(wrongAnswer);
    answer.push(pageIndex);
    if(viewedAnswer.length!=0){
        let status=false;
        viewedAnswer.forEach(function(ele){
            if(ele[0]==rightAnswer && ele[1]==wrongAnswer){
                status=true
            }
        })
        if(status!=true){
            viewedAnswer.push(answer)
        }
    }
    else{
        viewedAnswer.push(answer);
    }
 
    answer=[];

    if(viewedAnswer.length % 2 ==0){
        document.getElementById("showAnswers").style.opacity="0.5";
    }
    else{
        document.getElementById("showAnswers").style.opacity="1";
    }
    
    console.log(viewedAnswer)


}
function wrongAnswer(element){
    element.children[0].style.display="block";
    element.children[0].children[0].style.animationPlayState="running";
    setTimeout(() => {
        element.children[0].style.display="none";
       }, 1200);
}
function showAnswer(element){
    element.style.opacity="0.5";
    let end=+document.getElementById("pageIndex").innerText*2-1;
    let start= end-1;
    for (let key in rightChoices) {
        if (key==start || key==end) {
            rightChoices[key].style.display="block";
            rightChoices[key].parentElement.setAttribute("disabled","true");
        }
    }
    for (let key in wrongChoices){
        if (key==start || key==end) {
            console.log( wrongChoices[key]);
            wrongChoices[key].parentElement.style.opacity="0.5";
            wrongChoices[key].parentElement.setAttribute("disabled","true");
        }
    }

}
function openModal(element1,element2,element3,element4,element5){
   
    // console.log(element1.style.display,element2.style.display)
    for (let key in allButtons) {
        if (+key || +key==0) {
            allButtons[key].disabled="true";
            
        }
    }
    element2.style.display="none";
    if(element1.style.display=="" || element1.style.display=="none"){
        element1.style.display="block";

    }
    else{
        element1.style.display="none";
        
    }
    element3.style.opacity="0.2";
    element4.style.backgroundColor="#0fa0c533";
    element5.style.opacity="0.2";

}
function closeWindow(element1,element2,element3,element4,element5){
    for (let key in allButtons) {
        if (+key || +key==0) {
            allButtons[key].removeAttribute("disabled");
            
        }
    }
    element1.style.display="none";
    element2.style.display="none";
    element3.style.opacity="1";
    element4.style.backgroundColor="#0fa0c5";
    element5.style.opacity="1";
}
function showLoading(element1,element2){
    element1.style.display="flex";
    element2.style.display="none";
   
}
function hideLoading(element1,element2){
    element1.style.display="none";
    element2.style.display="block";
   
}
