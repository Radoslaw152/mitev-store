package bg.pgmet.mitev.store.exception;

public class MitevStoreException extends RuntimeException {
    private ErrorCode errorCode;

    public MitevStoreException(String message) {
        super(message);
    }

    @Override
    public String getMessage() {
        if (errorCode == null) {
            return super.getMessage();
        }
        return errorCode.getErrorMessage();
    }
}
