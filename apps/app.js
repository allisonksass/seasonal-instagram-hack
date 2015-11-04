$(document).ready(function(){


   var min =""

 $("#seasons").on("click", "div", chooseSeason);

  

function chooseSeason (){

  seasonName = $(this).attr("class");
   
    getRequest(seasonName);
   $('#seasons').hide();
   $('#search-results').show();
   $('#view-more').show();


  }


  $('#search-results').on('mouseenter', 'div', function() {
      $(this).children('.photo-caption').show();

    });

 $('#search-results').on('mouseleave', 'div', function() {
      $(this).children('.photo-caption').hide();

    });
  


function getRequest(seasonName){

  $.ajax({
        type: "GET",
        url: 'https://api.instagram.com/v1/tags/' + seasonName + '/media/recent',
        data: {'client_id': 'fdac753d08d34d05910e3add9e5f0ba4', 'max_tag_id': min},
        dataType: "jsonp",
        
       }).done(function(data){
           console.log(data);
           showResults(data);

       })

  }

  

function showResults(photos){
  // var html = "";

  min = photos.pagination.next_max_tag_id;
  
  $.each(photos.data, function(i,data){

    //var html = "";

  var img= photos.data[i].images.standard_resolution.url;
   link = photos.data[i].link;
  likes = photos.data[i].likes.count;

    var html = '<div class="photo-display"><div class="photo-caption"> <span class="likes"> &hearts;'+likes+'</span></div><a href="'+link+'"><img width="300px" height="300px"src="' +img+ '"></a></div>';
    console.log(data.images);

    $('#search-results').append(html);

  });


}



$("#start-over").on("click", function(){

  $('#seasons').show();
  $('#search-results').hide();
  $('#view-more').hide();
  $('#search-results').html('');


});


$("#view-more").on("click", function(){


  console.log("This works");
  getRequest(seasonName);


});




});


