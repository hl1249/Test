
import './spark-md5.js'
export function createChunk(file,index,chunkSize){
	return new Promise((resolve,reject) => {
			const start = index * chunkSize
			const end = start+chunkSize
			const spark = new SparkMD5.ArrayBuffer()
			const fileReader = new FileReader()
			const blob = file.slice(start,end)
			
			fileReader.onload = (e) => {
				 spark.append(e.target.result)
				  const _md5 = spark.end()
				
				resolve({
					start,
					end,
					index,
					hash:_md5,
					blob
				})
			}
			
			fileReader.readAsArrayBuffer(blob)
	})
}