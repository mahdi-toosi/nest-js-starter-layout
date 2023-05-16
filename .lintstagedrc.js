module.exports = {
	'**/*.{ts}': fileNames =>
		`cross-env NODE_ENV=production eslint --ext .ts ${fileNames.join(' ')} --fix`,
	'**/*.{ts}': fileNames => `prettier -u --write ${fileNames.join(' ')} --fix`,
}
