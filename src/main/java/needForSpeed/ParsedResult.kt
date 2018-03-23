package needForSpeed

data class ParsedResult(private val name: String,
                        private val coveredCrossroads: MutableList<Int>) {

    fun getName() = name

    fun getCoveredCrossroads(): MutableList<Int> = coveredCrossroads

}
