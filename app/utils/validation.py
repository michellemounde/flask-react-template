def validation_errors_to_error_messages(validation_errors):
    """Simple function that turns the WTForms validation errors into a simple dict"""
    errorMessages = {}
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages[field] = error
    return errorMessages
