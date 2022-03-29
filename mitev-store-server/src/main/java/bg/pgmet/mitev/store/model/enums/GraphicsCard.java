package bg.pgmet.mitev.store.model.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonValue;
import java.util.stream.Stream;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum GraphicsCard {
    NVIDIA_GEFORCE_RTX_3080("NVIDIA GeForce RTX 3080"),
    NVIDIA_GEFORCE_RTX_3070("NVIDIA GeForce RTX 3070"),
    NVIDIA_GEFORCE_RTX_3060("NVIDIA GeForce RTX 3060"),
    NVIDIA_GEFORCE_RTX_3050("NVIDIA GeForce RTX 3050"),
    NVIDIA_GEFORCE_RTX_2070("NVIDIA GeForce RTX 2070"),
    NVIDIA_GEFORCE_RTX_1660("NVIDIA GeForce RTX 1660"),
    NVIDIA_GEFORCE_RTX_1650("NVIDIA GeForce RTX 1650"),
    AMD_RADEON_PRO_555("AMD Radeon Pro 555"),
    AMD_RADEON_R3("AMD Radeon R3"),
    AMD_RADEON_RX_550("AMD Radeon RX 550"),
    AMD_RADEON_RX_6XX("AMD Radeon RX 6XX"),
    AMD_RADEON_RX_VEGA("AMD Radeon RX VEGA"),
    INTEL_HD_GRAPHICS_550("Intel HD Graphics 550"),
    INTEL_HD_GRAPHICS_520("Intel HD Graphics 520"),
    INTEL_HD_GRAPHICS_615("Intel HD Graphics 615"),
    APPLE_M("Apple M"),
    ;

    private final String label;

    GraphicsCard(String label) {
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
    public static GraphicsCard of(String label) {
        return Stream.of(GraphicsCard.values())
                .filter(p -> p.getLabel().equals(label))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new);
    }
}
