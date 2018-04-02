package greeting

import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter

@Configuration
open class WebConfig : WebMvcConfigurerAdapter() {

    override fun addResourceHandlers(registry: ResourceHandlerRegistry?) {
            registry!!.addResourceHandler("/static/js/**")
                    .addResourceLocations("classpath:/static/js/")
            registry.addResourceHandler("/a.jpg")
                    .addResourceLocations("classpath:/static/images/")
            registry.addResourceHandler("/a.css")
                    .addResourceLocations("classpath:/static/css/")
    }
}