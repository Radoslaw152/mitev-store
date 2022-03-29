package bg.pgmet.mitev.store.service;

import bg.pgmet.mitev.store.model.Product;
import java.util.Set;

public interface ProductService {
    Set<Product> getAllProducts();

    Product getProductById(Long id);

    Product createProduct(Product product);

    Product updateProduct(Product product);

    Product deleteProduct(Long id);

    Set<Product> getProductsByModelContains(String title);

    Set<Product> getProductsByBrandType(String brandType);

    Set<Product> getProductsByGraphicsCard(String graphicsCard);

    Set<Product> getProductsByModelType(String modelType);

    Set<Product> getProductsByProcessorType(String processorType);

    Set<Product> getProductsByOnSale(boolean onSale);

    Set<Product> getNewProducts();
}
