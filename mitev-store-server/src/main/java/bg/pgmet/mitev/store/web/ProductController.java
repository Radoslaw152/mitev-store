package bg.pgmet.mitev.store.web;

import bg.pgmet.mitev.store.exception.InvalidEntityIdException;
import bg.pgmet.mitev.store.model.Comment;
import bg.pgmet.mitev.store.model.Product;
import bg.pgmet.mitev.store.model.User;
import bg.pgmet.mitev.store.model.enums.BrandType;
import bg.pgmet.mitev.store.model.enums.GraphicsCard;
import bg.pgmet.mitev.store.model.enums.ModelType;
import bg.pgmet.mitev.store.model.enums.ProcessorType;
import bg.pgmet.mitev.store.model.enums.Role;
import bg.pgmet.mitev.store.security.IsAdminOrProdSupplier;
import bg.pgmet.mitev.store.security.IsAuthenticated;
import bg.pgmet.mitev.store.service.CommentService;
import bg.pgmet.mitev.store.service.FilesStorageService;
import bg.pgmet.mitev.store.service.ProductService;
import bg.pgmet.mitev.store.service.UserService;
import bg.pgmet.mitev.store.utils.JsonUtil;
import bg.pgmet.mitev.store.utils.ValidationUtils;
import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;

@RestController
@RequestMapping("/api/products")
@Slf4j
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;
    private final CommentService commentService;
    private final FilesStorageService fileStorageService;
    private final UserService userService;

    @GetMapping(value = {"", "/"})
    public Set<Product> getProducts(
            @RequestParam(value = "brandtype", required = false) String brandtype,
            @RequestParam(value = "processortype", required = false) String processortype,
            @RequestParam(value = "graphicscard", required = false) String graphicscard,
            @RequestParam(value = "modeltype", required = false) String modeltype,
            @RequestParam(value = "onSale", required = false) Boolean onSale) {
        return productService.getAllProducts().stream()
                .filter(product -> brandtype == null || product.getBrandType().equals(brandtype))
                .filter(
                        product ->
                                processortype == null
                                        || product.getProcessorType().equals(processortype))
                .filter(
                        product ->
                                graphicscard == null
                                        || product.getGraphicsCard().equals(graphicscard))
                .filter(product -> modeltype == null || product.getModelType().equals(modeltype))
                .filter(product -> onSale == null || product.getOnSale() == onSale)
                .collect(Collectors.toSet());
    }

    @GetMapping("{id}")
    public Product getProduct(@PathVariable("id") Long id) {
        return productService.getProductById(id);
    }

    @GetMapping(value = "/filter/model/{model}")
    public Set<Product> getProductsByModelContains(@PathVariable String model) {
        return productService.getProductsByModelContains(model);
    }

    @GetMapping(value = "/filter/graphicscard/{graphicscard}")
    public Set<Product> getProductsByGraphicsCard(@PathVariable String graphicscard) {
        log.info("Get BY graphics card is called.");
        return productService.getProductsByGraphicsCard(graphicscard);
    }

    @GetMapping(value = "/filter/modeltype/{modeltype}")
    public Set<Product> getProductsByModelType(@PathVariable String modeltype) {
        return productService.getProductsByModelType(modeltype);
    }

    @GetMapping(value = "/filter/brandtype/{brandtype}")
    public Set<Product> getProductsByBrandType(@PathVariable String brandType) {
        return productService.getProductsByBrandType(brandType);
    }

    @GetMapping(value = "/filter/processortype/{processortype}")
    public Set<Product> getProductsByProcessorType(@PathVariable String processortype) {
        return productService.getProductsByProcessorType(processortype);
    }

    @GetMapping(value = "/filter/modeltype")
    public Set<String> getAllModelType() {
        return Arrays.stream(ModelType.values()).map(Enum::toString).collect(Collectors.toSet());
    }

    @GetMapping(value = "/filter/graphicscard")
    public Set<String> getAllGraphicsCard() {
        log.info("Get all graphics card is called.");
        return Arrays.stream(GraphicsCard.values()).map(Enum::toString).collect(Collectors.toSet());
    }

    @GetMapping(value = "/filter/brandtype")
    public Set<String> getAllBrandType() {
        return Arrays.stream(BrandType.values()).map(Enum::toString).collect(Collectors.toSet());
    }

    @GetMapping(value = "/filter/processortype")
    public Set<String> getAllProcessorType() {
        return Arrays.stream(ProcessorType.values())
                .map(Enum::toString)
                .collect(Collectors.toSet());
    }

    @GetMapping(value = "onSale")
    public Set<Product> getProductsByOnSale() {
        return productService.getProductsByOnSale(true);
    }

    @GetMapping(value = "new")
    public Set<Product> getProductsNew() {
        return productService.getNewProducts();
    }

    @SneakyThrows
    @RequestMapping(
            method = RequestMethod.POST,
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    @IsAdminOrProdSupplier
    public ResponseEntity<Product> addProduct(
            @RequestPart("product") String productString,
            @RequestParam("file") MultipartFile file) {
        Product product = JsonUtil.mapObject(productString, Product.class);
        String fileName = fileStorageService.save(file);
        String url =
                MvcUriComponentsBuilder.fromMethodName(FilesController.class, "getFile", fileName)
                        .build()
                        .toString();
        product.setImageUrl(url);
        Product created = productService.createProduct(product);
        return ResponseEntity.ok(created);
    }

    @RequestMapping(
            value = "{id}",
            method = RequestMethod.PUT,
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    @IsAdminOrProdSupplier
    public ResponseEntity<Product> update(
            @PathVariable("id") Long id,
            @RequestPart("product") String productString,
            @RequestParam(value = "file", required = false) MultipartFile file) {
        Product product = JsonUtil.mapObject(productString, Product.class);
        ValidationUtils.validate(product);
        if (!id.equals(product.getId())) {
            throw new InvalidEntityIdException(
                    String.format(
                            "Entity ID='%s' is different from URL resource ID='%s'",
                            product.getId(), id));
        }
        if (file != null) {
            String fileName = fileStorageService.save(file);
            String url =
                    MvcUriComponentsBuilder.fromMethodName(
                                    FilesController.class, "getFile", fileName)
                            .build()
                            .toString();
            product.setImageUrl(url);
        }
        Product created = productService.updateProduct(product);
        return ResponseEntity.ok(created);
    }

    @DeleteMapping("{id}")
    @IsAdminOrProdSupplier
    public Product remove(@PathVariable("id") Long id) {
        return productService.deleteProduct(id);
    }

    @GetMapping("/{id}/comments")
    public Set<Comment> getCommentsForProduct(@PathVariable("id") Long id) {
        Product product = productService.getProductById(id);
        return commentService.getCommentsByProduct(product);
    }

    @GetMapping("/{id}/comments/{commentId}")
    public Comment getCommentForProduct(
            @PathVariable("id") Long id, @PathVariable("commentId") Long commentId) {
        List<Comment> comments =
                commentService.getCommentsByProduct(productService.getProductById(id)).stream()
                        .filter(comment -> comment.getId().equals(commentId))
                        .collect(Collectors.toList());
        return comments.isEmpty() ? null : comments.get(0);
    }

    @PostMapping("/{id}/comments")
    @IsAuthenticated
    public ResponseEntity<Comment> addComment(
            @PathVariable("id") Long id,
            @Valid @RequestBody Comment comment,
            Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        comment.setUser(userService.getUserById(user.getId()));
        Product productById = productService.getProductById(id);
        comment.setProduct(productById);
        comment = commentService.createComment(comment);
        log.info("Comment: {}", comment);
        return ResponseEntity.ok(comment);
    }

    @PutMapping("{id}/comments/{commentId}")
    @IsAuthenticated
    public Comment editComment(
            @PathVariable("id") Long id,
            @PathVariable("commentId") Long commentId,
            @Valid @RequestBody Comment comment,
            Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        if (!commentId.equals(comment.getId())) {
            throw new InvalidEntityIdException(
                    String.format(
                            "Comment with ID='%s' is different from URL resource ID='%s'",
                            comment.getId(), commentId));
        } else {
            Comment commentById = commentService.getCommentById(commentId);
            if (!commentById.getProduct().getId().equals(id)) {
                throw new InvalidEntityIdException(
                        String.format(
                                "Comment with ID='%s' is not associated with Product ID='%s'",
                                comment.getId(), commentById.getProduct().getId()));
            }
            if (!user.getRole().equals(Role.ADMIN)
                    && !commentById.getUser().getId().equals(user.getId())) {
                throw new InvalidEntityIdException(
                        String.format(
                                "Comment with ID='%s' is not created by User='%s'",
                                comment.getId(), user.getUsername()));
            }
            commentById.setText(comment.getText());
            return commentService.updateComment(commentById);
        }
    }

    @DeleteMapping("{id}/comments/{commentId}")
    @IsAuthenticated
    public Comment deleteComment(
            @PathVariable("id") Long id,
            @PathVariable("commentId") Long commentId,
            Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        Comment commentById = commentService.getCommentById(commentId);
        if (!commentById.getProduct().getId().equals(id)) {
            throw new InvalidEntityIdException(
                    String.format(
                            "Comment with ID='%s' is not associated with Product ID='%s'",
                            commentById.getId(), commentById.getProduct().getId()));
        }
        if (!user.getRole().equals(Role.ADMIN)
                && !commentById.getUser().getId().equals(user.getId())) {
            throw new InvalidEntityIdException(
                    String.format(
                            "Comment with ID='%s' is not created by User='%s'",
                            commentById.getId(), user.getUsername()));
        }
        return commentService.deleteComment(commentId);
    }
}
