import {createChunk} from './createChunk.js'
import './spark-md5.js'
onmessage =  async function(e) {
	const {
		file,
		CHUNK_SIZE,
		startChunkIndex:start,
		endChunkIndex:end,
	} = e.data
	
	const proms = []
	
	for(let i = start;i < end;i++){
		proms.push(createChunk(file,i,CHUNK_SIZE))
	}
	console.log('proms',proms)
	
	const chunks = await Promise.all(proms)
	postMessage(chunks)
	console.log(e.data)
};