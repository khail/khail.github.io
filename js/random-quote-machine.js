var quoteList =
[ { quote: "He who has a why to live for can bear almost any how.", author: "Friedrich Nietzsche" },
  { quote: "Courage is not the absence of despair but the capacity to move ahead in spite of despair.", author: "Rollo May" },
  { quote: "The meaning of life is to give life meaning.", author: "Viktor Frankl" },
  { quote: "Science is a way of thinking much more than it is a body of knowledge.", author: "Carl Sagan" },
  { quote: "Beauty is the purgation of superfluities.", author: "Michelangelo" },
  { quote: "Genius is eternal patience.", author: "Michelangelo" },
  { quote: "Any intelligent fool can make things bigger, more complex, and more violent. It takes a touch of genius -- and a lot of courage -- to move in the opposite direction.", author: "Albert Einstein" },
  { quote: "The most beautiful thing we can experience is the mysterious. It is the source of all true art and all science. He to whom this emotion is a stranger, who can no longer pause to wonder and stand rapt in awe, is as good as dead: his eyes are closed.", author: "Albert Einstein" },
  { quote: "Live to the point of tears.", author: "Albert Camus" },
  { quote: "Life must be lived as play.", author: "Plato" },
  { quote: "Wisdom begins with wonder.", author: "Socrates" },
  { quote: "Be the change you want to see in the world.", author: "Mahatma Gandhi" },
  { quote: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { quote: "Focus means saying no to the hundred other good ideas that there are.", author: " Steve Jobes" },
  { quote: "The essential thing is to work in a state of mind that approaches prayer.", author: "Henri Matisse" },
  { quote: "Don't wait for inspiration. It comes while one is working.", author: "Henri Matisse" },
  { quote: "Nothing can be accomplished without love.", author: "Henri Matisse" },
  { quote: "It is better to travel well than to arrive.", author: "Buddha" },
  { quote: "It does not matter how slowly you go as long as you never stop.", author: "Confucius" },
  { quote: "Choose a job you love, and you will never have to work a day in your life.", author: "Confucius" },
  { quote: "Wherever you go, go with all your heart.", author: "Confucius" },
  { quote: "Talent hits a target no one else can hit; genius hits a target no one else can see.", author: "Arthur Schopenhauer" }
];

var indexes = [];

// No repeats until all quotes are shown
function getQuote()
{ if( indexes.length == 0 )
  { while( indexes.length < quoteList.length )
    { var i = Math.floor( Math.random() * quoteList.length );
      if( indexes.indexOf( i ) == - 1 ) indexes.push( i );
    }
  }
  return quoteList[ indexes.pop() ];
}

// Linear Interpolation for fading
function lerp( a, b, u )
{ return ( 1 - u ) * a + u * b;
};

function fade( elements, property, start, end, duration )
{ var interval = 10;
  var steps = duration / interval;
  var step_u = 1.0 / steps;
  var u = 0.0;
  var theInterval = setInterval
  ( function()
    { if( u >= 1.0 ) clearInterval( theInterval );
      var r = parseInt( lerp( start.r, end.r, u ) );
      var g = parseInt( lerp( start.g, end.g, u ) );
      var b = parseInt( lerp( start.b, end.b, u ) );
      var colorname = 'rgb(' + r + ',' + g + ',' + b +')';
      
      for( var k = elements.length - 1; k >= 0; k-- )
        elements[ k ].style.setProperty( property, colorname );
     
      u += step_u;
    }, interval
  );
};

var colors = [ [ 102, 119, 153 ], [ 122, 148, 96 ], [ 221, 153, 119 ], [ 102, 85, 102 ], [ 34, 51, 51 ] ];
var i = 0;

// New quote button
$( document ).ready
( function()
  { $( "#btnQuote" ).on
    ( "click",
      function()
      { var quoteBtn = document.getElementById( 'btnQuote' );
        var twitterBtn = document.getElementById( 'btnTwitterButton' );
        quoteBtn.disabled = true;
        twitterBtn.disabled = true;
       
        do // No color repeats
        { var j = Math.floor( Math.random() * colors.length );
        } while( i === j )
       
        var elBody = document.getElementById( 'theBody' );
        var elQuote = document.getElementById( 'quote' );
        var elAuthor = document.getElementById( 'author' );
        var elBtnQuote = document.getElementById( 'btnQuote' );
        var elBtnTwitter = document.getElementById( 'btnTwitterButton' );
       
        var startColor = { r: colors[ i ][ 0 ], g: colors[ i ][ 1 ], b: colors[ i ][ 2 ] };
        var endColor = { r: colors[ j ][ 0 ], g: colors[ j ][ 1 ], b: colors[ j ][ 2 ] };
        var white = { r: 255, g: 255, b: 255 };
       
        i = j;
        
       fade( [ elBody, elBtnQuote, elBtnTwitter ], 'background-color', startColor, endColor, 1000 );
       fade( [ elQuote, elAuthor ], 'color', startColor, white, 1000 );
       
        setTimeout
        ( function()
          { var theQuote = getQuote();
            $( "#quote" ).html( theQuote.quote );
            $( "#author" ).html( theQuote.author );
            fade( [ elQuote, elAuthor ], 'color', white, endColor, 500 );
          }, 1200
        );
       
        setTimeout
        ( function()
          { quoteBtn.disabled = false;
            twitterBtn.disabled = false;
          }, 1800
        );
      }
    );
  }
);

// Twitter button
$( document ).ready
( function()
  { $( "#btnTwitterAnchor" ).on
    ( "click", 
      function()
      { var theQuote = $( '#quote' ).text();
        var theAuthor = $( '#author' ).text();
        var newURL = "https://twitter.com/intent/tweet?text=" +
          "\"" + theQuote + "\"" + " -- " + theAuthor;
        newURL = newURL.replace( ";", "\;" );
        $( "#btnTwitterAnchor" ).attr( "href", newURL );
      }
    );
  }
);
