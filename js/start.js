$(document).ready(function() {

//events
    $.getJSON('content/events.json', function(data) 
    {
      updateDomEvents(data)
    }
    ).error(function(XMLHttpRequest, textStatus, errorThrown) { debug(textStatus, errorThrown); });

//meetings
    
    
    $.getJSON('content/meetings.json', function(data){ updateDomMeetings(data); });
    
    
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
      debug(data);
    };

});



function debug($obj) {
  if (window.console && window.console.log) {
    window.console.log($obj);
  }
}
