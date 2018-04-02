package needForSpeed


import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;

class Graph {
    private val EXCEEDED_NUMBER_OF_CHOSEN_NODES = -2
    private val GRAPH_IS_NOT_COVERED = -1
    var edges: List<Edge>
    var chosenNodes: MutableList<Int> = mutableListOf()
    var uncoveredEdges: MutableList<Edge> = mutableListOf()
    lateinit var currentChosenNodes: MutableList<Boolean>
    lateinit var minimalChosenNodes: MutableList<Boolean>
    var numberOfNodes: Int = 0
    var minimalVertexNumber: Int = 0
    var numberOfCombinations: Int = 0
    var actualNodesNumber: Int = 0

    constructor(){
        this.minimalVertexNumber = 1000000
        this.numberOfCombinations = 0
        this.actualNodesNumber = 0

        val mapPath = "sample-edges-cube.txt"
        this.edges = loadGraphFromFile(mapPath)
    }

    fun loadGraphFromFile(fileName: String): List<Edge> {
        val inputStream: InputStream = Graph::class.java.classLoader.getResourceAsStream("maps/" + fileName)
        val edges: ArrayList<Edge> = arrayListOf()
        val graphReader = BufferedReader(
                InputStreamReader(inputStream, "UTF-8"))

        this.numberOfNodes = Integer.parseInt(graphReader.readLine())

        for (line in graphReader.readLines()) {
            val parsedLine: List<String> = line.split(" ")
            val startId: Int = Integer.parseInt(parsedLine[0])
            val endId: Int = Integer.parseInt(parsedLine[1])
            edges.add(Edge(startId, endId))

        }
        return edges
    }


    fun isCityCovered(crossroads: MutableList<Int> ): Int {
        if (crossroads.size > this.edges.size) return EXCEEDED_NUMBER_OF_CHOSEN_NODES

        for (cr in crossroads) {
            for (e in this.edges) {
                if (cr == e.getStartNodeId() || cr == e.getEndNodeId()) {
                    e.cover()
                }
            }
        }
        return if(isGraphCovered(this.edges)) crossroads.size else GRAPH_IS_NOT_COVERED
    }

    //TODO maybe mistake
    fun isGraphCovered(edges: List<Edge>): Boolean = edges.any { it.isCovered() }

    fun unCoverGraph() {
        for (edge in edges) {
            edge.uncover()
        }
    }

    fun coverGraph(nodes: List<Int> , edges: List<Edge> ) {
        for (node in nodes) {
            edges.filter { node == it.getStartNodeId() || node == it.getEndNodeId() }
                    .forEach {
                        it.cover()
                        //TODO break;
                    }
        }
    }
}
