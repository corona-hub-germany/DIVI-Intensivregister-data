# DIVI-Intensivregister-data

Scraper für Daten des DIVI Intensivregisters

## Setup

```sh
npm install --save-dev divi-intensivregister-data
```

## Example

```js
const { getCopyright, getStateData } = require('divi-intensivregister-data');

(async () => {
	const coyright = getCopyright();
	console.log(`Copyright: ${coyright}\n`);

	const data = await getData({
	 //reportUrl: "https://divi.de/images/register/report2v.html",
	});
	console.log(`First dataset: ${JSON.stringify(data[0], null, 2)}\n`);
})();
```

Output:
```
First dataset: {
  ecmoPerYear: 358,
  covid19Current: 13,
  covid19Ventilated: 5,
  covid19Sum: 5,
  intensiveBeds: 3352,
  icu_ecmo_available: 24,
  icu_ecmo_24h: 22,
  icu_high_care_occupied: 57,
  icu_high_care_available: 82,
  icu_high_care_24h: 108,
  icu_low_care_occupied: 14,
  icu_low_care_available: 58,
  icu_low_care_24h: 47,
  AGS: 34000000,
  state: 'Hamburg',
  covid_rel: 0.000007060693175405542,
  icu_beds_future: 177,
  icu_beds_now: 164,
  icu_beds_now_rel: 0.00008907336005896222,
  num_hospitals: 17,
  population: 1841179
}
```

## License

AGPL-3.0-or-later

Copyright 2020 by Alexander Wunschik <dev@wunschik.net> and contributors
