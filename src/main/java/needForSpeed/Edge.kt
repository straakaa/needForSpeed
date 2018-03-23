package needForSpeed

class Edge(private val startNodeId: Int,
           private val endNodeId: Int,
           private var covered: Boolean = false) {


    override fun toString(): String = "$startNodeId $endNodeId"

    fun getEndNodeId(): Int = endNodeId

    fun getStartNodeId(): Int = startNodeId

    fun isCovered(): Boolean = covered

    fun cover() {
        this.covered = true
    }

    fun uncover() {
        this.covered = false
    }
}