$(document).ready(function(){
var difficuly_level=5;
var player='0';
var opponent='x';
    $('#Human').addClass('active')
    var firstComp=0;
    var Computer=0;
    var Human=1;
   //To choose the difficulty level
    $('.depthL').click(function(){
        $('.depthL').removeClass('btn btn-secondary active').addClass('btn btn-outline-secondary');
        $(this).addClass('active');
        difficuly_level=$(this).text();
        if(difficuly_level=='unlimited')
        difficuly_level=5;
        console.log(difficuly_level);
    })
     //To choose the first Player
    $('.start').click(function(){
        $('.start').removeClass("btn btn-secondary active").addClass('btn btn-outline-secondary');
        $(this).addClass('active');
if(this.id=="Computer") {
Computer=1;
Human=0;}
if(this.id=="Human") {
    Computer=0;
    Human=1;}})
//Starting PLayer is x
    var turn='x';
    var win=0;
   for(let i=1;i<10;i++){
    $('#r'+i).html(' ');
    }
    //Setting the new Playboard
    $('#new').click(function(){ 
        $('#winner').html('PLAYING THE REAL GAME')
        $('#im').attr('src',"tac2.png")
    $('#tb').css('background','black')
    turn='x';   
    for(let i=1;i<10;i++){win=0;
            $('#r'+i).html(' ');
            $('#r'+i).prop('disabled',false);
            
            } 
            if(Computer==1){
                var y=firstComputerTurn();
                $('#r'+y).html(turn);
                $('#r'+y).prop('disabled','true');
                turn='0';
                player='x';
                opponent='0';
                }

           if(Computer!=1) 
           firstComp=0;
           else
           firstComp=1;
    });
    //Starting the game
    $('.game').click(function(){console.log(turn)
       if(Anyleft()==true && win==0){
     $(this).html(turn);
     $(this).prop('disabled',true);
     
     if(Evaluate()==20||Evaluate()==-20){win=1;
        changeImage(turn);
         console.log(turn+' has ruled the world');
     }
     if(win!=1){
     turn=(turn==player)?opponent:player;
     console.log(turn);
     if(firstComp!=0){let best;
         if(difficuly_level=='1')
       best=random_place();
        else
       best=findBest();
     $('#r'+best).html(turn);
     $('#r'+best).prop('disabled',true);}
     else{firstComp=1;
         let q=firstComputerTurn();
         $('#r'+q).html(turn);
     $('#r'+q).prop('disabled',true);

     }
     if(Evaluate()==20||Evaluate()==-20){win=1;
        changeImage(turn);
        console.log(turn+' has ruled the world');
    }}
    if(win!=1)
     turn=(turn==player)?opponent:player;
    }
     else{
         $('.game').prop('disabled',true);
     }
    });
    //For difficulty level 1....Just place the turn at random places
    function random_place(){
        var x=Math.floor((Math.random()*9+1)+1);
        let blank=0;
        while(!blank){x=Math.floor((Math.random()*9+1)+1);
            if($('#r'+x).text()==' ')
            {
              blank=1;}
        }
       
        return x;

    }
    
    function firstComputerTurn(){
        var x=Math.floor((Math.random()*9+1)+1);
        let blank=0;
        while(!blank){x=Math.floor((Math.random()*9+1)+1);
            if($('#r'+x).text()==' ' && x%2==1)
            {
              blank=1;}
        }
       
        return x;

    }
    //To check if any positions in playboard is left or not
    function Anyleft(){
        let pos=false;
        for(let i=1;i<10;i++){
            if($('#r'+i).text()==' ')
            {
                pos=true;
                break;
            }
        }
        return pos;
    }
    //Find the best position for AI player
    function findBest(){
       let B=-1000;
       let bestPosition;
       let Current;
       for(let i=1;i<10;i++){
           if($('#r'+i).text()==' '){$('#r'+i).html(player);
              // console.log($('#r'+i).text())
               Current=minimax(0,false,-10000,+10000);
               console.log(Current)
               $('#r'+i).html(' ');
              
           if(Current>B){console.log('in findbest '+ B)
                         B=Current;
                         bestPosition=i;
           }}
       }
     
    return bestPosition}
//IMplementing minimax algorithms through this function
 function minimax(depth,ismax,alpha,beta){
     
           let score=Evaluate();
           if(Anyleft()==false || depth>=difficuly_level)
           return 0;
           if(score==20){
           
            return (score-depth);
        }
           if(score==-20){
           return (score+depth)
                      }           
         
           if(ismax){let best=-10000;
               for(let i=1;i<10;i++){
                   if($('#r'+i).text()==' '){
                       $('#r'+i).html(player);
                       best=Math.max(best,minimax(depth+1,!ismax,alpha,beta));
                       $('#r'+i).html(' ');
                       alpha=Math.max(alpha,best);
                       if (beta<=alpha)
                       break;
                   }
               }

               return best;
           }
           else{let best=10000;
            for(let i=1;i<10;i++){
                if($('#r'+i).text()==' '){
                    $('#r'+i).html(opponent);
                    best=Math.min(best,minimax(depth+1,!ismax,alpha,beta));
                    $('#r'+i).html(' ');
                    beta=Math.min(beta,best);
                    if(beta<=alpha)
                    break;
                }
            }
            return best;
               
           }
       }
    //To check if three in a row or columns or in diagonals matched or not
       function Evaluate(){
           for(var i=1;i<=7;i=i+3){
    if($('#r'+i).text()==$('#r'+(i+1)).text() && $('#r'+(i+1)).text()==$('#r'+(i+2)).text() ){

   if($('#r'+i).text()==player){
   
        return +20;
        }
        else if($('#r'+i).text()==opponent){
            return -20;
        }
       
       
    }
    }
    //for columns
       for(var i=1;i<=3;i++){
        if($('#r'+i).text()==$('#r'+(i+3)).text() && $('#r'+(i+3)).text()==$('#r'+(i+6)).text() )
       { 
            if($('#r'+i).text()==player)
            return +20;
            else if($('#r'+i).text()==opponent){
                return -20;
            }
        
        }
    }
    //for diagonals
    if($('#r1').text()==$('#r5').text() && $('#r5').text()==$('#r9').text())
      {  
   
            if($('#r1').text()==player)
             return +20;
            else if($('#r1').text()==opponent)
              return -20;
   }
if($('#r3').text()==$('#r5').text() && $('#r5').text()==$('#r7').text())
        {
            if($('#r3').text()==player)
            return +20;
         else if($('#r3').text()==opponent){
            return -20;
        }
 }
    
    
}
    //To make changes after somewin wins the game
function changeImage(turn){ 
   $('#winner').html('Congratulations!! '+turn+' won')
    $('#tb').css('background','#ccc')
    
    if(turn==player){
        $('#im').attr('src',"tac3.png")
        $('#im').fadeOut(200)
        $('#im').fadeIn(200)
    
    $("#im").fadeOut(500, function() {
        $("#im").attr("src","tac1.png");
    }).fadeIn(500); 
    }
  else  if(turn==opponent){
     
        $('#im').attr('src',"tac4.png")
    }
   
}

})
