package bg.pgmet.mitev.store.utils;

import bg.pgmet.mitev.store.exception.MitevStoreException;
import java.util.Set;
import java.util.stream.Collectors;
import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import org.apache.commons.lang3.StringUtils;
import org.springframework.util.CollectionUtils;

public class ValidationUtils {
    private static final Validator VALIDATOR =
            Validation.buildDefaultValidatorFactory().getValidator();

    public static <T> T validate(T instance) {
        Set<ConstraintViolation<T>> constraintViolations = VALIDATOR.validate(instance);
        if (!CollectionUtils.isEmpty(constraintViolations)) {
            Set<String> strings =
                    constraintViolations.stream()
                            .map(ConstraintViolation::getMessage)
                            .collect(Collectors.toSet());
            throw new MitevStoreException(StringUtils.join(strings.toArray(new String[0]), ", "));
        }
        return instance;
    }
}
