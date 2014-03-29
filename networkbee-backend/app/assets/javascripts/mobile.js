// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
$(document).on("pageshow","#results",function(){ // When entering pagetwo
  $( "#found_results" ).hide();
  $( "#still_searching" ).show();
  $.ajax({
  url: "path",
  cache: false,
  data: {
    target:'Pinaki'
  }
  })
  .done(function( html ) {
    $( "#found_results" ).html( html );
    $( "#still_searching" ).hide();
    $( "#found_results" ).show();

  })
  .fail(function( err ) {
    alert('Something Went wrong');
  })

;
    
});
