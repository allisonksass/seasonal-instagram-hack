$(function(){


$(function(){
  $('#submit-button').click(function(event){
    event.preventDefault();
    var searchTerm = $('#search').val();
    getRequest(searchTerm);
    $("#search").val('');
  });
});


function getRequest(searchTerm){
  var params = {
  	part:'snippet',
    q: searchTerm,
    key: 'AIzaSyCdtseV-3CvBa8VPeQLAZmVU9ddlj3ffnA',
    maxResults: 20

  };

  url = 'https://www.googleapis.com/youtube/v3/search';

  $.getJSON(url, params, function(data){
    showResults(data.items);
  });
}


function showResults(videos){
	var html = "";
  
  $.each(videos, function(index,video){
  	html += "<div class='video-display'><p>" + video.snippet.title + "</p><a target='_blank' href='https://www.youtube.com/watch?v=" + video.id.videoId + "'><img width='320px' height='270px'src='" +  video.snippet.thumbnails.high.url + "'/></a></div>" ;
    console.log(video.snippet.title);
  });

$('#search-results').html(html);

}





});