export default function createUniqueString() {
	const timestamp = (+ new Date()).toString();
	const randomNum = parseInt((1 + Math.random()) * 65536).toString();
	return (+ (randomNum + timestamp)).toString(32);
}
