package bg.pgmet.mitev.store.service;

import java.nio.file.Path;
import java.util.stream.Stream;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface FilesStorageService {
    void init();

    String save(MultipartFile file);

    Resource load(String filename);

    void deleteAll();

    Stream<Path> loadAll();
}
