package bg.pgmet.mitev.store;

import bg.pgmet.mitev.store.service.FilesStorageService;
import javax.annotation.Resource;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableAutoConfiguration
@EnableJpaRepositories("bg.pgmet.mitev.store.dao")
public class MitevStoreApplication implements CommandLineRunner {

    @Resource private FilesStorageService filesStorageService;

    public static void main(String[] args) {
        SpringApplication.run(MitevStoreApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        filesStorageService.init();
    }
}
