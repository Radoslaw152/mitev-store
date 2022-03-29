package bg.pgmet.mitev.store.model.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum ProcessorType {
    INTEL_CORE_I9_14_CORES("Intel Core i9 - 14 cores"),
    INTEL_CORE_I9_8_CORES("Intel Core i9 - 8 cores"),
    INTEL_CORE_I7_14_CORES("Intel Core i7 - 14 cores"),
    INTEL_CORE_I7_8_CORES("Intel Core i7 - 8 cores"),
    INTEL_CORE_I7_6_CORES("Intel Core i7 - 6 cores"),
    INTEL_CORE_I7_4_CORES("Intel Core i7 - 4 cores"),
    INTEL_CORE_I5_6_CORES("Intel Core i5 - 6 cores"),
    INTEL_CORE_I5_4_CORES("Intel Core i5 - 4 cores"),
    INTEL_CORE_I3_2_CORES("Intel Core i3 - 2 cores"),
    AMD_RYZEN_9_8_CORES("AMD Ryzen 9 - 8 cores"),
    AMD_RYZEN_7_8_CORES("AMD Ryzen 7 - 8 cores"),
    AMD_RYZEN_7_4_CORES("AMD Ryzen 7 - 4 cores"),
    AMD_RYZEN_5_6_CORES("AMD Ryzen 5 - 6 cores"),
    AMD_RYZEN_5_4_CORES("AMD Ryzen 5 - 4 cores"),
    AMD_RYZEN_3_4_CORES("AMD Ryzen 3 - 4 cores"),
    AMD_RYZEN_3_2_CORES("AMD Ryzen 3 - 4 cores"),
    APPLE_M1("Apple M1"),
    ;

    private final String label;

    ProcessorType(String label) {
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

    //    @JsonCreator
    //    public static ProcessorType of(String label) {
    //        return Stream.of(ProcessorType.values())
    //                .filter(p -> p.getLabel().equals(label))
    //                .findFirst()
    //                .orElseThrow(IllegalArgumentException::new);

}
