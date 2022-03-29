package bg.pgmet.mitev.store.config;

import bg.pgmet.mitev.store.security.SecurityConstants;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.http11.AbstractHttp11Protocol;
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.boot.web.server.WebServerFactoryCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@Slf4j
public class WebConfiguration implements WebMvcConfigurer {

    private final long MAX_AGE_SECS = 3600;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*")
                .allowedMethods("*")
                .allowedHeaders("*")
                .exposedHeaders(SecurityConstants.TOKEN_HEADER)
                .maxAge(MAX_AGE_SECS);
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/uploads/**").addResourceLocations("file:tmp/");
    }

    @Bean
    public WebServerFactoryCustomizer<TomcatServletWebServerFactory> getTomcatCustomizer() {
        return new WebServerFactoryCustomizer<TomcatServletWebServerFactory>() {
            @Override
            public void customize(TomcatServletWebServerFactory factory) {
                factory.addConnectorCustomizers(
                        (connector) -> {
                            if ((connector.getProtocolHandler()
                                    instanceof AbstractHttp11Protocol<?>)) {
                                // -1 means unlimited
                                ((AbstractHttp11Protocol<?>) connector.getProtocolHandler())
                                        .setMaxSwallowSize(11534336); // 11 MB
                            }
                            connector.setMaxPostSize(11534336); // 11 MB
                        });
            }
        };
    }
}
