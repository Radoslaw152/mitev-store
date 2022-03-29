package bg.pgmet.mitev.store.service.impl;

import bg.pgmet.mitev.store.dao.CommentRepository;
import bg.pgmet.mitev.store.exception.EntityNotFoundException;
import bg.pgmet.mitev.store.model.Comment;
import bg.pgmet.mitev.store.model.Product;
import bg.pgmet.mitev.store.model.User;
import bg.pgmet.mitev.store.service.CommentService;
import java.time.LocalDateTime;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final CommentRepository repo;

    @Override
    public Comment getCommentById(Long id) {
        if (id == null) {
            return null;
        }
        Comment comment =
                repo.findById(id)
                        .orElseThrow(
                                () ->
                                        new EntityNotFoundException(
                                                String.format(
                                                        "Comment with ID=%s does not exist.", id)));
        return modifyCommentSafeUser(comment);
    }

    @Override
    public Set<Comment> getCommentsByProduct(Product product) {
        if (product == null) {
            return null;
        }
        return repo.findByProduct(product).stream()
                .map(this::modifyCommentSafeUser)
                .collect(Collectors.toSet());
    }

    @Override
    public Comment updateComment(Comment comment) {
        comment.setEdited(LocalDateTime.now());
        Comment saved = repo.save(comment);
        modifyCommentSafeUser(saved);
        return saved;
    }

    @Override
    public Comment createComment(Comment comment) {
        comment.setCreated(LocalDateTime.now());
        comment.setEdited(LocalDateTime.now());
        return insert(comment);
    }

    @Transactional
    private Comment insert(Comment comment) {
        comment.setId(null);
        Comment saved = repo.save(comment);
        modifyCommentSafeUser(saved);
        return saved;
    }

    @Override
    public Comment deleteComment(Long id) {
        Comment old = getCommentById(id);
        repo.deleteById(id);
        modifyCommentSafeUser(old);
        return old;
    }

    private Comment modifyCommentSafeUser(Comment comment) {
        User user = comment.getUser();
        User returnUser =
                User.builder()
                        .id(user.getId())
                        .firstName(user.getFirstName())
                        .lastName(user.getLastName())
                        .registered(null)
                        .updated(null)
                        .build();
        comment.setUser(returnUser);
        return comment;
    }
}
