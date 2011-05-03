$(document).ready(function() {

//events
    $.getJSON('content/events.json', function(data) 
    {
      updateDomEvents(data)
       
    }
    ).error(function(XMLHttpRequest, textStatus, errorThrown) { console.log(textStatus, errorThrown )});

//meetings
    
    
    $.getJSON('content/meetings.json', function(data){ updateDomMeetings(data)});
    
    
    function updateDomEvents(data)
    {
      $.each(data['events'], 
          function(index, value)
          {
            $('#events').append('<div id="event_' + index +'"><p>' + value.name +'</p><p>' + value.www +'</p> <p>' + value.date + '</p> <hr /></div>')
          }
        );
    }
    
    
    
    function updateDomMeetings(data)
    {
      $.each(data['meetings'], function(index, value){
          $('#meetings').append('<div id="meeting_' + index +'"><p>' + value.title +'</p><p>' + value.www +'</p> <p>' + value.date + '</p> <hr /></div>')
        }
        );
      console.log('pippo');
      console.log(data);
    }
    

});




