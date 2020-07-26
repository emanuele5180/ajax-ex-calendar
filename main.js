// $(document).ready(function() {
// 	//Code
// });


// Descrizione:
// Creiamo un calendario dinamico con le festività.
// Il calendario partirà da gennaio 2018 e si concluderà a dicembre 2018 (unici dati disponibili sull'API).
// Milestone 1
// Creiamo il mese di Gennaio, e con la chiamata all'API inseriamo le festività.
// Milestone 2
// Diamo la possibilità di cambiare mese, gestendo il caso in cui l'API non possa ritornare festività.
// Attenzione!
// Ogni volta che cambio mese dovrò:
// Controllare se il mese è valido (per ovviare al problema che l'API non carichi holiday non del 2018)
// Controllare quanti giorni ha il mese scelto formando così una lista
// Chiedere all'api quali sono le festività per il mese scelto
// Evidenziare le festività nella lista
// Consigli e domande del giorno:
// Abbiamo visto assieme una libereria che serve per gestire le date... quale sarà?
// Una chiamata ajax può anche non andare a buon fine, che si fa in quel caso? Lasciamo l'utente ad attendere? ;)

//API: https://flynn.boolean.careers/exercises/api/holidays



// Milestone 1
// Creiamo il mese di Gennaio, e con la chiamata all'API inseriamo le festività.

function printMonth(currentMonth) {
  var daysInMonth = currentMonth.daysInMonth();
  var template = $("#template").html();
  var compiled = Handlebars.compile(template);
  var target = $(".giorni-mese");
  target.html("");
  for (var i = 1; i <= daysInMonth; i++) {
    var datecomplete = moment({ year :currentMonth.year(), month :currentMonth.month(), day :i});
    var dayshtml = compiled({
      "value": i,
      "datecomplete": datecomplete.format("YYYY-MM-DD")
    });
    target.append(dayshtml);
  }
}

function printHoliday(currentMonth) {
  var year = currentMonth.year();
  var month = currentMonth.month();
  $.ajax({
  url: "https://flynn.boolean.careers/exercises/api/holidays",
  method: "GET",
  data: {
    "year": year,
    "month": month
  },

  success: function (data, state) {
    var holidays = data["response"];
    for (var i = 0; i < holidays.length; i++) {
      var element = $(".giorni-mese li[data-datecomplete='"+holidays[i]["date"]+"']")
      element.addClass("holidays");
      element.append("  " + holidays[i]["name"]);
    }

  },
  error: function  (error) {

  }
});

}

function changeMonthPrev(){
  var btn = $('button#prev');
  btn.click(getNewMonthPrev);
  console.log("bottone" , btn);
  getNewMonthPrev();



}

function getNewMonthPrev(){
  var monthSwap = $(this);
  console.log("click", monthSwap);



}

function changeMonthNext(){
  var btn = $('button#next');
  btn.click(getNewMonthNext);
  console.log("bottone" , btn);
  getNewMonthNext();



}

function getNewMonthNext(){
  var monthSwap = $(this);
  console.log("click", monthSwap);



}

function init() {
  var currentMonth = moment("2018-01-01");
  //console.log(currentMonth.month());
  printMonth(currentMonth);
  printHoliday(currentMonth);

  changeMonthNext();
  changeMonthPrev();


}


$(document).ready(init);

// function printMonth(currentMonth){
//   var daysInMonth = currentMonth.daysInMonth();
//
//   for (var i = 1; i <= daysInMonth; i++) {
//     array[i]
//   }
// }
// function init() {
//
//   var currentMonth = moment("2018-01-01");
//   console.log(currentMonth);
//   printMonth(currentMonth);
//
//   console.log("hello world");
//
//
//
//
// }
//
// $(document).ready(init);
