package bg.pgmet.mitev.store.service;

import bg.pgmet.mitev.store.model.User;
import java.util.Set;

public interface UserService {
    Set<User> getAllUsers();

    User getUserById(Long id);

    User getUserByUsername(String username);

    User createUser(User user);

    User createUser(User user, boolean safe);

    User updateUser(User user);

    User deleteUser(Long id);
}
