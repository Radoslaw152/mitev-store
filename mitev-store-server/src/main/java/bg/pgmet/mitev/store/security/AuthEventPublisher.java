package bg.pgmet.mitev.store.security;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Primary;
import org.springframework.security.authentication.AuthenticationEventPublisher;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;

@Slf4j
@Primary
@Component
public class AuthEventPublisher implements AuthenticationEventPublisher {
    @Override
    public void publishAuthenticationSuccess(Authentication authentication) {
        log.info("{} authenticated succesfully", authentication.getName());
    }

    @Override
    public void publishAuthenticationFailure(
            AuthenticationException e, Authentication authentication) {
        log.warn(
                "{} failed to authenticate , exception is {}",
                authentication.getName(),
                e.getMessage());
    }
}
