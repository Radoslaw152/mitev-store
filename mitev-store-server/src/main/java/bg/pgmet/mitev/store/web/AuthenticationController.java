package bg.pgmet.mitev.store.web;

import bg.pgmet.mitev.store.model.User;
import bg.pgmet.mitev.store.model.enums.Role;
import bg.pgmet.mitev.store.service.UserService;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/register")
@RequiredArgsConstructor
@Slf4j
public class AuthenticationController {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    @RequestMapping(
            method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_UTF8_VALUE,
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<User> register(
            @Valid @RequestBody User account, HttpServletRequest request) {
        account.setRole(Role.CUSTOMER);
        account.setPassword(passwordEncoder.encode(account.getPassword()));
        User result = userService.createUser(account);
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }
}
