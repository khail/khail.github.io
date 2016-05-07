var temp;
var tempStr;
var wind;
var windStr;

function setUnits()
{	if( $( '#toggle' ).prop( 'checked' ) )
	{	tempStr = temp + ' C';
		windStr = wind + ' m/s';
	}
	else
	{	tempStr = String( Math.round( temp * 1.8 + 32 ) ) + ' F';
		windStr = String( Math.round( wind * 2.23694 ) ) + ' mi/h';
	}
				
	$( '#temp-str' ).html( tempStr );
	$( '#wind-str' ).html( windStr );
}

$(	function()
	{	$( '#toggle' ).change
		(	function()
			{	setUnits();
			}
		)
	}
)

if( navigator.geolocation )
{ 	navigator.geolocation.getCurrentPosition
	( 	function( position )
		{ 	var APPID = 'd399f5bef04f797e1957ce6484ec7ea8';
			var latitude = position.coords.latitude;
			var longitude = position.coords.longitude;
			var weatherURL = 'http://api.openweathermap.org/data/2.5/weather?lat=' + latitude +
				'&lon=' + longitude + '&APPID=' + APPID + '&units=metric';
				
			$.getJSON
			(	weatherURL,
				function( data )
				{	function getWindDir( deg )
					{	if( deg >= 337.5 && deg <= 360 || deg >= 0 && deg < 22.5 ) return 'North';
						else if( deg >=  22.5 && deg <  67.5 ) return 'Northeast';
						else if( deg >=  67.5 && deg < 112.5 ) return 'East';
						else if( deg >= 112.5 && deg < 157.5 ) return 'Southeast';
						else if( deg >= 157.5 && deg < 202.5 ) return 'South';
						else if( deg >= 202.5 && deg < 247.5 ) return 'Southwest';
						else if( deg >= 247.5 && deg < 292.5 ) return 'West';
						else if( deg >= 292.5 && deg < 337.5 ) return 'Northwest';
					}
					
					<!-- setBackdrop -->
					var bgURL =
					{	i01d: 'farm6.staticflickr.com/5583/14657906197_572697cb41_o.jpg',
						i01n: 'https://farm8.staticflickr.com/7274/7559392358_26aaa31531_o.jpg',
						i02d: 'static.pexels.com/photos/3590/nature-sky-sunny-clouds.jpg',
						i02n: 'upload.wikimedia.org/wikipedia/commons/3/3f/Helkivad_ööpilved_Kuresoo_kohal.jpg',
						i03d: 'upload.wikimedia.org/wikipedia/commons/1/10/Quiet_Drive_(1).jpg',
						i03n: 'upload.wikimedia.org/wikipedia/commons/1/10/Cloudy_Night_Sky_(17677878458).jpg',
						i04d: 'www.publicdomainpictures.net/pictures/30000/velka/cloudy-day-2.jpg',
						i04n: 'www.publicdomainpictures.net/pictures/30000/velka/cloudy-day-2.jpg',
						i09d: 'upload.wikimedia.org/wikipedia/commons/d/de/Rain_showers_across_Canberra_1.jpg', 
						i09n: 'upload.wikimedia.org/wikipedia/commons/d/de/Rain_showers_across_Canberra_1.jpg',
						i10d: 'tinyurl.com/j2douw5',
						i10n: 'www.ukweatherforecast.co.uk/wp-content/uploads/2014/05/rain.jpg',
						i11d: 'farm4.staticflickr.com/3896/14629877115_79b7573086_o.jpg',
						i11n: 'farm4.staticflickr.com/3896/14629877115_79b7573086_o.jpg',
						i13d: 'static.pexels.com/photos/4022/cold-snow-forest-trees.jpeg',
						i13n: 'upload.wikimedia.org/wikipedia/commons/0/09/Aurora_3_in_Kiruna.JPG',
						i50d: 'upload.wikimedia.org/wikipedia/commons/f/f6/Duivelshof_mist.jpg',
						i50n: 'static.pexels.com/photos/1404/nature-night-dark-tree.jpg'
					}
					$( '#backdrop' ).css( { 'background-image': 'url( https://' +
						bgURL[ 'i' + data.weather[ 0 ].icon ] + ' )' } );
					
					var iconURL = 'http://openweathermap.org/img/w/' + data.weather[ 0 ].icon + '.png';
					temp = Math.round( data.main.temp );
					tempStr = temp + ' C';
					wind = Math.round( data.wind.speed );
					windStr = wind + ' m/s';
					
					$( '#weather-icon' ).html( '<img src=' + iconURL + '>' );
					$( '#temp-str' ).html( tempStr );
					$( '#city' ).html( data.name );
					$( '#weather-desc' ).html( data.weather[ 0 ].description );
					$( '#wind-dir' ).html( getWindDir( data.wind.deg ) );
					$( '#wind-str' ).html( windStr );
					
					setUnits();
				}
			);
		}
	);
}