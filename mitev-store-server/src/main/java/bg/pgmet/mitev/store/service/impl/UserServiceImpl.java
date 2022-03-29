package bg.pgmet.mitev.store.service.impl;

import bg.pgmet.mitev.store.dao.UserRepository;
import bg.pgmet.mitev.store.exception.EntityNotFoundException;
import bg.pgmet.mitev.store.exception.MitevStoreException;
import bg.pgmet.mitev.store.model.User;
import bg.pgmet.mitev.store.service.UserService;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;

@Service
@Slf4j
@Validated
public class UserServiceImpl implements UserService {

    private UserRepository repo;

    @Autowired
    public void setUserRepository(UserRepository repo) {
        this.repo = repo;
    }

    @Override
    //    @PostFilter("filterObject.username == authentication.name or
    // hasAuthority('ALL_USER_READ')")
    public Set<User> getAllUsers() {
        return new HashSet<>(repo.findAll());
    }

    @Override
    public User getUserById(Long id) {
        if (id == null) return null;
        return repo.findById(id)
                .orElseThrow(
                        () ->
                                new EntityNotFoundException(
                                        String.format("User with id=%s does not exist", id)));
    }

    @Override
    public User getUserByUsername(String username) {
        Optional<User> result = repo.findByUsername(username);
        return result.isPresent() ? result.get() : null;
    }

    @Override
    public User createUser(User user) {
        return this.createUser(user, false);
    }

    @Override
    public User createUser(User user, boolean safe) {
        Optional<User> result = repo.findByUsername(user.getUsername());
        if (result.isPresent() && !safe) {
            throw new MitevStoreException(
                    String.format("User with username=%s already exists.", user.getUsername()));
        } else if (result.isPresent()) {
            return result.get();
        } else {
            user.setRegistered(LocalDateTime.now());
            user.setUpdated((LocalDateTime.now()));
            user.setActive(true);
            log.info("Creating default user: {}", user);
            return insert(user);
        }
    }

    @Transactional
    private User insert(User user) {
        user.setId(null);
        return repo.save(user);
    }

    @Override
    //    @PreAuthorize("#user.username == authentication.name or hasAuthority('ALL_USER_UPDATE')")
    public User updateUser(User user) {
        user.setUpdated(LocalDateTime.now());
        return repo.save(user);
    }

    @Override
    //    @PreAuthorize("hasRole('ADMIN')")
    public User deleteUser(Long id) {
        User old = getUserById(id);
        repo.deleteById(id);
        return old;
    }
}
