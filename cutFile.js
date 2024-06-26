import {createChunk} from './createChunk.js'

const CHUNK_SIZE = 1024 *1024 * 5 //5MB
const THREAD_COUNT = navigator.hardwareConcurrency //16

export function cutFile(file){
	return new Promise( async(resolve,reject) => {
		
			const result = []
			
			const chunkCount = Math.ceil(file.size/CHUNK_SIZE)
			
			const threadChunkCount = Math.ceil(chunkCount/THREAD_COUNT)
			
	// 		let finishCount = 0
	// 		for(let i = 0 ; i < threadChunkCount ; i ++){
	// 			const worker = new Worker('./worker.js',{
	// 				type:'module'
	// 			})
	// 			let end = (i+1) * threadChunkCount
	// 			const start = i * threadChunkCount
	// 			if(end > chunkCount){
	// 				end = chunkCount
	// 			}
	// 			worker.postMessage({
	// 				file,
	// 				CHUNK_SIZE,
	// 				startChunkIndex:start,
	// 				endChunkIndex:end,
	// 			})
				
	// 			worker.onmessage = e => {
	// 				for(let i = start; i < end ; i ++){
	// 					result[i] = e.data[i-start]
	// 				}
	// 				worker.terminate()
	// 				finishCount++
					
	// 				if(finishCount === THREAD_COUNT){
	// 					resolve(result)
	// 				}
	// 			}
	// 		}
		
	// })
	
	// const result = []
	for(let i = 0 ; i < chunkCount;i++){
		const chunk = await createChunk(file,i,CHUNK_SIZE)
		result.push(chunk)
	}
	
	resolve(result)
	// return result
})

}