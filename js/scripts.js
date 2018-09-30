//business logic
var contester1="";
var contester2="";

var throwdice = function () {
  return Math.floor(6*Math.random())+1;
}

function Contester(turn) {
  this.roll = 0;
  this.temppoint = 0;
  this.totalpoint = 0;
  this.turn = turn;
  this.contesterName;
}

// checking for 1
Contester.prototype.rollone = function() {
  if (this.roll === 1) {
  this.temppoint = 0;
  alert("Sorry " + this.contesterName + ", you rolled a 1! Your turn is over!")
  // this.changeturn();
  } else {
  this.temppoint += this.roll;
  }
}

// hold
Contester.prototype.hold = function () {
  this.totalpoint += this.temppoint;
  this.temppoint = 0;
  // this.changeturn();
  alert(this.contesterName + ", your turn is over, pass the mouse!");
}

// // changing turn
// Contester.prototype.changeturn = function () {
//   if (this.roll ===1) {
//     this.turn = false;
//   } else {
//     this.turn = true;
//   }
// }
// check for 100
Contester.prototype.championCheck = function () {
  if (this.totalpoint >= 100) {
    alert(this.contesterName + " You are the champion!");
  }
}

Contester.prototype.newPlay = function () {
  //debugger;
  this.roll = 0;
  this.temppoint = 0;
  this.totalpoint = 0;
  this.contesterName ="";
}

var clearValues = function(){
  $(".contester1Name").val("");
  $(".contester2Name").val("");
}

// User Interface
$(document).ready(function() {

  $("button#start").click(function(event){
    contester1 = new Contester(true);
    contester2 =  new Contester(false);
    $(".contester-console").show();
    $(".start-menu").hide();

    var contester1Name = $(".contester1Name").val();
    $("#contester1Name").text(contester1Name);

    var contester2Name = $(".contester2Name").val();
    $("#contester2Name").text(contester2Name);

    contester1.contesterName=contester1Name;
    contester2.contesterName=contester2Name;

  });
  $("button#new-Play").click(function(event){
    $(".contester-console").hide();
    clearValues();
    contester1.newPlay();
    contester2.newPlay();
    $("#round-total-1").empty();
    $("#total-point-1").empty();
    $("#die-roll-1").empty();
    $("#round-total-2").empty();
    $("#total-point-2").empty();
    $("#die-roll-2").empty();

    $(".start-menu").show();
  });

  $("button#contester1-roll").click(function(event){
    contester1.roll = throwdice();
    $("#die-roll-1").text(contester1.roll);
    contester1.rollone();
    $("#round-total-1").text(contester1.temppoint);
  });

  $("button#contester2-roll").click(function(event){
    contester2.roll = throwdice();
    $("#die-roll-2").text(contester2.roll);
    contester2.rollone();
    $("#round-total-2").text(contester2.temppoint);
  });

  $("button#contester1-hold").click(function(event){
    contester1.hold();
    $("#total-point-1").text(contester1.totalpoint);
    $("#round-total-1").empty();
    $("#die-roll-1").empty();
    contester1.championCheck();
  });

  $("button#contester2-hold").click(function(event){
    contester2.hold();
    $("#total-point-2").text(contester2.totalpoint);
    $("#round-total-2").empty();
    $("#die-roll-2").empty();
    contester2.championCheck();
  });
});
function reload() {
  location.reload();
}
