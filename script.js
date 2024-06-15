let boxs=document.querySelectorAll(".box");
const player_status=document.getElementById("player-status");
const restartButton=document.getElementById("restart");

const win=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
]

let opt=["","","","","","","","",""]

let player="X"

let crtplayer="X"

let statusCRT=false

auto_start()

function auto_start(){
    boxs.forEach(box=>box.addEventListener('click',clickBox))
    restartButton.addEventListener('click',grestart)
    player_status.innerHTML=`${crtplayer} Your's Turn`
    statusCRT=true
}

function clickBox(){
    const index=this.dataset.index
    if(opt[index]!="" || !statusCRT){
        return
    }
    update(this,index)
    winner()
}

function update(boxs,index){
    opt[index]=crtplayer;
    boxs.innerHTML=player;
}

function winner(){
    let won=false;
    for(let i=0;i<win.length;i++){
        const condition=win[i]
        const b1=opt[condition[0]]
        const b2=opt[condition[1]]
        const b3=opt[condition[2]]
        if(b1=="" || b2=="" || b3==""){
            continue
        }
        if(b1==b2 && b2==b3){
            won=true
            boxs[condition[0]].classList.add("anim")
        }
    }
    if(won){
        player_status.innerHTML=`${crtplayer} is won`
        player_status.style="color:orange;"
        statusCRT=false

    }
    else if(!opt.includes("")){
        player_status.innerHTML="Game Draw...!"
        statusCRT=false
    }
    else{
        changePlayer()
    }
}

function changePlayer(){
    crtplayer=(crtplayer=="X") ? "O" :"X"
    player=(player=="X") ? "O" :"X"
    player_status.innerHTML=`${crtplayer} Your's Turn`
}

function grestart(){
    opt=["","","","","","","","",""]
    player="X"
    crtplayer="X"
    statusCRT=true
    player_status.style="color:white;"
    player_status.innerHTML=`${crtplayer} Your's Turn`
    boxs.forEach(box=>{
        box.innerHTML=""
        box.classList.remove("anim")
    })
}
