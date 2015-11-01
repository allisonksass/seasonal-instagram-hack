$(document).ready(function(){

//$(function(){
  $("#seasons").on("click", "div", chooseSeason);
	
function chooseSeason (){

	seasonName = $(this).attr("class");
    getRequest(seasonName);
   $('#seasons').hide();
   $('#search-results').show();

  }
//});



function getRequest(seasonName){

	$.ajax({
        type: "GET",
        url: 'https://api.instagram.com/v1/tags/' + seasonName + '/media/recent?client_id=fdac753d08d34d05910e3add9e5f0ba4',
        dataType: "jsonp",
        
       }).done(function(photos){
           console.log(photos);
           showResults(photos);

       })
  
  // this doesn't work: $.getJSON('https://api.instagram.com/v1/tags/' + seasonName + '/media/recent?client_id=fdac753d08d34d05910e3add9e5f0ba4', 


  }



function showResults(photos){
  var html = "";

  
  $.each(photos.data, function(i,data){
    html += '<div class="photo-display"><img width="300px" height="300px"src="' + data.images.standard_resolution.url + '"></div>';
    console.log(data.images);
  });

  $('#search-results').html(html);
}


$("#start-over").on("click", function(){

	$('#seasons').show();
	$('#search-results').hide();

	


});








});