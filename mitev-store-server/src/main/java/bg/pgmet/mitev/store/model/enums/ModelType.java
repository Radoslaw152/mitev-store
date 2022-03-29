package bg.pgmet.mitev.store.model.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import java.util.stream.Stream;

public enum ModelType {
    NOTEBOOK("Notebook"),
    ULTRABOOK("Ultrabook"),
    GAMING_LAPTOP("Gaming Laptop"),
    DESKTOP_COMPUTER("Desktop Computer"),
    ;

    private final String label;

    ModelType(String label) {
        this.label = label;
    }

    @Override
    public String toString() {
        return label;
    }

    @JsonValue
    public String getLabel() {
        return label;
    }

    @JsonCreator
    public static ModelType of(String label) {
        return Stream.of(ModelType.values())
                .filter(p -> p.getLabel().equals(label))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new);
    }
}
