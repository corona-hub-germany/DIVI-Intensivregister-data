const rp = require('request-promise');
const deepmerge = require('deepmerge');

const KEY_MATCHING = {
	ecmoPerYear: 'Anzahl ECMO-Fälle pro Jahr',
	covid19Current: 'COVID-19 aktuell',
	covid19Ventilated: 'COVID-19 beatmet',
	covid19Sum: 'COVID-19 kumulativ',
	covid19Deaths: 'COVID-19 verstorben',
	intensiveBeds: 'Gesamt aufgestellte Intensivbetten',
	icu_ecmo_occupied: 'ICU ECMO (belegt)',
	icu_ecmo_available: 'ICU ECMO (frei)',
	icu_ecmo_24h: 'ICU ECMO care in 24 h (Anzahl)',
	icu_high_care_occupied: 'ICU high care (belegt)',
	icu_high_care_available: 'ICU high care (frei)',
	icu_high_care_24h: 'ICU high care in 24 h (Anzahl)',
	icu_low_care_occupied: 'ICU low care (belegt)',
	icu_low_care_available: 'ICU low care (frei)',
	icu_low_care_24h: 'ICU low care in 24 h (Anzahl)',
	AGS: 'ags',
	state: 'bundesland',
	covid_rel: 'covid_rel',
	icu_beds_future: 'icu_beds_future',
	icu_beds_now: 'icu_beds_now',
	icu_beds_now_rel: 'icu_beds_now_rel',
	num_hospitals: 'num_hospitals',
	population: 'population'
};

function getCopyright() {
	return "DIVI-Intensivregister, Auswertung RKI";
}

async function getStateData(options = {}) {

	options = deepmerge({
		reportUrl: "https://divi.de/images/register/report2v.html",
		keyMatching: KEY_MATCHING
	}, options);

	var content = '';

	try {
		content = await rp(options.reportUrl);
	} catch(err) {
		throw new Error(`Error requesting "${options.reportUrl}": ${err}`);
	}

	let datasets = []
	try {
		const regexp = /var\s*spec\s?=\s?(.*?);\s*/i;
		var found = [...content.matchAll(regexp)];
		var object = JSON.parse(found[0][1]);
		datasets = object.datasets[object.data.name];
	} catch(err) {
		throw new Error(`Error parsing content: ${err}`);
	}

	var data = [];
	for (let set of datasets) {
		var entry = {};
		Object.keys(options.keyMatching).forEach(key => {
			var keyString = options.keyMatching[key];
			var value = set[keyString];
			if (value) {
				entry[key] = value;
			}
		});
		data.push(entry);
	}
	return data;
}

module.exports = {
	getCopyright,
	getStateData
}