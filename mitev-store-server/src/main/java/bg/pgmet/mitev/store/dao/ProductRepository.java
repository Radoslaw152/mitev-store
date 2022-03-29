package bg.pgmet.mitev.store.dao;

import bg.pgmet.mitev.store.model.Product;
import java.util.Set;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    @Transactional(readOnly = true)
    Product findByModel(String model); //

    @Transactional(readOnly = true)
    Set<Product> findByBrandType(String brandType);

    @Transactional(readOnly = true)
    Set<Product> findByGraphicsCard(String graphicsCard);

    @Transactional(readOnly = true)
    Set<Product> findByModelType(String modelType);

    @Transactional(readOnly = true)
    Set<Product> findByProcessorType(String processorType);

    @Transactional(readOnly = true)
    Set<Product> findByOnSale(boolean onSale);
}
