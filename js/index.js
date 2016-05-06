window.smoothScroll = function( target )
{ 	var scrollContainer = target;
  	do
  	{ 	//find scroll container
    	scrollContainer = scrollContainer.parentNode;
    	if( !scrollContainer ) return;
    	scrollContainer.scrollTop += 1;
  	} while( scrollContainer.scrollTop == 0 );
    
  	var targetY = 0;
  	do
  	{ 	//find the top of target relatively to the container
    	if( target == scrollContainer ) break;
      	targetY += target.offsetTop;
  	} while( target = target.offsetParent );
    
  	scroll = function( c, a, b, i )
  	{ 	if ( ++i > 30 ) return;
    	c.scrollTop = a + ( b - a ) / 30 * i;
    	setTimeout( function() { scroll( c, a, b, i ); }, 20 );
  	}
    
  	// start scrolling
  	scroll( scrollContainer, scrollContainer.scrollTop, targetY, 0 );
}

$( "#btnMoocho" ).click( function() { smoothScroll( document.getElementById( "home-section" ) ); } );
$( "#btnHome" ).click( function() { smoothScroll( document.getElementById( "home-section" ) ); } );
$( "#btnAbout" ).click( function() { smoothScroll( document.getElementById( "about-section" ) ); } );
$( "#btnProjects" ).click( function() { smoothScroll( document.getElementById( "projects-section" ) ); } );
$( "#btnAwards" ).click( function() { smoothScroll( document.getElementById( "awards-section" ) ); } );
$( "#btnSkillset" ).click( function() { smoothScroll( document.getElementById( "skillset-section" ) ); } );
$( "#btnContact" ).click( function() { smoothScroll( document.getElementById( "links-section" ) ); } );
