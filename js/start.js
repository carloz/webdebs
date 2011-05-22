ify=function(){var entities={'"':'"','&':'&','<':'<','>':'>'};return{"link":function(t){return t.replace(/[a-z]+:\/\/[a-z0-9-_]+\.[a-z0-9-_:~%&\?\/.=]+[^:\.,\)\s*$]/ig,function(m){return'<a href="'+m+'">'+((m.length>25)?m.substr(0,24)+'...':m)+'</a>';});},"at":function(t){return t.replace(/(^|[^\w]+)\@([a-zA-Z0-9_]{1,15})/g,function(m,m1,m2){return m1+'@<a href="http://twitter.com/'+m2+'">'+m2+'</a>';});},"hash":function(t){return t.replace(/(^|[^\w'"]+)\#([a-zA-Z0-9_]+)/g,function(m,m1,m2){return m1+'#<a href="http://search.twitter.com/search?q=%23'+m2+'">'+m2+'</a>';});},"clean":function(tweet){return this.hash(this.at(this.link(tweet)));}};}();

TwitterAPI = {

  statuses: {
    user_timeline:function(screen_name, count, callback){
      jQuery.getJSON("http://twitter.com/statuses/user_timeline/" + screen_name + ".json?count="+count+"&cb="+Math.random()+"&callback=?", callback);
    }
  }
 };


$(document).ready(function() {

  
console.log($('li.centerEvent').width());
console.log($('#event_block').width());

var startp = ($('#event_block').width() - $('li.centerEvent').width())/2 ;
//var endp = ;

console.log(startp);

$('#event_block ul').css('top',$('li.centerEvent').offset() - startp +'px')

//twitter
TwitterAPI.statuses.user_timeline('webdebresa',5,function(json){
  var content = "";
  content += '<ul>';
  $.each(json, function(i){
    var tweet = ify.clean(this['text']);
    var d = new Date(this['created_at']);
    var date_show = d.getDate()+'/'+d.getMonth()+'/'+d.getFullYear()+' '+d.getHours()+':'+d.getMinutes();
    content += '<li>' + tweet + ' (<date>'+date_show+'</date>)</li>';
  });
  content += '</ul>';
  $('aside').append(content);
});
  
  
//events
    $.getJSON('content/events.json', function(data) 
    {
      updateDomEvents(data)
    }
    ).error(function(XMLHttpRequest, textStatus, errorThrown) {debug(textStatus, errorThrown);});

//meetings
    
    
    $.getJSON('content/meetings.json', function(data){updateDomMeetings(data);});
    
    
    function updateDomEvents(data)
    {
      $.each(data['events'], 
        function(index, value) {
          if (value.status=="visible") {
            $('#events .data').append('<div id="event_' + index +'" class="event trentatre"><p>' + value.name +'</p><p>' + value.url +'</p> <p>' + value.date + '</p></div>');
          }
        });
    };
    
    
    
    function updateDomMeetings(data)
    {
      $.each(data['meetings'], function(index, value){
        $('#meetings .data').append('<div id="meeting_' + index +'" class="meeting trentatre"><p>' + value.title +'</p><p>' + value.url +'</p> <p>' + value.date + '</p></div>');
      });
      
      $('#meetings .data div:even').css('background','#eee');
      
      debug(data);
    };
    
    
    $('#next').click(
        function(e)
        {
          e.preventDefault();
          var p = '' + $('#event_block ul').position().left - 50 + '';

          $('ul').css('left',   p + 'px');
        }

    );
      
    var intervalKey;

    $('#next').hover(
      function(e)
      {
        e.preventDefault();
        var move = function(){ 
            var p = '' + $('#event_block ul').position().left - 50 + '';
            $('ul').css('left',   p + 'px');
        }
        
       intervalKey = setInterval(move, 300);          
      },
      
      function(){
       clearInterval(intervalKey);
      }

    );
      
      
     $('#prev').hover(
      function(e)
      {
        e.preventDefault();
        over = true;
        var move = function(){ 
          if(over){
            var p = '' + (parseInt($('#event_block ul').position().left) + 50) + '';
            $('ul').css('left',   p + 'px');
          }
        }
        
       intervalKey = setInterval(move, 1300);          
      },
      
      function(){
       clearInterval(intervalKey);
      }

    );
      
    $('#prev').click(
      function(e)
        {
         e.preventDefault();
          console.log($('#event_block ul').position().left);
          var p = '' + (parseInt($('#event_block ul').position().left) + 50) + '';

          $('ul').css('left',   p + 'px');
          console.log(p);
          
        }
  
    );

});



function debug($obj) {
  if (window.console && window.console.log) {
    window.console.log($obj);
  }
}
