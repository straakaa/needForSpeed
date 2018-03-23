package needForSpeed;

class NFSResult(private val userName: String,
                private val numberOfCameras: Int) {

    fun getUserName(): String = userName

    fun getNumberOfCameras(): Int =  numberOfCameras

    override fun toString(): String =  "user: $userName, numberOfCameras: $numberOfCameras"

}
