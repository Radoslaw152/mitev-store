package bg.pgmet.mitev.store.security;

import bg.pgmet.mitev.store.model.User;
import bg.pgmet.mitev.store.service.UserService;
import java.util.Collections;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class AuthProvider implements AuthenticationProvider {
    private PasswordEncoder passwordEncoder;
    private UserService userService;

    @Autowired
    public AuthProvider(UserService userService) {
        this.passwordEncoder = new BCryptPasswordEncoder();
        this.userService = userService;
    }

    @Override
    public Authentication authenticate(Authentication authentication)
            throws AuthenticationException {
        String username = authentication.getName();
        User account = userService.getUserByUsername(username);
        if (account == null) {
            return null;
        }

        String credentials = String.valueOf(authentication.getCredentials());
        if (!passwordEncoder.matches(credentials, account.getPassword())) {
            return null;
        }

        List<GrantedAuthority> roles =
                Collections.singletonList(() -> account.getRole().toString().toUpperCase());

        Authentication auth =
                new UsernamePasswordAuthenticationToken(
                        account, authentication.getCredentials(), roles);
        log.info("Authentication successful");
        return auth;
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication);
    }
}
