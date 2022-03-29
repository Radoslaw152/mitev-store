package bg.pgmet.mitev.store.dao;

import bg.pgmet.mitev.store.model.Comment;
import bg.pgmet.mitev.store.model.Product;
import java.util.Set;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    @Transactional(readOnly = true)
    Set<Comment> findByProduct(Product product);
}
