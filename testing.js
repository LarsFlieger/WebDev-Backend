const {readFile, writeFile} = require('fs').promises
const {join} = require('path')

const copy = async (src, dst) => {
    try {
        const data = await readFile(src)
        await writeFile(dst, data)
        console.log("File copied: ", data)
    } catch (error) {
        console.error(error)
    }
}

copy(join(__dirname, 'test.txt'), join(__dirname, 'copy.txt'))