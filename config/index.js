<<<<<<< HEAD
'use strict ';

if( process . env. NODE_ENV === 'production ') {
module . exports = {
FB: {
			PAGE_ACCESS_TOKEN: process.env.PAGE_ACCESS_TOKEN,
			VERIFY_TOKEN: process.env.VERIFY_TOKEN,
			APP_SECRET: process.env.APP_SECRET
}
}
} else {
module . exports = require ('./development.json') ;
=======
'use strict ';

if( process . env. NODE_ENV === 'production ') {
module . exports = {
FB: {
			PAGE_ACCESS_TOKEN: process.env.PAGE_ACCESS_TOKEN,
			VERIFY_TOKEN: process.env.VERIFY_TOKEN,
			APP_SECRET: process.env.APP_SECRET
}
}
} else {
module . exports = require ('./development.json') ;
>>>>>>> 03452f8431af374ce171c2a2a04404b495110abd
}