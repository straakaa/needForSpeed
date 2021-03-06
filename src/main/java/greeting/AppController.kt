package greeting

import needForSpeed.Graph
import needForSpeed.NFSResult
import needForSpeed.ParsedResult
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import java.io.*
import java.util.ArrayList
import java.util.logging.Logger
import javax.servlet.http.HttpServletRequest


@Controller
class AppController {

    private val storage: File = File("storage.txt")
    private val logger: Logger
    private val FIRST_RESULT = -1
    init{
        storage.createNewFile()
        logger = Logger.getLogger(AppController::class.java.name)
    }

    @GetMapping("/")
    fun index(): String {
        println("home method")
        return "index"
    }

    @RequestMapping(path = ["/results"], method = [(RequestMethod.GET)], produces = [(MediaType.APPLICATION_JSON_VALUE)])
    fun getTask(req: HttpServletRequest): ResponseEntity<List<NFSResult>> {
        return ResponseEntity.ok(readResultsFromStorage())
    }
    @RequestMapping(path = ["/upload"], method = [RequestMethod.PUT], consumes = [MediaType.MULTIPART_FORM_DATA_VALUE])
    fun uploadFile(@RequestParam("file") file: Array<MultipartFile>,
                   req: HttpServletRequest): ResponseEntity<NFSResult> {


        val parsedResult: ParsedResult
        try {
            parsedResult = parseResult(file[0])
        } catch (e: Exception) {
            throw RuntimeException("Error: Wrong file format")
        }

        val graph: Graph
        try {
            graph = Graph()
        } catch (e: IOException) {
            throw RuntimeException("Error: Server failure")
        }

        val result = graph.isCityCovered(parsedResult.getCoveredCrossroads())

        val nfsResult = NFSResult(parsedResult.getName(), result)
        return if (saveResult(nfsResult)) {
            ResponseEntity.ok(nfsResult)
        } else {
            ResponseEntity.ok(null)
        }
    }

    private fun isUserNameStored(userName: String): Int {
        val results = readResultsFromStorage()
        val result = results.stream().filter { r -> r.getUserName() == userName }.findFirst().orElse(null)
        return result?.getNumberOfCameras() ?: FIRST_RESULT
    }

    @Synchronized private fun saveResult(result: NFSResult): Boolean {
        val numberOfCameras = isUserNameStored(result.getUserName())
        if (numberOfCameras >= 0) {
            println("exist with: " + numberOfCameras)
            if (numberOfCameras < result.getNumberOfCameras()) {
                logger.info("Rewriting result in storage: " + numberOfCameras)
                //TODO nahradit stary zaznam jmeno
                saveToStorage(result)
                return true

            }
        } else { //FIRST TIME TO STORE
            saveToStorage(result)
            return true
        }
        return false


    }

    private fun readResultsFromStorage(): List<NFSResult> {
        val results = ArrayList<NFSResult>()
        try {
            val fr = FileReader(storage)
            val bufferedReader = BufferedReader(fr)

            for (line in bufferedReader.readLines() ) {
                if(line == "") {
                    break
                }
                val storedUserName = line.split(",")[0].split(":")[1]
                val numberOfCameras = Integer.parseInt(line.split(",")[1].split(":")[1].trim())
                results.add(NFSResult(storedUserName, numberOfCameras))
            }
        } catch (e: FileNotFoundException) {
            e.printStackTrace()
        } catch (e: IOException) {
            e.printStackTrace()
        }

        return results

    }

    private fun saveToStorage(result: NFSResult) {
        val fw: FileWriter
        try {
            fw = FileWriter(storage.absolutePath, true)
            val bufferedWriter = BufferedWriter(fw)
            bufferedWriter.write(result.toString())
            bufferedWriter.newLine()
            bufferedWriter.flush()
        } catch (e: IOException) {
            e.printStackTrace()
        }
    }

    private fun parseResult(multipartFile: MultipartFile): ParsedResult {
        val coveredCrossroads = ArrayList<Int>()
        val bytes = multipartFile.bytes
        val completeData = String(bytes)
        val userName: String
        val solution: String
        userName = completeData.split("\r\n")[0]
        solution = completeData.split("\r\n")[1]

        val parsedSolution = solution.split(",")
        for (nodeId in parsedSolution) {
            coveredCrossroads.add(Integer.parseInt(nodeId))
        }

        return ParsedResult(userName, coveredCrossroads)
    }

    private fun reqErr(msg: String) {
        throw InvalidRequestException(msg)
    }

    private class InvalidRequestException constructor(internal val error: String) : RuntimeException()


}