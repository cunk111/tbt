import Paths, { TPaths } from './Paths'

interface IPathObj {
	Base: string;
	[key: string]: string | IPathObj;
}

function getFullPaths(
	parent: IPathObj,
	baseUrl: string,
): IPathObj {
	const url = (baseUrl + parent.Base),
		keys = Object.keys(parent),
		retVal: IPathObj = { Base: url }
	// Iterate keys
	for (const key of keys) {
		const pval = parent[key]
		if (key !== 'Base' && typeof pval === 'string') {
			retVal[key] = (url + pval)
		} else if (typeof pval === 'object') {
			retVal[key] = getFullPaths(pval, url)
		}
	}

	return retVal
}

export default getFullPaths(Paths, '') as TPaths