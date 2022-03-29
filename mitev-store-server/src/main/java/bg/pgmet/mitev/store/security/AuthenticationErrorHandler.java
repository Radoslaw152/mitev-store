package bg.pgmet.mitev.store.security;

import bg.pgmet.mitev.store.exception.ErrorCode;
import bg.pgmet.mitev.store.utils.JsonUtil;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

public class AuthenticationErrorHandler
        implements AuthenticationFailureHandler, AuthenticationEntryPoint {

    @Override
    public void onAuthenticationFailure(
            HttpServletRequest request,
            HttpServletResponse response,
            AuthenticationException exception)
            throws IOException, ServletException {
        handleUnauthorized(response, "Authentication unsuccessful! Wrong or empty credentials!");
    }

    @Override
    public void commence(
            HttpServletRequest request,
            HttpServletResponse response,
            AuthenticationException authException)
            throws IOException, ServletException {
        handleUnauthorized(response, "You are not authorized to execute this operation!");
    }

    private void handleUnauthorized(HttpServletResponse response, String message)
            throws IOException, ServletException {
        ErrorCode errorCode = ErrorCode.builder().errorMessage(message).build();
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.getOutputStream().println(JsonUtil.toStringObject(errorCode));
        response.getOutputStream().flush();
    }
}
