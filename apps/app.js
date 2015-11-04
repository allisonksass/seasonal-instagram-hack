$(document).ready(function(){

//Defining min variable to load new pictures
var min =""


$("#seasons").on("click", "div", chooseSeason);


function chooseSeason (){

  seasonName = $(this).attr("class");
   
  getRequest(seasonName);
  $('#seasons').hide();
  $('#search-results').show();
  $('#view-more').show();


  }

//Show and hide the number of likes on each photo 

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

  //using pagination to get the next set of photos
  min = photos.pagination.next_max_tag_id;
  
  $.each(photos.data, function(i,data){

   var img= photos.data[i].images.standard_resolution.url;
   link = photos.data[i].link;
   likes = photos.data[i].likes.count;

    var photoResult = '<div class="photo-display"><div class="photo-caption"> <span class="likes"> &hearts;'+likes+'</span></div><a target="_blank" href="'+link+'"><img width="300px" height="300px"src="' +img+ '"></a></div>';
    console.log(data.images);

    $('#search-results').append(photoResult);

  });

}

//Show seasons again when clicking +startover

$("#start-over").on("click", function(){

  $('#seasons').show();
  $('#search-results').hide();
  $('#view-more').hide();
  $('#search-results').html('');

});

//Load new set of instagram photos when clicking the view more box

$("#view-more").on("click", function(){

  console.log("New set of images");
  getRequest(seasonName);


});



});


