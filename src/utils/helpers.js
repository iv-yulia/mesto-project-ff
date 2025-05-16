import { loadingStatus, errorStatus } from "./configs";

const isLoading = (loading, button) => {
  loading
    ? (button.textContent = loadingStatus.loading)
    : (button.textContent = loadingStatus.load);
};

const showSubmitError = (error, popup) => {
  const element = popup.querySelector(".popup__form-error");
  error
    ? (element.textContent = errorStatus.error)
    : (element.textContent = errorStatus.success);
};

export { isLoading, showSubmitError };
