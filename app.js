$(document).ready(function(){
  $portfolioCards = $('.single-portfolio');
  console.log($portfolioCards);
  $portfolioCards.on('click', function (e) {
    console.log(this);
  })
})
