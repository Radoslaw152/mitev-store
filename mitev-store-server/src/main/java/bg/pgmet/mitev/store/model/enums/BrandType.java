package bg.pgmet.mitev.store.model.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import java.util.Objects;
import java.util.stream.Stream;

public enum BrandType {
    ACER("Acer"),
    ASUS("Asus"),
    LENOVO("Lenovo"),
    HP("HP"),
    DELL("Dell"),
    APPLE("Apple"),
    MSI("MSI"),
    ;

    private final String label;

    BrandType(String label) {
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
    public static BrandType of(String label) {
        return Stream.of(BrandType.values())
                .filter(p -> Objects.equals(p.getLabel(), label))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new);
    }
}
