package bg.pgmet.mitev.store.service;

import bg.pgmet.mitev.store.model.Comment;
import bg.pgmet.mitev.store.model.Product;
import java.util.Set;

public interface CommentService {
    Set<Comment> getCommentsByProduct(Product product);

    Comment getCommentById(Long id);

    Comment updateComment(Comment comment);

    Comment createComment(Comment comment);

    Comment deleteComment(Long id);
}
