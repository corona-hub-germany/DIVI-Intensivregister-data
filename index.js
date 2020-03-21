const { getCopyright, getStateData } = require('./src/getStateData');

(async () => {
	const coyright = getCopyright();
	console.log(`Copyright: ${coyright}\n`);

	const data = await getStateData();
	console.log("First entry: ", data[0]);
})();