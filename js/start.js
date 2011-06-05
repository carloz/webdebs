var ify=function(){var entities={'"':'"','&':'&','<':'<','>':'>'};return{"link":function(t){return t.replace(/[a-z]+:\/\/[a-z0-9-_]+\.[a-z0-9-_:~%&\?\/.=]+[^:\.,\)\s*$]/ig,function(m){return'<a href="'+m+'">'+((m.length>25)?m.substr(0,24)+'...':m)+'</a>';});},"at":function(t){return t.replace(/(^|[^\w]+)\@([a-zA-Z0-9_]{1,15})/g,function(m,m1,m2){return m1+'@<a href="http://twitter.com/'+m2+'">'+m2+'</a>';});},"hash":function(t){return t.replace(/(^|[^\w'"]+)\#([a-zA-Z0-9_]+)/g,function(m,m1,m2){return m1+'#<a href="http://search.twitter.com/search?q=%23'+m2+'">'+m2+'</a>';});},"clean":function(tweet){return this.hash(this.at(this.link(tweet)));}};}();

TwitterAPI = {

  statuses: {
    user_timeline:function(screen_name, count, callback){
      jQuery.getJSON("http://twitter.com/statuses/user_timeline/" + screen_name + ".json?count="+count+"&cb="+Math.random()+"&callback=?", callback);
    }
  }
 };


$(document).ready(function() {


  //colorbox google calendar
  $(".calendar").colorbox({width:"80%", height:"80%", iframe:true});
  $(".map").colorbox({width:"80%", height:"80%", iframe:true});

  var event_block = $('#event_block');
  var event_list = $('#event_list');
  var meeting_block = $('#meeting_block');
  var meeting_list = $('#meeting_list');
  var centered_event = $('li.centered_event');
  var centered_meeting = $('li.centered_meeting');
  var distance_event_to_center_from_event_list_container =  0 - centered_event.position().left;
  var distance_meeting_to_center_from_meeting_list_container =  0 - centered_meeting.position().left;
  var extra_space_between_visual_area_and_event_to_center = centered_event.width() - event_block.width();
  var extra_space_between_visual_area_and_meeting_to_center = centered_event.width() - event_block.width();

  //move .centered_event slide in the center
  $('#event_block ul').css('left', (distance_event_to_center_from_event_list_container - (extra_space_between_visual_area_and_event_to_center /2)) +'px')


  $('#next_event').click(
    function(e) {
      e.preventDefault();
      if(centered_event.next().length != 0){
        centerNewEvent(centered_event.next());
      }
    }
  );

  function centerNewEvent(event_to_be_centered )
  {
    event_to_be_centered.addClass('centered_event');
    centered_event.removeClass('centered_event');
    centered_event = event_to_be_centered;

    var distance_event_to_center_from_event_list_container = 0 - centered_event.position().left;

    var extra_space_between_visual_area_and_event_to_center = centered_event.width() - event_block.width();

     $('#event_block ul').animate(
      {
        'left': (distance_event_to_center_from_event_list_container - (extra_space_between_visual_area_and_event_to_center /2)) +'px'
      },
      'slow',
      'linear'
     );
  }

   $('#prev_event').click(
    function(e){
      e.preventDefault();
      if(centered_event.prev().length != 0){
          centerNewEvent(centered_event.prev());
      }

     }
  );
    
  //meetings
  $('#meeting_block ul').css('left', (distance_meeting_to_center_from_meeting_list_container - (extra_space_between_visual_area_and_meeting_to_center /2)) +'px')


  $('#next_meeting').click(
    function(e) {
      e.preventDefault();
      if(centered_meeting.next().length != 0){
        centerNewMeeting(centered_meeting.next());
      }
    }
  );

  function centerNewMeeting(meeting_to_be_centered )
  {
    meeting_to_be_centered.addClass('centered_meeting');
    centered_meeting.removeClass('centered_meeting');
    centered_meeting = meeting_to_be_centered;

    var distance_meeting_to_center_from_meeting_list_container = 0 - centered_meeting.position().left;

    var extra_space_between_visual_area_and_meeting_to_center = centered_meeting.width() - meeting_block.width();

     $('#meeting_block ul').animate(
      {
        'left': (distance_meeting_to_center_from_meeting_list_container - (extra_space_between_visual_area_and_meeting_to_center /2)) +'px'
      },
      'slow',
      'linear'
     );
  }

   $('#prev_meeting').click(
    function(e){
      e.preventDefault();
      if(centered_meeting.prev().length != 0){
          centerNewMeeting(centered_meeting.prev());
      }

     }
  );
    

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

      
});
