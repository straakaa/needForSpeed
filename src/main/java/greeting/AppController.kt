package greeting

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class AppController {

    @GetMapping("/hello")
    fun hello(): String{
        return "je to tady Hello"
    }

    @GetMapping("/bye")
    fun bye(): String{
        return "Bye bye"
    }
}