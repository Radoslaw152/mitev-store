package bg.pgmet.mitev.store.service.impl;

import bg.pgmet.mitev.store.dao.ProductRepository;
import bg.pgmet.mitev.store.exception.EntityAlreadyExistsException;
import bg.pgmet.mitev.store.exception.EntityNotFoundException;
import bg.pgmet.mitev.store.model.Product;
import bg.pgmet.mitev.store.service.CommentService;
import bg.pgmet.mitev.store.service.ProductService;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository repo;
    private final CommentService commentService;

    @Override
    public Set<Product> getAllProducts() {
        return new HashSet<>(repo.findAll());
    }

    @Override
    public Product getProductById(Long id) {
        if (id == null) {
            return null;
        }
        return repo.findById(id)
                .orElseThrow(
                        () ->
                                new EntityNotFoundException(
                                        String.format("Product with ID=%s does not exist.", id)));
    }

    @Override
    public Product createProduct(Product product) {
        Product result = repo.findByModel(product.getModel());
        if (result != null) {
            throw new EntityAlreadyExistsException(
                    String.format("Product with model=%s already exists!", product.getModel()));
        } else {
            return insert(product);
        }
    }

    @Transactional
    private Product insert(Product product) {
        product.setId(null);
        return repo.save(product);
    }

    @Override
    public Product updateProduct(Product product) {
        if (!product.getOnSale()) {
            product.setPercentOff(0);
        }
        return repo.save(product);
    }

    @Override
    public Product deleteProduct(Long id) {
        Product old = getProductById(id);
        repo.deleteById(id);
        return old;
    }

    @Override
    public Set<Product> getProductsByModelContains(String title) {
        return repo.findAll().stream()
                .filter(product -> product.getModel().toUpperCase().contains(title.toUpperCase()))
                .collect(Collectors.toSet());
    }

    @Override
    public Set<Product> getProductsByBrandType(String brandType) {
        return repo.findByBrandType(brandType);
    }

    @Override
    public Set<Product> getProductsByGraphicsCard(String graphicsCard) {
        return repo.findByGraphicsCard(graphicsCard);
    }

    @Override
    public Set<Product> getProductsByModelType(String modelType) {
        return repo.findByModelType(modelType);
    }

    @Override
    public Set<Product> getProductsByProcessorType(String processorType) {
        return repo.findByProcessorType(processorType);
    }

    @Override
    public Set<Product> getProductsByOnSale(boolean onSale) {
        return repo.findByOnSale(onSale);
    }

    @Override
    public Set<Product> getNewProducts() {
        List<Product> products = repo.findAll();
        products.sort((p2, p1) -> p1.getReleased().compareTo(p2.getReleased()));
        return new HashSet<>(products);
    }
}
