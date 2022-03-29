package bg.pgmet.mitev.store.security;

import bg.pgmet.mitev.store.utils.ValidationUtils;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;
import javax.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Value;

@Value
@Builder
@JsonDeserialize(builder = Credentials.ValidatedCredentialsBuilder.class)
public class Credentials {
    @NotNull private String username;
    @NotNull private String password;

    @JsonPOJOBuilder
    public static class ValidatedCredentialsBuilder extends CredentialsBuilder {
        @Override
        public Credentials build() {
            return ValidationUtils.validate(super.build());
        }
    }
}
